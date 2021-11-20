import { IComissionAttrs } from "./IComissionAttrs";
import { IComissionDoc } from "./IComissionDoc";
import mongoose from 'mongoose';

export interface IComissionModel extends mongoose.Model<IComissionDoc> {
    build(roleAttrs: IComissionAttrs): IComissionDoc;
}