// package: cpay.tokenprice
// file: src/Utilities/GRPC/Protos/TokenPrice.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Request extends jspb.Message { 
    getFromsymbol(): string;
    setFromsymbol(value: string): Request;
    getFromname(): string;
    setFromname(value: string): Request;
    getTosymbol(): string;
    setTosymbol(value: string): Request;
    getToname(): string;
    setToname(value: string): Request;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Request.AsObject;
    static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Request;
    static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
    export type AsObject = {
        fromsymbol: string,
        fromname: string,
        tosymbol: string,
        toname: string,
    }
}

export class Response extends jspb.Message { 
    getOperationstatus(): OperationStatus;
    setOperationstatus(value: OperationStatus): Response;
    getPrice(): string;
    setPrice(value: string): Response;
    getExchange(): string;
    setExchange(value: string): Response;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Response.AsObject;
    static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Response;
    static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
    export type AsObject = {
        operationstatus: OperationStatus,
        price: string,
        exchange: string,
    }
}

export enum OperationStatus {
    SUCCESS = 0,
    FAIL = 1,
}
