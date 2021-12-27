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
                    count: getAllrolePagingRole.result !== undefined ? getAllrolePagingRole.result.count : 0,
                    data: getAllrolePagingRole.result
                }, '')

            }
            return this.BadRerquest(res, getAllrolePagingRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }

    }

    /**********
    *
    * Get User Verification By Id
    *
    ************/
    async GetByIdUserVerification(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userVerificationId = req.params.id;

            const getCountrybyId = await unitOfWork.UserVerification
                .getUServerificationById(userVerificationId);

            if (getCountrybyId.success) {
                return this.OkObjectResult(res, {
                    data: getCountrybyId.result
                }, "Get User Verification By Id");

            }
            return this.BadRerquest(res, getCountrybyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


        /**********
        *
        * Change User Verification Status
        *
        ************/
         async ChangeUserVerificationStatus(req: Request, res: Response, next: NextFunction) {

            let validationData = await this.ValidationAction(req, res);
    
            if (!validationData.haveError) {
    
                const userVerificationId = req.params.id;
                const {status , description} = req.body;
    
                const getCountrybyId = await unitOfWork.UserVerification
                    .changeUserVerificationStatus(userVerificationId,status,description);
    
                if (getCountrybyId.success) {
                    return this.OkObjectResult(res, {
                        data: getCountrybyId.result
                    }, "Change User status");
    
                }
                return this.BadRerquest(res, getCountrybyId.message);
    
            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        }

}