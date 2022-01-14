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
const OperationResult_1 = __importDefault(require("../../../core/Operation/OperationResult"));
const Language_1 = require("../../Context/Language/Language");
const Util_1 = __importDefault(require("./../../../Utilities/Util"));
class LanguageRepository {
    /****
      *
      * Create Language
      *
      ****/
    CreateLanguage(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (item.isDefault == true) {
                    const changeIsDefulatItem = yield this
                        .FindIsDefulatItemAndChangeIt();
                    if (!changeIsDefulatItem.success) {
                        return OperationResult_1.default.BuildFailur(changeIsDefulatItem.message);
                    }
                }
                let flagImageFileName = Util_1.default.getDirectoryImage(`${item.flagImageFileName.destination}/${item.flagImageFileName.originalname}`);
                const Language = yield Language_1.LanguageEntitie.build({
                    displayOrder: item.displayOrder,
                    flagImageFileName: flagImageFileName,
                    isDefault: item.isDefault,
                    isDelete: false,
                    isPublish: item.isPublish,
                    name: item.name,
                    rtl: item.rtl,
                    uniqueSeoCode: item.uniqueSeoCode
                });
                yield Language.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create Language", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Language
      *
      ****/
    UpdateLanguage(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let flagImageFileName;
                if (item.isDefault == true) {
                    const changeIsDefulatItem = yield this.FindIsDefulatItemAndChangeIt();
                    if (!changeIsDefulatItem.success) {
                        return OperationResult_1.default.BuildFailur(changeIsDefulatItem.message);
                    }
                }
                if (item.flagImageFileName) {
                    flagImageFileName = Util_1.default.getDirectoryImage(`${item.flagImageFileName.destination}/${item.flagImageFileName.originalname}`);
                }
                else {
                    const coinItem = yield this.GetByIdLanguage(item.id);
                    flagImageFileName = (_a = coinItem.result) === null || _a === void 0 ? void 0 : _a.flagImageFileName;
                }
                yield Language_1.LanguageEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        displayOrder: item.displayOrder,
                        flagImageFileName: flagImageFileName,
                        isDefault: item.isDefault,
                        isDelete: false,
                        isPublish: item.isPublish,
                        name: item.name,
                        rtl: item.rtl,
                        uniqueSeoCode: item.uniqueSeoCode
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update Language", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Language
     *
     ****/
    DeleteLanguage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Language_1.LanguageEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete Language", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Permission
    *
    ****/
    GetAllLanguageSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllLanguage = yield Language_1.LanguageEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .sort([['displayOrder', "descending"], ['isDefault', -1]])
                    .select("name uniqueSeoCode rtl flagImageFileName isDefault");
                return OperationResult_1.default.BuildSuccessResult("Get All Languages", getAllLanguage);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Langauge
    *
    ****/
    GetAllLangaugePaging(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = [];
                Object.keys(items.filters).forEach(key => {
                    const value = items.filters[key];
                    if (key === 'name' && value) {
                        query.push({ name: { $regex: `(.*)${value}(.*)` } });
                    }
                    else if (key === 'uniqueSeoCode' && value) {
                        query.push({ uniqueSeoCode: { $regex: `(.*)${value}(.*)` } });
                    }
                    else {
                        query.push({ [key]: value });
                    }
                });
                let userList = yield Language_1.LanguageEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                return OperationResult_1.default.BuildSuccessResult('Operation Success', userList);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * Get ById Permission
    *
    ****/
    GetByIdLanguage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAllPermission = [];
                const getLanguageById = yield Language_1.LanguageEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                if (!getLanguageById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Language");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Languages", {
                    id: getLanguageById._id,
                    displayOrder: getLanguageById.displayOrder,
                    flagImageFileName: getLanguageById.flagImageFileName,
                    isDefault: getLanguageById.isDefault,
                    isPublish: getLanguageById.isPublish,
                    name: getLanguageById.name,
                    rtl: getLanguageById.rtl,
                    uniqueSeoCode: getLanguageById.uniqueSeoCode
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    *  Find isDefulat Item
    *
    ****/
    FindIsDefulatItemAndChangeIt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getLanguageById = yield Language_1.LanguageEntitie.findOne({ isDefault: true })
                    .where("isDelete")
                    .equals(false);
                if (!getLanguageById) {
                    return OperationResult_1.default.BuildSuccessResult("Can not find this Language", true);
                }
                const updateLanguage = yield this.UpdateLanguage({
                    id: getLanguageById._id,
                    isDefault: false,
                    isPublish: getLanguageById.isPublish,
                    name: getLanguageById.name,
                    displayOrder: getLanguageById.displayOrder,
                    flagImageFileName: getLanguageById.flagImageFileName,
                    rtl: getLanguageById.rtl,
                    uniqueSeoCode: getLanguageById.uniqueSeoCode
                });
                if (!updateLanguage.success) {
                    return OperationResult_1.default.BuildFailur(updateLanguage.message);
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Languages", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * Get Defualt
    *
    ****/
    GetDefulatLanguage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getLanguageById = yield Language_1.LanguageEntitie.findOne({})
                    .where("isDelete")
                    .equals(false)
                    .where("isDefault")
                    .equals(true);
                if (!getLanguageById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Language");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Language", {
                    id: getLanguageById._id,
                    displayOrder: getLanguageById.displayOrder,
                    flagImageFileName: getLanguageById.flagImageFileName,
                    isDefault: getLanguageById.isDefault,
                    isPublish: getLanguageById.isPublish,
                    name: getLanguageById.name,
                    rtl: getLanguageById.rtl,
                    uniqueSeoCode: getLanguageById.uniqueSeoCode
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Get Langauge By UniSeo Code
      *
      ****/
    FindLanguageByUniSeoCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getLanguageById = yield Language_1.LanguageEntitie.findOne({ uniqueSeoCode: code })
                    .where("isDelete")
                    .equals(false);
                if (!getLanguageById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Language");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Languages", {
                    id: getLanguageById._id,
                    displayOrder: getLanguageById.displayOrder,
                    flagImageFileName: getLanguageById.flagImageFileName,
                    isDefault: getLanguageById.isDefault,
                    isPublish: getLanguageById.isPublish,
                    name: getLanguageById.name,
                    rtl: getLanguageById.rtl,
                    uniqueSeoCode: getLanguageById.uniqueSeoCode
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = LanguageRepository;
