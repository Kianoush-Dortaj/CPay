import mongoose from 'mongoose';
import { UserActivityEnum } from '../../../DTO/UserActivity/UserActivityEnum';

export interface IComissionDoc extends mongoose.Document {
    userLevelId: any;
    actionType: UserActivityEnum;
    comission: number;
}