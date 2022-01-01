import OperationResult from "../../../core/Operation/OperationResult";
import { CreateWalletresultModel } from "../../../DTO/GRPC/Network/CreateWalletresultModel";
import { ERC20Network } from "../../../Utilities/Networks/Networktypes/ERC20Network";
import { IERC20NetworkRepository } from "./IERC20Network";


export default class ERC20NetworkRepository implements IERC20NetworkRepository {

    ERC20Context: ERC20Network;

    constructor() {
        this.ERC20Context = new ERC20Network();
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