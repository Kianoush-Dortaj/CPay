import { sendUnaryData, ServerUnaryCall, UntypedHandleCall, status } from "@grpc/grpc-js";
import { CreateWalletReposnse, CreateWalletRequest, ERC20Server } from "../models/ERC20";
import { ServiceError } from './../utiles/error';

class ERC20GrpcService implements ERC20Server {
    [name: string]: UntypedHandleCall;

    createWallet(call: ServerUnaryCall<CreateWalletRequest, CreateWalletReposnse>, callback: sendUnaryData<CreateWalletReposnse>): void {

        const res: Partial<CreateWalletReposnse> = {};
        const { oprtaionStatus } = call.request;
        console.log('recive data from coin', call.request)
        if (oprtaionStatus === 'error') {

            return callback(new ServiceError(status.INVALID_ARGUMENT, 'InvalidValue'), null);
        }

        res.walletAddress = 'aa';
        res.userId = 'bb';
        res.oprtaionStatus = 'cc';
        console.log('set res value in user-panel', res);
        callback(null, CreateWalletReposnse.fromJSON(res));
    }

}

export {
    ERC20GrpcService
}