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
const Role_1 = require("../../Context/Role/Role");
const UnitOfWork_1 = __importDefault(require("../UnitOfWork/UnitOfWork"));
class RoleRepository {
    /****
      *
      * Create Role
      *
      ****/
    CreateRole(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = yield Role_1.RoleEntitie.build({ name: item.name, isDelete: false });
                const rolePermission = yield UnitOfWork_1.default.RolePermissionRepository
                    .UpdatePermission({
                    roleId: role._id,
                    permissionId: item.permissions
                });
                role.rolePermissionId = rolePermission.result;
                yield role.save();
                return OperationResult_1.default.BuildSuccessResult("Success Create Role", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Role
      *
      ****/
    UpdateRole(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Role_1.RoleEntitie.updateOne({ _id: item.id }, { $set: { name: item.name } });
                yield UnitOfWork_1.default.RolePermissionRepository.UpdatePermission({ roleId: item.id, permissionId: item.permissions });
                return OperationResult_1.default.BuildSuccessResult("Success Update Role", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Role
     *
     ****/
    DeleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let findUserRole = yield UnitOfWork_1.default.UserRoleRepository
                    .findUserByRoleId(id);
                if (findUserRole.result === true) {
                    return OperationResult_1.default.BuildFailur("User Has Register With this Role . with can not Delete this Role");
                }
                yield Role_1.RoleEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Delete Role", true);
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
    GetAllRoleSelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllRole = yield Role_1.RoleEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .select("name");
                return OperationResult_1.default.BuildSuccessResult("Get All Roles", getAllRole);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
    *
    * GetAll Role Paging
    *
    ****/
    GetAllRolePaging(items) {
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
                let userList = yield Role_1.RoleEntitie.find(...query).skip((items.page - 1) * items.pageSize)
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
    GetByIdRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAllPermission = [];
                const getRoleById = yield Role_1.RoleEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false)
                    .populate({
                    path: "rolePermissionId",
                    select: "permissionId"
                });
                if (!getRoleById) {
                    return OperationResult_1.default.BuildFailur("Can not find this Role");
                }
                if (getRoleById && getRoleById.rolePermissionId) {
                    const getPermissions = yield UnitOfWork_1.default.RolePermissionRepository
                        .GetAllRolePermissionForEdit(getRoleById.rolePermissionId);
                    if (getPermissions.result) {
                        getAllPermission = getPermissions.result;
                    }
                }
                return OperationResult_1.default.BuildSuccessResult("Get All Roles", {
                    id: getRoleById._id,
                    name: getRoleById.name,
                    permissions: getAllPermission
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = RoleRepository;
