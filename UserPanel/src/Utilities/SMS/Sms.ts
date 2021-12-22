
import config from './../../Configs/index';
import { Twilio } from "twilio";

export default class Sms {

    static client: Twilio;

    constructor() { }

    static Initial(): void {
        this.client = new Twilio(config.smsconfig.accountSid, config.smsconfig.authToken);
    }

    static async sendMessage(text: string, to: string): Promise<void> {

        return new Promise((resolve, reject) => {

             this.client.messages.create({
                to: to,
                body: text,
                from: config.smsconfig.twilioNumber
            }).then((data:any)=>{
                resolve(data);
            })
            .catch((error:any)=>{
                reject(error.message)
            });

        });


    }


}