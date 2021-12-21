
import { IUserDoc } from "../../../Context/User/IUserDock";
import { IHandler } from "./IHandler";
import { ValidationContext } from "./ValidationContext";

export abstract class Handler implements IHandler {

    private nextHandler!: IHandler;

    setNext(handler: IHandler): IHandler {
        this.nextHandler = handler;

        return this.nextHandler;
    }
    
   async handle(request: IUserDoc): Promise<ValidationContext> {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                isGoogle2FA : false,
                token: ''
            },
            HaveError: false,
            Message: ''
        };
    }




}