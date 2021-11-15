
import mongoose from 'mongoose';
import ISettingAttr from './ISettingAttr';
import ISettingDoc from './ISettingDoc';

export interface ISettingModel extends mongoose.Model<ISettingDoc> {
    build(roleAttrs: ISettingAttr): ISettingDoc;
}