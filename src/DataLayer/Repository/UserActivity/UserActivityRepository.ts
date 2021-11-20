import OperationResult from "../../../core/Operation/OperationResult";
import utility from './../../../Utilities/Util';
import { UserActivityEnum } from "../../../DTO/UserActivity/UserActivityEnum";
import { IUserActivityRepository } from "./IUserActivityRepository";

export default class SettingRepository implements IUserActivityRepository {

    /***
     *
     * Set Setting
     *
     ****/
    async GetAllUserActivitySelect(): Promise<OperationResult<any>> {

        try {

            const getUserActivity = utility.convertEnumToArray(UserActivityEnum);
            console.log(getUserActivity)
            return OperationResult.BuildSuccessResult("Get All User Activity Setting", getUserActivity);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

}