
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import getwayController from '../../Controllers/CoinController/CoinController';
import UploadCoinIcon from "../../Utilities/Multer/CoinIcon";
import getwayValidator from './CoinValidator';

const getwayRouter = express.Router();

getwayRouter.post('/create',
    // authController.AuthToken,
    UploadCoinIcon.single("icon"),
    getwayValidator.CreateHandle(),
    getwayController.CreateCoin);

getwayRouter.put('/update/:id',
    // authController.AuthToken,
    UploadCoinIcon.single("icon"),
    getwayValidator.UpdateHandle(),
    getwayController.UpdateCoin);

getwayRouter.delete('/delete/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.DeleteCoin);

getwayRouter.get('/getById/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.GetByIdCoin);

getwayRouter.get('/select',
    // authController.AuthToken,
    getwayController.GetAllCoinSelect);

getwayRouter.post('/getAll',
    // authController.AuthToken,
    getwayController.GetAllCoinPaging);

    getwayRouter.get('/getCoinImage/:id',
    // authController.AuthToken,
    getwayValidator.GetItemByIdHandle(),
    getwayController.GetCoinImage);

export default getwayRouter;