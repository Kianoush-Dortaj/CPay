import { FileNode } from "../Permission/file-node";
import { GetRolePermissionForEdit } from "../RolePermission/GetRolePermissionForEdit";

export interface GetRoleInfoModel {
    id: string;
    name: string;
    permissions: FileNode[];
}