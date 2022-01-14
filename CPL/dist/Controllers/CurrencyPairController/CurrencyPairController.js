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
const BaseController_1 = require("../../core/Controller/BaseController");
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const Util_1 = __importDefault(require("./../../Utilities/Util"));
exports.default = new class CurrencyPairController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create CurrencyPair ****/
    CreateCurrencyPair(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { coinId, exchangeId, pairs, isPublish } = req.body;
            if (!validationData.haveError) {
                const createCurrencyPair = yield UnitOfWork_1.default.CurrencyPairRepository
                    .CreateCurrencyPair({
                    coinId,
                    exchangeId,
                    pairs,
                    isPublish
                });
                if (createCurrencyPair.success) {
                    return this.Ok(res, "Success Create CurrencyPair");
                }
                return this.BadRerquest(res, createCurrencyPair.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateCurrencyPair ****/
    UpdateCurrencyPair(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const CurrencyPairId = req.params.id;
                const { coinId, exchangeId, pairs, isPublish } = req.body;
                const updateCurrencyPair = yield UnitOfWork_1.default.CurrencyPairRepository
                    .UpdateCurrencyPair({
                    id: CurrencyPairId,
                    coinId,
                    exchangeId,
                    pairs,
                    isPublish
                });
                if (updateCurrencyPair.success) {
                    return this.Ok(res, "Update CurrencyPair");
                }
                return this.BadRerquest(res, updateCurrencyPair.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete CurrencyPair ****/
    DeleteCurrencyPair(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteCurrencyPair = yield UnitOfWork_1.default.CurrencyPairRepository.DeleteCurrencyPair(req.params.id);
                if (deleteCurrencyPair.success) {
                    return this.Ok(res, "Success Delete CurrencyPair");
                }
                return this.BadRerquest(res, deleteCurrencyPair.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll CurrencyPair Paging ****/
    GetAllCurrencyPairPaging(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllCurrencyPairPagingCurrencyPair = yield UnitOfWork_1.default.CurrencyPairRepository
                    .GetAllCurrencyPairPaging(req.body);
                if (getAllCurrencyPairPagingCurrencyPair.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllCurrencyPairPagingCurrencyPair.result ? (_a = getAllCurrencyPairPagingCurrencyPair.result) === null || _a === void 0 ? void 0 : _a.count : 0,
                        data: (_b = getAllCurrencyPairPagingCurrencyPair.result) === null || _b === void 0 ? void 0 : _b.data
                    }, "Get All CurrencyPair Paging");
                }
                return this.BadRerquest(res, getAllCurrencyPairPagingCurrencyPair.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById CurrencyPair ****/
    GetByIdCurrencyPair(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const CurrencyPairId = req.params.id;
                let lang = yield Util_1.default.getAcceptLang(req);
                const getCurrencyPairbyId = yield UnitOfWork_1.default.CurrencyPairRepository
                    .GetByIdCurrencyPair(CurrencyPairId, lang);
                if (getCurrencyPairbyId.success) {
                    return this.OkObjectResult(res, {
                        data: getCurrencyPairbyId.result
                    }, "Get CurrencyPair By Id");
                }
                return this.BadRerquest(res, getCurrencyPairbyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById CurrencyPair ****/
    GetAllCurrenyPairs(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getCurrencyPairbyId = yield UnitOfWork_1.default.CurrencyPairRepository
                    .GetAllCurrencyPairs();
                if (getCurrencyPairbyId.success) {
                    return this.OkObjectResult(res, {
                        data: getCurrencyPairbyId.result
                    }, "Get CurrencyPair By Id");
                }
                return this.BadRerquest(res, getCurrencyPairbyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
