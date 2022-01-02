// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var TRC20_pb = require('./TRC20_pb.js');

function serialize_cpay_trc20_CreateWalletReposnse(arg) {
  if (!(arg instanceof TRC20_pb.CreateWalletReposnse)) {
    throw new Error('Expected argument of type cpay.trc20.CreateWalletReposnse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cpay_trc20_CreateWalletReposnse(buffer_arg) {
  return TRC20_pb.CreateWalletReposnse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cpay_trc20_EmptyRequest(arg) {
  if (!(arg instanceof TRC20_pb.EmptyRequest)) {
    throw new Error('Expected argument of type cpay.trc20.EmptyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cpay_trc20_EmptyRequest(buffer_arg) {
  return TRC20_pb.EmptyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var TRC20Service = exports.TRC20Service = {
  createWallet: {
    path: '/cpay.trc20.TRC20/CreateWallet',
    requestStream: false,
    responseStream: false,
    requestType: TRC20_pb.EmptyRequest,
    responseType: TRC20_pb.CreateWalletReposnse,
    requestSerialize: serialize_cpay_trc20_EmptyRequest,
    requestDeserialize: deserialize_cpay_trc20_EmptyRequest,
    responseSerialize: serialize_cpay_trc20_CreateWalletReposnse,
    responseDeserialize: deserialize_cpay_trc20_CreateWalletReposnse,
  },
};

exports.TRC20Client = grpc.makeGenericClientConstructor(TRC20Service);
