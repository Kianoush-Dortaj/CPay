import mongoose from 'mongoose';
import { IRoleDoc } from '../Role/IRoleDoc';
import { IUserDoc } from '../User/IUserDock';

export interface IUserActiveLevelDoc extends mongoose.Document {
    userLevel:any;
    userId: any;
}