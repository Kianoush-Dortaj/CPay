import { FileNode } from "../Permission/file-node";
import { GetRolePermissionForEdit } from "../RolePermission/GetRolePermissionForEdit";

export interface GetFiatAssetInfoModel {
    walletAddress: string;
    inventory: string;
    isActive: boolean;
    currency: string;
    userId: string;
    id: string;
}