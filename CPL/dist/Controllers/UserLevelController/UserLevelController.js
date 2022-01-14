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
exports.default = new class UserLevelController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create UserLevel ****/
    CreateUserLevel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, isDefault, isPublish } = req.body;
            if (!validationData.haveError) {
                const createUserLevel = yield UnitOfWork_1.default.UserLevelRepository.CreateUserLevel({
                    name,
                    isDefault,
                    isPublish
                });
                if (createUserLevel.success) {
                    return this.Ok(res, "Success Create UserLevel");
                }
                return this.BadRerquest(res, createUserLevel.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateUserLevel ****/
    UpdateUserLevel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const roleId = req.params.id;
                const { name, isDefault, isPublish } = req.body;
                const updateUserLevel = yield UnitOfWork_1.default.UserLevelRepository.UpdateUserLevel({
                    id: roleId,
                    name,
                    isDefault,
                    isPublish
                });
                if (updateUserLevel.success) {
                    this.Ok(res, "Update UserLevel");
                }
                return this.BadRerquest(res, updateUserLevel.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete UserLevel ****/
    DeleteUserLevel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteUserLevel = yield UnitOfWork_1.default.UserLevelRepository.DeleteUserLevel(req.params.id);
                if (deleteUserLevel.success) {
                    return this.Ok(res, "Success Delete UserLevel");
                }
                return this.BadRerquest(res, deleteUserLevel.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll UserLevel Paging ****/
    GetAllUserLevelPaging(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllrolePagingUserLevel = yield UnitOfWork_1.default.UserLevelRepository
                    .GetAllUserLevelPaging(req.body);
                if (getAllrolePagingUserLevel.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllrolePagingUserLevel.result ? (_a = getAllrolePagingUserLevel.result) === null || _a === void 0 ? void 0 : _a.count : 0,
                        data: (_b = getAllrolePagingUserLevel.result) === null || _b === void 0 ? void 0 : _b.data
                    }, "Get All UserLevel Paging");
                }
                return this.BadRerquest(res, getAllrolePagingUserLevel.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll UserLevel Select ****/
    GetAllUserLevelSelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllroleSelectUserLevel = yield UnitOfWork_1.default.UserLevelRepository
                    .GetAllUserLevelSelect();
                if (getAllroleSelectUserLevel.success) {
                    return this.OkObjectResult(res, {
                        data: getAllroleSelectUserLevel.result
                    }, "Get All UserLevel Paging");
                }
                return this.BadRerquest(res, getAllroleSelectUserLevel.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById UserLevel ****/
    GetByIdUserLevel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const roleId = req.params.id;
                const getUserLevelbyId = yield UnitOfWork_1.default.UserLevelRepository
                    .GetByIdUserLevel(roleId);
                if (getUserLevelbyId.success) {
                    return this.OkObjectResult(res, {
                        data: getUserLevelbyId.result
                    }, "Get UserLevel By Id");
                }
                return this.BadRerquest(res, getUserLevelbyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
