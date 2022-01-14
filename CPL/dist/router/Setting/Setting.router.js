"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SettingController_1 = __importDefault(require("../../Controllers/SettingController/SettingController"));
const Authorization_1 = __importDefault(require("./../../Utilities/Middllware/Authorization"));
const settingRouter = express_1.default.Router();
settingRouter.put("/SetRegisterSetting", 
// authController.AuthToken,
SettingController_1.default.SetRegisterSetting);
settingRouter.get("/GetRegisterSetting", 
// authController.AuthToken,
SettingController_1.default.GetRegisterSetting);
settingRouter.put("/SetActivationLinkSetting", Authorization_1.default.AuthToken, SettingController_1.default.SetLinkActivationSetting);
settingRouter.get("/GetActivationLinkSetting", Authorization_1.default.AuthToken, SettingController_1.default.GetLinkActivationSetting);
// router.put("/SetAccountSetting", atuhrization.AuthToken, SettingController.SetAthniticationSetting);
// router.get("/GetAccountSetting", atuhrization.AuthToken, SettingController.GetAthniticationSetting);
// router.put("/SetSliderSetting", atuhrization.AuthToken, SettingController.SetAthniticationSetting);
// router.get("/GetSliderSetting", atuhrization.AuthToken, SettingController.GetAthniticationSetting);
exports.default = settingRouter;
