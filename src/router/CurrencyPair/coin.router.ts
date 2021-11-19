
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import currencyPairController from '../../Controllers/CurrencyPairController/CurrencyPairController';
import authController from '../../Utilities/Middllware/Authorization';

const currencyPairRouter = express.Router();

currencyPairRouter.post('/create',
    // authController.AuthToken,
    currencyPairController.CreateCurrencyPair);

currencyPairRouter.put('/update/:id',
    // authController.AuthToken,
    currencyPairController.UpdateCurrencyPair);

currencyPairRouter.delete('/delete/:id',
    // authController.AuthToken,
    currencyPairController.DeleteCurrencyPair);

currencyPairRouter.get('/getById/:id',
    // authController.AuthToken,
    currencyPairController.GetByIdCurrencyPair);


currencyPairRouter.post('/getAll',
    // authController.AuthToken,
    currencyPairController.GetAllCurrencyPairPaging);

    currencyPairRouter.get('/getAllPairs',
    // authController.AuthToken,
    currencyPairController.GetAllCurrenyPairs);


export default currencyPairRouter;