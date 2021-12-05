import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddExchangeModel } from "../../../DTO/Exchange/AddExchange";
import { GetAllExchangeFilter } from "../../../DTO/Exchange/GetAllExchangeFilter";
import { GetExchangeInfoModel } from "../../../DTO/Exchange/GetExchangeInfo";
import { UpdateExchangeModel } from "../../../DTO/Exchange/UpdateExchange";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { IExchangeDoc } from "../../Context/Exchange/IExchangeDoc";

export interface IExchangeRepository {

    CreateExchange(item: AddExchangeModel): Promise<OperationResult<boolean>>;
    UpdateExchange(item: UpdateExchangeModel): Promise<OperationResult<boolean>>;
    DeleteExchange(id: string): Promise<OperationResult<boolean>>;
    GetAllExchangeSelect(): Promise<OperationResult<IExchangeDoc[]>>;
    GetAllExchangePaging(items: FilterViewModel<GetAllExchangeFilter>): Promise<OperationResult<GetAllPagingModel<IExchangeDoc>>>;
    GetByIdExchange(id: string): Promise<OperationResult<GetExchangeInfoModel>>;
}