import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class PaymentController extends BaseController {

    constructor() {
        super();
    }

    /*** Payment ****/
    async Payment(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { fiatCurrenctId , amount, currency, cardNumber, expireMonth, expireYear, cvc } = req.body;

        if (!validationData.haveError) {

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const findUser = await UnitOfWork.userRepository.GetUserInfo(userId);

            if (findUser.success && findUser.result) {

                const userEmail = findUser.result.email;

                const payment = await UnitOfWork.PaymentGetway.payment(fiatCurrenctId, findUser.result.id, userEmail, amount, currency, cardNumber, expireMonth, expireYear, cvc);

                if (payment.success) {

                    return this.OkObjectResult(res, {
                        data: {
                            info: payment.result
                        }
                    }, "Success payment");

                }

                return this.BadRerquest(res, payment.message);
            }

            return this.BadRerquest(res, findUser.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Comission ****/
    async GetByIdPaymentTransaction(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const paymentGetwayId = req.params.id;

            const getPaymentTranactionbyId = await UnitOfWork.PaymentGetway
                .getPaymentInfoById(paymentGetwayId);

            if (getPaymentTranactionbyId.success) {
                return this.OkObjectResult(res, {
                    data: getPaymentTranactionbyId.result
                }, "Get PaymentTranactionby By Id");

            }
            return this.BadRerquest(res, getPaymentTranactionbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Comission ****/
    async GetByUserIdPaymentTransaction(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const getPaymentTranactionbyId = await UnitOfWork.PaymentGetway
                .getPaymentsInfoByUserId(userId);

            if (getPaymentTranactionbyId.success) {
                return this.OkObjectResult(res, {
                    data: getPaymentTranactionbyId.result
                }, "Get PaymentTranactionby By User Id");

            }
            return this.BadRerquest(res, getPaymentTranactionbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


}