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
exports.default = new class ComissionController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Comission ****/
    CreateComission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { userLevelId, actionType, comission } = req.body;
            if (!validationData.haveError) {
                const createComission = yield UnitOfWork_1.default.ComissionRepository.CreateComission({
                    userLevelId,
                    actionType,
                    comission
                });
                if (createComission.success) {
                    return this.Ok(res, "Success Create Comission");
                }
                return this.BadRerquest(res, createComission.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateComission ****/
    UpdateComission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const roleId = req.params.id;
                const { userLevelId, actionType, comission } = req.body;
                const updateComission = yield UnitOfWork_1.default.ComissionRepository.UpdateComission({
                    id: roleId,
                    userLevelId,
                    actionType,
                    comission
                });
                if (updateComission.success) {
                    this.Ok(res, "Update Comission");
                }
                return this.BadRerquest(res, updateComission.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Comission ****/
    DeleteComission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteComission = yield UnitOfWork_1.default.ComissionRepository.DeleteComission(req.params.id);
                if (deleteComission.success) {
                    return this.Ok(res, "Success Delete Comission");
                }
                return this.BadRerquest(res, deleteComission.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Comission Paging ****/
    GetAllComissionPaging(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllrolePagingComission = yield UnitOfWork_1.default.ComissionRepository
                    .GetAllComissionPaging(req.body);
                if (getAllrolePagingComission.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllrolePagingComission.result ? (_a = getAllrolePagingComission.result) === null || _a === void 0 ? void 0 : _a.count : 0,
                        data: (_b = getAllrolePagingComission.result) === null || _b === void 0 ? void 0 : _b.data
                    }, "Get All Comission Paging");
                }
                return this.BadRerquest(res, getAllrolePagingComission.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById Comission ****/
    GetByIdComission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const roleId = req.params.id;
                const getComissionbyId = yield UnitOfWork_1.default.ComissionRepository
                    .GetByIdComission(roleId);
                if (getComissionbyId.success) {
                    return this.OkObjectResult(res, {
                        data: getComissionbyId.result
                    }, "Get Comission By Id");
                }
                return this.BadRerquest(res, getComissionbyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
