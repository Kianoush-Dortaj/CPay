import { ISubject } from "./ISubject";

export interface IObserver {

    update(info : any): Promise<void>;
}