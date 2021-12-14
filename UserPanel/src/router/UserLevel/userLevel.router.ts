
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import userLevelController from '../../Controllers/UserLevelController/UserLevelController';
import authController from '../../Utilities/Middllware/Authorization';
import userLevelValidator from './UserLevelValidator';

const userLevelRouter = express.Router();

userLevelRouter.post('/create',
    // authController.AuthToken,
    userLevelValidator.CreateHandle(),
    userLevelController.CreateUserLevel);

userLevelRouter.put('/update/:id',
    // authController.AuthToken,
    userLevelValidator.UpdateHandle(),
    userLevelController.UpdateUserLevel);

userLevelRouter.delete('/delete/:id',
    // authController.AuthToken,
    userLevelValidator.GetItemByIdHandle(),
    userLevelController.DeleteUserLevel);

userLevelRouter.get('/getById/:id',
    // authController.AuthToken,
    userLevelValidator.GetItemByIdHandle(),
    userLevelController.GetByIdUserLevel);

userLevelRouter.get('/select',
    // authController.AuthToken,
    userLevelController.GetAllUserLevelSelect);

userLevelRouter.post('/getAll',
    // authController.AuthToken,
    userLevelController.GetAllUserLevelPaging);

export default userLevelRouter;