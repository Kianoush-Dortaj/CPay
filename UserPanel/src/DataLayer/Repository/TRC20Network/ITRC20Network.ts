import OperationResult from "../../../core/Operation/OperationResult";
import { CreateWalletresultModel } from "../../../DTO/GRPC/Network/CreateWalletresultModel";

export interface ITRC20NetworkRepository {
    CreateWallet(): Promise<OperationResult<CreateWalletresultModel>>;
}