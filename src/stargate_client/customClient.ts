import {
  encodeSecp256k1Pubkey,
  makeSignDoc as makeSignDocAmino,
  pubkeyType,
  StdFee,
} from "@cosmjs/amino";
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import { Int53, Uint53 } from "@cosmjs/math";
import {
  EncodeObject,
  isOfflineDirectSigner,
  makeAuthInfoBytes,
  makeSignDoc,
  OfflineSigner,
  Registry,
  TxBodyEncodeObject,
} from "@cosmjs/proto-signing";
import {
  AminoConverters,
  AminoTypes,
  DeliverTxResponse,
  SignerData,
  SigningStargateClientOptions,
  StargateClient,
  defaultRegistryTypes,
  GasPrice,
  calculateFee,
} from "@cosmjs/stargate";
import {
  createAuthzAminoConverters,
  MsgDelegateEncodeObject,
  MsgSendEncodeObject,
  MsgUndelegateEncodeObject,
  MsgWithdrawDelegatorRewardEncodeObject,
  createBankAminoConverters,
  createDistributionAminoConverters,
  createFreegrantAminoConverters,
  createGovAminoConverters,
  createIbcAminoConverters,
  createStakingAminoConverters,
  createVestingAminoConverters,
} from "@cosmjs/stargate/build/modules";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { assert, assertDefined } from "@cosmjs/utils";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import {
  MsgDelegate,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import { encodePubkey } from "./customPubkey";
import { accountFromAny } from "./EdAccountHandler";
import { ixo } from "../codegen_ixo_helpers";

function createDefaultRegistry(): Registry {
  return new Registry(defaultRegistryTypes);
}

function createDefaultTypes(prefix: string): AminoConverters {
  return {
    ...createAuthzAminoConverters(),
    ...createBankAminoConverters(),
    ...createDistributionAminoConverters(),
    ...createGovAminoConverters(),
    ...createStakingAminoConverters(prefix),
    ...createIbcAminoConverters(),
    ...createFreegrantAminoConverters(),
    ...createVestingAminoConverters(),
  };
}

export class SigningStargateClient extends StargateClient {
  public readonly registry: Registry;
  public readonly broadcastTimeoutMs: number | undefined;
  public readonly broadcastPollIntervalMs: number | undefined;

  private readonly signer: OfflineSigner;
  private readonly aminoTypes: AminoTypes;
  private readonly gasPrice: GasPrice | undefined;
  private readonly ignoreGetSequence: boolean;

  public static async connectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
    ignoreGetSequence?: boolean
  ): Promise<SigningStargateClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningStargateClient(
      tmClient,
      signer,
      options,
      ignoreGetSequence
    );
  }

  /**
   * Creates a client in offline mode.
   *
   * This should only be used in niche cases where you know exactly what you're doing,
   * e.g. when building an offline signing application.
   *
   * When you try to use online functionality with such a signer, an
   * exception will be raised.
   */
  public static async offline(
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
    ignoreGetSequence?: boolean
  ): Promise<SigningStargateClient> {
    return new SigningStargateClient(
      undefined,
      signer,
      options,
      ignoreGetSequence
    );
  }

  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningStargateClientOptions,
    ignoreGetSequence: boolean = false
  ) {
    super(tmClient, options);
    // TODO: do we really want to set a default here? Ideally we could get it from the signer such that users only have to set it once.
    const prefix = options.prefix ?? "cosmos";
    const {
      registry = createDefaultRegistry(),
      aminoTypes = new AminoTypes(createDefaultTypes(prefix)),
    } = options;
    this.registry = registry;
    this.aminoTypes = aminoTypes;
    this.signer = signer;
    this.broadcastTimeoutMs = options.broadcastTimeoutMs;
    this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
    this.gasPrice = options.gasPrice;
    this.ignoreGetSequence = ignoreGetSequence;
  }

  public async simulate(
    signerAddress: string,
    messages: readonly EncodeObject[],
    memo: string | undefined
  ): Promise<number> {
    const anyMsgs = messages.map((m) => this.registry.encodeAsAny(m));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodeSecp256k1Pubkey(accountFromSigner.pubkey);
    const { sequence } = this.ignoreGetSequence
      ? { sequence: 0 }
      : await this.getSequence(signerAddress);
    const { gasInfo } = await this.forceGetQueryClient().tx.simulate(
      anyMsgs,
      memo,
      pubkey,
      sequence
    );
    assertDefined(gasInfo);
    return Uint53.fromString(gasInfo.gasUsed.toString()).toNumber();
  }

  public async sendTokens(
    senderAddress: string,
    recipientAddress: string,
    amount: readonly Coin[],
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const sendMsg: MsgSendEncodeObject = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amount: [...amount],
      },
    };
    return this.signAndBroadcast(senderAddress, [sendMsg], fee, memo);
  }

  public async delegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const delegateMsg: MsgDelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
      value: MsgDelegate.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorAddress: validatorAddress,
        amount: amount,
      }),
    };
    return this.signAndBroadcast(delegatorAddress, [delegateMsg], fee, memo);
  }

  public async undelegateTokens(
    delegatorAddress: string,
    validatorAddress: string,
    amount: Coin,
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const undelegateMsg: MsgUndelegateEncodeObject = {
      typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
      value: MsgUndelegate.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorAddress: validatorAddress,
        amount: amount,
      }),
    };
    return this.signAndBroadcast(delegatorAddress, [undelegateMsg], fee, memo);
  }

  public async withdrawRewards(
    delegatorAddress: string,
    validatorAddress: string,
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<DeliverTxResponse> {
    const withdrawMsg: MsgWithdrawDelegatorRewardEncodeObject = {
      typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      value: MsgWithdrawDelegatorReward.fromPartial({
        delegatorAddress: delegatorAddress,
        validatorAddress: validatorAddress,
      }),
    };
    return this.signAndBroadcast(delegatorAddress, [withdrawMsg], fee, memo);
  }

  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee | "auto" | number,
    memo = ""
  ): Promise<DeliverTxResponse> {
    let usedFee: StdFee;
    if (fee == "auto" || typeof fee === "number") {
      assertDefined(
        this.gasPrice,
        "Gas price must be set in the client options when auto gas is used."
      );
      const gasEstimation = await this.simulate(signerAddress, messages, memo);
      const multiplier = typeof fee === "number" ? fee : 1.3;
      usedFee = calculateFee(
        Math.round(gasEstimation * multiplier),
        this.gasPrice
      );
    } else {
      usedFee = fee;
    }
    const txRaw = await this.sign(signerAddress, messages, usedFee, memo);
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTx(
      txBytes,
      this.broadcastTimeoutMs,
      this.broadcastPollIntervalMs
    );
  }

  /**
   * Gets account number and sequence from the API, creates a sign doc,
   * creates a single signature and assembles the signed transaction.
   *
   * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
   *
   * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
   * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
   * (See the SigningStargateClient.offline constructor).
   */
  public async sign(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    explicitSignerData?: SignerData
  ): Promise<TxRaw> {
    let signerData: SignerData;
    if (explicitSignerData) {
      signerData = explicitSignerData;
    } else {
      const { accountNumber, sequence } = this.ignoreGetSequence
        ? { sequence: 0, accountNumber: 0 }
        : await this.getSequence(signerAddress);
      const chainId = await this.getChainId();
      signerData = {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: chainId,
      };
    }

    return isOfflineDirectSigner(this.signer)
      ? this.signDirect(signerAddress, messages, fee, memo, signerData)
      : this.signAmino(signerAddress, messages, fee, memo, signerData);
  }

  private async signAmino(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData
  ): Promise<TxRaw> {
    assert(!isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey({
      type:
        accountFromSigner.algo === "secp256k1"
          ? pubkeyType.secp256k1
          : pubkeyType.ed25519,
      value: toBase64(accountFromSigner.pubkey),
    });
    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
    const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
    const signDoc = makeSignDocAmino(
      msgs,
      fee,
      chainId,
      memo,
      accountNumber,
      sequence
    );
    const { signature, signed } = await this.signer.signAmino(
      signerAddress,
      signDoc
    );
    const signedTxBody = {
      messages: messages,
      memo: signed.memo,
    };
    const signedTxBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: signedTxBody,
    };
    const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);
    const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
    const signedSequence = Int53.fromString(signed.sequence).toNumber();
    const signedAuthInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signMode
    );
    return TxRaw.fromPartial({
      bodyBytes: signedTxBodyBytes,
      authInfoBytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }

  private async signDirect(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData
  ): Promise<TxRaw> {
    assert(isOfflineDirectSigner(this.signer));
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress
    );
    if (!accountFromSigner) {
      throw new Error("Failed to retrieve account from signer");
    }
    const pubkey = encodePubkey({
      type:
        accountFromSigner.algo === "secp256k1"
          ? pubkeyType.secp256k1
          : pubkeyType.ed25519,
      value: toBase64(accountFromSigner.pubkey),
    });
    const txBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages,
        memo: memo,
      },
    };
    const txBodyBytes = this.registry.encode(txBodyEncodeObject);
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit
    );
    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber
    );
    const { signature, signed } = await this.signer.signDirect(
      signerAddress,
      signDoc
    );
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    });
  }
}

export const createClient = async (
  rpcEndpoint: string,
  offlineWallet: OfflineSigner,
  ignoreGetSequence?: boolean
): Promise<SigningStargateClient> => {
  return await SigningStargateClient.connectWithSigner(
    rpcEndpoint,
    offlineWallet,
    {
      registry: createRegistry(),
      accountParser: accountFromAny,
    },
    ignoreGetSequence
  );
};

export const createRegistry = (): Registry => {
  const myRegistry = new Registry(defaultRegistryTypes);
  // Iid module
  myRegistry.register(
    "/iid.MsgCreateIidDocument",
    ixo.iid.MsgCreateIidDocument
  );
  myRegistry.register(
    "/iid.MsgUpdateIidDocument",
    ixo.iid.MsgUpdateIidDocument
  );
  myRegistry.register("/iid.MsgUpdateIidMeta", ixo.iid.MsgUpdateIidMeta);
  myRegistry.register("/iid.MsgAddIidContext", ixo.iid.MsgAddIidContext);
  myRegistry.register("/iid.MsgDeleteIidContext", ixo.iid.MsgDeleteIidContext);
  myRegistry.register("/iid.MsgAddVerification", ixo.iid.MsgAddVerification);
  myRegistry.register(
    "/iid.MsgSetVerificationRelationships",
    ixo.iid.MsgSetVerificationRelationships
  );
  myRegistry.register(
    "/iid.MsgRevokeVerification",
    ixo.iid.MsgRevokeVerification
  );
  myRegistry.register("/iid.MsgAddAccordedRight", ixo.iid.MsgAddAccordedRight);
  myRegistry.register(
    "/iid.MsgDeleteAccordedRight",
    ixo.iid.MsgDeleteAccordedRight
  );
  myRegistry.register("/iid.MsgAddController", ixo.iid.MsgAddController);
  myRegistry.register("/iid.MsgDeleteController", ixo.iid.MsgDeleteController);
  myRegistry.register("/iid.MsgAddLinkedEntity", ixo.iid.MsgAddLinkedEntity);
  myRegistry.register(
    "/iid.MsgDeleteLinkedEntity",
    ixo.iid.MsgDeleteLinkedEntity
  );
  myRegistry.register(
    "/iid.MsgAddLinkedResource",
    ixo.iid.MsgAddLinkedResource
  );
  myRegistry.register(
    "/iid.MsgDeleteLinkedResource",
    ixo.iid.MsgDeleteLinkedResource
  );
  myRegistry.register("/iid.MsgAddService", ixo.iid.MsgAddService);
  myRegistry.register("/iid.MsgDeleteService", ixo.iid.MsgDeleteService);
  // Entity module
  myRegistry.register("/entity.MsgCreateEntity", ixo.entity.MsgCreateEntity);
  myRegistry.register("/entity.MsgCreateEntity", ixo.entity.MsgCreateEntity);
  myRegistry.register("/entity.MsgCreateEntity", ixo.entity.MsgCreateEntity);
  myRegistry.register(
    "/entity.MsgTransferEntity",
    ixo.entity.MsgTransferEntity
  );
  myRegistry.register("/entity.MsgUpdateEntity", ixo.entity.MsgUpdateEntity);
  myRegistry.register(
    "/entity.MsgUpdateEntityConfig",
    ixo.entity.MsgUpdateEntityConfig
  );
  // Payments module
  myRegistry.register(
    "/payments.MsgCreatePaymentTemplate",
    ixo.payments.MsgCreatePaymentTemplate
  );
  myRegistry.register(
    "/payments.MsgCreatePaymentContract",
    ixo.payments.MsgCreatePaymentContract
  );
  myRegistry.register(
    "/payments.MsgSetPaymentContractAuthorisation",
    ixo.payments.MsgSetPaymentContractAuthorisation
  );
  myRegistry.register(
    "/payments.MsgCreateSubscription",
    ixo.payments.MsgCreateSubscription
  );
  myRegistry.register(
    "/payments.MsgGrantDiscount",
    ixo.payments.MsgGrantDiscount
  );
  myRegistry.register(
    "/payments.MsgRevokeDiscount",
    ixo.payments.MsgRevokeDiscount
  );
  myRegistry.register(
    "/payments.MsgEffectPayment",
    ixo.payments.MsgEffectPayment
  );
  // Project module
  myRegistry.register(
    "/project.MsgCreateProject",
    ixo.project.MsgCreateProject
  );
  myRegistry.register(
    "/project.MsgUpdateProjectStatus",
    ixo.project.MsgUpdateProjectStatus
  );
  myRegistry.register("/project.MsgCreateAgent", ixo.project.MsgCreateAgent);
  myRegistry.register("/project.MsgUpdateAgent", ixo.project.MsgUpdateAgent);
  myRegistry.register("/project.MsgCreateClaim", ixo.project.MsgCreateClaim);
  myRegistry.register(
    "/project.MsgCreateEvaluation",
    ixo.project.MsgCreateEvaluation
  );
  myRegistry.register(
    "/project.MsgWithdrawFunds",
    ixo.project.MsgWithdrawFunds
  );
  myRegistry.register(
    "/project.MsgUpdateProjectDoc",
    ixo.project.MsgUpdateProjectDoc
  );
  // Bond module
  myRegistry.register("/bonds.MsgCreateBond", ixo.bonds.MsgCreateBond);
  myRegistry.register("/bonds.MsgEditBond", ixo.bonds.MsgEditBond);
  myRegistry.register("/bonds.MsgSetNextAlpha", ixo.bonds.MsgSetNextAlpha);
  myRegistry.register(
    "/bonds.MsgUpdateBondState",
    ixo.bonds.MsgUpdateBondState
  );
  myRegistry.register("/bonds.MsgBuy", ixo.bonds.MsgBuy);
  myRegistry.register("/bonds.MsgSell", ixo.bonds.MsgSell);
  myRegistry.register("/bonds.MsgSwap", ixo.bonds.MsgSwap);
  myRegistry.register(
    "/bonds.MsgMakeOutcomePayment",
    ixo.bonds.MsgMakeOutcomePayment
  );
  myRegistry.register("/bonds.MsgWithdrawShare", ixo.bonds.MsgWithdrawShare);
  myRegistry.register(
    "/bonds.MsgWithdrawReserve",
    ixo.bonds.MsgWithdrawReserve
  );

  return myRegistry;
};
