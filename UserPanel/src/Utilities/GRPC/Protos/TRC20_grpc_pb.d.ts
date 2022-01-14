// package: cpay.trc20
// file: src/Utilities/GRPC/Protos/TRC20.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as src_Utilities_GRPC_Protos_TRC20_pb from "../../../../src/Utilities/GRPC/Protos/TRC20_pb";

interface ITRC20Service extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createWallet: ITRC20Service_ICreateWallet;
}

interface ITRC20Service_ICreateWallet extends grpc.MethodDefinition<src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse> {
    path: "/cpay.trc20.TRC20/CreateWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest>;
    requestDeserialize: grpc.deserialize<src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest>;
    responseSerialize: grpc.serialize<src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse>;
    responseDeserialize: grpc.deserialize<src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse>;
}

export const TRC20Service: ITRC20Service;

export interface ITRC20Server {
    createWallet: grpc.handleUnaryCall<src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse>;
}

export interface ITRC20Client {
    createWallet(request: src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    createWallet(request: src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    createWallet(request: src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
}

export class TRC20Client extends grpc.Client implements ITRC20Client {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createWallet(request: src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    public createWallet(request: src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    public createWallet(request: src_Utilities_GRPC_Protos_TRC20_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TRC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
}
