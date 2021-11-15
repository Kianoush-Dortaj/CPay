
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import coinController from '../../Controllers/CoinController/CoinController';
import authController from '../../Utilities/Middllware/Authorization';
import UploadCoinIcon from "../../Utilities/Multer/CoinIcon";

const coinRouter = express.Router();

coinRouter.post('/create',
    // authController.AuthToken,
    UploadCoinIcon.single("icon"),
    coinController.CreateCoin);

coinRouter.put('/update/:id',
    // authController.AuthToken,
    UploadCoinIcon.single("icon"),
    coinController.UpdateCoin);

coinRouter.delete('/delete/:id',
    // authController.AuthToken,
    coinController.DeleteCoin);

coinRouter.get('/getById/:id',
    // authController.AuthToken,
    coinController.GetByIdCoin);

coinRouter.get('/select',
    // authController.AuthToken,
    coinController.GetAllCoinSelect);

coinRouter.post('/getAll',
    // authController.AuthToken,
    coinController.GetAllCoinPaging);

    coinRouter.get('/getCoinImage/:id',
    // authController.AuthToken,
    coinController.GetCoinImage);

export default coinRouter;