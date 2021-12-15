import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";

export class ValidateEmailConfrim extends Handler {

    async handle(request: IUserDoc): Promise<ValidationContext> {
      
        if (request.confirmEmail) {
            return super.handle(request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                isGoogle2FA:false,
                token: ''
            },
            HaveError:true,
            Message: 'Your Email is Not Confirm . Please Click on this link for Send Again Email Activation'
        }

    }

}