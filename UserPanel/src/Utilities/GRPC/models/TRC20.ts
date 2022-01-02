/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export enum OperationStatus {
  SUCCESS = 0,
  FAIL = 1,
  UNRECOGNIZED = -1,
}

export function operationStatusFromJSON(object: any): OperationStatus {
  switch (object) {
    case 0:
    case "SUCCESS":
      return OperationStatus.SUCCESS;
    case 1:
    case "FAIL":
      return OperationStatus.FAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OperationStatus.UNRECOGNIZED;
  }
}

export function operationStatusToJSON(object: OperationStatus): string {
  switch (object) {
    case OperationStatus.SUCCESS:
      return "SUCCESS";
    case OperationStatus.FAIL:
      return "FAIL";
    default:
      return "UNKNOWN";
  }
}

export interface EmptyRequest {}

export interface CreateWalletReposnse {
  operationStatus: OperationStatus;
  operationMessage: string;
  walletAddress: string;
  userId: string;
  privateKey: string;
}

function createBaseEmptyRequest(): EmptyRequest {
  return {};
}

export const EmptyRequest = {
  encode(
    _: EmptyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyRequest();
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

  fromJSON(_: any): EmptyRequest {
    const message = createBaseEmptyRequest();
    return message;
  },

  toJSON(_: EmptyRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmptyRequest>, I>>(
    _: I
  ): EmptyRequest {
    const message = createBaseEmptyRequest();
    return message;
  },
};

function createBaseCreateWalletReposnse(): CreateWalletReposnse {
  return {
    operationStatus: 0,
    operationMessage: "",
    walletAddress: "",
    userId: "",
    privateKey: "",
  };
}

export const CreateWalletReposnse = {
  encode(
    message: CreateWalletReposnse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.operationStatus !== 0) {
      writer.uint32(8).int32(message.operationStatus);
    }
    if (message.operationMessage !== "") {
      writer.uint32(18).string(message.operationMessage);
    }
    if (message.walletAddress !== "") {
      writer.uint32(26).string(message.walletAddress);
    }
    if (message.userId !== "") {
      writer.uint32(34).string(message.userId);
    }
    if (message.privateKey !== "") {
      writer.uint32(42).string(message.privateKey);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CreateWalletReposnse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWalletReposnse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operationStatus = reader.int32() as any;
          break;
        case 2:
          message.operationMessage = reader.string();
          break;
        case 3:
          message.walletAddress = reader.string();
          break;
        case 4:
          message.userId = reader.string();
          break;
        case 5:
          message.privateKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWalletReposnse {
    const message = createBaseCreateWalletReposnse();
    message.operationStatus =
      object.operationStatus !== undefined && object.operationStatus !== null
        ? operationStatusFromJSON(object.operationStatus)
        : 0;
    message.operationMessage =
      object.operationMessage !== undefined && object.operationMessage !== null
        ? String(object.operationMessage)
        : "";
    message.walletAddress =
      object.walletAddress !== undefined && object.walletAddress !== null
        ? String(object.walletAddress)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : "";
    message.privateKey =
      object.privateKey !== undefined && object.privateKey !== null
        ? String(object.privateKey)
        : "";
    return message;
  },

  toJSON(message: CreateWalletReposnse): unknown {
    const obj: any = {};
    message.operationStatus !== undefined &&
      (obj.operationStatus = operationStatusToJSON(message.operationStatus));
    message.operationMessage !== undefined &&
      (obj.operationMessage = message.operationMessage);
    message.walletAddress !== undefined &&
      (obj.walletAddress = message.walletAddress);
    message.userId !== undefined && (obj.userId = message.userId);
    message.privateKey !== undefined && (obj.privateKey = message.privateKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateWalletReposnse>, I>>(
    object: I
  ): CreateWalletReposnse {
    const message = createBaseCreateWalletReposnse();
    message.operationStatus = object.operationStatus ?? 0;
    message.operationMessage = object.operationMessage ?? "";
    message.walletAddress = object.walletAddress ?? "";
    message.userId = object.userId ?? "";
    message.privateKey = object.privateKey ?? "";
    return message;
  },
};

export const TRC20Service = {
  createWallet: {
    path: "/cpay.trc20.TRC20/CreateWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: EmptyRequest) =>
      Buffer.from(EmptyRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => EmptyRequest.decode(value),
    responseSerialize: (value: CreateWalletReposnse) =>
      Buffer.from(CreateWalletReposnse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWalletReposnse.decode(value),
  },
} as const;

export interface TRC20Server extends UntypedServiceImplementation {
  createWallet: handleUnaryCall<EmptyRequest, CreateWalletReposnse>;
}

export interface TRC20Client extends Client {
  createWallet(
    request: EmptyRequest,
    callback: (
      error: ServiceError | null,
      response: CreateWalletReposnse
    ) => void
  ): ClientUnaryCall;
  createWallet(
    request: EmptyRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateWalletReposnse
    ) => void
  ): ClientUnaryCall;
  createWallet(
    request: EmptyRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateWalletReposnse
    ) => void
  ): ClientUnaryCall;
}

export const TRC20Client = makeGenericClientConstructor(
  TRC20Service,
  "cpay.trc20.TRC20"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): TRC20Client;
  service: typeof TRC20Service;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
