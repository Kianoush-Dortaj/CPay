import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import unitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import qrCode from 'qrcode';

export default new class SettingController extends BaseController {

    constructor() {
        super();
    }

    /**********
    *
    * Set Phone number
    *
    ************/
    async SetPhoneNumber(req: Request, res: Response, next: NextFunction) {
        try {

            const { phoneNumber } = req.body;

            let userId = (await unitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const setPhoneNumber = await unitOfWork.UserVerification
                .setPhoneNumber(userId, phoneNumber);

            if (setPhoneNumber.success) {
                return this.OkObjectResult(res, {
                    data: {
                        hash: setPhoneNumber.result
                    }
                }, setPhoneNumber.message);
            }

            return this.BadRerquest(res, setPhoneNumber.message);

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
    *
    * Check Phone number
    *
    ************/
    async CheckActivePhoneNumber(req: Request, res: Response, next: NextFunction) {
        try {

            const { phoneNumber, hash, code } = req.body;

            let userId = (await unitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const setPhoneNumber = await unitOfWork.UserVerification
                .checkPhoneNumber(userId, code, hash, phoneNumber);

            if (setPhoneNumber.success) {
                return this.Ok(res, setPhoneNumber.message);
            }

            return this.BadRerquest(res, setPhoneNumber.message);

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
    *
    * Send Verification
    *
    ************/
    async SendVerification(req: Request, res: Response, next: NextFunction) {
        try {

            const { backImage,
                birthDate,
                frontImage,
                image,
                nationality,
                selfieImage,
                typeVerification } = req.body;

            let userId = (await unitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const sendVerification = await unitOfWork.UserVerification
                .verification(userId, {
                    backImage,
                    birthDate,
                    frontImage,
                    image,
                    nationality,
                    selfieImage,
                    typeVerification
                });

            if (sendVerification.success) {
                return this.OkObjectResult(res, {
                    data: sendVerification.result
                }, sendVerification.message);
            }

            return this.BadRerquest(res, sendVerification.message);

        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

}