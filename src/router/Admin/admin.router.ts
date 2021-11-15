
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import adminController from '../../Controllers/AdminController/AdminController';
import UploadHanlder from "../../Utilities/Multer/AvatarUser";
import authController from './../../Utilities/Middllware/Authorization';

const adminRouter = express.Router();

adminRouter.post('/create',
    // authController.AuthToken,
    adminController.Create);

adminRouter.put('/personalInfo/:id',
    authController.AuthToken,
    UploadHanlder.single("avatar"),
    adminController.Update);

adminRouter.put('/accountInfo/:id',
    authController.AuthToken,
    adminController.EditAccountInfoUser);

adminRouter.put('/changeUserRole/:id',
    authController.AuthToken,
    adminController.ChangeUseRole);

adminRouter.put('/changePassword/:id',
    authController.AuthToken,
    adminController.ChangePassword);

adminRouter.get('/getPersonalInformation/:id',
    authController.AuthToken,
    adminController.GetUserPersonalInformation);

adminRouter.get('/getAccountInformation/:id',
    authController.AuthToken,
    adminController.GetUserInfoAccount);

adminRouter.get('/getUserRoles/:id',
    authController.AuthToken,
    adminController.GetUserRoles);

adminRouter.get('/getUserImage/:id',
    authController.AuthToken,
    adminController.GetUserImage);

adminRouter.post('/getUserPaging',
    authController.AuthToken,
    adminController.GetAllManagerPaging);


export default adminRouter;