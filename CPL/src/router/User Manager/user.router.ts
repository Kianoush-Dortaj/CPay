
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import userController from '../../Controllers/UserController/UserController';
import UploadHanlder from "../../Utilities/Multer/UserAvatar";
import userValdiator from './UserValidator';

const userRouter = express.Router();

userRouter.post('/create',
    // authController.AuthToken,
    userValdiator.CreateHandle(),
    userController.Create);

userRouter.put('/personalInfo/:id',
    // authController.AuthToken,
    UploadHanlder.single("avatar"),
    userValdiator.UpdateUserHandle(),
    userController.Update);

userRouter.put('/accountInfo/:id',
    // authController.AuthToken,
    userController.EditAccountInfoUser);

userRouter.put('/changePassword/:id',
    // authController.AuthToken,
    userValdiator.ChangePasswordHandle(),
    userController.ChangePassword);

userRouter.get('/getPersonalInformation/:id',
    // authController.AuthToken,
    userValdiator.GetItemByIdHandle(),
    userController.GetUserPersonalInformation);

userRouter.get('/getAccountInformation/:id',
    // authController.AuthToken,
    userValdiator.GetItemByIdHandle(),
    userController.GetUserInfoAccount);

userRouter.get('/getUserImage/:id',
    // authController.AuthToken,
    userValdiator.GetItemByIdHandle(),
    userController.GetUserImage);

userRouter.post('/getUserPaging',
    // authController.AuthToken,
    userController.GetAllManagerPaging);


export default userRouter;