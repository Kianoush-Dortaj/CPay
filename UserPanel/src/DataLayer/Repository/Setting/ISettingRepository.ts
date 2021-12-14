import OperationResult from "../../../core/Operation/OperationResult";

export interface ISettingRepository {

    SetSetting<T>(key: string, item: T): Promise<OperationResult<boolean>>;
    GetSetting<T>(key: string): Promise<OperationResult<any>>;

}