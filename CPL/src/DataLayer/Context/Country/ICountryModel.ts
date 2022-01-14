import { ICountryAttrs } from "./ICountryAttrs";
import { ICountryDoc } from "./ICountryDoc";
import mongoose from 'mongoose';

export interface ICountryModel extends mongoose.Model<ICountryDoc> {
    build(roleAttrs: ICountryAttrs): ICountryDoc;
}