
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import paymentGetwayController from '../../Controllers/PaymentGetwayController/PaymentController';
import authController from './../../Utilities/Middllware/Authorization';
import fiatAssetsController from '../../Controllers/FiatAssersController/FiatAssersController';
import fiatCurrencyController from '../../Controllers/FiatCurrencyController/FiatCurrencyController';
import paymentGetwayValidator from './payment-getway-validator';

const paymentGetwayRouter = express.Router();

paymentGetwayRouter.post('/deposit',
    authController.AuthToken,
    paymentGetwayValidator.PayHandle(),
    paymentGetwayController.Payment);

paymentGetwayRouter.get('/currencies',
    authController.AuthToken,
    // paymentGetwayValidator.CreateHandle(),
    fiatCurrencyController.GetAllFiatCurrencySelect);

paymentGetwayRouter.get('/assets',
    authController.AuthToken,
    // paymentGetwayValidator.CreateHandle(),
    fiatAssetsController.GetByUserIdFiatAssets);

paymentGetwayRouter.get('/getById/:id',
    authController.AuthToken,
    // paymentGetwayValidator.CreateHandle(),
    paymentGetwayController.GetByIdPaymentTransaction);

paymentGetwayRouter.get('/getUserTransactions',
    authController.AuthToken,
    // paymentGetwayValidator.CreateHandle(),
    paymentGetwayController.GetByUserIdPaymentTransaction);

paymentGetwayRouter.post('/internalConvert',
    authController.AuthToken,
    // paymentGetwayValidator.CreateHandle(),
    fiatAssetsController.TransferFromFiatAsset);

export default paymentGetwayRouter;