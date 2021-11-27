
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import adminController from '../../Controllers/AdminController/AdminController';
import UploadHanlder from "../../Utilities/Multer/AvatarUser";
import authController from './../../Utilities/Middllware/Authorization';
import adminValdiator from './AdminValidator';

const adminRouter = express.Router();

adminRouter.post('/create',
    // authController.AuthToken,
    adminValdiator.CreateHandle(),
    adminController.Create);

adminRouter.put('/personalInfo/:id',
    // authController.AuthToken,
    UploadHanlder.single("avatar"),
    adminValdiator.UpdateUserHandle(),
    adminController.Update);

adminRouter.put('/accountInfo/:id',
    // authController.AuthToken,
    adminController.EditAccountInfoUser);

adminRouter.put('/changeUserRole/:id',
    // authController.AuthToken,
    adminValdiator.ChangeUserRoleHandle(),
    adminController.ChangeUseRole);

adminRouter.put('/changePassword/:id',
    // authController.AuthToken,
    adminValdiator.ChangePasswordHandle(),
    adminController.ChangePassword);

adminRouter.get('/getPersonalInformation/:id',
    // authController.AuthToken,
    adminValdiator.GetItemByIdHandle(),
    adminController.GetUserPersonalInformation);

adminRouter.get('/getAccountInformation/:id',
    // authController.AuthToken,
    adminValdiator.GetItemByIdHandle(),
    adminController.GetUserInfoAccount);

adminRouter.get('/getUserRoles/:id',
    // authController.AuthToken,
    adminValdiator.GetItemByIdHandle(),
    adminController.GetUserRoles);

adminRouter.get('/getUserImage/:id',
    // authController.AuthToken,
    adminValdiator.GetItemByIdHandle(),
    adminController.GetUserImage);

adminRouter.post('/getUserPaging',
    // authController.AuthToken,
    adminController.GetAllManagerPaging);


export default adminRouter;