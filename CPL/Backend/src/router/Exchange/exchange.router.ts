
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import exchangeController from '../../Controllers/ExchangeController/ExchangeController';
import authController from '../../Utilities/Middllware/Authorization';
import exchangeValidator from './ExchangeValidator';


const exchangeRouter = express.Router();

exchangeRouter.post('/create',
    // authController.AuthToken,
    exchangeValidator.CreateHandle(),
    exchangeController.CreateExchange);

exchangeRouter.put('/update/:id',
    // authController.AuthToken,
    exchangeValidator.UpdateHandle(),
    exchangeController.UpdateExchange);

exchangeRouter.delete('/delete/:id',
    // authController.AuthToken,
    exchangeValidator.GetItemByIdHandle(),
    exchangeController.DeleteExchange);

exchangeRouter.get('/getById/:id',
    // authController.AuthToken,
    exchangeValidator.GetItemByIdHandle(),
    exchangeController.GetByIdExchange);

exchangeRouter.get('/select',
    // authController.AuthToken,
    exchangeController.GetAllExchangeSelect);

exchangeRouter.post('/getAll',
    // authController.AuthToken,
    exchangeController.GetAllExchangePaging);

export default exchangeRouter;