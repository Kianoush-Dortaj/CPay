import { Schema, model, Document } from 'mongoose';
import { SETTING_ENUM } from '../../../DTO/Sertting/setting-enum';
import ISettingDoc from './ISettingDoc';
import { ISettingModel } from './ISettingModel';

const SettingSchema = new Schema({
    field: { type: String, enums: [SETTING_ENUM], require: true },
    value: { type: String, require: true },
});

export const SettingEntitie = model<ISettingDoc, ISettingModel>("Setting", SettingSchema);