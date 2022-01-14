import express, { Express, Router, NextFunction, Request, Response } from 'express';
import AuthController from '../../Controllers/Auth/Logincontroller';
const usersRouter = express.Router();

usersRouter.post('/login', AuthController.LoginUser);

usersRouter.post('/checkTwofactoe', AuthController.AdminCheckAuthTowfactor);

export default usersRouter;