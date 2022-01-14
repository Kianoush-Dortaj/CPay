"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CurrencyPairController_1 = __importDefault(require("../../Controllers/CurrencyPairController/CurrencyPairController"));
const CurrencyPairValidator_1 = __importDefault(require("./CurrencyPairValidator"));
const currencyPairRouter = express_1.default.Router();
currencyPairRouter.post('/create', 
// authController.AuthToken,
CurrencyPairValidator_1.default.CreateHandle(), CurrencyPairController_1.default.CreateCurrencyPair);
currencyPairRouter.put('/update/:id', 
// authController.AuthToken,
CurrencyPairValidator_1.default.UpdateHandle(), CurrencyPairController_1.default.UpdateCurrencyPair);
currencyPairRouter.delete('/delete/:id', 
// authController.AuthToken,
CurrencyPairValidator_1.default.GetItemByIdHandle(), CurrencyPairController_1.default.DeleteCurrencyPair);
currencyPairRouter.get('/getById/:id', 
// authController.AuthToken,
CurrencyPairValidator_1.default.GetItemByIdHandle(), CurrencyPairController_1.default.GetByIdCurrencyPair);
currencyPairRouter.post('/getAll', 
// authController.AuthToken,
CurrencyPairController_1.default.GetAllCurrencyPairPaging);
currencyPairRouter.get('/getAllPairs', 
// authController.AuthToken,
CurrencyPairController_1.default.GetAllCurrenyPairs);
exports.default = currencyPairRouter;
