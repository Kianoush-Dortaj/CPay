
import mongoose from 'mongoose';
import IPermissionAttr from '../Permission/IPermissionAttrs';
import { IRoleAttrs } from '../Role/IRoleAttrs';

export interface IRolePermissionDoc extends mongoose.Document {
    roleId: IRoleAttrs,
    permissionId: IPermissionAttr[]
}
