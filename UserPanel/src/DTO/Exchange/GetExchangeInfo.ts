import { FileNode } from "../Permission/file-node";
import { GetRolePermissionForEdit } from "../RolePermission/GetRolePermissionForEdit";

export interface GetExchangeInfoModel {
    id: string;
    name: string;
    symbol: string;
    isPublish : boolean;
}