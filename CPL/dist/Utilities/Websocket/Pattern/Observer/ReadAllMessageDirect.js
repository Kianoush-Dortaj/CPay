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
exports.ReadAllMessageDirectClient = void 0;
class ReadAllMessageDirectClient {
    update(info) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(info);
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
        });
    }
}
exports.ReadAllMessageDirectClient = ReadAllMessageDirectClient;
