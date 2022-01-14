
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import comissionController from '../../Controllers/ComissionController/ComissionController';
import authController from '../../Utilities/Middllware/Authorization';
import comissionValidator from './ComissionValidator';

const comissionRouter = express.Router();

comissionRouter.post('/create',
    // authController.AuthToken,
    comissionValidator.CreateHandle(),
    comissionController.CreateComission);

comissionRouter.put('/update/:id',
    // authController.AuthToken,
    comissionValidator.UpdateHandle(),
    comissionController.UpdateComission);

comissionRouter.delete('/delete/:id',
    // authController.AuthToken,
    comissionValidator.GetItemByIdHandle(),
    comissionController.DeleteComission);

comissionRouter.get('/getById/:id',
    // authController.AuthToken,
    comissionValidator.GetItemByIdHandle(),
    comissionController.GetByIdComission);


comissionRouter.post('/getAll',
    // authController.AuthToken,
    comissionController.GetAllComissionPaging);

export default comissionRouter;