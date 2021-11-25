import nodemailer from "nodemailer";
import OperationResult from "../../core/Operation/OperationResult";
import { SETTING_ENUM } from "../../DTO/Sertting/setting-enum";
import RedisRepository from "../Redis/RedisRepository";

export default new class NodeMailer {

    transporter: any;

    constructor() {

    }

    Config(): void {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cpay.payment.crypto@gmail.com',
                pass: 'k123456789d' 
            }
        });
    }

    async sendActivationCodeEmail(to: string, subject: string, name: string, text: string): Promise<OperationResult<any>> {

        const activatoinLink = await RedisRepository.Get(SETTING_ENUM.ACTIVATION_LINK);

        return this.transporter.sendMail({
            to: to,
            subject: subject,
            text: text,
            html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
            <a href=${activatoinLink.result}/${to}/${text}> Click here</a>
            </div>`
        }, function (error: any, info: any) {
            if (error) {
                return new OperationResult<any>(false, error);
            } else {
                return new OperationResult<any>(true, "Email Sent");

            }
        });
    }

    sendTwofactorCode(to: string, subject: string, name: string, code: string): Promise<OperationResult<any>> {
        return this.transporter.sendMail({
            to: to,
            subject: subject,
            html: `<h1>Twofactor Code</h1>
            <h2>Hello ${name}</h2>
            <p>This is your twofactor Code for Login in TravelBudy Website </p>
            <h1>${code}</h1>
            <p>This code Will be Expire in 2 Minutes </p>
            </div>`
        }, function (error: any, info: any) {
            if (error) {
                return new OperationResult<any>(false, error);
            } else {
                return new OperationResult<any>(true, "Email Sent");

            }
        });
    }


}