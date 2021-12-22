import { GoogleAuthSetting } from "./google-auth.setting";
import { NotificationSetting } from "./notification.setting";
import { TwofactorSetting } from "./towfactor.setting";

export interface UserSettingModel {

    twofactor: TwofactorSetting;
    googleAuth: GoogleAuthSetting;
    notification: NotificationSetting;

}