import { FileNode } from "../Permission/file-node";
import { GetRolePermissionForEdit } from "../RolePermission/GetRolePermissionForEdit";

export interface GetLanguageInfoModel {
    id: string;
    name: string;
    displayOrder: number;
    isPublish: boolean;
    isDefault: boolean;
    rtl: boolean;
    uniqueSeoCode: string;
    flagImageFileName: string;
}