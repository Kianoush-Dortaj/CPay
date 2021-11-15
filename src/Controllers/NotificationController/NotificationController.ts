
import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class RequestController extends BaseController {


    async GetAllUnSeenNotificationByUserId(req: Request, res: Response, next: NextFunction) {


        try {

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            let getAllUnSeenNotificationByUserId = await UnitOfWork.NotificationRepository.GetUnseenNotificationByUserId(userId);

            if (getAllUnSeenNotificationByUserId.success) {
                return this.OkObjectResult(res, {
                    data: getAllUnSeenNotificationByUserId.result
                }, getAllUnSeenNotificationByUserId.message);
            }

            return this.BadRerquest(res, getAllUnSeenNotificationByUserId.message)

        } catch (error: any) {
            return this.BadRerquest(res, error.message);
        }

    }

    async GetAllNotification(req: Request, res: Response, next: NextFunction) {


        try {

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            let getAllUnSeenNotificationByUserId = await UnitOfWork.NotificationRepository.GetAllNotification(userId);

            if (getAllUnSeenNotificationByUserId.success) {
                return this.OkObjectResult(res, {
                    data: getAllUnSeenNotificationByUserId.result
                }, getAllUnSeenNotificationByUserId.message);
            }

            return this.BadRerquest(res, getAllUnSeenNotificationByUserId.message)

        } catch (error: any) {
            return this.BadRerquest(res, error.message);
        }

    }

    async SeenNotification(req: Request, res: Response, next: NextFunction) {


        try {

            const notifId = req.params.id;
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            let getAllUnSeenNotificationByUserId = await UnitOfWork.NotificationRepository.SeenNotification(notifId, userId);

            if (getAllUnSeenNotificationByUserId.success) {

                return this.OkObjectResult(res, {
                    data: getAllUnSeenNotificationByUserId.result
                }, getAllUnSeenNotificationByUserId.message);

            }

            return this.BadRerquest(res, getAllUnSeenNotificationByUserId.message)

        } catch (error: any) {
            return this.BadRerquest(res, error.message);
        }

    }



}