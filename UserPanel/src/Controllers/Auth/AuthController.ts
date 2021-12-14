
import { register } from "ts-node";
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { Request, Response, NextFunction } from 'express';

export default new class AuthController extends BaseController {



    async Create(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const { firstName, password, lastName, email, phoneNumber } = req.body;

            const createUser = await UnitOfWork.RegisterUserRepository.registerUser({
                firstName: firstName,
                password,
                lastName: lastName,
                email,
                phoneNumber
            });

            if (createUser.success) {
                return this.Ok(res, "Success Register User");
            } else {
                return this.BadRerquest(res, createUser.message);
            }

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    async ConfirmCode(req: Request, res: Response, next: NextFunction) {

        try {
            let confirmUser = await UnitOfWork.userRepository.CheckUserConfirmCode(req.params.email, req.params.hash);
            if (confirmUser.success) {
                return this.Ok(res, confirmUser.message);
            } else {
                return this.BadRerquest(res, confirmUser.message);
            }
        } catch (error:any) {
            return this.InternalServerError(res, error.message);
        }

    }

    async ResendActivationCode(req: Request, res: Response, next: NextFunction) {

        try {
            let confirmUser = await UnitOfWork.userRepository.Resendactivationcode(req.params.email);
            if (confirmUser.success) {
                return this.Ok(res, confirmUser.message);
            } else {
                return this.BadRerquest(res, confirmUser.message);
            }
        } catch (error:any) {
            return this.InternalServerError(res, error.message);
        }

    }



}