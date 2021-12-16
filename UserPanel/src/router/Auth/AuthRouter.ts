import express from 'express';
import AuthController from '../../Controllers/Auth/AuthController';
import LoginController from '../../Controllers/Auth/Logincontroller';
import registerValdiator from './AuthValidation';

const authRouter = express.Router();

authRouter.post('/register',
    registerValdiator.CreateHandle(),
    AuthController.Create);

authRouter.post('/login', LoginController.LoginUser);

authRouter.post('/checkTwofactor', LoginController.UserCheckAuthTowfactor);

authRouter.post('/checkGoogleAuth', LoginController.UserCheckAuth2FA);

authRouter.get('/confirm-email/:email/:hash', AuthController.ConfirmCode);

authRouter.post('/resendActivationCode/:email', AuthController.ResendActivationCode);


export default authRouter;