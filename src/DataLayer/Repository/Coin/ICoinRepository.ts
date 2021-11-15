import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddCoinModel } from "../../../DTO/Coin/AddCoin";
import { GetAllCoinFilter } from "../../../DTO/Coin/GetAllCoinFilter";
import { GetCoinInfoModel } from "../../../DTO/Coin/GetCoinInfo";
import { UpdateCoinModel } from "../../../DTO/Coin/UpdateCoin";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { ICoinDoc } from "../../Context/Coin/ICoinDoc";

export interface ICoinRepository {

    CreateCoin(item: AddCoinModel): Promise<OperationResult<boolean>>;
    UpdateCoin(item: UpdateCoinModel): Promise<OperationResult<boolean>>;
    DeleteCoin(id: string): Promise<OperationResult<boolean>>;
    GetAllCoinSelect(): Promise<OperationResult<ICoinDoc[]>>;
    GetAllCoinPaging(items: FilterViewModel<GetAllCoinFilter>): Promise<OperationResult<GetAllPagingModel<ICoinDoc>>>;
    GetByIdCoin(id: string): Promise<OperationResult<GetCoinInfoModel>>;
}