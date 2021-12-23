import OperationResult from "../../../core/Operation/OperationResult";
import { GoogleAuthSetting } from "../../../DTO/UserSetting/google-auth.setting";

export interface IUserSettingRepository {

    SetSetting<T>(userId: string, item: T): Promise<OperationResult<boolean>>;
    GetSetting<T>(key: string, userId: string): Promise<OperationResult<any>>;
    getGoogleAuthSetting(userId: string): Promise<OperationResult<GoogleAuthSetting>>;
    setGoogleAuthSetting(userId: string, isEnable:boolean): Promise<OperationResult<any>>;
    setTwofactorSetting(userId: string, isEnable: boolean): Promise<OperationResult<any>>;
    getTwofactorSetting(userId: string): Promise<OperationResult<boolean>>;
}