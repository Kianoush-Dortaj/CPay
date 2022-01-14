"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LangaugeController_1 = __importDefault(require("../../Controllers/LanguageController/LangaugeController"));
const languageFlag_1 = __importDefault(require("../../Utilities/Multer/languageFlag"));
const LangaugeValidator_1 = __importDefault(require("./LangaugeValidator"));
const langaugeRouter = express_1.default.Router();
langaugeRouter.post('/create', 
// authController.AuthToken,
languageFlag_1.default.single("flagImageFileName"), LangaugeValidator_1.default.CreateHandle(), LangaugeController_1.default.CreateLanguage);
langaugeRouter.put('/update/:id', 
// authController.AuthToken,
languageFlag_1.default.single("flagImageFileName"), LangaugeValidator_1.default.UpdateHandle(), LangaugeController_1.default.UpdateLanguage);
langaugeRouter.delete('/delete/:id', 
// authController.AuthToken,
LangaugeValidator_1.default.GetItemByIdHandle(), LangaugeController_1.default.DeleteLanguage);
langaugeRouter.get('/getById/:id', 
// authController.AuthToken,
LangaugeValidator_1.default.GetItemByIdHandle(), LangaugeController_1.default.GetByIdLanguage);
langaugeRouter.get('/select', 
// authController.AuthToken,
LangaugeController_1.default.GetAllLanguageSelect);
langaugeRouter.post('/getAll', 
// authController.AuthToken,
LangaugeController_1.default.GetAllLanguagePaging);
langaugeRouter.get('/getlangaugeImage/:id', 
// authController.AuthToken,
LangaugeValidator_1.default.GetItemByIdHandle(), LangaugeController_1.default.GetLanguageImage);
exports.default = langaugeRouter;
