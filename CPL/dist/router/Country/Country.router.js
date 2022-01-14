"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CountryController_1 = __importDefault(require("../../Controllers/CountryController/CountryController"));
const languageFlag_1 = __importDefault(require("../../Utilities/Multer/languageFlag"));
const CountryValidator_1 = __importDefault(require("./CountryValidator"));
const countryRouter = express_1.default.Router();
countryRouter.post('/create', 
// authController.AuthToken,
languageFlag_1.default.single("flag"), CountryValidator_1.default.CreateHandle(), CountryController_1.default.CreateCountry);
countryRouter.put('/update/:id', 
// authController.AuthToken,
languageFlag_1.default.single("flag"), CountryValidator_1.default.UpdateHandle(), CountryController_1.default.UpdateCountry);
countryRouter.delete('/delete/:id', 
// authController.AuthToken,
CountryValidator_1.default.GetItemByIdHandle(), CountryController_1.default.DeleteCountry);
countryRouter.get('/getById/:id', 
// authController.AuthToken,
CountryValidator_1.default.GetItemByIdHandle(), CountryController_1.default.GetByIdCountry);
countryRouter.get('/select', 
// authController.AuthToken,
CountryController_1.default.GetAllCountrySelect);
countryRouter.post('/getAll', 
// authController.AuthToken,
CountryController_1.default.GetAllCountryPaging);
countryRouter.get('/getcountryImage/:id', 
// authController.AuthToken,
CountryValidator_1.default.GetItemByIdHandle(), CountryController_1.default.GetCountryImage);
exports.default = countryRouter;
