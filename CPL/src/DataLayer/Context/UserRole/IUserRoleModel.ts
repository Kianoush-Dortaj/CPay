import mongoose from 'mongoose';
import { IUserRoleAttrs } from './IUserRoleAttr';
import { IUserRoleDoc } from './IUserRoleDock';

export interface IUserRoleModel extends mongoose.Model<IUserRoleDoc> {
    build(UserRoleAttrs: IUserRoleAttrs): IUserRoleDoc;
}
