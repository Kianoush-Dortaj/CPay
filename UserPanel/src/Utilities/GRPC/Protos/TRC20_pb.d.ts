// package: cpay.trc20
// file: src/Utilities/GRPC/Protos/TRC20.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class EmptyRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyRequest;
    static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
    export type AsObject = {
    }
}

export class CreateWalletReposnse extends jspb.Message { 
    getOperationstatus(): OperationStatus;
    setOperationstatus(value: OperationStatus): CreateWalletReposnse;
    getOperationmessage(): string;
    setOperationmessage(value: string): CreateWalletReposnse;
    getWalletaddress(): string;
    setWalletaddress(value: string): CreateWalletReposnse;
    getUserid(): string;
    setUserid(value: string): CreateWalletReposnse;
    getPrivatekey(): string;
    setPrivatekey(value: string): CreateWalletReposnse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateWalletReposnse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateWalletReposnse): CreateWalletReposnse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateWalletReposnse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateWalletReposnse;
    static deserializeBinaryFromReader(message: CreateWalletReposnse, reader: jspb.BinaryReader): CreateWalletReposnse;
}

export namespace CreateWalletReposnse {
    export type AsObject = {
        operationstatus: OperationStatus,
        operationmessage: string,
        walletaddress: string,
        userid: string,
        privatekey: string,
    }
}

export enum OperationStatus {
    SUCCESS = 0,
    FAIL = 1,
}
