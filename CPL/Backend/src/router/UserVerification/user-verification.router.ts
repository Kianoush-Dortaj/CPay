
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import userVerificationController from '../../Controllers/UserVerificationController/UserVerifivationController';


const userLevelRouter = express.Router();


userLevelRouter.post('/getAll',
    // authController.AuthToken,
    userVerificationController.GetAllUserVerifications);

export default userLevelRouter;