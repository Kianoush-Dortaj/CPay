
import express from 'express';
import SettingController from '../../Controllers/UserSettingController/UserSettingController';
import authController from '../../Utilities/Middllware/Authorization';

const settingRouter = express.Router();

settingRouter.put("/SetGoogleAuth2Fa",
    authController.AuthToken,
    SettingController.SetGoogleAuth2FASetting);

settingRouter.get("/GetGoogleAuth2Fa",
    authController.AuthToken,
    SettingController.GetGoogleAuth2FASetting);

settingRouter.put("/SetTwofactor",
    authController.AuthToken,
    SettingController.SetTwofactorSetting);

settingRouter.get("/GetTwofactor",
    authController.AuthToken,
    SettingController.GetTwofactorSetting);

settingRouter.put("/SetNotification",
    authController.AuthToken,
    SettingController.SetNotificationSetting);

settingRouter.get("/GetNotification",
    authController.AuthToken,
    SettingController.GetNotificationSetting);


export default settingRouter;
