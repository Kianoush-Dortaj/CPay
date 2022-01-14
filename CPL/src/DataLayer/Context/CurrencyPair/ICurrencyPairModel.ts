import { ICurrencyPairAttrs } from "./ICurrencyPairAttrs";
import { ICurrencyPairDoc } from "./ICurrencyPairDoc";
import mongoose from 'mongoose';

export interface ICurrencyPairModel extends mongoose.Model<ICurrencyPairDoc> {
    build(roleAttrs: ICurrencyPairAttrs): ICurrencyPairDoc;
}