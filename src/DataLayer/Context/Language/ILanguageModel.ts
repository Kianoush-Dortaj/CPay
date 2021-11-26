import { ILanguageAttrs } from "./ILanguageAttrs";
import { ILanguageDoc } from "./ILanguageDoc";
import mongoose from 'mongoose';

export interface ILanguageModel extends mongoose.Model<ILanguageDoc> {
    build(roleAttrs: ILanguageAttrs): ILanguageDoc;
}