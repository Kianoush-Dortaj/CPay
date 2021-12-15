import OperationResult from "../../../core/Operation/OperationResult";
import { UserSettingEntitie } from "../../Context/UserSetting/UserSetting";
import RedisManager from '../../../Utilities/Redis/RedisRepository';
import { IUserSettingRepository } from "./IUserSettingRepository";

export default class UserSettingRepository implements IUserSettingRepository {

    /***
     *
     * Set Setting
     *
     ****/
    async SetSetting<T>(key: string, userId: string, item: T): Promise<OperationResult<boolean>> {

        try {

            const setting = await UserSettingEntitie.findOne({
                field: key,
            });

            if (setting) {
                const updateSetting = await UserSettingEntitie.updateOne(
                    { field: key, userId: userId },
                    { value: JSON.stringify(item) });

                if (updateSetting) {
                    await RedisManager.ResetSingleItem<T>(key, item);
                }

                return OperationResult.BuildSuccessResult("Success Set Setting", true);

            } else {

                var newSetting = new UserSettingEntitie();
                newSetting.field = key;
                newSetting.userId = userId;
                newSetting.value = JSON.stringify(item);
                newSetting.save();

                await RedisManager.Set(key, newSetting.value);
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