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

export interface CreateWalletRequest {
  userId: string;
  networkId: string;
  coinId: string;
  oprtaionStatus: string;
}

export interface CreateWalletReposnse {
  oprtaionStatus: string;
  walletAddress: string;
  userId: string;
}

function createBaseCreateWalletRequest(): CreateWalletRequest {
  return { userId: "", networkId: "", coinId: "", oprtaionStatus: "" };
}

export const CreateWalletRequest = {
  encode(
    message: CreateWalletRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.networkId !== "") {
      writer.uint32(18).string(message.networkId);
    }
    if (message.coinId !== "") {
      writer.uint32(26).string(message.coinId);
    }
    if (message.oprtaionStatus !== "") {
      writer.uint32(34).string(message.oprtaionStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateWalletRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateWalletRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.networkId = reader.string();
          break;
        case 3:
          message.coinId = reader.string();
          break;
        case 4:
          message.oprtaionStatus = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateWalletRequest {
    const message = createBaseCreateWalletRequest();
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : "";
    message.networkId =
      object.networkId !== undefined && object.networkId !== null
        ? String(object.networkId)
        : "";
    message.coinId =
      object.coinId !== undefined && object.coinId !== null
        ? String(object.coinId)
        : "";
    message.oprtaionStatus =
      object.oprtaionStatus !== undefined && object.oprtaionStatus !== null
        ? String(object.oprtaionStatus)
        : "";
    return message;
  },

  toJSON(message: CreateWalletRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.networkId !== undefined && (obj.networkId = message.networkId);
    message.coinId !== undefined && (obj.coinId = message.coinId);
    message.oprtaionStatus !== undefined &&
      (obj.oprtaionStatus = message.oprtaionStatus);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateWalletRequest>, I>>(
    object: I
  ): CreateWalletRequest {
    const message = createBaseCreateWalletRequest();
    message.userId = object.userId ?? "";
    message.networkId = object.networkId ?? "";
    message.coinId = object.coinId ?? "";
    message.oprtaionStatus = object.oprtaionStatus ?? "";
    return message;
  },
};

function createBaseCreateWalletReposnse(): CreateWalletReposnse {
  return { oprtaionStatus: "", walletAddress: "", userId: "" };
}

export const CreateWalletReposnse = {
  encode(
    message: CreateWalletReposnse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.oprtaionStatus !== "") {
      writer.uint32(10).string(message.oprtaionStatus);
    }
    if (message.walletAddress !== "") {
      writer.uint32(18).string(message.walletAddress);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
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
          message.oprtaionStatus = reader.string();
          break;
        case 2:
          message.walletAddress = reader.string();
          break;
        case 3:
          message.userId = reader.string();
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
    message.oprtaionStatus =
      object.oprtaionStatus !== undefined && object.oprtaionStatus !== null
        ? String(object.oprtaionStatus)
        : "";
    message.walletAddress =
      object.walletAddress !== undefined && object.walletAddress !== null
        ? String(object.walletAddress)
        : "";
    message.userId =
      object.userId !== undefined && object.userId !== null
        ? String(object.userId)
        : "";
    return message;
  },

  toJSON(message: CreateWalletReposnse): unknown {
    const obj: any = {};
    message.oprtaionStatus !== undefined &&
      (obj.oprtaionStatus = message.oprtaionStatus);
    message.walletAddress !== undefined &&
      (obj.walletAddress = message.walletAddress);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateWalletReposnse>, I>>(
    object: I
  ): CreateWalletReposnse {
    const message = createBaseCreateWalletReposnse();
    message.oprtaionStatus = object.oprtaionStatus ?? "";
    message.walletAddress = object.walletAddress ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

export const ERC20Service = {
  createWallet: {
    path: "/cpay.erc20.ERC20/CreateWallet",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateWalletRequest) =>
      Buffer.from(CreateWalletRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateWalletRequest.decode(value),
    responseSerialize: (value: CreateWalletReposnse) =>
      Buffer.from(CreateWalletReposnse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateWalletReposnse.decode(value),
  },
} as const;

export interface ERC20Server extends UntypedServiceImplementation {
  createWallet: handleUnaryCall<CreateWalletRequest, CreateWalletReposnse>;
}

export interface ERC20Client extends Client {
  createWallet(
    request: CreateWalletRequest,
    callback: (
      error: ServiceError | null,
      response: CreateWalletReposnse
    ) => void
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: CreateWalletReposnse
    ) => void
  ): ClientUnaryCall;
  createWallet(
    request: CreateWalletRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: CreateWalletReposnse
    ) => void
  ): ClientUnaryCall;
}

export const ERC20Client = makeGenericClientConstructor(
  ERC20Service,
  "cpay.erc20.ERC20"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): ERC20Client;
  service: typeof ERC20Service;
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
