
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import roleController from '../../Controllers/RoleController/RoleController';
import authController from './../../Utilities/Middllware/Authorization';
import roleValidator from './RoleValidator';

const roleRouter = express.Router();

roleRouter.post('/create',
    // authController.AuthToken,
    roleValidator.CreateHandle(),
    roleController.CreateRole);

roleRouter.put('/update/:id',
    // authController.AuthToken,
    roleValidator.UpdateHandle(),
    roleController.UpdateRole);

roleRouter.delete('/delete/:id',
    // authController.AuthToken,
    roleValidator.GetItemByIdHandle(),
    roleController.DeleteRole);

roleRouter.get('/getById/:id',
    // authController.AuthToken,
    roleValidator.GetItemByIdHandle(),
    roleController.GetByIdRole);

roleRouter.get('/select',
    // authController.AuthToken,
    roleController.GetAllRoleSelect);

roleRouter.post('/getAll',
    // authController.AuthToken,
    roleController.GetAllRolePaging);

export default roleRouter;