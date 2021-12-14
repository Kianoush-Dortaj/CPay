
import OperationResult from "../../../core/Operation/OperationResult";
import { INotificationRepository } from "./INotificationRepository";
import { GetAllUnSeenNotificationbyUserIdModel } from "../../../DTO/Notification/GetAllUnSeenNotificationbyUserIdModel";
import { GetAllUnSeenNotificationModel } from "../../../DTO/Notification/GetAllUnSeenNotificationModel";
import websocket from "../../../Utilities/Websocket/Websocket";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { ListenType } from "../../../Utilities/Websocket/Pattern/listen-type";


export class NotificationRepository implements INotificationRepository {
    
    SetNotification<T>(notificationType: any, reciverUserId: string, senderUserId: string, additionalData?: T): Promise<OperationResult<boolean>> {
        throw new Error("Method not implemented.");
    }
    SeenNotification(notifId: string, userId: string): Promise<OperationResult<boolean>> {
        throw new Error("Method not implemented.");
    }
    GetUnseenNotificationByUserId(userId: string): Promise<OperationResult<GetAllUnSeenNotificationbyUserIdModel[]>> {
        throw new Error("Method not implemented.");
    }
    GetAllNotification(userId: string): Promise<OperationResult<GetAllUnSeenNotificationModel[]>> {
        throw new Error("Method not implemented.");
    }

    // async SetNotification<T>(notificationType: NotificationType, reciverUserId: string, senderUserId: string, additionalData?: T): Promise<OperationResult<boolean>> {

    //     try {

    //         let notification = await NotificationEntitie.build({
    //             createDate: new Date(),
    //             notificationType: notificationType,
    //             reciverUserId: reciverUserId,
    //             isSeen: false,
    //             senderUserId: senderUserId
    //         });


    //         await notification.save();

    //         await this.SendSocketNotification<T>(notification.id, additionalData);
    //         return OperationResult.BuildSuccessResult("Success Add Notification", true)

    //     } catch (error: any) {
    //         return OperationResult.BuildFailur(error.message)
    //     }

    // }

    // async SeenNotification(notifId: string, userId: string): Promise<OperationResult<boolean>> {

    //     try {

    //         await NotificationEntitie.updateOne({
    //             reciverUserId: userId,
    //             _id: notifId
    //         }, {
    //             $set: {
    //                 isSeen: true
    //             }
    //         });


    //         return OperationResult.BuildSuccessResult("Success Add Notification", true)

    //     } catch (error: any) {
    //         return OperationResult.BuildFailur(error.message)
    //     }

    // }

    // async GetUnseenNotificationByUserId(userId: string): Promise<OperationResult<GetAllUnSeenNotificationbyUserIdModel[]>> {

    //     try {

    //         let getAll: GetAllUnSeenNotificationbyUserIdModel[] = [];

    //         let getAllNotification = await NotificationEntitie
    //             .find({ isSeen: false, reciverUserId: userId })
    //             .populate("senderUserId");

    //         getAllNotification.map((res:any) => {
    //             getAll.push({
    //                 id: res.id,
    //                 // notificationType: res.notificationType,
    //                 senderId: res.senderUserId.id,
    //                 senderName: res.senderUserId.firstName + ' ' + res.senderUserId.lastName
    //             });
    //         });

    //         return OperationResult.BuildSuccessResult("Get All UnSeen Notification", getAll);

    //     } catch (error: any) {
    //         return OperationResult.BuildFailur(error.message)
    //     }

    // }

    // async GetAllNotification(userId: string): Promise<OperationResult<GetAllUnSeenNotificationModel[]>> {

    //     try {

    //         let getAll: GetAllUnSeenNotificationModel[] = [];

    //         let getAllNotification = await NotificationEntitie
    //             .find({ reciverUserId: userId })
    //             .populate("senderId");

    //         getAllNotification.map((res:any) => {
    //             getAll.push({
    //                 id: res.id,
    //                 // notificationType: res.notificationType,
    //                 senderId: res.senderUserId.id,
    //                 isSeen: res.isSeen,
    //                 senderName: res.senderUserId.firstName + ' ' + res.senderUserId.lastName
    //             });
    //         });

    //         return OperationResult.BuildSuccessResult("Get All UnSeen Notification", getAll);

    //     } catch (error: any) {
    //         return OperationResult.BuildFailur(error.message)
    //     }

    // }

    // async SendSocketNotification<T>(notificationId: string, additionalData?: T): Promise<OperationResult<boolean>> {

    //     try {


    //         let getNotification = await NotificationEntitie.
    //             findById(notificationId)
    //             .populate("senderUserId");

    //         if (getNotification) {
    //             UnitOfWork.websocket.sendMessageToUser<NotificationSocketModel<T>>({
    //                 data: {
    //                     id: getNotification.id,
    //                     notificationType: getNotification.notificationType,
    //                     senderId: getNotification.senderUserId.id,
    //                     senderName: getNotification.senderUserId.firstName + ' ' + getNotification.senderUserId.lastName,
    //                     additionalData: additionalData
    //                 },
    //                 type: ListenType.ChangeRequestStatus
    //             }, getNotification.reciverUserId);

    //             return OperationResult.BuildSuccessResult("send notification", true);

    //         }

    //         return OperationResult.BuildFailur("can not find Item");


    //     } catch (error: any) {
    //         return OperationResult.BuildFailur(error.message)
    //     }

    // }

    // // async sendNotif<T>(
    // //     notificationId: string,
    // //     notificationType: NotificationType,
    // //     senderName: string,
    // //     senderLastName: string,
    // //     senderId: string,
    // //     reciverUserId: string,
    // //     additionalData?: T): Promise<OperationResult<boolean>> {

    // //     try {


    // //         let getNotification = await NotificationEntitie.
    // //             findById(notificationId)
    // //             .populate("senderUserId");

    // //         if (getNotification) {
    // //             UnitOfWork.websocket.sendMessageToUser<NotificationSocketModel<T>>({
    // //                 data: {
    // //                     id: notificationId,
    // //                     notificationType: notificationType,
    // //                     senderId: senderId,
    // //                     senderName: senderName + ' ' + senderLastName,
    // //                     additionalData: additionalData
    // //                 },
    // //                 type: ListenType.ChangeRequestStatus
    // //             }, getNotification.reciverUserId);

    // //             return OperationResult.BuildSuccessResult("send notification", true);

    // //         }

    // //         return OperationResult.BuildFailur("can not find Item");


    // //     } catch (error: any) {
    // //         return OperationResult.BuildFailur(error.message)
    // //     }

    // // }


}
