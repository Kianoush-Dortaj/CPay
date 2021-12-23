import OperationResult from "../../../core/Operation/OperationResult";
import { UserSettingEntitie } from "../../Context/UserSetting/UserSetting";
import RedisManager from '../../../Utilities/Redis/RedisRepository';
import { IUserSettingRepository } from "./IUserSettingRepository";
import { USER_SETTING_ENUM } from "../../../DTO/UserSetting/user-setting-enum";
import { UserSettingAuthGoogle2FA } from "../../../DTO/UserSetting/user-setting-register-user-role";
import { SpeakEeasy } from './../../../Utilities/Speakeasy/SpeakEasyConfig';
import { UserSettingModel } from "../../../DTO/UserSetting/user-setting-model";
import { GoogleAuthSetting } from "../../../DTO/UserSetting/google-auth.setting";


export default class UserSettingRepository implements IUserSettingRepository {

    async setGoogleAuthSetting(userId: string, isEnable: boolean): Promise<OperationResult<any>> {

        try {

            let setting = await UserSettingEntitie.findOne({ userId: userId });
            const tempSecret = SpeakEeasy.generate();

            if (setting) {

                const settingPars = JSON.parse(setting.value);
                settingPars.googleAuth.isEnable = isEnable;
                settingPars.googleAuth.secretKey = tempSecret;
                setting.value = JSON.stringify(settingPars);

                setting.save();

                await RedisManager.ResetSingleItem(USER_SETTING_ENUM.USER_SETTING + userId, setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', tempSecret);
            }
            return OperationResult.BuildSuccessResult('We can not find setting for this user', true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async getGoogleAuthSetting(userId: string): Promise<OperationResult<GoogleAuthSetting>> {

        try {

            const getRedisSetting = await RedisManager.Get<any>(USER_SETTING_ENUM.USER_SETTING + userId);

            if (getRedisSetting.success) {
                if (getRedisSetting.result) {
                    const settingPars = JSON.parse(JSON.parse(getRedisSetting.result)) as UserSettingModel;

                    return OperationResult.BuildSuccessResult("Success Get Setting", {
                        isEnable: settingPars.googleAuth.isEnable,
                        secretKey: settingPars.googleAuth.secretKey
                    });
                }
            }

            let setting = await UserSettingEntitie.findOne({ userId: userId });

            if (setting) {

                const settingPars = JSON.parse(setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', settingPars.googleAuth.isEnable);
            }
            return OperationResult.BuildFailur('We can not find setting for this user');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async setTwofactorSetting(userId: string, isEnable: boolean): Promise<OperationResult<any>> {

        try {

            let setting = await UserSettingEntitie.findOne({ userId: userId });
            const tempSecret = SpeakEeasy.generate();

            if (setting) {

                const settingPars = JSON.parse(setting.value);
                settingPars.twofactor.isEnable = isEnable;
                setting.value = JSON.stringify(settingPars);

                setting.save();

                await RedisManager.ResetSingleItem(USER_SETTING_ENUM.USER_SETTING + userId, setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', tempSecret);
            }
            return OperationResult.BuildSuccessResult('We can not find setting for this user', true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async getTwofactorSetting(userId: string): Promise<OperationResult<boolean>> {

        try {

            const getRedisSetting = await RedisManager.Get<any>(USER_SETTING_ENUM.USER_SETTING + userId);

            if (getRedisSetting.success) {
                if (getRedisSetting.result) {

                    const settingPars = JSON.parse(JSON.parse(getRedisSetting.result)) as UserSettingModel;

                    return OperationResult.BuildSuccessResult("Success Get Setting", settingPars.twofactor.isEnable);
                }
            }

            let setting = await UserSettingEntitie.findOne({ userId: userId });

            if (setting) {

                const settingPars = JSON.parse(setting.value);

                return OperationResult.BuildSuccessResult('Success Update UserSetting', settingPars.googleAuth.isEnable);
            }
            return OperationResult.BuildFailur('We can not find setting for this user');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    /***
     *
     * Set Setting
     *
     ****/
    async SetSetting<T>(userId: string, item: T): Promise<OperationResult<boolean>> {

        try {

            const setting = await UserSettingEntitie.findOne({
                userId: userId
            });

            if (setting) {
                const updateSetting = await UserSettingEntitie.updateOne(
                    { userId: userId },
                    { value: JSON.stringify(item) });

                if (updateSetting) {
                    await RedisManager.ResetSingleItem<T>(USER_SETTING_ENUM.USER_SETTING + userId, item);
                }

                return OperationResult.BuildSuccessResult("Success Set Setting", true);

            } else {

                var newSetting = new UserSettingEntitie();
                newSetting.userId = userId;
                newSetting.value = JSON.stringify(item);
                newSetting.save();

                await RedisManager.Set(USER_SETTING_ENUM.USER_SETTING + userId, newSetting.value);
                return OperationResult.BuildSuccessResult("Success Set Setting", true);

            }
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }
    /***
     *
     * Get Setting
     *
     ****/
    async GetSetting<T>(key: string, userId: string): Promise<OperationResult<any>> {
        try {

            const getRedisSetting = await RedisManager.Get<T>(key);

            if (getRedisSetting.result) {

                return OperationResult.BuildSuccessResult("Success Get Setting", getRedisSetting.result);

            } else {

                const settingValue = UserSettingEntitie.findOne({ field: key, userId: userId }).select("value");

                return OperationResult.BuildSuccessResult("Success Get Setting", settingValue);

            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

}