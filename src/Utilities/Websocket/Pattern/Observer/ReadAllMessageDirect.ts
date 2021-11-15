
import UnitOfWork from "../../../../DataLayer/Repository/UnitOfWork/UnitOfWork";
import { MessageModel } from "../../../../DTO/Message/message-model";
import { ReadAllMessageDirect } from "../../../../DTO/Message/read-all-message-direct";
import { ListenType } from "../listen-type";
import { IObserver } from "./IObserver";


export class ReadAllMessageDirectClient implements IObserver {

    public async update(info: any): Promise<void> {

        console.log(info)
        // let sendMessage = await UnitOfWork.messageRepository.ReadAllDirectMessage(info.directId,info.userId);

        // if (sendMessage.success) {

        //     UnitOfWork.websocket.sendMessageToUser<ReadAllMessageDirect>({
        //         data: {
        //             userId: info.userId,
        //             value: true
        //         },
        //         type: ListenType.ReadAllDirectMessage
        //     }, info.sendto);
        // }

    }

}