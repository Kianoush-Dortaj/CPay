
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import getwayController from '../../Controllers/GetwayTypeController/GetwayTypeController';
import UploadGetwayTypeIcon from "../../Utilities/Multer/GetwayType";
import getwayValidator from './GetwayTypeValidator';

const getwayRouter = express.Router();

getwayRouter.post('/create',
    // authController.AuthToken,
    UploadGetwayTypeIcon.single("icon"),
    getwayValidator.CreateHandle(),
    getwayController.CreateGetwayType);

getwayRouter.put('/update/:id',
    // authController.AuthToken,
    UploadGetwayTypeIcon.single("icon"),
    getwayValidator.UpdateHandle(),
    getwayController.UpdateGetwayType);

getwayRouter.delete('/delete/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.DeleteGetwayType);

getwayRouter.get('/getById/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.GetByIdGetwayType);

getwayRouter.get('/select',
    // authController.AuthToken,
    getwayController.GetAllGetwayTypeSelect);

getwayRouter.post('/getAll',
    // authController.AuthToken,
    getwayController.GetAllGetwayTypePaging);

    getwayRouter.get('/getGetwayTypeImage/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.GetGetwayTypeImage);

export default getwayRouter;