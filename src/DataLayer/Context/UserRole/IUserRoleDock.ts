import mongoose from 'mongoose';
import { IRoleDoc } from '../Role/IRoleDoc';
import { IUserDoc } from '../User/IUserDock';

export interface IUserRoleDoc extends mongoose.Document {
    roles: string[];
    userId: string;
}