
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import comissionController from '../../Controllers/ComissionController/ComissionController';
import authController from '../../Utilities/Middllware/Authorization';

const comissionRouter = express.Router();

comissionRouter.post('/create',
    // authController.AuthToken,
    comissionController.CreateComission);

comissionRouter.put('/update/:id',
    // authController.AuthToken,
    comissionController.UpdateComission);

comissionRouter.delete('/delete/:id',
    // authController.AuthToken,
    comissionController.DeleteComission);

comissionRouter.get('/getById/:id',
    // authController.AuthToken,
    comissionController.GetByIdComission);


comissionRouter.post('/getAll',
    // authController.AuthToken,
    comissionController.GetAllComissionPaging);

export default comissionRouter;