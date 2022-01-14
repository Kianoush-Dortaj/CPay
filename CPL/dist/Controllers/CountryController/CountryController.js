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
const Country_1 = require("../../DataLayer/Context/Country/Country");
exports.default = new class CountryController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Country ****/
    CreateCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, iso3Code, iso2Code, callCode, isDefault, currency, displayOrder, languageId, isPublish } = req.body;
            if (!validationData.haveError) {
                const createCountry = yield UnitOfWork_1.default.CountryRepository.CreateCountry({
                    name,
                    iso3Code,
                    iso2Code,
                    callCode,
                    isDefault,
                    currency,
                    displayOrder,
                    languageId,
                    isPublish,
                    flag: req.file
                });
                if (createCountry.success) {
                    return this.Ok(res, "Success Create Country");
                }
                return this.BadRerquest(res, createCountry.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateCountry ****/
    UpdateCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const CountryId = req.params.id;
                const { name, iso3Code, iso2Code, callCode, isDefault, languageId, displayOrder, currency, isPublish, } = req.body;
                const updateCountry = yield UnitOfWork_1.default.CountryRepository.UpdateCountry({
                    id: CountryId,
                    name,
                    iso3Code,
                    iso2Code,
                    currency,
                    callCode,
                    isDefault,
                    displayOrder,
                    languageId,
                    isPublish,
                    flag: req.file
                });
                if (updateCountry.success) {
                    return this.Ok(res, "Update Country");
                }
                return this.BadRerquest(res, updateCountry.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Country ****/
    DeleteCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteCountry = yield UnitOfWork_1.default.CountryRepository.DeleteCountry(req.params.id);
                if (deleteCountry.success) {
                    return this.Ok(res, "Success Delete Country");
                }
                return this.BadRerquest(res, deleteCountry.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Country Paging ****/
    GetAllCountryPaging(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let langauge = yield UnitOfWork_1.default.CountryRepository.GetAllCountryPaging(req.body);
            return this.OkObjectResultPager(res, {
                count: langauge.result !== undefined ? langauge.result.length : 0,
                data: langauge.result
            }, '');
        });
    }
    /*** GetAll Country Select ****/
    GetAllCountrySelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllCountrySelectCountry = yield UnitOfWork_1.default.CountryRepository
                    .GetAllCountrySelect();
                if (getAllCountrySelectCountry.success) {
                    return this.OkObjectResult(res, {
                        data: getAllCountrySelectCountry.result
                    }, "Get All Country Paging");
                }
                return this.BadRerquest(res, getAllCountrySelectCountry.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById Country ****/
    GetByIdCountry(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const CountryId = req.params.id;
                const getCountrybyId = yield UnitOfWork_1.default.CountryRepository
                    .GetByIdCountry(CountryId);
                if (getCountrybyId.success) {
                    return this.OkObjectResult(res, {
                        data: getCountrybyId.result
                    }, "Get Country By Id");
                }
                return this.BadRerquest(res, getCountrybyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
    * Get User Image
    */
    GetCountryImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let country = yield Country_1.CountryEntitie.findById(req.params.id).select("flag");
            if (country) {
                if (!country.flag) {
                    return this.Notfound(res);
                }
                fs.readFile(`./src/public${country.flag}`, (error, data) => {
                    if (error)
                        throw error;
                    res.writeHead(200, { "Content-Type": "image/png" });
                    res.end(data);
                });
            }
        });
    }
};
