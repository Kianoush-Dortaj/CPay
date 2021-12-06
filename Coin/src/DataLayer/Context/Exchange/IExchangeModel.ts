import { IExchangeAttrs } from "./IExchangeAttrs";
import { IExchangeDoc } from "./IExchangeDoc";
import mongoose from 'mongoose';

export interface IExchangeModel extends mongoose.Model<IExchangeDoc> {
    build(roleAttrs: IExchangeAttrs): IExchangeDoc;
}