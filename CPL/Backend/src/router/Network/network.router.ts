
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import networkController from '../../Controllers/NetworkController/NetworkController';
import networkValidator from './NetworkValidator';

const networkRouter = express.Router();

networkRouter.post('/create',
    // authController.AuthToken,
    networkValidator.CreateHandle(),
    networkController.CreateNetwork);

networkRouter.put('/update/:id',
    // authController.AuthToken,
    networkValidator.UpdateHandle(),
    networkController.UpdateNetwork);

networkRouter.delete('/delete/:id',
    // authController.AuthToken,
    networkValidator.GetItemByIdHandle(),
    networkController.DeleteNetwork);

networkRouter.get('/getById/:id',
    // authController.AuthToken,
    networkValidator.GetItemByIdHandle(),
    networkController.GetByIdNetwork);

networkRouter.get('/select',
    // authController.AuthToken,
    networkController.GetAllNetworkSelect);

networkRouter.post('/getAll',
    // authController.AuthToken,
    networkController.GetAllNetworkPaging);

export default networkRouter;