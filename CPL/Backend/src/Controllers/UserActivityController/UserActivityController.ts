import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { SETTING_ENUM } from "../../DTO/Sertting/setting-enum";
import { SettingRegisterUserRole } from '../../DTO/Sertting/setting-register-user-role';
import unitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class UserActivityController extends BaseController {

    constructor() {
        super();
    }

    /**********
     *
     * Set Register Setting
     *
     ************/
    async GetUserActivitySelect(req: Request, res: Response, next: NextFunction) {
        try {


            const getAllUserActivity = await unitOfWork.UserActivityRepositiry
                .GetAllUserActivitySelect();

            if (getAllUserActivity.success) {
                return this.OkObjectResult(res, {
                    data: getAllUserActivity.result
                }, "Success Set Setting");
            }

            return this.BadRerquest(res, getAllUserActivity.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

}