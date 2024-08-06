import * as _m0 from "protobufjs/minimal";
/**
 * Module defines the ORM module which adds providers to the app container for
 * ORM ModuleDB's and in the future will automatically register query
 * services for modules that use the ORM.
 */
export interface Module {
}
/**
 * Module defines the ORM module which adds providers to the app container for
 * ORM ModuleDB's and in the future will automatically register query
 * services for modules that use the ORM.
 */
export interface ModuleSDKType {
}
export declare const Module: {
    encode(_: Module, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Module;
    fromJSON(_: any): Module;
    toJSON(_: Module): unknown;
    fromPartial(_: Partial<Module>): Module;
};
