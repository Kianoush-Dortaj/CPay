import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";

export class Observable implements ISubject {

    public state!: number;
    private observers: IObserver[] = [];

    constructor() {

    }

    public attach(observer: IObserver): void {
        const isExist = this.observers.includes(observer);

        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        this.observers.push(observer);
    }

    public detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);

        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify(): void {

        for (const observer of this.observers) {
            observer.update('kianoush');
        }
    }


    public someBusinessLogic(): string {

        return 'kia';
    }

}