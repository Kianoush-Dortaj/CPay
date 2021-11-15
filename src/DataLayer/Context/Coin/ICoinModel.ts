import { ICoinAttrs } from "./ICoinAttrs";
import { ICoinDoc } from "./ICoinDoc";
import mongoose from 'mongoose';

export interface ICoinModel extends mongoose.Model<ICoinDoc> {
    build(roleAttrs: ICoinAttrs): ICoinDoc;
}