"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExchangeController_1 = __importDefault(require("../../Controllers/ExchangeController/ExchangeController"));
const ExchangeValidator_1 = __importDefault(require("./ExchangeValidator"));
const exchangeRouter = express_1.default.Router();
exchangeRouter.post('/create', 
// authController.AuthToken,
ExchangeValidator_1.default.CreateHandle(), ExchangeController_1.default.CreateExchange);
exchangeRouter.put('/update/:id', 
// authController.AuthToken,
ExchangeValidator_1.default.UpdateHandle(), ExchangeController_1.default.UpdateExchange);
exchangeRouter.delete('/delete/:id', 
// authController.AuthToken,
ExchangeValidator_1.default.GetItemByIdHandle(), ExchangeController_1.default.DeleteExchange);
exchangeRouter.get('/getById/:id', 
// authController.AuthToken,
ExchangeValidator_1.default.GetItemByIdHandle(), ExchangeController_1.default.GetByIdExchange);
exchangeRouter.get('/select', 
// authController.AuthToken,
ExchangeController_1.default.GetAllExchangeSelect);
exchangeRouter.post('/getAll', 
// authController.AuthToken,
ExchangeController_1.default.GetAllExchangePaging);
exports.default = exchangeRouter;
