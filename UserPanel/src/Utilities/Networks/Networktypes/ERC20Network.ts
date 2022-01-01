import OperationResult from "../../../core/Operation/OperationResult";
import { INetwork } from "../INetwork";
import { erc20ClientService } from '../../GRPC/services/ERC20.grpc.service';
import { OperationStatus } from "../../GRPC/models/ERC20";
import { CreateWalletresultModel } from "../../../DTO/GRPC/Network/CreateWalletresultModel";

export class ERC20Network implements INetwork {

    async CreateWallet(): Promise<OperationResult<CreateWalletresultModel>> {

        try {

            const walletAddress = await erc20ClientService.CreateWallet({});

            if (walletAddress.operationStatus === OperationStatus.SUCCESS) {
                return OperationResult.BuildSuccessResult("Success Create Wallet", {
                    privateKey : walletAddress.privateKey,
                    publicAddrress : walletAddress.walletAddress
                });
            }

            return OperationResult.BuildFailur(walletAddress.operationMessage);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

}