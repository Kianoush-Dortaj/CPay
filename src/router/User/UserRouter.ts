import express from 'express';
import AuthController from '../../Controllers/Auth/AuthController';
import LoginController from '../../Controllers/Auth/Logincontroller';

const usersRouter = express.Router();

usersRouter.post('/login', LoginController.LoginUser);

usersRouter.post('/checkTwofactoe', LoginController.AdminCheckAuthTowfactor);

usersRouter.get('/confirm-email/:email/:hash', AuthController.ConfirmCode);

usersRouter.post('/resendActivationCode/:email', AuthController.ResendActivationCode);


export default usersRouter;