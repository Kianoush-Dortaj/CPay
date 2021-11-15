
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import permissionController from '../../Controllers/PermissionController/PermissionController';
import authController from './../../Utilities/Middllware/Authorization';

const permissionRouter = express.Router();

permissionRouter.post('/create', 
authController.AuthToken,
permissionController.CreatePermission);

permissionRouter.put('/update/:id',
authController.AuthToken,
permissionController.UpdatePermission);

permissionRouter.delete('/delete/:id',
authController.AuthToken,
permissionController.DeletePermission);

permissionRouter.get('/getById/:id',
authController.AuthToken,
permissionController.GetByIdPermission);

permissionRouter.get('/getAll',
authController.AuthToken,
permissionController.GetAllPermission);

export default permissionRouter;