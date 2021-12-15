
import express from 'express';
import SettingController from '../../Controllers/UserSettingController/UserSettingController';
import authController from '../../Utilities/Middllware/Authorization';

const settingRouter = express.Router();

settingRouter.put("/SetGoogleAuth2Fa",
    authController.AuthToken,
    SettingController.SetRegisterSetting);

settingRouter.get("/GetGoogleAuth2Fa",
    authController.AuthToken,
    SettingController.GetRegisterSetting);

export default settingRouter;
