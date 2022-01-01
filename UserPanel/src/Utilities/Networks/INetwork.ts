import OperationResult from "../../core/Operation/OperationResult";
import { CreateWalletresultModel } from "../../DTO/GRPC/Network/CreateWalletresultModel";


export interface INetwork {

    CreateWallet() : Promise<OperationResult<CreateWalletresultModel>> ;

}