import { IUserLevelAttrs } from "./IUserLevelAttrs";
import { IUserLevelDoc } from "./IUserLevelDoc";
import mongoose from 'mongoose';

export interface IUserLevelModel extends mongoose.Model<IUserLevelDoc> {
    build(roleAttrs: IUserLevelAttrs): IUserLevelDoc;
}