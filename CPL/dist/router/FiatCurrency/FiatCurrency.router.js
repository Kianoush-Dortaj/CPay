"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FiatCurrencyController_1 = __importDefault(require("../../Controllers/FiatCurrencyController/FiatCurrencyController"));
const fiatCurrencyLogo_1 = __importDefault(require("../../Utilities/Multer/fiatCurrencyLogo"));
const FiatCurrencyValidator_1 = __importDefault(require("./FiatCurrencyValidator"));
const fiatCurrencyRouter = express_1.default.Router();
fiatCurrencyRouter.post('/create', 
// authController.AuthToken,
fiatCurrencyLogo_1.default.single("logo"), FiatCurrencyValidator_1.default.CreateHandle(), FiatCurrencyController_1.default.CreateFiatCurrency);
fiatCurrencyRouter.put('/update/:id', 
// authController.AuthToken,
fiatCurrencyLogo_1.default.single("logo"), FiatCurrencyValidator_1.default.UpdateHandle(), FiatCurrencyController_1.default.UpdateFiatCurrency);
fiatCurrencyRouter.delete('/delete/:id', 
// authController.AuthToken,
FiatCurrencyValidator_1.default.GetItemByIdHandle(), FiatCurrencyController_1.default.DeleteFiatCurrency);
fiatCurrencyRouter.get('/getById/:id', 
// authController.AuthToken,
FiatCurrencyValidator_1.default.GetItemByIdHandle(), FiatCurrencyController_1.default.GetByIdFiatCurrency);
fiatCurrencyRouter.get('/select', 
// authController.AuthToken,
FiatCurrencyController_1.default.GetAllFiatCurrencySelect);
fiatCurrencyRouter.post('/getAll', 
// authController.AuthToken,
FiatCurrencyController_1.default.GetAllFiatCurrencyPaging);
// fiatCurrencyRouter.get('/getfiatCurrencyImage/:id',
//     // authController.AuthToken,
//     fiatCurrencyValidator.GetItemByIdHandle(),
//     fiatCurrencyController.GetCountryImage);
exports.default = fiatCurrencyRouter;
