
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import userLevelController from '../../Controllers/UserLevelController/UserLevelController';
import authController from '../../Utilities/Middllware/Authorization';

const userLevelRouter = express.Router();

userLevelRouter.post('/create',
    // authController.AuthToken,
    userLevelController.CreateUserLevel);

userLevelRouter.put('/update/:id',
    // authController.AuthToken,
    userLevelController.UpdateUserLevel);

userLevelRouter.delete('/delete/:id',
    // authController.AuthToken,
    userLevelController.DeleteUserLevel);

userLevelRouter.get('/getById/:id',
    // authController.AuthToken,
    userLevelController.GetByIdUserLevel);

userLevelRouter.get('/select',
    // authController.AuthToken,
    userLevelController.GetAllUserLevelSelect);

userLevelRouter.post('/getAll',
    // authController.AuthToken,
    userLevelController.GetAllUserLevelPaging);

export default userLevelRouter;