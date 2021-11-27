
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import coinController from '../../Controllers/CoinController/CoinController';
import UploadCoinIcon from "../../Utilities/Multer/CoinIcon";
import coinValidator from './GetwayValidator';

const coinRouter = express.Router();

coinRouter.post('/create',
    // authController.AuthToken,
    UploadCoinIcon.single("icon"),
    coinValidator.CreateHandle(),
    coinController.CreateCoin);

coinRouter.put('/update/:id',
    // authController.AuthToken,
    UploadCoinIcon.single("icon"),
    coinValidator.UpdateHandle(),
    coinController.UpdateCoin);

coinRouter.delete('/delete/:id',
    // authController.AuthToken,
    coinValidator.GetItemByIdHandle(),
    coinController.DeleteCoin);

coinRouter.get('/getById/:id',
    // authController.AuthToken,
    coinValidator.GetItemByIdHandle(),
    coinController.GetByIdCoin);

coinRouter.get('/select',
    // authController.AuthToken,
    coinController.GetAllCoinSelect);

coinRouter.post('/getAll',
    // authController.AuthToken,
    coinController.GetAllCoinPaging);

    coinRouter.get('/getCoinImage/:id',
    // authController.AuthToken,
    coinValidator.GetItemByIdHandle(),
    coinController.GetCoinImage);

export default coinRouter;