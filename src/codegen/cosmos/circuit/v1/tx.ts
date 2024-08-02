//@ts-nocheck
import { Permissions, PermissionsSDKType } from "./types";
import * as _m0 from "protobufjs/minimal";
import { isSet } from "../../../helpers";
/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreaker {
  /**
   * granter is the granter of the circuit breaker permissions and must have
   * LEVEL_SUPER_ADMIN.
   */
  granter: string;
  /** grantee is the account authorized with the provided permissions. */
  grantee: string;
  /**
   * permissions are the circuit breaker permissions that the grantee receives.
   * These will overwrite any existing permissions. LEVEL_NONE_UNSPECIFIED can
   * be specified to revoke all permissions.
   */
  permissions?: Permissions;
}
/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreakerSDKType {
  granter: string;
  grantee: string;
  permissions?: PermissionsSDKType;
}
/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponse {
  success: boolean;
}
/** MsgAuthorizeCircuitBreakerResponse defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponseSDKType {
  success: boolean;
}
/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreaker {
  /** authority is the account authorized to trip the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of type URLs to immediately stop processing.
   * IF IT IS LEFT EMPTY, ALL MSG PROCESSING WILL STOP IMMEDIATELY.
   * This value is validated against the authority's permissions and if the
   * authority does not have permissions to trip the specified msg type URLs
   * (or all URLs), the operation will fail.
   */
  msgTypeUrls: string[];
}
/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreakerSDKType {
  authority: string;
  msg_type_urls: string[];
}
/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponse {
  success: boolean;
}
/** MsgTripCircuitBreakerResponse defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponseSDKType {
  success: boolean;
}
/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreaker {
  /** authority is the account authorized to trip or reset the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of Msg type URLs to resume processing. If
   * it is left empty all Msg processing for type URLs that the account is
   * authorized to trip will resume.
   */
  msgTypeUrls: string[];
}
/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreakerSDKType {
  authority: string;
  msg_type_urls: string[];
}
/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponse {
  success: boolean;
}
/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponseSDKType {
  success: boolean;
}
function createBaseMsgAuthorizeCircuitBreaker(): MsgAuthorizeCircuitBreaker {
  return {
    granter: "",
    grantee: "",
    permissions: undefined
  };
}
export const MsgAuthorizeCircuitBreaker = {
  encode(message: MsgAuthorizeCircuitBreaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.permissions !== undefined) {
      Permissions.encode(message.permissions, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthorizeCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.granter = reader.string();
          break;
        case 2:
          message.grantee = reader.string();
          break;
        case 3:
          message.permissions = Permissions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAuthorizeCircuitBreaker {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      permissions: isSet(object.permissions) ? Permissions.fromJSON(object.permissions) : undefined
    };
  },
  toJSON(message: MsgAuthorizeCircuitBreaker): unknown {
    const obj: any = {};
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    message.permissions !== undefined && (obj.permissions = message.permissions ? Permissions.toJSON(message.permissions) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgAuthorizeCircuitBreaker>): MsgAuthorizeCircuitBreaker {
    const message = createBaseMsgAuthorizeCircuitBreaker();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.permissions = object.permissions !== undefined && object.permissions !== null ? Permissions.fromPartial(object.permissions) : undefined;
    return message;
  }
};
function createBaseMsgAuthorizeCircuitBreakerResponse(): MsgAuthorizeCircuitBreakerResponse {
  return {
    success: false
  };
}
export const MsgAuthorizeCircuitBreakerResponse = {
  encode(message: MsgAuthorizeCircuitBreakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuthorizeCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgAuthorizeCircuitBreakerResponse {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false
    };
  },
  toJSON(message: MsgAuthorizeCircuitBreakerResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },
  fromPartial(object: Partial<MsgAuthorizeCircuitBreakerResponse>): MsgAuthorizeCircuitBreakerResponse {
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  }
};
function createBaseMsgTripCircuitBreaker(): MsgTripCircuitBreaker {
  return {
    authority: "",
    msgTypeUrls: []
  };
}
export const MsgTripCircuitBreaker = {
  encode(message: MsgTripCircuitBreaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msgTypeUrls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTripCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.msgTypeUrls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgTripCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msgTypeUrls: Array.isArray(object?.msgTypeUrls) ? object.msgTypeUrls.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: MsgTripCircuitBreaker): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.msgTypeUrls) {
      obj.msgTypeUrls = message.msgTypeUrls.map(e => e);
    } else {
      obj.msgTypeUrls = [];
    }
    return obj;
  },
  fromPartial(object: Partial<MsgTripCircuitBreaker>): MsgTripCircuitBreaker {
    const message = createBaseMsgTripCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msgTypeUrls = object.msgTypeUrls?.map(e => e) || [];
    return message;
  }
};
function createBaseMsgTripCircuitBreakerResponse(): MsgTripCircuitBreakerResponse {
  return {
    success: false
  };
}
export const MsgTripCircuitBreakerResponse = {
  encode(message: MsgTripCircuitBreakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTripCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgTripCircuitBreakerResponse {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false
    };
  },
  toJSON(message: MsgTripCircuitBreakerResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },
  fromPartial(object: Partial<MsgTripCircuitBreakerResponse>): MsgTripCircuitBreakerResponse {
    const message = createBaseMsgTripCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  }
};
function createBaseMsgResetCircuitBreaker(): MsgResetCircuitBreaker {
  return {
    authority: "",
    msgTypeUrls: []
  };
}
export const MsgResetCircuitBreaker = {
  encode(message: MsgResetCircuitBreaker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msgTypeUrls) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgResetCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 3:
          message.msgTypeUrls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgResetCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msgTypeUrls: Array.isArray(object?.msgTypeUrls) ? object.msgTypeUrls.map((e: any) => String(e)) : []
    };
  },
  toJSON(message: MsgResetCircuitBreaker): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.msgTypeUrls) {
      obj.msgTypeUrls = message.msgTypeUrls.map(e => e);
    } else {
      obj.msgTypeUrls = [];
    }
    return obj;
  },
  fromPartial(object: Partial<MsgResetCircuitBreaker>): MsgResetCircuitBreaker {
    const message = createBaseMsgResetCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msgTypeUrls = object.msgTypeUrls?.map(e => e) || [];
    return message;
  }
};
function createBaseMsgResetCircuitBreakerResponse(): MsgResetCircuitBreakerResponse {
  return {
    success: false
  };
}
export const MsgResetCircuitBreakerResponse = {
  encode(message: MsgResetCircuitBreakerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgResetCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgResetCircuitBreakerResponse {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false
    };
  },
  toJSON(message: MsgResetCircuitBreakerResponse): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    return obj;
  },
  fromPartial(object: Partial<MsgResetCircuitBreakerResponse>): MsgResetCircuitBreakerResponse {
    const message = createBaseMsgResetCircuitBreakerResponse();
    message.success = object.success ?? false;
    return message;
  }
};