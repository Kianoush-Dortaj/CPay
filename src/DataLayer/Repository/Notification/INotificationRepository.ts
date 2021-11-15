import OperationResult from "../../../core/Operation/OperationResult";
import { GetAllUnSeenNotificationbyUserIdModel } from "../../../DTO/Notification/GetAllUnSeenNotificationbyUserIdModel";
import { GetAllUnSeenNotificationModel } from "../../../DTO/Notification/GetAllUnSeenNotificationModel";

export interface INotificationRepository {

    SetNotification<T>(notificationType: any, reciverUserId: string, senderUserId: string , additionalData?:T): Promise<OperationResult<boolean>>;
    SeenNotification(notifId: string, userId: string): Promise<OperationResult<boolean>>;
    GetUnseenNotificationByUserId(userId: string): Promise<OperationResult<GetAllUnSeenNotificationbyUserIdModel[]>>;
    GetAllNotification(userId: string): Promise<OperationResult<GetAllUnSeenNotificationModel[]>>;

}