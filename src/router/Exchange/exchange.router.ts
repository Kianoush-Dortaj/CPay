
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import exchangeController from '../../Controllers/ExchangeController/ExchangeController';
import authController from '../../Utilities/Middllware/Authorization';

const exchangeRouter = express.Router();

exchangeRouter.post('/create',
    // authController.AuthToken,
    exchangeController.CreateExchange);

exchangeRouter.put('/update/:id',
    // authController.AuthToken,
    exchangeController.UpdateExchange);

exchangeRouter.delete('/delete/:id',
    // authController.AuthToken,
    exchangeController.DeleteExchange);

exchangeRouter.get('/getById/:id',
    // authController.AuthToken,
    exchangeController.GetByIdExchange);

exchangeRouter.get('/select',
    // authController.AuthToken,
    exchangeController.GetAllExchangeSelect);

exchangeRouter.post('/getAll',
    // authController.AuthToken,
    exchangeController.GetAllExchangePaging);

export default exchangeRouter;