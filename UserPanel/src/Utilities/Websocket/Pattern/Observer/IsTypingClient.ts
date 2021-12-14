
import UnitOfWork from "../../../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { IsTypingModel } from "../../../../DTO/Direct/typing-model";
import { MessageModel } from "../../../../DTO/Message/message-model";
import { ListenType } from "../listen-type";
import { IObserver } from "./IObserver";


export class IsTypingClient implements IObserver {

    public async update(info: any): Promise<void> {


        UnitOfWork.websocket.sendMessageToUser<IsTypingModel>({
            data: {
                directionId: info.directionId,
                isType: info.isType,
                sendTo: info.sendTo
            },
            type: ListenType.IsTyping
        }, info.sendTo);

    }

}