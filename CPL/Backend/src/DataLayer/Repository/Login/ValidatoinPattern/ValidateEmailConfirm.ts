import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";

export class ValidateEmailConfrim extends Handler {

    handle(request: IUserDoc): ValidationContext {
      
        if (request.confirmEmail) {
            return super.handle(request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                token: ''
            },
            HaveError:true,
            Message: 'Your Email is Not Confirm . Please Click on this link for Send Again Email Activation'
        }

    }

}