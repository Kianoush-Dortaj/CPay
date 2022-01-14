"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OperationResult_1 = __importDefault(require("../../../core/Operation/OperationResult"));
const Setting_1 = require("../../Context/Setting/Setting");
const RedisRepository_1 = __importDefault(require("./../../../Utilities/Redis/RedisRepository"));
class SettingRepository {
    /***
     *
     * Set Setting
     *
     ****/
    SetSetting(key, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = yield Setting_1.SettingEntitie.findOne({
                    field: key,
                });
                if (setting) {
                    const updateSetting = yield Setting_1.SettingEntitie.updateOne({ field: key }, { value: JSON.stringify(item) });
                    if (updateSetting) {
                        yield RedisRepository_1.default.ResetSingleItem(key, item);
                    }
                    return OperationResult_1.default.BuildSuccessResult("Success Set Setting", true);
                }
                else {
                    var newSetting = new Setting_1.SettingEntitie();
                    newSetting.field = key;
                    newSetting.value = JSON.stringify(item);
                    newSetting.save();
                    yield RedisRepository_1.default.Set(key, newSetting.value);
                    return OperationResult_1.default.BuildSuccessResult("Success Set Setting", true);
                }
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /***
     *
     * Get Setting
     *
     ****/
    GetSetting(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getRedisSetting = yield RedisRepository_1.default.Get(key);
                if (getRedisSetting.result) {
                    return OperationResult_1.default.BuildSuccessResult("Success Get Setting", getRedisSetting.result);
                }
                else {
                    const settingValue = Setting_1.SettingEntitie.findOne({ field: key }).select("value");
                    return OperationResult_1.default.BuildSuccessResult("Success Get Setting", settingValue);
                }
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = SettingRepository;
