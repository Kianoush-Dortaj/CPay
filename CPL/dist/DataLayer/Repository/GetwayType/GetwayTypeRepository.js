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
const GetwayType_1 = require("../../Context/GetwayType/GetwayType");
const Util_1 = __importDefault(require("../../../Utilities/Util"));
class GetwayTypeRepository {
    /****
      *
      * Create GetwayType
      *
      ****/
    CreateGetwayType(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let avatarUrl = Util_1.default.getDirectoryImage(`${item.icon.destination}/${item.icon.originalname}`);
                const GetwayType = yield GetwayType_1.GetwayTypeEntitie.
                    build({
                    name: item.name,
                    isDelete: false,
                    description: item.description,
                    comission: item.comission,
                    isPublish: item.isPublish,
                    icon: avatarUrl,
                    locals: [...item.locals]
                });
                yield GetwayType.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create GetwayType", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set GetwayType
      *
      ****/
    UpdateGetwayType(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let avatarUrl;
                if (item.icon) {
                    avatarUrl = Util_1.default.getDirectoryImage(`${item.icon.destination}/${item.icon.originalname}`);
                }
                else {
                    const coinItem = yield this.GetByIdGetwayType(item.id);
                    avatarUrl = (_a = coinItem.result) === null || _a === void 0 ? void 0 : _a.icon;
                }
                yield GetwayType_1.GetwayTypeEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        name: item.name,
                        description: item.description,
                        icon: avatarUrl,
                        comission: item.comission,
                        isPublish: item.isPublish,
                        locals: [...item.locals]
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update GetwayType", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete GetwayType
     *
     ****/
    DeleteGetwayType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield GetwayType_1.GetwayTypeEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete GetwayType", true);
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
    GetAllGetwayTypeSelect(lang) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getSelectedGetwayType = [];
                const getAllGetwayType = yield GetwayType_1.GetwayTypeEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .where("isPublish")
                    .equals(true)
                    .select("name description  icon locals");
                getAllGetwayType.forEach(data => {
                    var _a, _b, _c, _d;
                    const name = (_a = data.locals.find(x => x.lang === lang)) === null || _a === void 0 ? void 0 : _a.value.name;
                    const description = (_b = data.locals.find(x => x.lang === lang)) === null || _b === void 0 ? void 0 : _b.value.description;
                    getSelectedGetwayType.push({
                        id: data.id,
                        icon: data.icon,
                        description: description ?
                            (_c = data.locals.find(x => x.lang === lang)) === null || _c === void 0 ? void 0 : _c.value.description :
                            data.description,
                        name: name ?
                            (_d = data.locals.find(x => x.lang === lang)) === null || _d === void 0 ? void 0 : _d.value.name :
                            data.name
                    });
                });
                return OperationResult_1.default.BuildSuccessResult("Get All Select GetwayType GetwayTypes", getSelectedGetwayType);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll GetwayType Paging
    *
    ****/
    GetAllGetwayTypePaging(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = [];
                Object.keys(items.filters).forEach(key => {
                    const value = items.filters[key];
                    if (key === 'name' && value) {
                        query.push({ name: { $regex: `(.*)${value}(.*)` } });
                    }
                    else {
                        query.push({ [key]: value });
                    }
                });
                let exchnageList = yield GetwayType_1.GetwayTypeEntitie.find(...query)
                    .skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield GetwayType_1.GetwayTypeEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .estimatedDocumentCount();
                return OperationResult_1.default.BuildSuccessResult("Get All data Paging", {
                    data: exchnageList,
                    count: count
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * Get ById
    *
    ****/
    GetByIdGetwayType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getGetwayTypeById = yield GetwayType_1.GetwayTypeEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                if (!getGetwayTypeById) {
                    return OperationResult_1.default.BuildFailur("Can not find this GetwayType");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All GetwayTypes", {
                    id: getGetwayTypeById._id,
                    name: getGetwayTypeById.name,
                    description: getGetwayTypeById.description,
                    isPublish: getGetwayTypeById.isPublish,
                    comission: getGetwayTypeById.comission,
                    icon: getGetwayTypeById.icon,
                    locals: getGetwayTypeById.locals
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = GetwayTypeRepository;
