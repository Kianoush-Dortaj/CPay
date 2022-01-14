"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const BaseController_1 = require("../../core/Controller/BaseController");
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const fs = __importStar(require("fs"));
const Util_1 = __importDefault(require("./../../Utilities/Util"));
exports.default = new class CoinController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Coin ****/
    CreateCoin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            let coinLocalItem = [];
            let networkItemInfo = [];
            const { name, symbol, networks, isPublish } = req.body;
            if (!validationData.haveError) {
                for (var i = 0; i < Infinity; i++) {
                    if (req.body[`locals[${i}].lang`]) {
                        coinLocalItem.push({
                            lang: req.body[`locals[${i}].lang`],
                            value: {
                                name: req.body[`locals[${i}].value.name`],
                                langId: req.body[`locals[${i}].value.langId`]
                            }
                        });
                    }
                    else {
                        break;
                    }
                }
                for (var i = 0; i < Infinity; i++) {
                    if (req.body[`networks[${i}].networkId`]) {
                        networkItemInfo.push({
                            contractAbi: req.body[`networks[${i}].contractAbi`],
                            contractAddress: req.body[`networks[${i}].contractAddress`],
                            networkId: req.body[`networks[${i}].networkId`]
                        });
                    }
                    else {
                        break;
                    }
                }
                const createCoin = yield UnitOfWork_1.default.CoinRepository.CreateCoin({
                    name,
                    symbol,
                    isPublish,
                    icon: req.file,
                    networks: networkItemInfo,
                    locals: coinLocalItem
                });
                if (createCoin.success) {
                    return this.Ok(res, "Success Create Coin");
                }
                return this.BadRerquest(res, createCoin.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateCoin ****/
    UpdateCoin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const CoinId = req.params.id;
                const { name, symbol, isPublish } = req.body;
                let coinLocalItem = [];
                let networkItemInfo = [];
                for (var i = 0; i < Infinity; i++) {
                    if (req.body[`locals[${i}].lang`]) {
                        coinLocalItem.push({
                            lang: req.body[`locals[${i}].lang`],
                            value: {
                                name: req.body[`locals[${i}].value.name`],
                                langId: req.body[`locals[${i}].value.langId`]
                            }
                        });
                    }
                    else {
                        break;
                    }
                }
                for (var i = 0; i < Infinity; i++) {
                    if (req.body[`networks[${i}].networkId`]) {
                        networkItemInfo.push({
                            contractAbi: req.body[`networks[${i}].contractAbi`],
                            contractAddress: req.body[`networks[${i}].contractAddress`],
                            networkId: req.body[`networks[${i}].networkId`]
                        });
                    }
                    else {
                        break;
                    }
                }
                const updateCoin = yield UnitOfWork_1.default.CoinRepository.UpdateCoin({
                    id: CoinId,
                    name,
                    symbol,
                    isPublish,
                    icon: req.file,
                    networks: networkItemInfo,
                    locals: coinLocalItem
                });
                if (updateCoin.success) {
                    return this.Ok(res, "Update Coin");
                }
                return this.BadRerquest(res, updateCoin.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Coin ****/
    DeleteCoin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteCoin = yield UnitOfWork_1.default.CoinRepository.DeleteCoin(req.params.id);
                if (deleteCoin.success) {
                    return this.Ok(res, "Success Delete Coin");
                }
                return this.BadRerquest(res, deleteCoin.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Coin Paging ****/
    GetAllCoinPaging(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            let lang = '';
            if (!validationData.haveError) {
                if (req.headers['accept-language']) {
                    lang = req.headers['accept-language'];
                }
                else {
                    const defaultItem = yield UnitOfWork_1.default.LanguageRepository.
                        GetDefulatLanguage();
                    if (defaultItem.success) {
                        lang = defaultItem.success ?
                            defaultItem.result ?
                                (_a = defaultItem.result) === null || _a === void 0 ? void 0 : _a.uniqueSeoCode : 'en' : 'en';
                    }
                }
                const findLangInfo = yield UnitOfWork_1.default.LanguageRepository.
                    FindLanguageByUniSeoCode(lang);
                if (findLangInfo.success && findLangInfo.result !== undefined) {
                    const getAllCoinPagingCoin = yield UnitOfWork_1.default.CoinRepository
                        .GetAllCoinPaging(req.body);
                    if (getAllCoinPagingCoin.success) {
                        return this.OkObjectResultPager(res, {
                            count: getAllCoinPagingCoin.result ? (_b = getAllCoinPagingCoin.result) === null || _b === void 0 ? void 0 : _b.count : 0,
                            data: (_c = getAllCoinPagingCoin.result) === null || _c === void 0 ? void 0 : _c.data
                        }, "Get All Coin Paging");
                    }
                    return this.BadRerquest(res, getAllCoinPagingCoin.message);
                }
                else if (!findLangInfo.success) {
                    return this.BadRerquest(res, "we can not find your langauge selector");
                }
                else {
                    return this.BadRerquest(res, validationData.errorMessage.toString());
                }
            }
        });
    }
    /*** GetAll Coin Select ****/
    GetAllCoinSelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                let lang = yield Util_1.default.getAcceptLang(req);
                const getAllCoinSelectCoin = yield UnitOfWork_1.default.CoinRepository
                    .GetAllCoinSelect(lang);
                if (getAllCoinSelectCoin.success) {
                    return this.OkObjectResult(res, {
                        data: getAllCoinSelectCoin.result
                    }, "Get All Coin Paging");
                }
                return this.BadRerquest(res, getAllCoinSelectCoin.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById Coin ****/
    GetByIdCoin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const CoinId = req.params.id;
                const getCoinbyId = yield UnitOfWork_1.default.CoinRepository
                    .GetByIdCoin(CoinId);
                if (getCoinbyId.success) {
                    return this.OkObjectResult(res, {
                        data: getCoinbyId.result
                    }, "Get Coin By Id");
                }
                return this.BadRerquest(res, getCoinbyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    GetCoinImage(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let manager = yield UnitOfWork_1.default.CoinRepository.GetByIdCoin(req.params.id);
            if (manager) {
                if (!((_a = manager.result) === null || _a === void 0 ? void 0 : _a.icon)) {
                    return this.Notfound(res);
                }
                fs.readFile(`./src/public${(_b = manager.result) === null || _b === void 0 ? void 0 : _b.icon}`, (error, data) => {
                    if (error)
                        throw error;
                    res.writeHead(200, { "Content-Type": "image/png" });
                    res.end(data);
                });
            }
        });
    }
};
