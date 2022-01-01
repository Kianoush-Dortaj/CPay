import OperationResult from "../../../core/Operation/OperationResult";
import { CreateWalletresultModel } from "../../../DTO/GRPC/Network/CreateWalletresultModel";
import { CreateWalletModel } from "../../../DTO/Wallet/CreateWalletModel";
import { GetUserWallet } from "../../../DTO/Wallet/GetUserWalletModel";
import { IWalletDoc } from "../../Context/Wallet/IIWalletDoc";

export interface IWalletRepository {

    GetUserWallet(userId: string): Promise<OperationResult<IWalletDoc[]>>;
    CreateWallet(item: CreateWalletModel): Promise<OperationResult<string>>;
    GenerateWalletForNetwork(networkName: string): Promise<OperationResult<CreateWalletresultModel>>;

}