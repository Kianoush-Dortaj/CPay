import OperationResult from "../../../core/Operation/OperationResult";
import { AddComissionModel } from "../../../DTO/Comission/AddComission";
import { GetComissionInfoModel } from "../../../DTO/Comission/GetComissionInfo";
import { UpdateComissionModel } from "../../../DTO/Comission/UpdateComission";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { IComissionDoc } from "../../Context/Comission/IComissionDoc";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { GetAllComissionFilter } from "../../../DTO/Comission/GetAllComissionFilter";

export interface IComissionRepository {

    CreateComission(item: AddComissionModel): Promise<OperationResult<boolean>>;
    UpdateComission(item: UpdateComissionModel): Promise<OperationResult<boolean>>;
    DeleteComission(id: string): Promise<OperationResult<boolean>>;
    GetAllComissionPaging(items: FilterViewModel<GetAllComissionFilter>): Promise<OperationResult<GetAllPagingModel<any>>>;
    GetByIdComission(id: string): Promise<OperationResult<GetComissionInfoModel>>;

}