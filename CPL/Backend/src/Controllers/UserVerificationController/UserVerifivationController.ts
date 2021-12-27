import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import unitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class UserVerificationController extends BaseController {

    constructor() {
        super();
    }


    /**********
*
* Get User Verification
*
************/
    async GetAllUserVerifications(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            let getAllrolePagingRole = await unitOfWork.UserVerification
                .getUServerificationList(req.body);


            if (getAllrolePagingRole.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllrolePagingRole.result !== undefined ? getAllrolePagingRole.result.length : 0,
                    data: getAllrolePagingRole.result
                }, '')

            }
            return this.BadRerquest(res, getAllrolePagingRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }

    }

}