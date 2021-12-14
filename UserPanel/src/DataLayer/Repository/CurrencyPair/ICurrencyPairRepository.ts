import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddCurrencyPairModel } from "../../../DTO/CurrencyPair/AddCurrencyPair";
import { GetAllCurrencyPairFilter } from "../../../DTO/CurrencyPair/GetAllCurrencyPairFilter";
import { GetAllCurrencyPairList } from "../../../DTO/CurrencyPair/GetAllCurrencyPairList";
import { GetCurrencyPairInfoModel } from "../../../DTO/CurrencyPair/GetCurrencyPairInfo";
import { UpdateCurrencyPairModel } from "../../../DTO/CurrencyPair/UpdateCurrencyPair";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { ICurrencyPairDoc } from "../../Context/CurrencyPair/ICurrencyPairDoc";

export interface ICurrencyPairRepository {

    CreateCurrencyPair(item: AddCurrencyPairModel): Promise<OperationResult<boolean>>;
    UpdateCurrencyPair(item: UpdateCurrencyPairModel): Promise<OperationResult<boolean>>;
    DeleteCurrencyPair(id: string): Promise<OperationResult<boolean>>;
    GetAllCurrencyPairSelect(): Promise<OperationResult<ICurrencyPairDoc[]>>;
    GetAllCurrencyPairPaging(items: FilterViewModel<GetAllCurrencyPairFilter>): Promise<OperationResult<GetAllPagingModel<ICurrencyPairDoc>>>;
    GetByIdCurrencyPair(id: string, lang: string): Promise<OperationResult<GetCurrencyPairInfoModel>>;
    GetAllCurrencyPairs(): Promise<OperationResult<GetAllCurrencyPairList[]>>;
}