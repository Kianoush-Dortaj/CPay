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
const Comission_1 = require("../../Context/Comission/Comission");
class ComissionRepository {
    /****
      *
      * Create Comission
      *
      ****/
    CreateComission(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userLevel = yield Comission_1.ComissionEntitie.build({
                    userLevelId: item.userLevelId,
                    actionType: item.actionType,
                    comission: item.comission
                });
                yield userLevel.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create Comission", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Comission
      *
      ****/
    UpdateComission(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Comission_1.ComissionEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        userLevelId: item.userLevelId,
                        actionType: item.actionType,
                        comission: item.comission
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Update Comission", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Comission
     *
     ****/
    DeleteComission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Comission_1.ComissionEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete Comission", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Comission Paging
    *
    ****/
    GetAllComissionPaging(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = [];
                Object.keys(items.filters).forEach(key => {
                    const value = items.filters[key];
                    query.push({ [key]: value });
                });
                let userLevelList = yield Comission_1.ComissionEntitie.find(...query)
                    .populate({
                    path: "userLevelId",
                    select: "name"
                }).skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield Comission_1.ComissionEntitie.find({})
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
    *  Get User Level By Id
    *
    ****/
    GetByIdComission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getComissionById = yield Comission_1.ComissionEntitie.findById({ _id: id });
                if (!getComissionById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Role");
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Roles", {
                    id: getComissionById._id,
                    userLevelId: getComissionById.userLevelId,
                    actionType: getComissionById.actionType,
                    comission: getComissionById.comission
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = ComissionRepository;
