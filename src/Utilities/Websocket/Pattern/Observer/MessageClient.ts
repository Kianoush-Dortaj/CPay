
import UnitOfWork from "../../../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { MessageModel } from "../../../../DTO/Message/message-model";
import { ListenType } from "../listen-type";
import { IObserver } from "./IObserver";


export class MessageClient implements IObserver {

    public async update(info: any): Promise<void> {
        
        // let sendMessage = await UnitOfWork.messageRepository.sendMessage(info.directId, info.message, info.reciverId, info.senderId);

        // if (sendMessage.success) {

        //     UnitOfWork.websocket.sendMessageToUser<MessageModel>({
        //         data: {
        //             isRead: true,
        //             message: info.message,
        //             sendDate: new Date,
        //             youSend: false
        //         },
        //         type: ListenType.ReciveMessage
        //     }, info.reciverId);
        // }

    }

}