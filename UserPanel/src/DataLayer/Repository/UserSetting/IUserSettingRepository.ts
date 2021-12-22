import OperationResult from "../../../core/Operation/OperationResult";

export interface IUserSettingRepository {

    SetSetting<T>(userId: string, item: T): Promise<OperationResult<boolean>>;
    GetSetting<T>(key: string, userId: string): Promise<OperationResult<any>>;

}