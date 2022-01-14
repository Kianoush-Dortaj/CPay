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
const Country_1 = require("../../Context/Country/Country");
const Util_1 = __importDefault(require("../../../Utilities/Util"));
class CountryRepository {
    /****
      *
      * Create Country
      *
      ****/
    CreateCountry(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (item.isDefault == true) {
                    const changeIsDefulatItem = yield this
                        .FindIsDefulatItemAndChangeIt();
                    if (!changeIsDefulatItem.success) {
                        return OperationResult_1.default.BuildFailur(changeIsDefulatItem.message);
                    }
                }
                let flag = Util_1.default.getDirectoryImage(`${item.flag.destination}/${item.flag.originalname}`);
                const Country = yield Country_1.CountryEntitie.build({
                    displayOrder: item.displayOrder,
                    flag: flag,
                    isDefault: item.isDefault,
                    isDelete: false,
                    currency: item.currency,
                    isPublish: item.isPublish,
                    name: item.name,
                    callCode: item.callCode,
                    iso2Code: item.iso2Code,
                    iso3Code: item.iso3Code,
                    languageId: item.languageId,
                });
                yield Country.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create Country", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Country
      *
      ****/
    UpdateCountry(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let flag;
                if (item.isDefault == true) {
                    const changeIsDefulatItem = yield this.FindIsDefulatItemAndChangeIt();
                    if (!changeIsDefulatItem.success) {
                        return OperationResult_1.default.BuildFailur(changeIsDefulatItem.message);
                    }
                }
                if (item.flag) {
                    flag = Util_1.default.getDirectoryImage(`${item.flag.destination}/${item.flag.originalname}`);
                }
                else {
                    const coinItem = yield this.GetByIdCountry(item.id);
                    flag = (_a = coinItem.result) === null || _a === void 0 ? void 0 : _a.flag;
                }
                yield Country_1.CountryEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        displayOrder: item.displayOrder,
                        flag: flag,
                        isDefault: item.isDefault,
                        isDelete: false,
                        isPublish: item.isPublish,
                        name: item.name,
                        currency: item.currency,
                        callCode: item.callCode,
                        iso2Code: item.iso2Code,
                        iso3Code: item.iso3Code,
                        languageId: item.languageId,
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update Country", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Country
     *
     ****/
    DeleteCountry(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Country_1.CountryEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete Country", true);
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
    GetAllCountrySelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllCountry = yield Country_1.CountryEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .where("isPublish")
                    .equals(true)
                    .sort([['displayOrder', "descending"], ['isDefault', -1]])
                    .select("name iso3Code callCode flagImageFileName isDefault");
                return OperationResult_1.default.BuildSuccessResult("Get All Countrys", getAllCountry);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Country
    *
    ****/
    GetAllCountryPaging(items) {
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
                let userList = yield Country_1.CountryEntitie.find(...query).skip((items.page - 1) * items.pageSize)
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
    GetByIdCountry(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCountryById = yield Country_1.CountryEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                if (!getCountryById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Country");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Countrys", {
                    id: getCountryById._id,
                    displayOrder: getCountryById.displayOrder,
                    isDefault: getCountryById.isDefault,
                    isPublish: getCountryById.isPublish,
                    name: getCountryById.name,
                    callCode: getCountryById.callCode,
                    currency: getCountryById.currency,
                    iso2Code: getCountryById.iso2Code,
                    iso3Code: getCountryById.iso3Code,
                    languageId: getCountryById.languageId,
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
                const getCountryById = yield Country_1.CountryEntitie.findOne({ isDefault: true })
                    .where("isDelete")
                    .equals(false);
                if (!getCountryById) {
                    return OperationResult_1.default.BuildSuccessResult("Can not find this Country", true);
                }
                const updateCountry = yield this.UpdateCountry({
                    id: getCountryById._id,
                    displayOrder: getCountryById.displayOrder,
                    flag: getCountryById.flag,
                    isDefault: getCountryById.isDefault,
                    isPublish: getCountryById.isPublish,
                    name: getCountryById.name,
                    callCode: getCountryById.callCode,
                    currency: getCountryById.currency,
                    iso2Code: getCountryById.iso2Code,
                    iso3Code: getCountryById.iso3Code,
                    languageId: getCountryById.languageId,
                });
                if (!updateCountry.success) {
                    return OperationResult_1.default.BuildFailur(updateCountry.message);
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Countrys", true);
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
    GetDefulatCountry() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCountryById = yield Country_1.CountryEntitie.findOne({})
                    .where("isDelete")
                    .equals(false)
                    .where("isDefault")
                    .equals(true);
                if (!getCountryById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Country");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Country", {
                    id: getCountryById._id,
                    displayOrder: getCountryById.displayOrder,
                    isDefault: getCountryById.isDefault,
                    isPublish: getCountryById.isPublish,
                    name: getCountryById.name,
                    currency: getCountryById.currency,
                    callCode: getCountryById.callCode,
                    iso2Code: getCountryById.iso2Code,
                    iso3Code: getCountryById.iso3Code,
                    languageId: getCountryById.languageId
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Get Country By UniSeo Code
      *
      ****/
    FindCountryByUniSeoCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getCountryById = yield Country_1.CountryEntitie.findOne({ uniqueSeoCode: code })
                    .where("isDelete")
                    .equals(false);
                if (!getCountryById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Country");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Countrys", {
                    id: getCountryById._id,
                    displayOrder: getCountryById.displayOrder,
                    isDefault: getCountryById.isDefault,
                    isPublish: getCountryById.isPublish,
                    name: getCountryById.name,
                    callCode: getCountryById.callCode,
                    currency: getCountryById.currency,
                    iso2Code: getCountryById.iso2Code,
                    iso3Code: getCountryById.iso3Code,
                    languageId: getCountryById.languageId,
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = CountryRepository;
