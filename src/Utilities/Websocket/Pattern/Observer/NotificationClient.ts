
import { IObserver } from "./IObserver";
import { ISubject } from "./ISubject";
import { Observable } from "./Observable";

export class NotificationClient implements IObserver {

    public async update(info: any): Promise<void> {

        console.log('Notification: Reacted to the event.', info);

    }

}