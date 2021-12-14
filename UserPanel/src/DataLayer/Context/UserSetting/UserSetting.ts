import { Schema, model, Document } from 'mongoose';
import { USER_SETTING_ENUM } from '../../../DTO/UserSetting/user-setting-enum';
import IUserSettingDoc from './IUserSettingDoc';
import { IUserSettingModel } from './IUserSettingModel';

const UserSettingSchema = new Schema({
    field: { type: String, enums: [USER_SETTING_ENUM], require: true },
    value: { type: String, require: true },
});

export const UserSettingEntitie = model<IUserSettingDoc, IUserSettingModel>("UserSetting", UserSettingSchema);