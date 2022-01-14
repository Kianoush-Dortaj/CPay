import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddRoleModel } from "../../../DTO/Role/AddRole";
import { GetAllroleFilter } from "../../../DTO/Role/GetAllRoleFilter";
import { GetRoleInfoModel } from "../../../DTO/Role/GetRoleInfo";
import { UpdateRoleModel } from "../../../DTO/Role/UpdateRole";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { IRoleDoc } from "../../Context/Role/IRoleDoc";

export interface IRoleRepository {

    CreateRole(item: AddRoleModel): Promise<OperationResult<boolean>>;
    UpdateRole(item: UpdateRoleModel): Promise<OperationResult<boolean>>;
    DeleteRole(id: string): Promise<OperationResult<boolean>>;
    GetAllRoleSelect(): Promise<OperationResult<IRoleDoc[]>>;
    GetAllRolePaging(items: FilterViewModel<GetAllroleFilter>): Promise<OperationResult<any>>;
    GetByIdRole(id: string): Promise<OperationResult<GetRoleInfoModel>> ;
}