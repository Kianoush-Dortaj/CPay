import { IFiatCurrencyAttrs } from "./IFiatCurrencyAttrs";
import { IFiatCurrencyDoc } from "./IFiatCurrencyDoc";
import mongoose from 'mongoose';

export interface IFiatCurrencyModel extends mongoose.Model<IFiatCurrencyDoc> {
    build(roleAttrs: IFiatCurrencyAttrs): IFiatCurrencyDoc;
}