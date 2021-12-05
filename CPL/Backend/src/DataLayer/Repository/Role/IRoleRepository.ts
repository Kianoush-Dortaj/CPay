import OperationResult from "../../../core/Operation/OperationResult";
import { AddRoleModel } from "../../../DTO/Role/AddRole";
import { GetRoleInfoModel } from "../../../DTO/Role/GetRoleInfo";
import { UpdateRoleModel } from "../../../DTO/Role/UpdateRole";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { IRoleDoc } from "../../Context/Role/IRoleDoc";

export interface IRoleRepository {

    CreateRole(item: AddRoleModel): Promise<OperationResult<boolean>>;
    UpdateRole(item: UpdateRoleModel): Promise<OperationResult<boolean>>;
    DeleteRole(id: string): Promise<OperationResult<boolean>>;
    GetAllRoleSelect(): Promise<OperationResult<IRoleDoc[]>>;
    GetAllRolePaging(page: any, pageSize: any): Promise<OperationResult<GetAllPagingModel<any>>>;
    GetByIdRole(id: string): Promise<OperationResult<GetRoleInfoModel>> ;
}