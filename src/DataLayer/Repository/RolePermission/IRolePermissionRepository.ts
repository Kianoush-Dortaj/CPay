import OperationResult from "../../../core/Operation/OperationResult";
import { FileNode } from "../../../DTO/Permission/file-node";
import { GetRolePermissionForEdit } from "../../../DTO/RolePermission/GetRolePermissionForEdit";
import { UpdateRolePermission } from "../../../DTO/RolePermission/UpdateRolePermission";
import { IRolePermissionDoc } from "../../Context/RolePermission/IRolePermissionDoc";

export interface IRolePermissionRepository {

    UpdatePermission(item: UpdateRolePermission): Promise<OperationResult<string>>

    GetRolePermissionsByRoleId(id: any): Promise<OperationResult<IRolePermissionDoc[]>>;

    GetAllRolePermissionForEdit(selectedPermission: any) : Promise<OperationResult<FileNode[]>> ;
}