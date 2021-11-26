
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import langaugeController from '../../Controllers/LanguageController/LangaugeController';
import authController from '../../Utilities/Middllware/Authorization';
import UploadlangaugeIcon from "../../Utilities/Multer/languageFlag";
import langaugeValidator from './LangaugeValidator';

const langaugeRouter = express.Router();

langaugeRouter.post('/create',
    // authController.AuthToken,
    UploadlangaugeIcon.single("flagImageFileName"),
    langaugeValidator.CreateHandle(),
    langaugeController.CreateLanguage);

langaugeRouter.put('/update/:id',
    // authController.AuthToken,
    UploadlangaugeIcon.single("flagImageFileName"),
    langaugeValidator.UpdateHandle(),
    langaugeController.UpdateLanguage);

langaugeRouter.delete('/delete/:id',
    // authController.AuthToken,
    langaugeValidator.GetItemByIdHandle(),
    langaugeController.DeleteLanguage);

langaugeRouter.get('/getById/:id',
    // authController.AuthToken,
    langaugeValidator.GetItemByIdHandle(),
    langaugeController.GetByIdLanguage);

langaugeRouter.get('/select',
    // authController.AuthToken,
    langaugeController.GetAllLanguageSelect);

langaugeRouter.post('/getAll',
    // authController.AuthToken,
    langaugeController.GetAllLanguagePaging);

langaugeRouter.get('/getlangaugeImage/:id',
    // authController.AuthToken,
    langaugeValidator.GetItemByIdHandle(),
    langaugeController.GetLanguageImage);

export default langaugeRouter;