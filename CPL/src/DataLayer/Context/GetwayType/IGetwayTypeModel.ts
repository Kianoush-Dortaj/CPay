import { IGetwayTypeAttrs } from "./IGetwayTypeAttrs";
import { IGetwayTypeDoc } from "./IGetwayTypeDoc";
import mongoose from 'mongoose';

export interface IGetwayTypeModel extends mongoose.Model<IGetwayTypeDoc> {
    build(roleAttrs: IGetwayTypeAttrs): IGetwayTypeDoc;
}