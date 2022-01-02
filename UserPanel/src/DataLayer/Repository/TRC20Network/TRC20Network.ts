import OperationResult from "../../../core/Operation/OperationResult";
import { CreateWalletresultModel } from "../../../DTO/GRPC/Network/CreateWalletresultModel";
import { TRC20Network } from "../../../Utilities/Networks/Networktypes/TRC20Network";
import { ITRC20NetworkRepository } from "./ITRC20Network";


export default class TRC20NetworkRepository implements ITRC20NetworkRepository {

    ERC20Context: TRC20Network;

    constructor() {
        this.ERC20Context = new TRC20Network();
    }

    async CreateWallet(): Promise<OperationResult<CreateWalletresultModel>> {

        try {

            const wallet = await this.ERC20Context.CreateWallet();

            if (wallet.success && wallet.result) {
                return OperationResult.BuildSuccessResult("Success create ERC20 wallet address", wallet.result);
            }

            return OperationResult.BuildFailur(wallet.message);


        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

}