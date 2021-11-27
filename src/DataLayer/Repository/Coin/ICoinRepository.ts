import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddCoinModel } from "../../../DTO/Coin/AddCoin";
import { GetAllCoinFilter } from "../../../DTO/Coin/GetAllCoinFilter";
import { GetCoinInfoModel } from "../../../DTO/Coin/GetCoinInfo";
import { UpdateCoinModel } from "../../../DTO/Coin/UpdateCoin";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { ICoinDoc } from "../../Context/Coin/ICoinDoc";
import { ICoinLocalItem } from "../../Context/Coin/ICoinLocalItems";
import { MultiLanguageSelect } from "../../../DTO/Common/MultiSelectLang";
import { GetAllCoinSelect } from "../../../DTO/Coin/GetAllCoinSelect";

export interface ICoinRepository {

    CreateCoin(item: AddCoinModel): Promise<OperationResult<boolean>>;
    UpdateCoin(item: UpdateCoinModel): Promise<OperationResult<boolean>>;
    DeleteCoin(id: string): Promise<OperationResult<boolean>>;
    GetAllCoinSelect(lang: string): Promise<OperationResult<GetAllCoinSelect[]>>;
    GetAllCoinPaging(items: FilterViewModel<GetAllCoinFilter>): Promise<OperationResult<GetAllPagingModel<ICoinDoc>>>;
    GetByIdCoin(id: string): Promise<OperationResult<GetCoinInfoModel>>;
}