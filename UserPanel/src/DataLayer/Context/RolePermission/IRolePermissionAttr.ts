import IPermissionAttr from "../Permission/IPermissionAttrs";
import { IRoleAttrs } from "../Role/IRoleAttrs";

export interface IRolePermissionAttr {
    roleId: IRoleAttrs,
    permissionId: IPermissionAttr[]
}
