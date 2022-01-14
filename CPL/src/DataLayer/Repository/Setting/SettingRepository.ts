import OperationResult from "../../../core/Operation/OperationResult";
import { SettingEntitie } from "../../Context/Setting/Setting";
import RedisManager from './../../../Utilities/Redis/RedisRepository';
import { ISettingRepository } from "./ISettingRepository";

export default class SettingRepository implements ISettingRepository {

    /***
     *
     * Set Setting
     *
     ****/
    async SetSetting<T>(key: string, item: T): Promise<OperationResult<boolean>> {

        try {
            const setting = await SettingEntitie.findOne({
                field: key,
            });
            if (setting) {
                const updateSetting = await SettingEntitie.updateOne(
                    { field: key },
                    { value: JSON.stringify(item) });

                if (updateSetting) {
                    await RedisManager.ResetSingleItem<T>(key, item);
                }

                return OperationResult.BuildSuccessResult("Success Set Setting", true);

            } else {

                var newSetting = new SettingEntitie();
                newSetting.field = key;
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
    async GetSetting<T>(key: string): Promise<OperationResult<any>> {
        try {

            const getRedisSetting = await RedisManager.Get<T>(key);

            if (getRedisSetting.result) {

                return OperationResult.BuildSuccessResult("Success Get Setting", getRedisSetting.result);

            } else {

                const settingValue = SettingEntitie.findOne({ field: key }).select("value");

                return OperationResult.BuildSuccessResult("Success Get Setting", settingValue);

            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

}