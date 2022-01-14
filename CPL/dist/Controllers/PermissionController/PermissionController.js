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
const UnitOfWork_1 = __importDefault(require("./../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const BaseController_1 = require("../../core/Controller/BaseController");
exports.default = new class PermissionController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Permission ****/
    CreatePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const { name, parentId, permissionId } = req.body;
                const createRole = yield UnitOfWork_1.default.PermissionRepository
                    .CreatePermission({
                    name,
                    parentId,
                    permissionId
                });
                if (createRole.success) {
                    return this.Ok(res, "Success Created Role");
                }
                return this.BadRerquest(res, createRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Set Permission ****/
    UpdatePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const id = req.params.id;
                const { name, parentId, permissionId } = req.body;
                const updatePermission = yield UnitOfWork_1.default.PermissionRepository
                    .UpdatePermission({
                    id: id,
                    name: name,
                    parentId: parentId,
                    permissionId: permissionId
                });
                if (updatePermission.success) {
                    return this.Ok(res, "Update Permission");
                }
                return this.BadRerquest(res, updatePermission.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Permission ****/
    DeletePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const permissionId = req.params.id;
                const createRole = yield UnitOfWork_1.default.PermissionRepository
                    .DeletePermission(permissionId);
                if (createRole.success) {
                    return this.Ok(res, "Success Delete Permission");
                }
                return this.BadRerquest(res, createRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Permission ****/
    GetAllPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const getAllPermission = yield UnitOfWork_1.default.PermissionRepository
                    .GetAllPermission();
                if (getAllPermission.success) {
                    return this.OkObjectResult(res, {
                        data: getAllPermission.result
                    }, "Get All Permission");
                }
                return this.BadRerquest(res, getAllPermission.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetById Permission ****/
    GetByIdPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const permissionId = req.params.id;
                const getPermissionById = yield UnitOfWork_1.default.PermissionRepository
                    .GetByIdPermission(permissionId);
                if (getPermissionById.success) {
                    return this.OkObjectResult(res, {
                        data: getPermissionById.result
                    }, "Get Permission By Id");
                }
                return this.BadRerquest(res, getPermissionById.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
