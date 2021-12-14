
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import permissionController from '../../Controllers/PermissionController/PermissionController';
import authController from './../../Utilities/Middllware/Authorization';
import permissionValidator from './PermissionValidator';

const permissionRouter = express.Router();

permissionRouter.post('/create',
    // authController.AuthToken,
    permissionValidator.CreateHandle(),
    permissionController.CreatePermission);

permissionRouter.put('/update/:id',
    // authController.AuthToken,
    permissionValidator.UpdateHandle(),
    permissionController.UpdatePermission);

permissionRouter.delete('/delete/:id',
    // authController.AuthToken,
    permissionValidator.GetItemByIdHandle(),
    permissionController.DeletePermission);

permissionRouter.get('/getById/:id',
    // authController.AuthToken,
    permissionValidator.GetItemByIdHandle(),
    permissionController.GetByIdPermission);

permissionRouter.get('/getAll',
    // authController.AuthToken,
    permissionController.GetAllPermission);

export default permissionRouter;