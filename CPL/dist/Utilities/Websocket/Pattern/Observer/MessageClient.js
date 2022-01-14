"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageClient = void 0;
class MessageClient {
    update(info) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.MessageClient = MessageClient;
