import OperationResult from "../../../core/Operation/OperationResult";
import { CreatRolePermission } from "../../../DTO/Permission/create-permission";
import { FileNode } from "../../../DTO/Permission/file-node";
import { UpdatePermission } from "../../../DTO/Permission/update_permission";
import IPermissionDoc from "../../Context/Permission/IPermissionDoc";

export interface IPermissionRepository {

    CreatePermission(value: CreatRolePermission): Promise<OperationResult<boolean>>;

    UpdatePermission(permission: UpdatePermission): Promise<OperationResult<boolean>>;

    DeletePermission(id: string): Promise<OperationResult<boolean>>;

    GetAllPermission(): Promise<OperationResult<FileNode[]>>;

    GetByIdPermission(id: string): Promise<OperationResult<IPermissionDoc | null>>;

}
