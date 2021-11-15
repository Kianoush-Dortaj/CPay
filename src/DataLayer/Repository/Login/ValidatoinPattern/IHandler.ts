
import { IUserDoc } from "../../../Context/User/IUserDock";
import { ValidationContext } from "./ValidationContext";

export interface IHandler {
    setNext(handler: IHandler): IHandler;

    handle(request: IUserDoc): ValidationContext;
}