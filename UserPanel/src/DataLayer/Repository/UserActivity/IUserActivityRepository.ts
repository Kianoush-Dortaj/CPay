import OperationResult from "../../../core/Operation/OperationResult";

export interface IUserActivityRepository {

    GetAllUserActivitySelect(): Promise<OperationResult<boolean>>;

}