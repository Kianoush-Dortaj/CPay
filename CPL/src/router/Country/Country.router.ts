
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import countryController from '../../Controllers/CountryController/CountryController';
import authController from '../../Utilities/Middllware/Authorization';
import UploadcountryIcon from "../../Utilities/Multer/languageFlag";
import countryValidator from './CountryValidator';

const countryRouter = express.Router();

countryRouter.post('/create',
    // authController.AuthToken,
    UploadcountryIcon.single("flag"),
    countryValidator.CreateHandle(),
    countryController.CreateCountry);

countryRouter.put('/update/:id',
    // authController.AuthToken,
    UploadcountryIcon.single("flag"),
    countryValidator.UpdateHandle(),
    countryController.UpdateCountry);

countryRouter.delete('/delete/:id',
    // authController.AuthToken,
    countryValidator.GetItemByIdHandle(),
    countryController.DeleteCountry);

countryRouter.get('/getById/:id',
    // authController.AuthToken,
    countryValidator.GetItemByIdHandle(),
    countryController.GetByIdCountry);

countryRouter.get('/select',
    // authController.AuthToken,
    countryController.GetAllCountrySelect);

countryRouter.post('/getAll',
    // authController.AuthToken,
    countryController.GetAllCountryPaging);

countryRouter.get('/getcountryImage/:id',
    // authController.AuthToken,
    countryValidator.GetItemByIdHandle(),
    countryController.GetCountryImage);

export default countryRouter;