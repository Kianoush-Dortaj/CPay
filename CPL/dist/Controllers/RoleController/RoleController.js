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
const UnitOfWork_1 = __importDefault(require("./../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
exports.default = new class RoleController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /*** Create Role ****/
    CreateRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            const { name, permissions } = req.body;
            if (!validationData.haveError) {
                const createRole = yield UnitOfWork_1.default.RoleRepository.CreateRole({
                    name,
                    permissions
                });
                if (createRole.success) {
                    return this.Ok(res, "Success Create Role");
                }
                return this.BadRerquest(res, createRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** UpdateRole ****/
    UpdateRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const roleId = req.params.id;
                const { name, permissions } = req.body;
                const updateRole = yield UnitOfWork_1.default.RoleRepository.UpdateRole({
                    id: roleId,
                    name,
                    permissions
                });
                if (updateRole.success) {
                    this.Ok(res, "Update Role");
                }
                return this.BadRerquest(res, updateRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** Delete Role ****/
    DeleteRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const deleteRole = yield UnitOfWork_1.default.RoleRepository.DeleteRole(req.params.id);
                if (deleteRole.success) {
                    return this.Ok(res, "Success Delete Role");
                }
                return this.BadRerquest(res, deleteRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Role Paging ****/
    GetAllRolePaging(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                let getAllrolePagingRole = yield UnitOfWork_1.default.RoleRepository
                    .GetAllRolePaging(req.body);
                if (getAllrolePagingRole.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllrolePagingRole.result !== undefined ? getAllrolePagingRole.result.length : 0,
                        data: getAllrolePagingRole.result
                    }, '');
                }
                return this.BadRerquest(res, getAllrolePagingRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Role Select ****/
    GetAllRoleSelect(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const { pageNumber, pageSize } = req.query;
                const getAllroleSelectRole = yield UnitOfWork_1.default.RoleRepository
                    .GetAllRoleSelect();
                if (getAllroleSelectRole.success) {
                    return this.OkObjectResult(res, {
                        data: getAllroleSelectRole.result
                    }, "Get All Role Paging");
                }
                return this.BadRerquest(res, getAllroleSelectRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /*** GetAll Role Paging ****/
    // async GetAllRole(req: Request, res: Response, next: NextFunction) {
    //     let validationData = await this.ValidationAction(req, res);
    //     if (!validationData.haveError) {
    //         const selectListRole = await UnitOfWork.RoleRepository
    //             .GetAllRole();
    //         if (selectListRole.success) {
    //             this.OkObjectResult(res, {
    //                 data: selectListRole.result
    //             }, "Select Role List");
    //         }
    //         return this.BadRerquest(res, selectListRole.message);
    //     } else {
    //         return this.BadRerquest(res, validationData.errorMessage.toString());
    //     }
    // }
    /*** GetById Role ****/
    GetByIdRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const roleId = req.params.id;
                const getRolebyId = yield UnitOfWork_1.default.RoleRepository
                    .GetByIdRole(roleId);
                if (getRolebyId.success) {
                    return this.OkObjectResult(res, {
                        data: getRolebyId.result
                    }, "Get Role By Id");
                }
                return this.BadRerquest(res, getRolebyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
