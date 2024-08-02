//@ts-nocheck
import { RequestFinalizeBlock, RequestFinalizeBlockSDKType, ResponseFinalizeBlock, ResponseFinalizeBlockSDKType, ResponseCommit, ResponseCommitSDKType } from "../../../../tendermint/abci/types";
import { StoreKVPair, StoreKVPairSDKType } from "../../v1beta1/listening";
import { Long, isSet } from "../../../../helpers";
import * as _m0 from "protobufjs/minimal";
/** ListenEndBlockRequest is the request type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockRequest {
  req?: RequestFinalizeBlock;
  res?: ResponseFinalizeBlock;
}
/** ListenEndBlockRequest is the request type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockRequestSDKType {
  req?: RequestFinalizeBlockSDKType;
  res?: ResponseFinalizeBlockSDKType;
}
/** ListenEndBlockResponse is the response type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockResponse {}
/** ListenEndBlockResponse is the response type for the ListenEndBlock RPC method */
export interface ListenFinalizeBlockResponseSDKType {}
/** ListenCommitRequest is the request type for the ListenCommit RPC method */
export interface ListenCommitRequest {
  /** explicitly pass in block height as ResponseCommit does not contain this info */
  blockHeight: Long;
  res?: ResponseCommit;
  changeSet: StoreKVPair[];
}
/** ListenCommitRequest is the request type for the ListenCommit RPC method */
export interface ListenCommitRequestSDKType {
  block_height: Long;
  res?: ResponseCommitSDKType;
  change_set: StoreKVPairSDKType[];
}
/** ListenCommitResponse is the response type for the ListenCommit RPC method */
export interface ListenCommitResponse {}
/** ListenCommitResponse is the response type for the ListenCommit RPC method */
export interface ListenCommitResponseSDKType {}
function createBaseListenFinalizeBlockRequest(): ListenFinalizeBlockRequest {
  return {
    req: undefined,
    res: undefined
  };
}
export const ListenFinalizeBlockRequest = {
  encode(message: ListenFinalizeBlockRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.req !== undefined) {
      RequestFinalizeBlock.encode(message.req, writer.uint32(10).fork()).ldelim();
    }
    if (message.res !== undefined) {
      ResponseFinalizeBlock.encode(message.res, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): ListenFinalizeBlockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenFinalizeBlockRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.req = RequestFinalizeBlock.decode(reader, reader.uint32());
          break;
        case 2:
          message.res = ResponseFinalizeBlock.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ListenFinalizeBlockRequest {
    return {
      req: isSet(object.req) ? RequestFinalizeBlock.fromJSON(object.req) : undefined,
      res: isSet(object.res) ? ResponseFinalizeBlock.fromJSON(object.res) : undefined
    };
  },
  toJSON(message: ListenFinalizeBlockRequest): unknown {
    const obj: any = {};
    message.req !== undefined && (obj.req = message.req ? RequestFinalizeBlock.toJSON(message.req) : undefined);
    message.res !== undefined && (obj.res = message.res ? ResponseFinalizeBlock.toJSON(message.res) : undefined);
    return obj;
  },
  fromPartial(object: Partial<ListenFinalizeBlockRequest>): ListenFinalizeBlockRequest {
    const message = createBaseListenFinalizeBlockRequest();
    message.req = object.req !== undefined && object.req !== null ? RequestFinalizeBlock.fromPartial(object.req) : undefined;
    message.res = object.res !== undefined && object.res !== null ? ResponseFinalizeBlock.fromPartial(object.res) : undefined;
    return message;
  }
};
function createBaseListenFinalizeBlockResponse(): ListenFinalizeBlockResponse {
  return {};
}
export const ListenFinalizeBlockResponse = {
  encode(_: ListenFinalizeBlockResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): ListenFinalizeBlockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenFinalizeBlockResponse();
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
  fromJSON(_: any): ListenFinalizeBlockResponse {
    return {};
  },
  toJSON(_: ListenFinalizeBlockResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<ListenFinalizeBlockResponse>): ListenFinalizeBlockResponse {
    const message = createBaseListenFinalizeBlockResponse();
    return message;
  }
};
function createBaseListenCommitRequest(): ListenCommitRequest {
  return {
    blockHeight: Long.ZERO,
    res: undefined,
    changeSet: []
  };
}
export const ListenCommitRequest = {
  encode(message: ListenCommitRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.blockHeight.isZero()) {
      writer.uint32(8).int64(message.blockHeight);
    }
    if (message.res !== undefined) {
      ResponseCommit.encode(message.res, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.changeSet) {
      StoreKVPair.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): ListenCommitRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenCommitRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = (reader.int64() as Long);
          break;
        case 2:
          message.res = ResponseCommit.decode(reader, reader.uint32());
          break;
        case 3:
          message.changeSet.push(StoreKVPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ListenCommitRequest {
    return {
      blockHeight: isSet(object.blockHeight) ? Long.fromValue(object.blockHeight) : Long.ZERO,
      res: isSet(object.res) ? ResponseCommit.fromJSON(object.res) : undefined,
      changeSet: Array.isArray(object?.changeSet) ? object.changeSet.map((e: any) => StoreKVPair.fromJSON(e)) : []
    };
  },
  toJSON(message: ListenCommitRequest): unknown {
    const obj: any = {};
    message.blockHeight !== undefined && (obj.blockHeight = (message.blockHeight || Long.ZERO).toString());
    message.res !== undefined && (obj.res = message.res ? ResponseCommit.toJSON(message.res) : undefined);
    if (message.changeSet) {
      obj.changeSet = message.changeSet.map(e => e ? StoreKVPair.toJSON(e) : undefined);
    } else {
      obj.changeSet = [];
    }
    return obj;
  },
  fromPartial(object: Partial<ListenCommitRequest>): ListenCommitRequest {
    const message = createBaseListenCommitRequest();
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? Long.fromValue(object.blockHeight) : Long.ZERO;
    message.res = object.res !== undefined && object.res !== null ? ResponseCommit.fromPartial(object.res) : undefined;
    message.changeSet = object.changeSet?.map(e => StoreKVPair.fromPartial(e)) || [];
    return message;
  }
};
function createBaseListenCommitResponse(): ListenCommitResponse {
  return {};
}
export const ListenCommitResponse = {
  encode(_: ListenCommitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): ListenCommitResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListenCommitResponse();
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
  fromJSON(_: any): ListenCommitResponse {
    return {};
  },
  toJSON(_: ListenCommitResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<ListenCommitResponse>): ListenCommitResponse {
    const message = createBaseListenCommitResponse();
    return message;
  }
};