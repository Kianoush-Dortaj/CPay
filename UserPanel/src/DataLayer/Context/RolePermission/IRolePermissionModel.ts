
import mongoose from 'mongoose';
import { IRolePermissionAttr } from './IRolePermissionAttr';
import { IRolePermissionDoc } from './IRolePermissionDoc';

export interface IRolePermissionModel extends mongoose.Model<IRolePermissionDoc> {
    build(roleAttrs: IRolePermissionAttr): IRolePermissionDoc;
}