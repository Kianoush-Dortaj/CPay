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
const FiatCurrency_1 = require("../../Context/FiatCurrency/FiatCurrency");
const Util_1 = __importDefault(require("../../../Utilities/Util"));
class FiatCurrencyRepository {
    /****
      *
      * Create FiatCurrency
      *
      ****/
    CreateFiatCurrency(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let flag = Util_1.default.getDirectoryImage(`${item.logo.destination}/${item.logo.originalname}`);
                const FiatCurrency = yield FiatCurrency_1.FiatCurrencyEntitie.build({
                    currencyCode: item.currencyCode,
                    isPublish: item.isPublish,
                    logo: flag,
                    name: item.name,
                    displayOrder: item.displayOrder
                });
                yield FiatCurrency.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create FiatCurrency", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set FiatCurrency
      *
      ****/
    UpdateFiatCurrency(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let flag;
                if (item.logo) {
                    flag = Util_1.default.getDirectoryImage(`${item.logo.destination}/${item.logo.originalname}`);
                }
                else {
                    const coinItem = yield this.GetByIdFiatCurrency(item.id);
                    flag = (_a = coinItem.result) === null || _a === void 0 ? void 0 : _a.logo;
                }
                yield FiatCurrency_1.FiatCurrencyEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        currencyCode: item.currencyCode,
                        isPublish: item.isPublish,
                        logo: flag,
                        name: item.name,
                        displayOrder: item.displayOrder
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update FiatCurrency", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete FiatCurrency
     *
     ****/
    DeleteFiatCurrency(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield FiatCurrency_1.FiatCurrencyEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete FiatCurrency", true);
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
    GetAllFiatCurrencySelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllFiatCurrency = yield FiatCurrency_1.FiatCurrencyEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .where("isPublish")
                    .equals(true)
                    .sort([['displayOrder', "descending"]])
                    .select("name logo currencyCode");
                return OperationResult_1.default.BuildSuccessResult("Get All FiatCurrencys", getAllFiatCurrency);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll FiatCurrency
    *
    ****/
    GetAllFiatCurrencyPaging(items) {
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
                let userList = yield FiatCurrency_1.FiatCurrencyEntitie.find(...query).skip((items.page - 1) * items.pageSize)
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
    GetByIdFiatCurrency(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAllPermission = [];
                const getFiatCurrencyById = yield FiatCurrency_1.FiatCurrencyEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                if (!getFiatCurrencyById) {
                    return OperationResult_1.default.BuildFailur("Can not find this FiatCurrency");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All FiatCurrencys", {
                    id: getFiatCurrencyById._id,
                    displayOrder: getFiatCurrencyById.displayOrder,
                    isPublish: getFiatCurrencyById.isPublish,
                    name: getFiatCurrencyById.name,
                    currencyCode: getFiatCurrencyById.currencyCode,
                    logo: getFiatCurrencyById.logo
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = FiatCurrencyRepository;
