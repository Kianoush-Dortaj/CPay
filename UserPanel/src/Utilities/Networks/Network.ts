import OperationResult from "../../core/Operation/OperationResult";
import { CreateWalletresultModel } from "../../DTO/GRPC/Network/CreateWalletresultModel";
import { INetwork } from "./INetwork";

export class Network implements INetwork {

    constructor(private network: INetwork) { }

    async CreateWallet(): Promise<OperationResult<CreateWalletresultModel>> {

        return this.network.CreateWallet();

    }

}