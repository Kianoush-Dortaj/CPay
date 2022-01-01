
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import getwayController from '../../Controllers/CoinController/CoinController';
import UploadCoinIcon from "../../Utilities/Multer/CoinIcon";
import getwayValidator from './CoinValidator';
import authController from '../../Utilities/Middllware/Authorization';

const getwayRouter = express.Router();


getwayRouter.get('/getById/:symbol',
    authController.AuthToken,
    // getwayValidator.GetItemByIdHandle(),
    getwayController.GetByIdCoin);

getwayRouter.get('/select',
    authController.AuthToken,
    getwayController.GetAllCoinSelect);


export default getwayRouter;