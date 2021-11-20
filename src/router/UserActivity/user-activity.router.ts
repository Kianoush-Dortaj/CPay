
import express from 'express';
import userActivityController from '../../Controllers/UserActivityController/UserActivityController';
import authController from './../../Utilities/Middllware/Authorization';

const userActivityRouter = express.Router();

userActivityRouter.get("/select",
    // authController.AuthToken,
    userActivityController.GetUserActivitySelect);

export default userActivityRouter;
