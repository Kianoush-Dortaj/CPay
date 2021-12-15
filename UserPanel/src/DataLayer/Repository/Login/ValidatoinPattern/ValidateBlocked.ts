import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";


export class ValidateBlocked extends Handler {

   async handle(request: IUserDoc): Promise<ValidationContext> {

        if (!request.locked) {

            return super.handle(request);
        } else {
            if (request.lockedDate! < new Date(new Date().toUTCString())) {
            
                request.accountFail = 0;
                request.locked = false;
                request.lockedDate = undefined;
                request.save();
                return super.handle(request);
            } else {
                return {
                    Context: {
                        hash: '',
                        isTowfactor: false,
                        isGoogle2FA:false,
                        token: ''
                    },
                    HaveError: true,
                    Message: `Your Account Blocked to Date : ${request.lockedDate}`
                }
            }
        }

    }
}