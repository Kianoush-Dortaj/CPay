
import mongoose from 'mongoose';
import IPermissionAttr from './IPermissionAttrs';
import IPermissionDoc from "./IPermissionDoc";

export interface IPermissionModel extends mongoose.Model<IPermissionDoc> {
    build(roleAttrs: IPermissionAttr): IPermissionDoc;
}