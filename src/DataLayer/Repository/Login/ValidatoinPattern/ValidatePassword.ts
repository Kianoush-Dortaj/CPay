import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import bcrypte from 'bcrypt';

export class ValidatePassword extends Handler {

    private password: string;
    constructor(password: string) {
        super();
        this.password = password;
    }

    handle(request: IUserDoc): ValidationContext {

        if (bcrypte.compareSync(this.password, request.password)) {
       
            return super.handle(request);
       
        } else {
            if (request.accountFail <= 5) {
                request.accountFail++;
            } else {
                request.locked = true;
                request.lockedDate = new Date(new Date().setUTCHours(72));
            }
            request.save();
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                token: ''
            },
            HaveError: true,
            Message: 'Username or password is not Valid'
        }
    }

}