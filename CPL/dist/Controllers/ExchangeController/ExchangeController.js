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
exports.default = new class ExchangeController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Exchange ****/
    CreateExchange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, symbol, isPublish } = req.body;
            if (!validationData.haveError) {
                const createExchange = yield UnitOfWork_1.default.ExchangeRepository.CreateExchange({
                    name,
                    symbol,
                    isPublish
                });
                if (createExchange.success) {
                    return this.Ok(res, "Success Create Exchange");
                }
                return this.BadRerquest(res, createExchange.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateExchange ****/
    UpdateExchange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const ExchangeId = req.params.id;
                const { name, symbol, isPublish } = req.body;
                const updateExchange = yield UnitOfWork_1.default.ExchangeRepository.UpdateExchange({
                    id: ExchangeId,
                    name,
                    symbol,
                    isPublish
                });
                if (updateExchange.success) {
                    this.Ok(res, "Update Exchange");
                }
                return this.BadRerquest(res, updateExchange.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Exchange ****/
    DeleteExchange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteExchange = yield UnitOfWork_1.default.ExchangeRepository.DeleteExchange(req.params.id);
                if (deleteExchange.success) {
                    return this.Ok(res, "Success Delete Exchange");
                }
                return this.BadRerquest(res, deleteExchange.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Exchange Paging ****/
    GetAllExchangePaging(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllExchangePagingExchange = yield UnitOfWork_1.default.ExchangeRepository
                    .GetAllExchangePaging(req.body);
                if (getAllExchangePagingExchange.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllExchangePagingExchange.result ? (_a = getAllExchangePagingExchange.result) === null || _a === void 0 ? void 0 : _a.count : 0,
                        data: (_b = getAllExchangePagingExchange.result) === null || _b === void 0 ? void 0 : _b.data
                    }, "Get All Exchange Paging");
                }
                return this.BadRerquest(res, getAllExchangePagingExchange.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Exchange Select ****/
    GetAllExchangeSelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllExchangeSelectExchange = yield UnitOfWork_1.default.ExchangeRepository
                    .GetAllExchangeSelect();
                if (getAllExchangeSelectExchange.success) {
                    return this.OkObjectResult(res, {
                        data: getAllExchangeSelectExchange.result
                    }, "Get All Exchange Paging");
                }
                return this.BadRerquest(res, getAllExchangeSelectExchange.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById Exchange ****/
    GetByIdExchange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const ExchangeId = req.params.id;
                const getExchangebyId = yield UnitOfWork_1.default.ExchangeRepository
                    .GetByIdExchange(ExchangeId);
                if (getExchangebyId.success) {
                    return this.OkObjectResult(res, {
                        data: getExchangebyId.result
                    }, "Get Exchange By Id");
                }
                return this.BadRerquest(res, getExchangebyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
