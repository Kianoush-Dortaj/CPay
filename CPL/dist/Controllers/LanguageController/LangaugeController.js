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
const Language_1 = require("../../DataLayer/Context/Language/Language");
exports.default = new class LanguageController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Language ****/
    CreateLanguage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, displayOrder, isPublish, isDefault, rtl, uniqueSeoCode } = req.body;
            if (!validationData.haveError) {
                const createLanguage = yield UnitOfWork_1.default.LanguageRepository.CreateLanguage({
                    name,
                    displayOrder,
                    isPublish,
                    isDefault,
                    rtl,
                    uniqueSeoCode,
                    flagImageFileName: req.file
                });
                if (createLanguage.success) {
                    return this.Ok(res, "Success Create Language");
                }
                return this.BadRerquest(res, createLanguage.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateLanguage ****/
    UpdateLanguage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const LanguageId = req.params.id;
                const { name, displayOrder, isPublish, isDefault, rtl, uniqueSeoCode, flagImageFileName } = req.body;
                const updateLanguage = yield UnitOfWork_1.default.LanguageRepository.UpdateLanguage({
                    id: LanguageId,
                    name,
                    displayOrder,
                    isPublish,
                    isDefault,
                    rtl,
                    uniqueSeoCode,
                    flagImageFileName: req.file
                });
                if (updateLanguage.success) {
                    return this.Ok(res, "Update Language");
                }
                return this.BadRerquest(res, updateLanguage.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Language ****/
    DeleteLanguage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteLanguage = yield UnitOfWork_1.default.LanguageRepository.DeleteLanguage(req.params.id);
                if (deleteLanguage.success) {
                    return this.Ok(res, "Success Delete Language");
                }
                return this.BadRerquest(res, deleteLanguage.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Language Paging ****/
    GetAllLanguagePaging(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let langauge = yield UnitOfWork_1.default.LanguageRepository.GetAllLangaugePaging(req.body);
            return this.OkObjectResultPager(res, {
                count: langauge.result !== undefined ? langauge.result.length : 0,
                data: langauge.result
            }, '');
        });
    }
    /*** GetAll Language Select ****/
    GetAllLanguageSelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllLanguageSelectLanguage = yield UnitOfWork_1.default.LanguageRepository
                    .GetAllLanguageSelect();
                if (getAllLanguageSelectLanguage.success) {
                    return this.OkObjectResult(res, {
                        data: getAllLanguageSelectLanguage.result
                    }, "Get All Language Paging");
                }
                return this.BadRerquest(res, getAllLanguageSelectLanguage.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById Language ****/
    GetByIdLanguage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const LanguageId = req.params.id;
                const getLanguagebyId = yield UnitOfWork_1.default.LanguageRepository
                    .GetByIdLanguage(LanguageId);
                if (getLanguagebyId.success) {
                    return this.OkObjectResult(res, {
                        data: getLanguagebyId.result
                    }, "Get Language By Id");
                }
                return this.BadRerquest(res, getLanguagebyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
    * Get User Image
    */
    GetLanguageImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let language = yield Language_1.LanguageEntitie.findById(req.params.id).select("flagImageFileName");
            if (language) {
                if (!language.flagImageFileName) {
                    return this.Notfound(res);
                }
                fs.readFile(`./src/public${language.flagImageFileName}`, (error, data) => {
                    if (error)
                        throw error;
                    res.writeHead(200, { "Content-Type": "image/png" });
                    res.end(data);
                });
            }
        });
    }
};
