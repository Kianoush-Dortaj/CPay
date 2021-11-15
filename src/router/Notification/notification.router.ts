import express, { Express, Router, NextFunction, Request, Response } from 'express';
import notificationController from '../../Controllers/NotificationController/NotificationController';
import FileToField from '../../Utilities/Middllware/FileToField';
import authrization from '../../Utilities/Middllware/Authorization';
import uploadAvatar from '../../Utilities/Multer/AvatarUser';
import posterAvatar from '../../Utilities/Multer/PosterUsers';


const usersRouter = express.Router();

usersRouter.get('/GetAllUnread',
    authrization.AuthToken,
    notificationController.GetAllUnSeenNotificationByUserId);

usersRouter.get('/GetAll',
    authrization.AuthToken,
    notificationController.GetAllNotification
);

usersRouter.put('/ُSeen',
    authrization.AuthToken,
    notificationController.SeenNotification);


export default usersRouter;