import { ListenDataModel } from "../../../DTO/Websocket/listen-data-model";
import { ListenType } from "./listen-type";
import { CurrencyPairClient } from "./Observer/CurrencyPairClient";
import { IsTypingClient } from "./Observer/IsTypingClient";
import { MessageClient } from "./Observer/MessageClient";
import { NotificationClient } from "./Observer/NotificationClient";
import { Observable } from "./Observer/Observable";
import { ReadAllMessageDirectClient } from "./Observer/ReadAllMessageDirect";
import { RequestClient } from "./Observer/RequestClient";

export class Listen {

    listenType: ListenType;
    messageSubject: Observable;
    typingSubject: Observable;
    readAllMessageSubject: Observable;
    currencyPairSubject: Observable;

    currencyPairClient: CurrencyPairClient;
    messageClient: MessageClient;
    typingClient: IsTypingClient;
    readAllMessageClient: ReadAllMessageDirectClient;


    constructor(type: ListenType) {

        this.listenType = type;

        this.messageSubject = new Observable();
        this.typingSubject = new Observable();
        this.readAllMessageSubject = new Observable();
        this.currencyPairSubject = new Observable();


        this.messageClient = new MessageClient();
        this.messageSubject.attach(this.messageClient);

        this.currencyPairClient = new CurrencyPairClient();
        this.currencyPairSubject.attach(this.currencyPairClient);

        this.typingClient = new IsTypingClient();
        this.typingSubject.attach(this.typingClient);

        this.readAllMessageClient = new ReadAllMessageDirectClient();
        this.readAllMessageSubject.attach(this.readAllMessageClient);
    }

    listen(data: ListenDataModel): void {

        switch (this.listenType) {

            case ListenType.Initial:
                break;
            case ListenType.UpdateCurrencyPairs:
                // data.data.senderId = data.userId;
                this.currencyPairClient.update('');
                this.currencyPairSubject.notify();
                break;
            case ListenType.ReciveMessage:
                data.data.senderId = data.userId;
                this.messageClient.update(data.data);
                this.messageSubject.notify();
                break;
            case ListenType.IsTyping:
                this.typingClient.update(data.data);
                this.typingSubject.notify();
                break;
            case ListenType.ReadAllDirectMessage:
                this.readAllMessageClient.update(data.data);
                this.readAllMessageSubject.notify();
                break;

            default:
                break;


        }
    }


}