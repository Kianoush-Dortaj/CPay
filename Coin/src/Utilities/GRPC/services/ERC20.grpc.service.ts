import { sendUnaryData, ServerUnaryCall, UntypedHandleCall, status } from "@grpc/grpc-js";
import { CreateWalletReposnse, EmptyRequest, ERC20Server, OperationStatus } from "../models/ERC20";
import { ServiceError } from '../utiles/error';

class ERC20GrpcService implements ERC20Server {
    [name: string]: UntypedHandleCall;

    createWallet(call: ServerUnaryCall<EmptyRequest, CreateWalletReposnse>, callback: sendUnaryData<CreateWalletReposnse>): void {

        const res: Partial<CreateWalletReposnse> = {};

        const walletAddress = global.web3.eth.accounts.create();

        res.walletAddress = walletAddress.address;
        res.privateKey = walletAddress.privateKey;
        res.operationMessage = 'success create wallet';
        res.operationStatus = OperationStatus.SUCCESS;

        callback(null, CreateWalletReposnse.fromJSON(res));
    }

}

export {
    ERC20GrpcService
}