
import { register } from "ts-node";
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { Request, Response, NextFunction } from 'express';

export default new class AuthController extends BaseController {



    async RegisterUser(req: Request, res: Response, next: NextFunction) {

        try {

            let validation = await this.ValidationAction(req, res);
            if (!validation.haveError) {
                const { email, name, gender, family, password } = req.body;

                let registerUser = await UnitOfWork.adminRepository.RegisterAdmin({
                    email: email,
                    name: name,
                    gender: gender,
                    family: family,
                    password: password,
                    roles:['']
                })

                if (registerUser.success) {
                    return this.Ok(res, registerUser.message);
                } else {
                    return this.BadRerquest(res, registerUser.message);
                }
            }
            return this.BadRerquest(res, validation.errorMessage[0]);

        } catch (error:any) {
            return this.InternalServerError(res, error.message);
        }

    }

    async ConfirmCode(req: Request, res: Response, next: NextFunction) {

        try {
            let confirmUser = await UnitOfWork.adminRepository.CheckUserConfirmCode(req.params.email, req.params.hash);
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
            let confirmUser = await UnitOfWork.adminRepository.Resendactivationcode(req.params.email);
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