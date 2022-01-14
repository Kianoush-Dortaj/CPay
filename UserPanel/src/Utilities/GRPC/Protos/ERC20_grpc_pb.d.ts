// package: cpay.erc20
// file: src/Utilities/GRPC/Protos/ERC20.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as src_Utilities_GRPC_Protos_ERC20_pb from "./ERC20_pb";

interface IERC20Service extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createWallet: IERC20Service_ICreateWallet;
}

interface IERC20Service_ICreateWallet extends grpc.MethodDefinition<src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse> {
    path: "/cpay.erc20.ERC20/CreateWallet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest>;
    requestDeserialize: grpc.deserialize<src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest>;
    responseSerialize: grpc.serialize<src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse>;
    responseDeserialize: grpc.deserialize<src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse>;
}

export const ERC20Service: IERC20Service;

export interface IERC20Server {
    createWallet: grpc.handleUnaryCall<src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse>;
}

export interface IERC20Client {
    createWallet(request: src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    createWallet(request: src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    createWallet(request: src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
}

export class ERC20Client extends grpc.Client implements IERC20Client {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createWallet(request: src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    public createWallet(request: src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
    public createWallet(request: src_Utilities_GRPC_Protos_ERC20_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_ERC20_pb.CreateWalletReposnse) => void): grpc.ClientUnaryCall;
}
