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
const Util_1 = __importDefault(require("../../Utilities/Util"));
exports.default = new class GetwayTypeController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create GetwayType ****/
    CreateGetwayType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, description, comission, isPublish } = req.body;
            let getwayLocalItem = [];
            for (var i = 0; i < Infinity; i++) {
                if (req.body[`locals[${i}].lang`]) {
                    getwayLocalItem.push({
                        lang: req.body[`locals[${i}].lang`],
                        value: {
                            name: req.body[`locals[${i}].value.name`],
                            description: req.body[`locals[${i}].value.description`]
                        }
                    });
                }
                else {
                    break;
                }
            }
            if (!validationData.haveError) {
                const createGetwayType = yield UnitOfWork_1.default.GetwayTypeRepository.CreateGetwayType({
                    name,
                    description,
                    isPublish,
                    comission,
                    icon: req.file,
                    locals: getwayLocalItem
                });
                if (createGetwayType.success) {
                    return this.Ok(res, "Success Create GetwayType");
                }
                return this.BadRerquest(res, createGetwayType.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateGetwayType ****/
    UpdateGetwayType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const GetwayTypeId = req.params.id;
                const { name, description, comission, isPublish } = req.body;
                let getwayLocalItem = [];
                for (var i = 0; i < Infinity; i++) {
                    if (req.body[`locals[${i}].lang`]) {
                        getwayLocalItem.push({
                            lang: req.body[`locals[${i}].lang`],
                            value: {
                                name: req.body[`locals[${i}].value.name`],
                                description: req.body[`locals[${i}].value.description`]
                            }
                        });
                    }
                    else {
                        break;
                    }
                }
                const updateGetwayType = yield UnitOfWork_1.default.GetwayTypeRepository.UpdateGetwayType({
                    id: GetwayTypeId,
                    name,
                    description,
                    isPublish,
                    comission,
                    icon: req.file,
                    locals: getwayLocalItem
                });
                if (updateGetwayType.success) {
                    return this.Ok(res, "Update GetwayType");
                }
                return this.BadRerquest(res, updateGetwayType.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete GetwayType ****/
    DeleteGetwayType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteGetwayType = yield UnitOfWork_1.default.GetwayTypeRepository.DeleteGetwayType(req.params.id);
                if (deleteGetwayType.success) {
                    return this.Ok(res, "Success Delete GetwayType");
                }
                return this.BadRerquest(res, deleteGetwayType.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll GetwayType Paging ****/
    GetAllGetwayTypePaging(req, res, next) {
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
                    const getAllGetwayTypePagingGetwayType = yield UnitOfWork_1.default.GetwayTypeRepository
                        .GetAllGetwayTypePaging(req.body);
                    if (getAllGetwayTypePagingGetwayType.success) {
                        return this.OkObjectResultPager(res, {
                            count: getAllGetwayTypePagingGetwayType.result ? (_b = getAllGetwayTypePagingGetwayType.result) === null || _b === void 0 ? void 0 : _b.count : 0,
                            data: (_c = getAllGetwayTypePagingGetwayType.result) === null || _c === void 0 ? void 0 : _c.data
                        }, "Get All GetwayType Paging");
                    }
                    return this.BadRerquest(res, getAllGetwayTypePagingGetwayType.message);
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
    /*** GetAll GetwayType Select ****/
    GetAllGetwayTypeSelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                let lang = yield Util_1.default.getAcceptLang(req);
                const getAllGetwayTypeSelectGetwayType = yield UnitOfWork_1.default.GetwayTypeRepository
                    .GetAllGetwayTypeSelect(lang);
                if (getAllGetwayTypeSelectGetwayType.success) {
                    return this.OkObjectResult(res, {
                        data: getAllGetwayTypeSelectGetwayType.result
                    }, "Get All GetwayType Paging");
                }
                return this.BadRerquest(res, getAllGetwayTypeSelectGetwayType.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById GetwayType ****/
    GetByIdGetwayType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const GetwayTypeId = req.params.id;
                const getGetwayTypebyId = yield UnitOfWork_1.default.GetwayTypeRepository
                    .GetByIdGetwayType(GetwayTypeId);
                if (getGetwayTypebyId.success) {
                    return this.OkObjectResult(res, {
                        data: getGetwayTypebyId.result
                    }, "Get GetwayType By Id");
                }
                return this.BadRerquest(res, getGetwayTypebyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    GetGetwayTypeImage(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let manager = yield UnitOfWork_1.default.GetwayTypeRepository.GetByIdGetwayType(req.params.id);
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
