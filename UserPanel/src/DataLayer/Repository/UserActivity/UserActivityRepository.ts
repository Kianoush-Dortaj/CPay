import OperationResult from "../../../core/Operation/OperationResult";
import utility from './../../../Utilities/Util';
import { UserActivityEnum } from "../../../DTO/UserActivity/UserActivityEnum";
import { IUserActivityRepository } from "./IUserActivityRepository";
import UtilService from "./../../../Utilities/Util";

export default class SettingRepository implements IUserActivityRepository {

    /***
     *
     * Set Setting
     *
     ****/
    async GetAllUserActivitySelect(): Promise<OperationResult<any>> {

        try {

            const getUserActivity = UtilService.convertEnumToArray(UserActivityEnum);
            console.log(getUserActivity)
            return OperationResult.BuildSuccessResult("Get All User Activity Setting", getUserActivity);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

}