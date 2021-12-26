import nodemailer from "nodemailer";
import OperationResult from "../../core/Operation/OperationResult";

export default class Email {

    static transporter: any;

    constructor() {

    }

    static Config(): void {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'cpay.payment.crypto@gmail.com',
                pass: 'k123456789d'
            }
        });
    }

    static async sendEmail(to: string, subject: string, data: any): Promise<OperationResult<any>> {

        try {
            return new Promise((resolve, reject) => {

                return this.transporter.sendMail({
                    to: to,
                    subject: subject,
                    text:'CPAT',
                    html: data.toString()
                }, function (error: any, info: any) {
                    if (error) {
                        reject(OperationResult.BuildFailur(error.message));
                    } else {
                        resolve(OperationResult.BuildSuccessResult("Email Sent", true));

                    }
                });
            });
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }


}