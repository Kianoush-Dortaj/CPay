// package: cpay.tokenprice
// file: src/Utilities/GRPC/Protos/TokenPrice.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as src_Utilities_GRPC_Protos_TokenPrice_pb from "../../../../src/Utilities/GRPC/Protos/TokenPrice_pb";

interface ITokenPriceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getPriceToken: ITokenPriceService_IGetPriceToken;
}

interface ITokenPriceService_IGetPriceToken extends grpc.MethodDefinition<src_Utilities_GRPC_Protos_TokenPrice_pb.Request, src_Utilities_GRPC_Protos_TokenPrice_pb.Response> {
    path: "/cpay.tokenprice.TokenPrice/GetPriceToken";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<src_Utilities_GRPC_Protos_TokenPrice_pb.Request>;
    requestDeserialize: grpc.deserialize<src_Utilities_GRPC_Protos_TokenPrice_pb.Request>;
    responseSerialize: grpc.serialize<src_Utilities_GRPC_Protos_TokenPrice_pb.Response>;
    responseDeserialize: grpc.deserialize<src_Utilities_GRPC_Protos_TokenPrice_pb.Response>;
}

export const TokenPriceService: ITokenPriceService;

export interface ITokenPriceServer {
    getPriceToken: grpc.handleUnaryCall<src_Utilities_GRPC_Protos_TokenPrice_pb.Request, src_Utilities_GRPC_Protos_TokenPrice_pb.Response>;
}

export interface ITokenPriceClient {
    getPriceToken(request: src_Utilities_GRPC_Protos_TokenPrice_pb.Request, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TokenPrice_pb.Response) => void): grpc.ClientUnaryCall;
    getPriceToken(request: src_Utilities_GRPC_Protos_TokenPrice_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TokenPrice_pb.Response) => void): grpc.ClientUnaryCall;
    getPriceToken(request: src_Utilities_GRPC_Protos_TokenPrice_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TokenPrice_pb.Response) => void): grpc.ClientUnaryCall;
}

export class TokenPriceClient extends grpc.Client implements ITokenPriceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getPriceToken(request: src_Utilities_GRPC_Protos_TokenPrice_pb.Request, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TokenPrice_pb.Response) => void): grpc.ClientUnaryCall;
    public getPriceToken(request: src_Utilities_GRPC_Protos_TokenPrice_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TokenPrice_pb.Response) => void): grpc.ClientUnaryCall;
    public getPriceToken(request: src_Utilities_GRPC_Protos_TokenPrice_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: src_Utilities_GRPC_Protos_TokenPrice_pb.Response) => void): grpc.ClientUnaryCall;
}
