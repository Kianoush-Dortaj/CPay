import OperationResult from "../../../core/Operation/OperationResult";
import { GetNotificationSetting } from "../../../DTO/UserSetting/get-notification.setting";
import { GoogleAuthSetting } from "../../../DTO/UserSetting/google-auth.setting";
import { NotificationSetting } from "../../../DTO/UserSetting/notification.setting";

export interface IUserSettingRepository {

    SetSetting<T>(userId: string, item: T): Promise<OperationResult<boolean>>;
    GetSetting<T>(key: string, userId: string): Promise<OperationResult<any>>;
    getGoogleAuthSetting(userId: string): Promise<OperationResult<GoogleAuthSetting>>;
    setGoogleAuthSetting(userId: string, isEnable:boolean): Promise<OperationResult<any>>;
    setTwofactorSetting(userId: string, isEnable: boolean): Promise<OperationResult<any>>;
    getTwofactorSetting(userId: string): Promise<OperationResult<boolean>>;
    setNotificationSetting(userId: string, item: NotificationSetting): Promise<OperationResult<any>>;
    getNotificationSetting(userId: string): Promise<OperationResult<GetNotificationSetting>>
}