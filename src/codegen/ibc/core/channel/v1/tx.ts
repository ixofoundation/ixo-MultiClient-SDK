//@ts-nocheck
import { Channel, ChannelSDKType, Packet, PacketSDKType, State, stateFromJSON, stateToJSON } from "./channel";
import { Height, HeightSDKType, Params, ParamsSDKType } from "../../client/v1/client";
import { UpgradeFields, UpgradeFieldsSDKType, Upgrade, UpgradeSDKType, ErrorReceipt, ErrorReceiptSDKType } from "./upgrade";
import { Long, isSet, bytesFromBase64, base64FromBytes } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
/** ResponseResultType defines the possible outcomes of the execution of a message */
export enum ResponseResultType {
  /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
  RESPONSE_RESULT_TYPE_UNSPECIFIED = 0,
  /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
  RESPONSE_RESULT_TYPE_NOOP = 1,
  /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
  RESPONSE_RESULT_TYPE_SUCCESS = 2,
  /** RESPONSE_RESULT_TYPE_FAILURE - The message was executed unsuccessfully */
  RESPONSE_RESULT_TYPE_FAILURE = 3,
  UNRECOGNIZED = -1,
}
export const ResponseResultTypeSDKType = ResponseResultType;
export function responseResultTypeFromJSON(object: any): ResponseResultType {
  switch (object) {
    case 0:
    case "RESPONSE_RESULT_TYPE_UNSPECIFIED":
      return ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED;
    case 1:
    case "RESPONSE_RESULT_TYPE_NOOP":
      return ResponseResultType.RESPONSE_RESULT_TYPE_NOOP;
    case 2:
    case "RESPONSE_RESULT_TYPE_SUCCESS":
      return ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS;
    case 3:
    case "RESPONSE_RESULT_TYPE_FAILURE":
      return ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseResultType.UNRECOGNIZED;
  }
}
export function responseResultTypeToJSON(object: ResponseResultType): string {
  switch (object) {
    case ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED:
      return "RESPONSE_RESULT_TYPE_UNSPECIFIED";
    case ResponseResultType.RESPONSE_RESULT_TYPE_NOOP:
      return "RESPONSE_RESULT_TYPE_NOOP";
    case ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS:
      return "RESPONSE_RESULT_TYPE_SUCCESS";
    case ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE:
      return "RESPONSE_RESULT_TYPE_FAILURE";
    case ResponseResultType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It
 * is called by a relayer on Chain A.
 */
export interface MsgChannelOpenInit {
  portId: string;
  channel?: Channel;
  signer: string;
}
/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It
 * is called by a relayer on Chain A.
 */
export interface MsgChannelOpenInitSDKType {
  port_id: string;
  channel?: ChannelSDKType;
  signer: string;
}
/** MsgChannelOpenInitResponse defines the Msg/ChannelOpenInit response type. */
export interface MsgChannelOpenInitResponse {
  channelId: string;
  version: string;
}
/** MsgChannelOpenInitResponse defines the Msg/ChannelOpenInit response type. */
export interface MsgChannelOpenInitResponseSDKType {
  channel_id: string;
  version: string;
}
/**
 * MsgChannelOpenInit defines a msg sent by a Relayer to try to open a channel
 * on Chain B. The version field within the Channel field has been deprecated. Its
 * value will be ignored by core IBC.
 */
export interface MsgChannelOpenTry {
  portId: string;
  /** Deprecated: this field is unused. Crossing hello's are no longer supported in core IBC. */
  /** @deprecated */
  previousChannelId: string;
  /** NOTE: the version field within the channel has been deprecated. Its value will be ignored by core IBC. */
  channel?: Channel;
  counterpartyVersion: string;
  proofInit: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/**
 * MsgChannelOpenInit defines a msg sent by a Relayer to try to open a channel
 * on Chain B. The version field within the Channel field has been deprecated. Its
 * value will be ignored by core IBC.
 */
export interface MsgChannelOpenTrySDKType {
  port_id: string;
  /** @deprecated */
  previous_channel_id: string;
  channel?: ChannelSDKType;
  counterparty_version: string;
  proof_init: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelOpenTryResponse defines the Msg/ChannelOpenTry response type. */
export interface MsgChannelOpenTryResponse {
  version: string;
  channelId: string;
}
/** MsgChannelOpenTryResponse defines the Msg/ChannelOpenTry response type. */
export interface MsgChannelOpenTryResponseSDKType {
  version: string;
  channel_id: string;
}
/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 * WARNING: a channel upgrade MUST NOT initialize an upgrade for this channel
 * in the same block as executing this message otherwise the counterparty will
 * be incapable of opening.
 */
export interface MsgChannelOpenAck {
  portId: string;
  channelId: string;
  counterpartyChannelId: string;
  counterpartyVersion: string;
  proofTry: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 * WARNING: a channel upgrade MUST NOT initialize an upgrade for this channel
 * in the same block as executing this message otherwise the counterparty will
 * be incapable of opening.
 */
export interface MsgChannelOpenAckSDKType {
  port_id: string;
  channel_id: string;
  counterparty_channel_id: string;
  counterparty_version: string;
  proof_try: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelOpenAckResponse defines the Msg/ChannelOpenAck response type. */
export interface MsgChannelOpenAckResponse {}
/** MsgChannelOpenAckResponse defines the Msg/ChannelOpenAck response type. */
export interface MsgChannelOpenAckResponseSDKType {}
/**
 * MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of channel state to OPEN on Chain A.
 */
export interface MsgChannelOpenConfirm {
  portId: string;
  channelId: string;
  proofAck: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/**
 * MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of channel state to OPEN on Chain A.
 */
export interface MsgChannelOpenConfirmSDKType {
  port_id: string;
  channel_id: string;
  proof_ack: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/**
 * MsgChannelOpenConfirmResponse defines the Msg/ChannelOpenConfirm response
 * type.
 */
export interface MsgChannelOpenConfirmResponse {}
/**
 * MsgChannelOpenConfirmResponse defines the Msg/ChannelOpenConfirm response
 * type.
 */
export interface MsgChannelOpenConfirmResponseSDKType {}
/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A
 * to close a channel with Chain B.
 */
export interface MsgChannelCloseInit {
  portId: string;
  channelId: string;
  signer: string;
}
/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A
 * to close a channel with Chain B.
 */
export interface MsgChannelCloseInitSDKType {
  port_id: string;
  channel_id: string;
  signer: string;
}
/** MsgChannelCloseInitResponse defines the Msg/ChannelCloseInit response type. */
export interface MsgChannelCloseInitResponse {}
/** MsgChannelCloseInitResponse defines the Msg/ChannelCloseInit response type. */
export interface MsgChannelCloseInitResponseSDKType {}
/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B
 * to acknowledge the change of channel state to CLOSED on Chain A.
 */
export interface MsgChannelCloseConfirm {
  portId: string;
  channelId: string;
  proofInit: Uint8Array;
  proofHeight?: Height;
  signer: string;
  counterpartyUpgradeSequence: Long;
}
/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B
 * to acknowledge the change of channel state to CLOSED on Chain A.
 */
export interface MsgChannelCloseConfirmSDKType {
  port_id: string;
  channel_id: string;
  proof_init: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
  counterparty_upgrade_sequence: Long;
}
/**
 * MsgChannelCloseConfirmResponse defines the Msg/ChannelCloseConfirm response
 * type.
 */
export interface MsgChannelCloseConfirmResponse {}
/**
 * MsgChannelCloseConfirmResponse defines the Msg/ChannelCloseConfirm response
 * type.
 */
export interface MsgChannelCloseConfirmResponseSDKType {}
/** MsgRecvPacket receives incoming IBC packet */
export interface MsgRecvPacket {
  packet?: Packet;
  proofCommitment: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgRecvPacket receives incoming IBC packet */
export interface MsgRecvPacketSDKType {
  packet?: PacketSDKType;
  proof_commitment: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgRecvPacketResponse defines the Msg/RecvPacket response type. */
export interface MsgRecvPacketResponse {
  result: ResponseResultType;
}
/** MsgRecvPacketResponse defines the Msg/RecvPacket response type. */
export interface MsgRecvPacketResponseSDKType {
  result: ResponseResultType;
}
/** MsgTimeout receives timed-out packet */
export interface MsgTimeout {
  packet?: Packet;
  proofUnreceived: Uint8Array;
  proofHeight?: Height;
  nextSequenceRecv: Long;
  signer: string;
}
/** MsgTimeout receives timed-out packet */
export interface MsgTimeoutSDKType {
  packet?: PacketSDKType;
  proof_unreceived: Uint8Array;
  proof_height?: HeightSDKType;
  next_sequence_recv: Long;
  signer: string;
}
/** MsgTimeoutResponse defines the Msg/Timeout response type. */
export interface MsgTimeoutResponse {
  result: ResponseResultType;
}
/** MsgTimeoutResponse defines the Msg/Timeout response type. */
export interface MsgTimeoutResponseSDKType {
  result: ResponseResultType;
}
/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export interface MsgTimeoutOnClose {
  packet?: Packet;
  proofUnreceived: Uint8Array;
  proofClose: Uint8Array;
  proofHeight?: Height;
  nextSequenceRecv: Long;
  signer: string;
  counterpartyUpgradeSequence: Long;
}
/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export interface MsgTimeoutOnCloseSDKType {
  packet?: PacketSDKType;
  proof_unreceived: Uint8Array;
  proof_close: Uint8Array;
  proof_height?: HeightSDKType;
  next_sequence_recv: Long;
  signer: string;
  counterparty_upgrade_sequence: Long;
}
/** MsgTimeoutOnCloseResponse defines the Msg/TimeoutOnClose response type. */
export interface MsgTimeoutOnCloseResponse {
  result: ResponseResultType;
}
/** MsgTimeoutOnCloseResponse defines the Msg/TimeoutOnClose response type. */
export interface MsgTimeoutOnCloseResponseSDKType {
  result: ResponseResultType;
}
/** MsgAcknowledgement receives incoming IBC acknowledgement */
export interface MsgAcknowledgement {
  packet?: Packet;
  acknowledgement: Uint8Array;
  proofAcked: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgAcknowledgement receives incoming IBC acknowledgement */
export interface MsgAcknowledgementSDKType {
  packet?: PacketSDKType;
  acknowledgement: Uint8Array;
  proof_acked: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgAcknowledgementResponse defines the Msg/Acknowledgement response type. */
export interface MsgAcknowledgementResponse {
  result: ResponseResultType;
}
/** MsgAcknowledgementResponse defines the Msg/Acknowledgement response type. */
export interface MsgAcknowledgementResponseSDKType {
  result: ResponseResultType;
}
/**
 * MsgChannelUpgradeInit defines the request type for the ChannelUpgradeInit rpc
 * WARNING: Initializing a channel upgrade in the same block as opening the channel
 * may result in the counterparty being incapable of opening.
 */
export interface MsgChannelUpgradeInit {
  portId: string;
  channelId: string;
  fields?: UpgradeFields;
  signer: string;
}
/**
 * MsgChannelUpgradeInit defines the request type for the ChannelUpgradeInit rpc
 * WARNING: Initializing a channel upgrade in the same block as opening the channel
 * may result in the counterparty being incapable of opening.
 */
export interface MsgChannelUpgradeInitSDKType {
  port_id: string;
  channel_id: string;
  fields?: UpgradeFieldsSDKType;
  signer: string;
}
/** MsgChannelUpgradeInitResponse defines the MsgChannelUpgradeInit response type */
export interface MsgChannelUpgradeInitResponse {
  upgrade?: Upgrade;
  upgradeSequence: Long;
}
/** MsgChannelUpgradeInitResponse defines the MsgChannelUpgradeInit response type */
export interface MsgChannelUpgradeInitResponseSDKType {
  upgrade?: UpgradeSDKType;
  upgrade_sequence: Long;
}
/** MsgChannelUpgradeTry defines the request type for the ChannelUpgradeTry rpc */
export interface MsgChannelUpgradeTry {
  portId: string;
  channelId: string;
  proposedUpgradeConnectionHops: string[];
  counterpartyUpgradeFields?: UpgradeFields;
  counterpartyUpgradeSequence: Long;
  proofChannel: Uint8Array;
  proofUpgrade: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgChannelUpgradeTry defines the request type for the ChannelUpgradeTry rpc */
export interface MsgChannelUpgradeTrySDKType {
  port_id: string;
  channel_id: string;
  proposed_upgrade_connection_hops: string[];
  counterparty_upgrade_fields?: UpgradeFieldsSDKType;
  counterparty_upgrade_sequence: Long;
  proof_channel: Uint8Array;
  proof_upgrade: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelUpgradeTryResponse defines the MsgChannelUpgradeTry response type */
export interface MsgChannelUpgradeTryResponse {
  upgrade?: Upgrade;
  upgradeSequence: Long;
  result: ResponseResultType;
}
/** MsgChannelUpgradeTryResponse defines the MsgChannelUpgradeTry response type */
export interface MsgChannelUpgradeTryResponseSDKType {
  upgrade?: UpgradeSDKType;
  upgrade_sequence: Long;
  result: ResponseResultType;
}
/** MsgChannelUpgradeAck defines the request type for the ChannelUpgradeAck rpc */
export interface MsgChannelUpgradeAck {
  portId: string;
  channelId: string;
  counterpartyUpgrade?: Upgrade;
  proofChannel: Uint8Array;
  proofUpgrade: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgChannelUpgradeAck defines the request type for the ChannelUpgradeAck rpc */
export interface MsgChannelUpgradeAckSDKType {
  port_id: string;
  channel_id: string;
  counterparty_upgrade?: UpgradeSDKType;
  proof_channel: Uint8Array;
  proof_upgrade: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelUpgradeAckResponse defines MsgChannelUpgradeAck response type */
export interface MsgChannelUpgradeAckResponse {
  result: ResponseResultType;
}
/** MsgChannelUpgradeAckResponse defines MsgChannelUpgradeAck response type */
export interface MsgChannelUpgradeAckResponseSDKType {
  result: ResponseResultType;
}
/** MsgChannelUpgradeConfirm defines the request type for the ChannelUpgradeConfirm rpc */
export interface MsgChannelUpgradeConfirm {
  portId: string;
  channelId: string;
  counterpartyChannelState: State;
  counterpartyUpgrade?: Upgrade;
  proofChannel: Uint8Array;
  proofUpgrade: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgChannelUpgradeConfirm defines the request type for the ChannelUpgradeConfirm rpc */
export interface MsgChannelUpgradeConfirmSDKType {
  port_id: string;
  channel_id: string;
  counterparty_channel_state: State;
  counterparty_upgrade?: UpgradeSDKType;
  proof_channel: Uint8Array;
  proof_upgrade: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelUpgradeConfirmResponse defines MsgChannelUpgradeConfirm response type */
export interface MsgChannelUpgradeConfirmResponse {
  result: ResponseResultType;
}
/** MsgChannelUpgradeConfirmResponse defines MsgChannelUpgradeConfirm response type */
export interface MsgChannelUpgradeConfirmResponseSDKType {
  result: ResponseResultType;
}
/** MsgChannelUpgradeOpen defines the request type for the ChannelUpgradeOpen rpc */
export interface MsgChannelUpgradeOpen {
  portId: string;
  channelId: string;
  counterpartyChannelState: State;
  counterpartyUpgradeSequence: Long;
  proofChannel: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgChannelUpgradeOpen defines the request type for the ChannelUpgradeOpen rpc */
export interface MsgChannelUpgradeOpenSDKType {
  port_id: string;
  channel_id: string;
  counterparty_channel_state: State;
  counterparty_upgrade_sequence: Long;
  proof_channel: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelUpgradeOpenResponse defines the MsgChannelUpgradeOpen response type */
export interface MsgChannelUpgradeOpenResponse {}
/** MsgChannelUpgradeOpenResponse defines the MsgChannelUpgradeOpen response type */
export interface MsgChannelUpgradeOpenResponseSDKType {}
/** MsgChannelUpgradeTimeout defines the request type for the ChannelUpgradeTimeout rpc */
export interface MsgChannelUpgradeTimeout {
  portId: string;
  channelId: string;
  counterpartyChannel?: Channel;
  proofChannel: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgChannelUpgradeTimeout defines the request type for the ChannelUpgradeTimeout rpc */
export interface MsgChannelUpgradeTimeoutSDKType {
  port_id: string;
  channel_id: string;
  counterparty_channel?: ChannelSDKType;
  proof_channel: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelUpgradeTimeoutRepsonse defines the MsgChannelUpgradeTimeout response type */
export interface MsgChannelUpgradeTimeoutResponse {}
/** MsgChannelUpgradeTimeoutRepsonse defines the MsgChannelUpgradeTimeout response type */
export interface MsgChannelUpgradeTimeoutResponseSDKType {}
/** MsgChannelUpgradeCancel defines the request type for the ChannelUpgradeCancel rpc */
export interface MsgChannelUpgradeCancel {
  portId: string;
  channelId: string;
  errorReceipt?: ErrorReceipt;
  proofErrorReceipt: Uint8Array;
  proofHeight?: Height;
  signer: string;
}
/** MsgChannelUpgradeCancel defines the request type for the ChannelUpgradeCancel rpc */
export interface MsgChannelUpgradeCancelSDKType {
  port_id: string;
  channel_id: string;
  error_receipt?: ErrorReceiptSDKType;
  proof_error_receipt: Uint8Array;
  proof_height?: HeightSDKType;
  signer: string;
}
/** MsgChannelUpgradeCancelResponse defines the MsgChannelUpgradeCancel response type */
export interface MsgChannelUpgradeCancelResponse {}
/** MsgChannelUpgradeCancelResponse defines the MsgChannelUpgradeCancel response type */
export interface MsgChannelUpgradeCancelResponseSDKType {}
/** MsgUpdateParams is the MsgUpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the channel parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}
/** MsgUpdateParams is the MsgUpdateParams request type. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params?: ParamsSDKType;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponseSDKType {}
/** MsgPruneAcknowledgements defines the request type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgements {
  portId: string;
  channelId: string;
  limit: Long;
  signer: string;
}
/** MsgPruneAcknowledgements defines the request type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgementsSDKType {
  port_id: string;
  channel_id: string;
  limit: Long;
  signer: string;
}
/** MsgPruneAcknowledgementsResponse defines the response type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgementsResponse {
  /** Number of sequences pruned (includes both packet acknowledgements and packet receipts where appropriate). */
  totalPrunedSequences: Long;
  /** Number of sequences left after pruning. */
  totalRemainingSequences: Long;
}
/** MsgPruneAcknowledgementsResponse defines the response type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgementsResponseSDKType {
  total_pruned_sequences: Long;
  total_remaining_sequences: Long;
}
function createBaseMsgChannelOpenInit(): MsgChannelOpenInit {
  return {
    portId: "",
    channel: undefined,
    signer: ""
  };
}
export const MsgChannelOpenInit = {
  encode(message: MsgChannelOpenInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelOpenInit {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelOpenInit): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channel !== undefined && (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelOpenInit>): MsgChannelOpenInit {
    const message = createBaseMsgChannelOpenInit();
    message.portId = object.portId ?? "";
    message.channel = object.channel !== undefined && object.channel !== null ? Channel.fromPartial(object.channel) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelOpenInitResponse(): MsgChannelOpenInitResponse {
  return {
    channelId: "",
    version: ""
  };
}
export const MsgChannelOpenInitResponse = {
  encode(message: MsgChannelOpenInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelOpenInitResponse {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      version: isSet(object.version) ? String(object.version) : ""
    };
  },
  toJSON(message: MsgChannelOpenInitResponse): unknown {
    const obj: any = {};
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelOpenInitResponse>): MsgChannelOpenInitResponse {
    const message = createBaseMsgChannelOpenInitResponse();
    message.channelId = object.channelId ?? "";
    message.version = object.version ?? "";
    return message;
  }
};
function createBaseMsgChannelOpenTry(): MsgChannelOpenTry {
  return {
    portId: "",
    previousChannelId: "",
    channel: undefined,
    counterpartyVersion: "",
    proofInit: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelOpenTry = {
  encode(message: MsgChannelOpenTry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.previousChannelId !== "") {
      writer.uint32(18).string(message.previousChannelId);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(26).fork()).ldelim();
    }
    if (message.counterpartyVersion !== "") {
      writer.uint32(34).string(message.counterpartyVersion);
    }
    if (message.proofInit.length !== 0) {
      writer.uint32(42).bytes(message.proofInit);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenTry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenTry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.previousChannelId = reader.string();
          break;
        case 3:
          message.channel = Channel.decode(reader, reader.uint32());
          break;
        case 4:
          message.counterpartyVersion = reader.string();
          break;
        case 5:
          message.proofInit = reader.bytes();
          break;
        case 6:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelOpenTry {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      previousChannelId: isSet(object.previousChannelId) ? String(object.previousChannelId) : "",
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
      counterpartyVersion: isSet(object.counterpartyVersion) ? String(object.counterpartyVersion) : "",
      proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelOpenTry): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.previousChannelId !== undefined && (obj.previousChannelId = message.previousChannelId);
    message.channel !== undefined && (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
    message.counterpartyVersion !== undefined && (obj.counterpartyVersion = message.counterpartyVersion);
    message.proofInit !== undefined && (obj.proofInit = base64FromBytes(message.proofInit !== undefined ? message.proofInit : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelOpenTry>): MsgChannelOpenTry {
    const message = createBaseMsgChannelOpenTry();
    message.portId = object.portId ?? "";
    message.previousChannelId = object.previousChannelId ?? "";
    message.channel = object.channel !== undefined && object.channel !== null ? Channel.fromPartial(object.channel) : undefined;
    message.counterpartyVersion = object.counterpartyVersion ?? "";
    message.proofInit = object.proofInit ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelOpenTryResponse(): MsgChannelOpenTryResponse {
  return {
    version: "",
    channelId: ""
  };
}
export const MsgChannelOpenTryResponse = {
  encode(message: MsgChannelOpenTryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenTryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenTryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelOpenTryResponse {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : ""
    };
  },
  toJSON(message: MsgChannelOpenTryResponse): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelOpenTryResponse>): MsgChannelOpenTryResponse {
    const message = createBaseMsgChannelOpenTryResponse();
    message.version = object.version ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  }
};
function createBaseMsgChannelOpenAck(): MsgChannelOpenAck {
  return {
    portId: "",
    channelId: "",
    counterpartyChannelId: "",
    counterpartyVersion: "",
    proofTry: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelOpenAck = {
  encode(message: MsgChannelOpenAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannelId !== "") {
      writer.uint32(26).string(message.counterpartyChannelId);
    }
    if (message.counterpartyVersion !== "") {
      writer.uint32(34).string(message.counterpartyVersion);
    }
    if (message.proofTry.length !== 0) {
      writer.uint32(42).bytes(message.proofTry);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.counterpartyChannelId = reader.string();
          break;
        case 4:
          message.counterpartyVersion = reader.string();
          break;
        case 5:
          message.proofTry = reader.bytes();
          break;
        case 6:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelOpenAck {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannelId: isSet(object.counterpartyChannelId) ? String(object.counterpartyChannelId) : "",
      counterpartyVersion: isSet(object.counterpartyVersion) ? String(object.counterpartyVersion) : "",
      proofTry: isSet(object.proofTry) ? bytesFromBase64(object.proofTry) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelOpenAck): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.counterpartyChannelId !== undefined && (obj.counterpartyChannelId = message.counterpartyChannelId);
    message.counterpartyVersion !== undefined && (obj.counterpartyVersion = message.counterpartyVersion);
    message.proofTry !== undefined && (obj.proofTry = base64FromBytes(message.proofTry !== undefined ? message.proofTry : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelOpenAck>): MsgChannelOpenAck {
    const message = createBaseMsgChannelOpenAck();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannelId = object.counterpartyChannelId ?? "";
    message.counterpartyVersion = object.counterpartyVersion ?? "";
    message.proofTry = object.proofTry ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelOpenAckResponse(): MsgChannelOpenAckResponse {
  return {};
}
export const MsgChannelOpenAckResponse = {
  encode(_: MsgChannelOpenAckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenAckResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgChannelOpenAckResponse {
    return {};
  },
  toJSON(_: MsgChannelOpenAckResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgChannelOpenAckResponse>): MsgChannelOpenAckResponse {
    const message = createBaseMsgChannelOpenAckResponse();
    return message;
  }
};
function createBaseMsgChannelOpenConfirm(): MsgChannelOpenConfirm {
  return {
    portId: "",
    channelId: "",
    proofAck: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelOpenConfirm = {
  encode(message: MsgChannelOpenConfirm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.proofAck.length !== 0) {
      writer.uint32(26).bytes(message.proofAck);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.proofAck = reader.bytes();
          break;
        case 4:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelOpenConfirm {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      proofAck: isSet(object.proofAck) ? bytesFromBase64(object.proofAck) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelOpenConfirm): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.proofAck !== undefined && (obj.proofAck = base64FromBytes(message.proofAck !== undefined ? message.proofAck : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelOpenConfirm>): MsgChannelOpenConfirm {
    const message = createBaseMsgChannelOpenConfirm();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.proofAck = object.proofAck ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelOpenConfirmResponse(): MsgChannelOpenConfirmResponse {
  return {};
}
export const MsgChannelOpenConfirmResponse = {
  encode(_: MsgChannelOpenConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgChannelOpenConfirmResponse {
    return {};
  },
  toJSON(_: MsgChannelOpenConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgChannelOpenConfirmResponse>): MsgChannelOpenConfirmResponse {
    const message = createBaseMsgChannelOpenConfirmResponse();
    return message;
  }
};
function createBaseMsgChannelCloseInit(): MsgChannelCloseInit {
  return {
    portId: "",
    channelId: "",
    signer: ""
  };
}
export const MsgChannelCloseInit = {
  encode(message: MsgChannelCloseInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelCloseInit {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelCloseInit): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelCloseInit>): MsgChannelCloseInit {
    const message = createBaseMsgChannelCloseInit();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelCloseInitResponse(): MsgChannelCloseInitResponse {
  return {};
}
export const MsgChannelCloseInitResponse = {
  encode(_: MsgChannelCloseInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseInitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgChannelCloseInitResponse {
    return {};
  },
  toJSON(_: MsgChannelCloseInitResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgChannelCloseInitResponse>): MsgChannelCloseInitResponse {
    const message = createBaseMsgChannelCloseInitResponse();
    return message;
  }
};
function createBaseMsgChannelCloseConfirm(): MsgChannelCloseConfirm {
  return {
    portId: "",
    channelId: "",
    proofInit: new Uint8Array(),
    proofHeight: undefined,
    signer: "",
    counterpartyUpgradeSequence: Long.UZERO
  };
}
export const MsgChannelCloseConfirm = {
  encode(message: MsgChannelCloseConfirm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.proofInit.length !== 0) {
      writer.uint32(26).bytes(message.proofInit);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    if (!message.counterpartyUpgradeSequence.isZero()) {
      writer.uint32(48).uint64(message.counterpartyUpgradeSequence);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.proofInit = reader.bytes();
          break;
        case 4:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.signer = reader.string();
          break;
        case 6:
          message.counterpartyUpgradeSequence = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelCloseConfirm {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence) ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO
    };
  },
  toJSON(message: MsgChannelCloseConfirm): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.proofInit !== undefined && (obj.proofInit = base64FromBytes(message.proofInit !== undefined ? message.proofInit : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    message.counterpartyUpgradeSequence !== undefined && (obj.counterpartyUpgradeSequence = (message.counterpartyUpgradeSequence || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgChannelCloseConfirm>): MsgChannelCloseConfirm {
    const message = createBaseMsgChannelCloseConfirm();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.proofInit = object.proofInit ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence !== undefined && object.counterpartyUpgradeSequence !== null ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO;
    return message;
  }
};
function createBaseMsgChannelCloseConfirmResponse(): MsgChannelCloseConfirmResponse {
  return {};
}
export const MsgChannelCloseConfirmResponse = {
  encode(_: MsgChannelCloseConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgChannelCloseConfirmResponse {
    return {};
  },
  toJSON(_: MsgChannelCloseConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgChannelCloseConfirmResponse>): MsgChannelCloseConfirmResponse {
    const message = createBaseMsgChannelCloseConfirmResponse();
    return message;
  }
};
function createBaseMsgRecvPacket(): MsgRecvPacket {
  return {
    packet: undefined,
    proofCommitment: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgRecvPacket = {
  encode(message: MsgRecvPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proofCommitment.length !== 0) {
      writer.uint32(18).bytes(message.proofCommitment);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecvPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecvPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.proofCommitment = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 4:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRecvPacket {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proofCommitment: isSet(object.proofCommitment) ? bytesFromBase64(object.proofCommitment) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgRecvPacket): unknown {
    const obj: any = {};
    message.packet !== undefined && (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.proofCommitment !== undefined && (obj.proofCommitment = base64FromBytes(message.proofCommitment !== undefined ? message.proofCommitment : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgRecvPacket>): MsgRecvPacket {
    const message = createBaseMsgRecvPacket();
    message.packet = object.packet !== undefined && object.packet !== null ? Packet.fromPartial(object.packet) : undefined;
    message.proofCommitment = object.proofCommitment ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgRecvPacketResponse(): MsgRecvPacketResponse {
  return {
    result: 0
  };
}
export const MsgRecvPacketResponse = {
  encode(message: MsgRecvPacketResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecvPacketResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecvPacketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRecvPacketResponse {
    return {
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0
    };
  },
  toJSON(message: MsgRecvPacketResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },
  fromPartial(object: Partial<MsgRecvPacketResponse>): MsgRecvPacketResponse {
    const message = createBaseMsgRecvPacketResponse();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseMsgTimeout(): MsgTimeout {
  return {
    packet: undefined,
    proofUnreceived: new Uint8Array(),
    proofHeight: undefined,
    nextSequenceRecv: Long.UZERO,
    signer: ""
  };
}
export const MsgTimeout = {
  encode(message: MsgTimeout, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proofUnreceived.length !== 0) {
      writer.uint32(18).bytes(message.proofUnreceived);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    if (!message.nextSequenceRecv.isZero()) {
      writer.uint32(32).uint64(message.nextSequenceRecv);
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeout {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.proofUnreceived = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 4:
          message.nextSequenceRecv = (reader.uint64() as Long);
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgTimeout {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proofUnreceived: isSet(object.proofUnreceived) ? bytesFromBase64(object.proofUnreceived) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      nextSequenceRecv: isSet(object.nextSequenceRecv) ? Long.fromValue(object.nextSequenceRecv) : Long.UZERO,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgTimeout): unknown {
    const obj: any = {};
    message.packet !== undefined && (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.proofUnreceived !== undefined && (obj.proofUnreceived = base64FromBytes(message.proofUnreceived !== undefined ? message.proofUnreceived : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.nextSequenceRecv !== undefined && (obj.nextSequenceRecv = (message.nextSequenceRecv || Long.UZERO).toString());
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgTimeout>): MsgTimeout {
    const message = createBaseMsgTimeout();
    message.packet = object.packet !== undefined && object.packet !== null ? Packet.fromPartial(object.packet) : undefined;
    message.proofUnreceived = object.proofUnreceived ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.nextSequenceRecv = object.nextSequenceRecv !== undefined && object.nextSequenceRecv !== null ? Long.fromValue(object.nextSequenceRecv) : Long.UZERO;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgTimeoutResponse(): MsgTimeoutResponse {
  return {
    result: 0
  };
}
export const MsgTimeoutResponse = {
  encode(message: MsgTimeoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgTimeoutResponse {
    return {
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0
    };
  },
  toJSON(message: MsgTimeoutResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },
  fromPartial(object: Partial<MsgTimeoutResponse>): MsgTimeoutResponse {
    const message = createBaseMsgTimeoutResponse();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseMsgTimeoutOnClose(): MsgTimeoutOnClose {
  return {
    packet: undefined,
    proofUnreceived: new Uint8Array(),
    proofClose: new Uint8Array(),
    proofHeight: undefined,
    nextSequenceRecv: Long.UZERO,
    signer: "",
    counterpartyUpgradeSequence: Long.UZERO
  };
}
export const MsgTimeoutOnClose = {
  encode(message: MsgTimeoutOnClose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proofUnreceived.length !== 0) {
      writer.uint32(18).bytes(message.proofUnreceived);
    }
    if (message.proofClose.length !== 0) {
      writer.uint32(26).bytes(message.proofClose);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (!message.nextSequenceRecv.isZero()) {
      writer.uint32(40).uint64(message.nextSequenceRecv);
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    if (!message.counterpartyUpgradeSequence.isZero()) {
      writer.uint32(56).uint64(message.counterpartyUpgradeSequence);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutOnClose {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutOnClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.proofUnreceived = reader.bytes();
          break;
        case 3:
          message.proofClose = reader.bytes();
          break;
        case 4:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.nextSequenceRecv = (reader.uint64() as Long);
          break;
        case 6:
          message.signer = reader.string();
          break;
        case 7:
          message.counterpartyUpgradeSequence = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgTimeoutOnClose {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proofUnreceived: isSet(object.proofUnreceived) ? bytesFromBase64(object.proofUnreceived) : new Uint8Array(),
      proofClose: isSet(object.proofClose) ? bytesFromBase64(object.proofClose) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      nextSequenceRecv: isSet(object.nextSequenceRecv) ? Long.fromValue(object.nextSequenceRecv) : Long.UZERO,
      signer: isSet(object.signer) ? String(object.signer) : "",
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence) ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO
    };
  },
  toJSON(message: MsgTimeoutOnClose): unknown {
    const obj: any = {};
    message.packet !== undefined && (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.proofUnreceived !== undefined && (obj.proofUnreceived = base64FromBytes(message.proofUnreceived !== undefined ? message.proofUnreceived : new Uint8Array()));
    message.proofClose !== undefined && (obj.proofClose = base64FromBytes(message.proofClose !== undefined ? message.proofClose : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.nextSequenceRecv !== undefined && (obj.nextSequenceRecv = (message.nextSequenceRecv || Long.UZERO).toString());
    message.signer !== undefined && (obj.signer = message.signer);
    message.counterpartyUpgradeSequence !== undefined && (obj.counterpartyUpgradeSequence = (message.counterpartyUpgradeSequence || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgTimeoutOnClose>): MsgTimeoutOnClose {
    const message = createBaseMsgTimeoutOnClose();
    message.packet = object.packet !== undefined && object.packet !== null ? Packet.fromPartial(object.packet) : undefined;
    message.proofUnreceived = object.proofUnreceived ?? new Uint8Array();
    message.proofClose = object.proofClose ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.nextSequenceRecv = object.nextSequenceRecv !== undefined && object.nextSequenceRecv !== null ? Long.fromValue(object.nextSequenceRecv) : Long.UZERO;
    message.signer = object.signer ?? "";
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence !== undefined && object.counterpartyUpgradeSequence !== null ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO;
    return message;
  }
};
function createBaseMsgTimeoutOnCloseResponse(): MsgTimeoutOnCloseResponse {
  return {
    result: 0
  };
}
export const MsgTimeoutOnCloseResponse = {
  encode(message: MsgTimeoutOnCloseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutOnCloseResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutOnCloseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgTimeoutOnCloseResponse {
    return {
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0
    };
  },
  toJSON(message: MsgTimeoutOnCloseResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },
  fromPartial(object: Partial<MsgTimeoutOnCloseResponse>): MsgTimeoutOnCloseResponse {
    const message = createBaseMsgTimeoutOnCloseResponse();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseMsgAcknowledgement(): MsgAcknowledgement {
  return {
    packet: undefined,
    acknowledgement: new Uint8Array(),
    proofAcked: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgAcknowledgement = {
  encode(message: MsgAcknowledgement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.acknowledgement.length !== 0) {
      writer.uint32(18).bytes(message.acknowledgement);
    }
    if (message.proofAcked.length !== 0) {
      writer.uint32(26).bytes(message.proofAcked);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcknowledgement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packet = Packet.decode(reader, reader.uint32());
          break;
        case 2:
          message.acknowledgement = reader.bytes();
          break;
        case 3:
          message.proofAcked = reader.bytes();
          break;
        case 4:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAcknowledgement {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      acknowledgement: isSet(object.acknowledgement) ? bytesFromBase64(object.acknowledgement) : new Uint8Array(),
      proofAcked: isSet(object.proofAcked) ? bytesFromBase64(object.proofAcked) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgAcknowledgement): unknown {
    const obj: any = {};
    message.packet !== undefined && (obj.packet = message.packet ? Packet.toJSON(message.packet) : undefined);
    message.acknowledgement !== undefined && (obj.acknowledgement = base64FromBytes(message.acknowledgement !== undefined ? message.acknowledgement : new Uint8Array()));
    message.proofAcked !== undefined && (obj.proofAcked = base64FromBytes(message.proofAcked !== undefined ? message.proofAcked : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgAcknowledgement>): MsgAcknowledgement {
    const message = createBaseMsgAcknowledgement();
    message.packet = object.packet !== undefined && object.packet !== null ? Packet.fromPartial(object.packet) : undefined;
    message.acknowledgement = object.acknowledgement ?? new Uint8Array();
    message.proofAcked = object.proofAcked ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgAcknowledgementResponse(): MsgAcknowledgementResponse {
  return {
    result: 0
  };
}
export const MsgAcknowledgementResponse = {
  encode(message: MsgAcknowledgementResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcknowledgementResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAcknowledgementResponse {
    return {
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0
    };
  },
  toJSON(message: MsgAcknowledgementResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },
  fromPartial(object: Partial<MsgAcknowledgementResponse>): MsgAcknowledgementResponse {
    const message = createBaseMsgAcknowledgementResponse();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseMsgChannelUpgradeInit(): MsgChannelUpgradeInit {
  return {
    portId: "",
    channelId: "",
    fields: undefined,
    signer: ""
  };
}
export const MsgChannelUpgradeInit = {
  encode(message: MsgChannelUpgradeInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.fields !== undefined) {
      UpgradeFields.encode(message.fields, writer.uint32(26).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeInit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.fields = UpgradeFields.decode(reader, reader.uint32());
          break;
        case 4:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeInit {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      fields: isSet(object.fields) ? UpgradeFields.fromJSON(object.fields) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelUpgradeInit): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.fields !== undefined && (obj.fields = message.fields ? UpgradeFields.toJSON(message.fields) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeInit>): MsgChannelUpgradeInit {
    const message = createBaseMsgChannelUpgradeInit();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.fields = object.fields !== undefined && object.fields !== null ? UpgradeFields.fromPartial(object.fields) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelUpgradeInitResponse(): MsgChannelUpgradeInitResponse {
  return {
    upgrade: undefined,
    upgradeSequence: Long.UZERO
  };
}
export const MsgChannelUpgradeInitResponse = {
  encode(message: MsgChannelUpgradeInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgrade !== undefined) {
      Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
    }
    if (!message.upgradeSequence.isZero()) {
      writer.uint32(16).uint64(message.upgradeSequence);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeInitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgrade = Upgrade.decode(reader, reader.uint32());
          break;
        case 2:
          message.upgradeSequence = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeInitResponse {
    return {
      upgrade: isSet(object.upgrade) ? Upgrade.fromJSON(object.upgrade) : undefined,
      upgradeSequence: isSet(object.upgradeSequence) ? Long.fromValue(object.upgradeSequence) : Long.UZERO
    };
  },
  toJSON(message: MsgChannelUpgradeInitResponse): unknown {
    const obj: any = {};
    message.upgrade !== undefined && (obj.upgrade = message.upgrade ? Upgrade.toJSON(message.upgrade) : undefined);
    message.upgradeSequence !== undefined && (obj.upgradeSequence = (message.upgradeSequence || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeInitResponse>): MsgChannelUpgradeInitResponse {
    const message = createBaseMsgChannelUpgradeInitResponse();
    message.upgrade = object.upgrade !== undefined && object.upgrade !== null ? Upgrade.fromPartial(object.upgrade) : undefined;
    message.upgradeSequence = object.upgradeSequence !== undefined && object.upgradeSequence !== null ? Long.fromValue(object.upgradeSequence) : Long.UZERO;
    return message;
  }
};
function createBaseMsgChannelUpgradeTry(): MsgChannelUpgradeTry {
  return {
    portId: "",
    channelId: "",
    proposedUpgradeConnectionHops: [],
    counterpartyUpgradeFields: undefined,
    counterpartyUpgradeSequence: Long.UZERO,
    proofChannel: new Uint8Array(),
    proofUpgrade: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelUpgradeTry = {
  encode(message: MsgChannelUpgradeTry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    for (const v of message.proposedUpgradeConnectionHops) {
      writer.uint32(26).string(v!);
    }
    if (message.counterpartyUpgradeFields !== undefined) {
      UpgradeFields.encode(message.counterpartyUpgradeFields, writer.uint32(34).fork()).ldelim();
    }
    if (!message.counterpartyUpgradeSequence.isZero()) {
      writer.uint32(40).uint64(message.counterpartyUpgradeSequence);
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(50).bytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      writer.uint32(58).bytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(66).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(74).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.proposedUpgradeConnectionHops.push(reader.string());
          break;
        case 4:
          message.counterpartyUpgradeFields = UpgradeFields.decode(reader, reader.uint32());
          break;
        case 5:
          message.counterpartyUpgradeSequence = (reader.uint64() as Long);
          break;
        case 6:
          message.proofChannel = reader.bytes();
          break;
        case 7:
          message.proofUpgrade = reader.bytes();
          break;
        case 8:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 9:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeTry {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      proposedUpgradeConnectionHops: Array.isArray(object?.proposedUpgradeConnectionHops) ? object.proposedUpgradeConnectionHops.map((e: any) => String(e)) : [],
      counterpartyUpgradeFields: isSet(object.counterpartyUpgradeFields) ? UpgradeFields.fromJSON(object.counterpartyUpgradeFields) : undefined,
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence) ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(),
      proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelUpgradeTry): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    if (message.proposedUpgradeConnectionHops) {
      obj.proposedUpgradeConnectionHops = message.proposedUpgradeConnectionHops.map(e => e);
    } else {
      obj.proposedUpgradeConnectionHops = [];
    }
    message.counterpartyUpgradeFields !== undefined && (obj.counterpartyUpgradeFields = message.counterpartyUpgradeFields ? UpgradeFields.toJSON(message.counterpartyUpgradeFields) : undefined);
    message.counterpartyUpgradeSequence !== undefined && (obj.counterpartyUpgradeSequence = (message.counterpartyUpgradeSequence || Long.UZERO).toString());
    message.proofChannel !== undefined && (obj.proofChannel = base64FromBytes(message.proofChannel !== undefined ? message.proofChannel : new Uint8Array()));
    message.proofUpgrade !== undefined && (obj.proofUpgrade = base64FromBytes(message.proofUpgrade !== undefined ? message.proofUpgrade : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeTry>): MsgChannelUpgradeTry {
    const message = createBaseMsgChannelUpgradeTry();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.proposedUpgradeConnectionHops = object.proposedUpgradeConnectionHops?.map(e => e) || [];
    message.counterpartyUpgradeFields = object.counterpartyUpgradeFields !== undefined && object.counterpartyUpgradeFields !== null ? UpgradeFields.fromPartial(object.counterpartyUpgradeFields) : undefined;
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence !== undefined && object.counterpartyUpgradeSequence !== null ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO;
    message.proofChannel = object.proofChannel ?? new Uint8Array();
    message.proofUpgrade = object.proofUpgrade ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelUpgradeTryResponse(): MsgChannelUpgradeTryResponse {
  return {
    upgrade: undefined,
    upgradeSequence: Long.UZERO,
    result: 0
  };
}
export const MsgChannelUpgradeTryResponse = {
  encode(message: MsgChannelUpgradeTryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgrade !== undefined) {
      Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
    }
    if (!message.upgradeSequence.isZero()) {
      writer.uint32(16).uint64(message.upgradeSequence);
    }
    if (message.result !== 0) {
      writer.uint32(24).int32(message.result);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTryResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgrade = Upgrade.decode(reader, reader.uint32());
          break;
        case 2:
          message.upgradeSequence = (reader.uint64() as Long);
          break;
        case 3:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeTryResponse {
    return {
      upgrade: isSet(object.upgrade) ? Upgrade.fromJSON(object.upgrade) : undefined,
      upgradeSequence: isSet(object.upgradeSequence) ? Long.fromValue(object.upgradeSequence) : Long.UZERO,
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0
    };
  },
  toJSON(message: MsgChannelUpgradeTryResponse): unknown {
    const obj: any = {};
    message.upgrade !== undefined && (obj.upgrade = message.upgrade ? Upgrade.toJSON(message.upgrade) : undefined);
    message.upgradeSequence !== undefined && (obj.upgradeSequence = (message.upgradeSequence || Long.UZERO).toString());
    message.result !== undefined && (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeTryResponse>): MsgChannelUpgradeTryResponse {
    const message = createBaseMsgChannelUpgradeTryResponse();
    message.upgrade = object.upgrade !== undefined && object.upgrade !== null ? Upgrade.fromPartial(object.upgrade) : undefined;
    message.upgradeSequence = object.upgradeSequence !== undefined && object.upgradeSequence !== null ? Long.fromValue(object.upgradeSequence) : Long.UZERO;
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseMsgChannelUpgradeAck(): MsgChannelUpgradeAck {
  return {
    portId: "",
    channelId: "",
    counterpartyUpgrade: undefined,
    proofChannel: new Uint8Array(),
    proofUpgrade: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelUpgradeAck = {
  encode(message: MsgChannelUpgradeAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyUpgrade !== undefined) {
      Upgrade.encode(message.counterpartyUpgrade, writer.uint32(26).fork()).ldelim();
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(34).bytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      writer.uint32(42).bytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeAck {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.counterpartyUpgrade = Upgrade.decode(reader, reader.uint32());
          break;
        case 4:
          message.proofChannel = reader.bytes();
          break;
        case 5:
          message.proofUpgrade = reader.bytes();
          break;
        case 6:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeAck {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyUpgrade: isSet(object.counterpartyUpgrade) ? Upgrade.fromJSON(object.counterpartyUpgrade) : undefined,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(),
      proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelUpgradeAck): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.counterpartyUpgrade !== undefined && (obj.counterpartyUpgrade = message.counterpartyUpgrade ? Upgrade.toJSON(message.counterpartyUpgrade) : undefined);
    message.proofChannel !== undefined && (obj.proofChannel = base64FromBytes(message.proofChannel !== undefined ? message.proofChannel : new Uint8Array()));
    message.proofUpgrade !== undefined && (obj.proofUpgrade = base64FromBytes(message.proofUpgrade !== undefined ? message.proofUpgrade : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeAck>): MsgChannelUpgradeAck {
    const message = createBaseMsgChannelUpgradeAck();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyUpgrade = object.counterpartyUpgrade !== undefined && object.counterpartyUpgrade !== null ? Upgrade.fromPartial(object.counterpartyUpgrade) : undefined;
    message.proofChannel = object.proofChannel ?? new Uint8Array();
    message.proofUpgrade = object.proofUpgrade ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelUpgradeAckResponse(): MsgChannelUpgradeAckResponse {
  return {
    result: 0
  };
}
export const MsgChannelUpgradeAckResponse = {
  encode(message: MsgChannelUpgradeAckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeAckResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeAckResponse {
    return {
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0
    };
  },
  toJSON(message: MsgChannelUpgradeAckResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeAckResponse>): MsgChannelUpgradeAckResponse {
    const message = createBaseMsgChannelUpgradeAckResponse();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseMsgChannelUpgradeConfirm(): MsgChannelUpgradeConfirm {
  return {
    portId: "",
    channelId: "",
    counterpartyChannelState: 0,
    counterpartyUpgrade: undefined,
    proofChannel: new Uint8Array(),
    proofUpgrade: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelUpgradeConfirm = {
  encode(message: MsgChannelUpgradeConfirm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannelState !== 0) {
      writer.uint32(24).int32(message.counterpartyChannelState);
    }
    if (message.counterpartyUpgrade !== undefined) {
      Upgrade.encode(message.counterpartyUpgrade, writer.uint32(34).fork()).ldelim();
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(42).bytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      writer.uint32(50).bytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(58).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(66).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeConfirm {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.counterpartyChannelState = (reader.int32() as any);
          break;
        case 4:
          message.counterpartyUpgrade = Upgrade.decode(reader, reader.uint32());
          break;
        case 5:
          message.proofChannel = reader.bytes();
          break;
        case 6:
          message.proofUpgrade = reader.bytes();
          break;
        case 7:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 8:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeConfirm {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannelState: isSet(object.counterpartyChannelState) ? stateFromJSON(object.counterpartyChannelState) : 0,
      counterpartyUpgrade: isSet(object.counterpartyUpgrade) ? Upgrade.fromJSON(object.counterpartyUpgrade) : undefined,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(),
      proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelUpgradeConfirm): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.counterpartyChannelState !== undefined && (obj.counterpartyChannelState = stateToJSON(message.counterpartyChannelState));
    message.counterpartyUpgrade !== undefined && (obj.counterpartyUpgrade = message.counterpartyUpgrade ? Upgrade.toJSON(message.counterpartyUpgrade) : undefined);
    message.proofChannel !== undefined && (obj.proofChannel = base64FromBytes(message.proofChannel !== undefined ? message.proofChannel : new Uint8Array()));
    message.proofUpgrade !== undefined && (obj.proofUpgrade = base64FromBytes(message.proofUpgrade !== undefined ? message.proofUpgrade : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeConfirm>): MsgChannelUpgradeConfirm {
    const message = createBaseMsgChannelUpgradeConfirm();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannelState = object.counterpartyChannelState ?? 0;
    message.counterpartyUpgrade = object.counterpartyUpgrade !== undefined && object.counterpartyUpgrade !== null ? Upgrade.fromPartial(object.counterpartyUpgrade) : undefined;
    message.proofChannel = object.proofChannel ?? new Uint8Array();
    message.proofUpgrade = object.proofUpgrade ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelUpgradeConfirmResponse(): MsgChannelUpgradeConfirmResponse {
  return {
    result: 0
  };
}
export const MsgChannelUpgradeConfirmResponse = {
  encode(message: MsgChannelUpgradeConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeConfirmResponse {
    return {
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0
    };
  },
  toJSON(message: MsgChannelUpgradeConfirmResponse): unknown {
    const obj: any = {};
    message.result !== undefined && (obj.result = responseResultTypeToJSON(message.result));
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeConfirmResponse>): MsgChannelUpgradeConfirmResponse {
    const message = createBaseMsgChannelUpgradeConfirmResponse();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseMsgChannelUpgradeOpen(): MsgChannelUpgradeOpen {
  return {
    portId: "",
    channelId: "",
    counterpartyChannelState: 0,
    counterpartyUpgradeSequence: Long.UZERO,
    proofChannel: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelUpgradeOpen = {
  encode(message: MsgChannelUpgradeOpen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannelState !== 0) {
      writer.uint32(24).int32(message.counterpartyChannelState);
    }
    if (!message.counterpartyUpgradeSequence.isZero()) {
      writer.uint32(32).uint64(message.counterpartyUpgradeSequence);
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(42).bytes(message.proofChannel);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeOpen {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeOpen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.counterpartyChannelState = (reader.int32() as any);
          break;
        case 4:
          message.counterpartyUpgradeSequence = (reader.uint64() as Long);
          break;
        case 5:
          message.proofChannel = reader.bytes();
          break;
        case 6:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeOpen {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannelState: isSet(object.counterpartyChannelState) ? stateFromJSON(object.counterpartyChannelState) : 0,
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence) ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelUpgradeOpen): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.counterpartyChannelState !== undefined && (obj.counterpartyChannelState = stateToJSON(message.counterpartyChannelState));
    message.counterpartyUpgradeSequence !== undefined && (obj.counterpartyUpgradeSequence = (message.counterpartyUpgradeSequence || Long.UZERO).toString());
    message.proofChannel !== undefined && (obj.proofChannel = base64FromBytes(message.proofChannel !== undefined ? message.proofChannel : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeOpen>): MsgChannelUpgradeOpen {
    const message = createBaseMsgChannelUpgradeOpen();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannelState = object.counterpartyChannelState ?? 0;
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence !== undefined && object.counterpartyUpgradeSequence !== null ? Long.fromValue(object.counterpartyUpgradeSequence) : Long.UZERO;
    message.proofChannel = object.proofChannel ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelUpgradeOpenResponse(): MsgChannelUpgradeOpenResponse {
  return {};
}
export const MsgChannelUpgradeOpenResponse = {
  encode(_: MsgChannelUpgradeOpenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeOpenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeOpenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgChannelUpgradeOpenResponse {
    return {};
  },
  toJSON(_: MsgChannelUpgradeOpenResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgChannelUpgradeOpenResponse>): MsgChannelUpgradeOpenResponse {
    const message = createBaseMsgChannelUpgradeOpenResponse();
    return message;
  }
};
function createBaseMsgChannelUpgradeTimeout(): MsgChannelUpgradeTimeout {
  return {
    portId: "",
    channelId: "",
    counterpartyChannel: undefined,
    proofChannel: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelUpgradeTimeout = {
  encode(message: MsgChannelUpgradeTimeout, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannel !== undefined) {
      Channel.encode(message.counterpartyChannel, writer.uint32(26).fork()).ldelim();
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(34).bytes(message.proofChannel);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTimeout {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.counterpartyChannel = Channel.decode(reader, reader.uint32());
          break;
        case 4:
          message.proofChannel = reader.bytes();
          break;
        case 5:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 6:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeTimeout {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannel: isSet(object.counterpartyChannel) ? Channel.fromJSON(object.counterpartyChannel) : undefined,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelUpgradeTimeout): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.counterpartyChannel !== undefined && (obj.counterpartyChannel = message.counterpartyChannel ? Channel.toJSON(message.counterpartyChannel) : undefined);
    message.proofChannel !== undefined && (obj.proofChannel = base64FromBytes(message.proofChannel !== undefined ? message.proofChannel : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeTimeout>): MsgChannelUpgradeTimeout {
    const message = createBaseMsgChannelUpgradeTimeout();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannel = object.counterpartyChannel !== undefined && object.counterpartyChannel !== null ? Channel.fromPartial(object.counterpartyChannel) : undefined;
    message.proofChannel = object.proofChannel ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelUpgradeTimeoutResponse(): MsgChannelUpgradeTimeoutResponse {
  return {};
}
export const MsgChannelUpgradeTimeoutResponse = {
  encode(_: MsgChannelUpgradeTimeoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTimeoutResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTimeoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgChannelUpgradeTimeoutResponse {
    return {};
  },
  toJSON(_: MsgChannelUpgradeTimeoutResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgChannelUpgradeTimeoutResponse>): MsgChannelUpgradeTimeoutResponse {
    const message = createBaseMsgChannelUpgradeTimeoutResponse();
    return message;
  }
};
function createBaseMsgChannelUpgradeCancel(): MsgChannelUpgradeCancel {
  return {
    portId: "",
    channelId: "",
    errorReceipt: undefined,
    proofErrorReceipt: new Uint8Array(),
    proofHeight: undefined,
    signer: ""
  };
}
export const MsgChannelUpgradeCancel = {
  encode(message: MsgChannelUpgradeCancel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.errorReceipt !== undefined) {
      ErrorReceipt.encode(message.errorReceipt, writer.uint32(26).fork()).ldelim();
    }
    if (message.proofErrorReceipt.length !== 0) {
      writer.uint32(34).bytes(message.proofErrorReceipt);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeCancel {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.errorReceipt = ErrorReceipt.decode(reader, reader.uint32());
          break;
        case 4:
          message.proofErrorReceipt = reader.bytes();
          break;
        case 5:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        case 6:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgChannelUpgradeCancel {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      errorReceipt: isSet(object.errorReceipt) ? ErrorReceipt.fromJSON(object.errorReceipt) : undefined,
      proofErrorReceipt: isSet(object.proofErrorReceipt) ? bytesFromBase64(object.proofErrorReceipt) : new Uint8Array(),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgChannelUpgradeCancel): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.errorReceipt !== undefined && (obj.errorReceipt = message.errorReceipt ? ErrorReceipt.toJSON(message.errorReceipt) : undefined);
    message.proofErrorReceipt !== undefined && (obj.proofErrorReceipt = base64FromBytes(message.proofErrorReceipt !== undefined ? message.proofErrorReceipt : new Uint8Array()));
    message.proofHeight !== undefined && (obj.proofHeight = message.proofHeight ? Height.toJSON(message.proofHeight) : undefined);
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgChannelUpgradeCancel>): MsgChannelUpgradeCancel {
    const message = createBaseMsgChannelUpgradeCancel();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.errorReceipt = object.errorReceipt !== undefined && object.errorReceipt !== null ? ErrorReceipt.fromPartial(object.errorReceipt) : undefined;
    message.proofErrorReceipt = object.proofErrorReceipt ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgChannelUpgradeCancelResponse(): MsgChannelUpgradeCancelResponse {
  return {};
}
export const MsgChannelUpgradeCancelResponse = {
  encode(_: MsgChannelUpgradeCancelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeCancelResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeCancelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgChannelUpgradeCancelResponse {
    return {};
  },
  toJSON(_: MsgChannelUpgradeCancelResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgChannelUpgradeCancelResponse>): MsgChannelUpgradeCancelResponse {
    const message = createBaseMsgChannelUpgradeCancelResponse();
    return message;
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: undefined
  };
}
export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },
  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  }
};
function createBaseMsgPruneAcknowledgements(): MsgPruneAcknowledgements {
  return {
    portId: "",
    channelId: "",
    limit: Long.UZERO,
    signer: ""
  };
}
export const MsgPruneAcknowledgements = {
  encode(message: MsgPruneAcknowledgements, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (!message.limit.isZero()) {
      writer.uint32(24).uint64(message.limit);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPruneAcknowledgements {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPruneAcknowledgements();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.limit = (reader.uint64() as Long);
          break;
        case 4:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgPruneAcknowledgements {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      limit: isSet(object.limit) ? Long.fromValue(object.limit) : Long.UZERO,
      signer: isSet(object.signer) ? String(object.signer) : ""
    };
  },
  toJSON(message: MsgPruneAcknowledgements): unknown {
    const obj: any = {};
    message.portId !== undefined && (obj.portId = message.portId);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.limit !== undefined && (obj.limit = (message.limit || Long.UZERO).toString());
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },
  fromPartial(object: Partial<MsgPruneAcknowledgements>): MsgPruneAcknowledgements {
    const message = createBaseMsgPruneAcknowledgements();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.limit = object.limit !== undefined && object.limit !== null ? Long.fromValue(object.limit) : Long.UZERO;
    message.signer = object.signer ?? "";
    return message;
  }
};
function createBaseMsgPruneAcknowledgementsResponse(): MsgPruneAcknowledgementsResponse {
  return {
    totalPrunedSequences: Long.UZERO,
    totalRemainingSequences: Long.UZERO
  };
}
export const MsgPruneAcknowledgementsResponse = {
  encode(message: MsgPruneAcknowledgementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.totalPrunedSequences.isZero()) {
      writer.uint32(8).uint64(message.totalPrunedSequences);
    }
    if (!message.totalRemainingSequences.isZero()) {
      writer.uint32(16).uint64(message.totalRemainingSequences);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPruneAcknowledgementsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPruneAcknowledgementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalPrunedSequences = (reader.uint64() as Long);
          break;
        case 2:
          message.totalRemainingSequences = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgPruneAcknowledgementsResponse {
    return {
      totalPrunedSequences: isSet(object.totalPrunedSequences) ? Long.fromValue(object.totalPrunedSequences) : Long.UZERO,
      totalRemainingSequences: isSet(object.totalRemainingSequences) ? Long.fromValue(object.totalRemainingSequences) : Long.UZERO
    };
  },
  toJSON(message: MsgPruneAcknowledgementsResponse): unknown {
    const obj: any = {};
    message.totalPrunedSequences !== undefined && (obj.totalPrunedSequences = (message.totalPrunedSequences || Long.UZERO).toString());
    message.totalRemainingSequences !== undefined && (obj.totalRemainingSequences = (message.totalRemainingSequences || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: Partial<MsgPruneAcknowledgementsResponse>): MsgPruneAcknowledgementsResponse {
    const message = createBaseMsgPruneAcknowledgementsResponse();
    message.totalPrunedSequences = object.totalPrunedSequences !== undefined && object.totalPrunedSequences !== null ? Long.fromValue(object.totalPrunedSequences) : Long.UZERO;
    message.totalRemainingSequences = object.totalRemainingSequences !== undefined && object.totalRemainingSequences !== null ? Long.fromValue(object.totalRemainingSequences) : Long.UZERO;
    return message;
  }
};