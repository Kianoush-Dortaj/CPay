
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import roleController from '../../Controllers/RoleController/RoleController';
import authController from './../../Utilities/Middllware/Authorization';

const roleRouter = express.Router();

roleRouter.post('/create',
    authController.AuthToken,
    roleController.CreateRole);

roleRouter.put('/update/:id',
    authController.AuthToken,
    roleController.UpdateRole);

roleRouter.delete('/delete/:id',
    authController.AuthToken,
    roleController.DeleteRole);

roleRouter.get('/getById/:id',
    authController.AuthToken,
    roleController.GetByIdRole);

roleRouter.get('/select',
    authController.AuthToken,
    roleController.GetAllRoleSelect);

roleRouter.get('/getAll',
    authController.AuthToken,
    roleController.GetAllRolePaging);

export default roleRouter;