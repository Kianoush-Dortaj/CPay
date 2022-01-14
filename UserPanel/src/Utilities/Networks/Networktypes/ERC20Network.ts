import OperationResult from "../../../core/Operation/OperationResult";
import { INetwork } from "../INetwork";
import { erc20ClientService } from '../../GRPC/services/ERC20.grpc.service';
// import { EmptyRequest, OperationStatus } from "../../GRPC/models/ERC20_pb";
import { CreateWalletresultModel } from "../../../DTO/GRPC/Network/CreateWalletresultModel";
import { EmptyRequest, OperationStatus } from "../../GRPC/Protos/ERC20_pb";

export class ERC20Network implements INetwork {

    async CreateWallet(): Promise<OperationResult<CreateWalletresultModel>> {

        try {

            const emtyRequest = new EmptyRequest();

            const walletAddress = await erc20ClientService.CreateWallet(emtyRequest);

            if (walletAddress.getOperationstatus() === OperationStatus.SUCCESS) {
                return OperationResult.BuildSuccessResult("Success Create Wallet", {
                    privateKey : walletAddress.getPrivatekey(),
                    publicAddrress : walletAddress.getWalletaddress()
                });
            }

            return OperationResult.BuildFailur(walletAddress.getOperationmessage());
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

}