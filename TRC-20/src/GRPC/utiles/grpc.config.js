const grpc = require("grpc");
const trc20 = require('./../service/TRC20_pb');
const trc20Service = require('./../service/TRC20_grpc_pb');

const server = new grpc.Server();

function Initial() {

  server.bind("127.0.0.1:50052", grpc.ServerCredentials.createInsecure());

  console.log("GRPC server is running at 50052")
  server.addService(trc20Service.TRC20Service, {
    createWallet: createWallet
  })
  server.start()

}

async function createWalletTRX() {
  return await tronWeb.createAccount();
}


async function createWallet(call, callback) {
  let res;
  console.log(trc20.CreateWalletReposnse)

  const { privateKey, publicKey } = createWalletTRX();

  res = {
    operationStatus: trc20.OperationStatus.SUCCESS,
    operationMessage: 'success create wallet',
    walletAddress: publicKey,
    privateKey: privateKey
  };

  callback(null, res);
}

module.exports = {
  Initial
}



