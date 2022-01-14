"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
exports.default = new class CurrencyPairValidation {
    CreateHandle() {
        return [
            (0, express_validator_1.check)("coinId").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    let data = yield UnitOfWork_1.default.CoinRepository
                        .GetByIdCoin(value);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this coinId , Please try again");
                    }
                }
            })),
            (0, express_validator_1.check)("exchangeId").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    let data = yield UnitOfWork_1.default.ExchangeRepository
                        .GetByIdExchange(value);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this exchangeId , Please try again");
                    }
                }
            })),
            (0, express_validator_1.check)("pairs").notEmpty().withMessage("pairs Can not be Empty"),
            (0, express_validator_1.check)("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
        ];
    }
    UpdateHandle() {
        return [
            (0, express_validator_1.query)("id").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.params) {
                    let data = yield UnitOfWork_1.default.CurrencyPairRepository
                        .GetByIdCurrencyPair(req.params.id, '');
                    if (!data.success) {
                        return Promise.reject(data.message);
                    }
                }
            })),
            (0, express_validator_1.check)("coinId").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    let data = yield UnitOfWork_1.default.CoinRepository
                        .GetByIdCoin(value);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this coinId , Please try again");
                    }
                }
            })),
            (0, express_validator_1.check)("exchangeId").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    let data = yield UnitOfWork_1.default.ExchangeRepository
                        .GetByIdExchange(value);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this exchangeId , Please try again");
                    }
                }
            })),
            (0, express_validator_1.check)("pairs").notEmpty().withMessage("pairs Can not be Empty"),
            (0, express_validator_1.check)("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
        ];
    }
    GetItemByIdHandle() {
        return [
            (0, express_validator_1.query)("id").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    let data = yield UnitOfWork_1.default.CoinRepository
                        .GetByIdCoin(value);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this Currency Pair Id , Please try again");
                    }
                }
            }))
        ];
    }
};
