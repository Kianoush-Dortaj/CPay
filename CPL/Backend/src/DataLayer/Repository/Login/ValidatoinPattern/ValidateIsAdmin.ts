import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";


export class ValidateIsAdmin extends Handler {

    handle(request: IUserDoc): ValidationContext {

        if (request.isAdmin) {
            return super.handle(request);
        }

        return {
            Context: {
                hash: '',
                isTowfactor: false,
                token: ''
            },
            HaveError:true,
            Message: 'User Not Admin'
        }
    }


}