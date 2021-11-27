
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import getwayController from '../../Controllers/GetwayController/GetwayController';
import UploadGetwayIcon from "../../Utilities/Multer/Getway";
import getwayValidator from './GetwayValidator';

const getwayRouter = express.Router();

getwayRouter.post('/create',
    // authController.AuthToken,
    UploadGetwayIcon.single("icon"),
    getwayValidator.CreateHandle(),
    getwayController.CreateGetway);

getwayRouter.put('/update/:id',
    // authController.AuthToken,
    UploadGetwayIcon.single("icon"),
    getwayValidator.UpdateHandle(),
    getwayController.UpdateGetway);

getwayRouter.delete('/delete/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.DeleteGetway);

getwayRouter.get('/getById/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.GetByIdGetway);

getwayRouter.get('/select',
    // authController.AuthToken,
    getwayController.GetAllGetwaySelect);

getwayRouter.post('/getAll',
    // authController.AuthToken,
    getwayController.GetAllGetwayPaging);

    getwayRouter.get('/getGetwayImage/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.GetGetwayImage);

export default getwayRouter;