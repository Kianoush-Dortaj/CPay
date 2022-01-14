"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listen = void 0;
const listen_type_1 = require("./listen-type");
const CurrencyPairClient_1 = require("./Observer/CurrencyPairClient");
const IsTypingClient_1 = require("./Observer/IsTypingClient");
const MessageClient_1 = require("./Observer/MessageClient");
const Observable_1 = require("./Observer/Observable");
const ReadAllMessageDirect_1 = require("./Observer/ReadAllMessageDirect");
class Listen {
    constructor(type) {
        this.listenType = type;
        this.messageSubject = new Observable_1.Observable();
        this.typingSubject = new Observable_1.Observable();
        this.readAllMessageSubject = new Observable_1.Observable();
        this.currencyPairSubject = new Observable_1.Observable();
        this.messageClient = new MessageClient_1.MessageClient();
        this.messageSubject.attach(this.messageClient);
        this.currencyPairClient = new CurrencyPairClient_1.CurrencyPairClient();
        this.currencyPairSubject.attach(this.currencyPairClient);
        this.typingClient = new IsTypingClient_1.IsTypingClient();
        this.typingSubject.attach(this.typingClient);
        this.readAllMessageClient = new ReadAllMessageDirect_1.ReadAllMessageDirectClient();
        this.readAllMessageSubject.attach(this.readAllMessageClient);
    }
    listen(data) {
        switch (this.listenType) {
            case listen_type_1.ListenType.Initial:
                break;
            case listen_type_1.ListenType.UpdateCurrencyPairs:
                // data.data.senderId = data.userId;
                this.currencyPairClient.update('');
                this.currencyPairSubject.notify();
                break;
            case listen_type_1.ListenType.ReciveMessage:
                data.data.senderId = data.userId;
                this.messageClient.update(data.data);
                this.messageSubject.notify();
                break;
            case listen_type_1.ListenType.IsTyping:
                this.typingClient.update(data.data);
                this.typingSubject.notify();
                break;
            case listen_type_1.ListenType.ReadAllDirectMessage:
                this.readAllMessageClient.update(data.data);
                this.readAllMessageSubject.notify();
                break;
            default:
                break;
        }
    }
}
exports.Listen = Listen;
