import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddFiatAssetModel } from "../../../DTO/FiatAsset/AddFiatAsset";
import { GetAllFiatAssetFilter } from "../../../DTO/FiatAsset/GetAllFiatAssetFilter";
import { GetAssetWalletInfo } from "../../../DTO/FiatAsset/GetAssetWalletInfo";
import { GetFiatAssetInfoModel } from "../../../DTO/FiatAsset/GetFiatAssetInfo";
import { UpdateFiatAssetModel } from "../../../DTO/FiatAsset/UpdateFiatAsset";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { IFiatAssetDoc } from "../../Context/FiatAsset/IFiatAssetDoc";

export interface IFiatAssetRepository {

    CreateFiatAsset(item: AddFiatAssetModel): Promise<OperationResult<string>>;
    UpdateFiatAsset(item: UpdateFiatAssetModel): Promise<OperationResult<string>>;
    DeleteFiatAsset(id: string): Promise<OperationResult<boolean>>;
    GetAllFiatAssetSelect(): Promise<OperationResult<IFiatAssetDoc[]>>;
    GetAllFiatAssetPaging(items: FilterViewModel<GetAllFiatAssetFilter>): Promise<OperationResult<GetAllPagingModel<IFiatAssetDoc>>>;
    GetByIdFiatAsset(id: string): Promise<OperationResult<GetFiatAssetInfoModel>>;
    GetFiatAssetsByUserId(id: string): Promise<OperationResult<GetAssetWalletInfo[]>>;
    GetFiatAssetsByCurrencyId(id: string): Promise<OperationResult<GetAssetWalletInfo>>;
    UpdateOrCreateWallet(id: string, amount: string, userId: string): Promise<OperationResult<string>>;
    FiatTransferFrom(from: string, to: string, amount: string, userId: string): Promise<OperationResult<any>>;
}