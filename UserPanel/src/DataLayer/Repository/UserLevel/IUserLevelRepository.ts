import OperationResult from "../../../core/Operation/OperationResult";
import { AddUserLevelModel } from "../../../DTO/UserLevel/AddUserLevel";
import { GetUserLevelInfoModel } from "../../../DTO/UserLevel/GetUserLevelInfo";
import { UpdateUserLevelModel } from "../../../DTO/UserLevel/UpdateUserLevel";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { IUserLevelDoc } from "../../Context/UserLevel/IUserLevelDoc";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { GetAllUserLevelFilter } from "../../../DTO/UserLevel/GetAllUserLevelFilter";

export interface IUserLevelRepository {

    CreateUserLevel(item: AddUserLevelModel): Promise<OperationResult<boolean>>;
    UpdateUserLevel(item: UpdateUserLevelModel): Promise<OperationResult<boolean>>;
    DeleteUserLevel(id: string): Promise<OperationResult<boolean>>;
    GetAllUserLevelSelect(): Promise<OperationResult<IUserLevelDoc[]>>;
    GetAllUserLevelPaging(items: FilterViewModel<GetAllUserLevelFilter>): Promise<OperationResult<GetAllPagingModel<any>>>;
    GetByIdUserLevel(id: string): Promise<OperationResult<GetUserLevelInfoModel>>;

}