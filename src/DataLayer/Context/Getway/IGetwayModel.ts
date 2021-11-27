import { IGetwayAttrs } from "./IGetwayAttrs";
import { IGetwayDoc } from "./IGetwayDoc";
import mongoose from 'mongoose';

export interface IGetwayModel extends mongoose.Model<IGetwayDoc> {
    build(roleAttrs: IGetwayAttrs): IGetwayDoc;
}