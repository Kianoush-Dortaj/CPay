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
exports.default = new class FiatCurrencyController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create FiatCurrency ****/
    CreateFiatCurrency(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, currencyCode, displayOrder, isPublish } = req.body;
            if (!validationData.haveError) {
                const createFiatCurrency = yield UnitOfWork_1.default.FiatCurrency.CreateFiatCurrency({
                    name,
                    displayOrder,
                    isPublish,
                    logo: req.file,
                    currencyCode
                });
                if (createFiatCurrency.success) {
                    return this.Ok(res, "Success Create FiatCurrency");
                }
                return this.BadRerquest(res, createFiatCurrency.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateFiatCurrency ****/
    UpdateFiatCurrency(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const FiatCurrencyId = req.params.id;
                const { name, currencyCode, displayOrder, isPublish } = req.body;
                const updateFiatCurrency = yield UnitOfWork_1.default.FiatCurrency.UpdateFiatCurrency({
                    id: FiatCurrencyId,
                    name,
                    displayOrder,
                    isPublish,
                    logo: req.file,
                    currencyCode
                });
                if (updateFiatCurrency.success) {
                    return this.Ok(res, "Update FiatCurrency");
                }
                return this.BadRerquest(res, updateFiatCurrency.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete FiatCurrency ****/
    DeleteFiatCurrency(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteFiatCurrency = yield UnitOfWork_1.default.FiatCurrency.DeleteFiatCurrency(req.params.id);
                if (deleteFiatCurrency.success) {
                    return this.Ok(res, "Success Delete FiatCurrency");
                }
                return this.BadRerquest(res, deleteFiatCurrency.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll FiatCurrency Paging ****/
    GetAllFiatCurrencyPaging(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let langauge = yield UnitOfWork_1.default.FiatCurrency.GetAllFiatCurrencyPaging(req.body);
            return this.OkObjectResultPager(res, {
                count: langauge.result !== undefined ? langauge.result.length : 0,
                data: langauge.result
            }, '');
        });
    }
    /*** GetAll FiatCurrency Select ****/
    GetAllFiatCurrencySelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllFiatCurrencySelectFiatCurrency = yield UnitOfWork_1.default.FiatCurrency
                    .GetAllFiatCurrencySelect();
                if (getAllFiatCurrencySelectFiatCurrency.success) {
                    return this.OkObjectResult(res, {
                        data: getAllFiatCurrencySelectFiatCurrency.result
                    }, "Get All FiatCurrency Paging");
                }
                return this.BadRerquest(res, getAllFiatCurrencySelectFiatCurrency.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById FiatCurrency ****/
    GetByIdFiatCurrency(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const FiatCurrencyId = req.params.id;
                const getFiatCurrencybyId = yield UnitOfWork_1.default.FiatCurrency
                    .GetByIdFiatCurrency(FiatCurrencyId);
                if (getFiatCurrencybyId.success) {
                    return this.OkObjectResult(res, {
                        data: getFiatCurrencybyId.result
                    }, "Get FiatCurrency By Id");
                }
                return this.BadRerquest(res, getFiatCurrencybyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
