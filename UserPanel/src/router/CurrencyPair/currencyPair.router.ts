
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import currencyPairController from '../../Controllers/CurrencyPairController/CurrencyPairController';
import authController from '../../Utilities/Middllware/Authorization';
import currencyPairValidator from './CurrencyPairValidator';

const currencyPairRouter = express.Router();

currencyPairRouter.post('/create',
    // authController.AuthToken,
    currencyPairValidator.CreateHandle(),
    currencyPairController.CreateCurrencyPair);

currencyPairRouter.put('/update/:id',
    // authController.AuthToken,
    currencyPairValidator.UpdateHandle(),
    currencyPairController.UpdateCurrencyPair);

currencyPairRouter.delete('/delete/:id',
    // authController.AuthToken,
    currencyPairValidator.GetItemByIdHandle(),
    currencyPairController.DeleteCurrencyPair);

currencyPairRouter.get('/getById/:id',
    // authController.AuthToken,
    currencyPairValidator.GetItemByIdHandle(),
    currencyPairController.GetByIdCurrencyPair);


currencyPairRouter.post('/getAll',
    // authController.AuthToken,
    currencyPairController.GetAllCurrencyPairPaging);

    currencyPairRouter.get('/getAllPairs',
    // authController.AuthToken,
    currencyPairController.GetAllCurrenyPairs);


export default currencyPairRouter;