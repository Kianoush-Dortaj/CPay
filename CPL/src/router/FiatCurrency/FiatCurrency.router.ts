
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import fiatCurrencyController from '../../Controllers/FiatCurrencyController/FiatCurrencyController';
import UploadfiatCurrencyIcon from "../../Utilities/Multer/fiatCurrencyLogo";
import fiatCurrencyValidator from './FiatCurrencyValidator';

const fiatCurrencyRouter = express.Router();

fiatCurrencyRouter.post('/create',
    // authController.AuthToken,
    UploadfiatCurrencyIcon.single("logo"),
    fiatCurrencyValidator.CreateHandle(),
    fiatCurrencyController.CreateFiatCurrency);

fiatCurrencyRouter.put('/update/:id',
    // authController.AuthToken,
    UploadfiatCurrencyIcon.single("logo"),
    fiatCurrencyValidator.UpdateHandle(),
    fiatCurrencyController.UpdateFiatCurrency);

fiatCurrencyRouter.delete('/delete/:id',
    // authController.AuthToken,
    fiatCurrencyValidator.GetItemByIdHandle(),
    fiatCurrencyController.DeleteFiatCurrency);

fiatCurrencyRouter.get('/getById/:id',
    // authController.AuthToken,
    fiatCurrencyValidator.GetItemByIdHandle(),
    fiatCurrencyController.GetByIdFiatCurrency);

fiatCurrencyRouter.get('/select',
    // authController.AuthToken,
    fiatCurrencyController.GetAllFiatCurrencySelect);

fiatCurrencyRouter.post('/getAll',
    // authController.AuthToken,
    fiatCurrencyController.GetAllFiatCurrencyPaging);

// fiatCurrencyRouter.get('/getfiatCurrencyImage/:id',
//     // authController.AuthToken,
//     fiatCurrencyValidator.GetItemByIdHandle(),
//     fiatCurrencyController.GetCountryImage);

export default fiatCurrencyRouter;