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
const UserLevel_1 = require("../../Context/UserLevel/UserLevel");
const RedisRepository_1 = __importDefault(require("../../../Utilities/Redis/RedisRepository"));
const RedisKey_1 = __importDefault(require("../../../Utilities/Redis/RedisKey"));
class UserLevelRepository {
    /****
      *
      * Create UserLevel
      *
      ****/
    CreateUserLevel(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (item.isDefault === true) {
                    const changeIsDefulatItem = yield this.FindIsDefulatItemAndChangeIt();
                    if (!changeIsDefulatItem.success) {
                        return OperationResult_1.default.BuildFailur(changeIsDefulatItem.message);
                    }
                }
                const userLevel = yield UserLevel_1.UserLevelEntitie.build({
                    name: item.name,
                    isDelete: false,
                    isDefault: item.isDefault,
                    isPublish: item.isPublish
                });
                yield userLevel.save();
                if (item.isDefault === true) {
                    yield RedisRepository_1.default.Set(RedisKey_1.default.UserGroup, {
                        name: item.name,
                        id: userLevel._id,
                    });
                }
                return OperationResult_1.default.BuildSuccessResult("Success Create UserLevel", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set UserLevel
      *
      ****/
    UpdateUserLevel(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (item.isDefault === true) {
                    const changeIsDefulatItem = yield this.FindIsDefulatItemAndChangeIt();
                    if (!changeIsDefulatItem.success) {
                        return OperationResult_1.default.BuildFailur(changeIsDefulatItem.message);
                    }
                }
                yield UserLevel_1.UserLevelEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        name: item.name,
                        isDefault: item.isDefault,
                        isPublish: item.isPublish
                    }
                });
                if (item.isDefault) {
                    yield RedisRepository_1.default.ResetSingleItem(RedisKey_1.default.UserGroup, {
                        name: item.name,
                        id: item.id,
                    });
                }
                return OperationResult_1.default.BuildSuccessResult("Success Update UserLevel", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete UserLevel
     *
     ****/
    DeleteUserLevel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserLevel_1.UserLevelEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete UserLevel", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * Get All UserLevel Select
    *
    ****/
    GetAllUserLevelSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllUserLevel = yield UserLevel_1.UserLevelEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .select("name");
                return OperationResult_1.default.BuildSuccessResult("Get All UserLevels", getAllUserLevel);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll UserLevel Paging
    *
    ****/
    GetAllUserLevelPaging(items) {
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
                let userLevelList = yield UserLevel_1.UserLevelEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield UserLevel_1.UserLevelEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .estimatedDocumentCount();
                return OperationResult_1.default.BuildSuccessResult("Get All data Paging", {
                    data: userLevelList,
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
    *  Find isDefulat Item
    *
    ****/
    FindIsDefulatItemAndChangeIt() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getUserLevelById = yield UserLevel_1.UserLevelEntitie.findOne({ isDefault: true })
                    .where("isDelete")
                    .equals(false);
                if (!getUserLevelById) {
                    return OperationResult_1.default.BuildSuccessResult("Can not find this UserLevel", true);
                }
                const updateUserLevel = yield this.UpdateUserLevel({
                    id: getUserLevelById._id,
                    isDefault: false,
                    isPublish: getUserLevelById.isPublish,
                    name: getUserLevelById.name
                });
                if (!updateUserLevel.success) {
                    return OperationResult_1.default.BuildFailur(updateUserLevel.message);
                }
                return OperationResult_1.default.BuildSuccessResult("Get All UserLevels", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    *  Get User Level By Id
    *
    ****/
    GetByIdUserLevel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getUserLevelById = yield UserLevel_1.UserLevelEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false);
                if (!getUserLevelById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Recored");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Roles", {
                    id: getUserLevelById.id,
                    isDefault: getUserLevelById.isDelete,
                    isPublish: getUserLevelById.isPublish,
                    name: getUserLevelById.name
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = UserLevelRepository;
