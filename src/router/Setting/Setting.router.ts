
import express from 'express';
import SettingController from '../../Controllers/SettingController/SettingController';
import authController from './../../Utilities/Middllware/Authorization';

const settingRouter = express.Router();

settingRouter.put("/SetRegisterSetting",
    authController.AuthToken,
    SettingController.SetRegisterSetting);

settingRouter.get("/GetRegisterSetting",
    authController.AuthToken,
    SettingController.GetRegisterSetting);

settingRouter.put("/SetActivationLinkSetting",
    authController.AuthToken,
    SettingController.SetLinkActivationSetting);

settingRouter.get("/GetActivationLinkSetting",
    authController.AuthToken,
    SettingController.GetLinkActivationSetting);

// router.put("/SetAccountSetting", atuhrization.AuthToken, SettingController.SetAthniticationSetting);
// router.get("/GetAccountSetting", atuhrization.AuthToken, SettingController.GetAthniticationSetting);

// router.put("/SetSliderSetting", atuhrization.AuthToken, SettingController.SetAthniticationSetting);
// router.get("/GetSliderSetting", atuhrization.AuthToken, SettingController.GetAthniticationSetting);

export default settingRouter;
