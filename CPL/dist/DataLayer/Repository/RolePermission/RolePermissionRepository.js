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
const Permission_1 = require("../../Context/Permission/Permission");
const RolePermission_1 = require("../../Context/RolePermission/RolePermission");
class RolePermissionRepository {
    UpdatePermission(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rolePermissionId = '';
                const roles = yield this.GetRolePermissionsByRoleId(item.roleId);
                if (roles.result) {
                    if (roles.result.length > 0) {
                        yield RolePermission_1.RolePermissionEntitie.update({
                            roleId: item.roleId,
                        }, { $set: { permissionId: [...item.permissionId] } });
                    }
                    else {
                        const rolePermission = new RolePermission_1.RolePermissionEntitie();
                        rolePermission.roleId = item.roleId;
                        rolePermission.permissionId.push(...item.permissionId);
                        rolePermissionId = rolePermission._id;
                        rolePermission.save();
                    }
                }
                return OperationResult_1.default.BuildSuccessResult("Success Update Permission", rolePermissionId);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Get Role Permissions By RoleId
     *
     ****/
    GetRolePermissionsByRoleId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permissionIds = yield RolePermission_1.RolePermissionEntitie.find({
                    roleId: id,
                }).select("permissionId");
                return OperationResult_1.default.BuildSuccessResult("Get All Permission By RoleId", permissionIds);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Get All Permissions By RoleId
     *
     ****/
    GetAllRolePermissionForEdit(selectedPermission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let model = [];
                let selectedRolePermissions = [];
                const permissions = [...selectedPermission];
                permissions.forEach(data => {
                    selectedRolePermissions.push(...data.permissionId);
                });
                let rolePermissions = yield Permission_1.PermissionEntitie.find({});
                rolePermissions.forEach(data => {
                    const selected = selectedRolePermissions.find(x => x.toString() == data._id);
                    model.push({
                        id: data._id,
                        parentId: data.parentId,
                        selected: selected ? true : false,
                        name: data.name,
                    });
                });
                const treeData = yield this.MakeTreePermission(model);
                return OperationResult_1.default.BuildSuccessResult("", treeData);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**
     *
     *
     * Make Tree Permission
     */
    MakeTreePermission(permissions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(permissions);
            let treeData = [];
            try {
                let queue = [];
                while (permissions.length > 0) {
                    let data = permissions[0];
                    let node = {
                        id: data.id,
                        name: data.name,
                        parentId: data.parentId,
                        selected: data.selected,
                        children: []
                    };
                    queue[node.id] = node;
                    if (!data.parentId)
                        treeData.push(node);
                    else {
                        // find parent
                        let parent = queue[data.parentId];
                        // add to children
                        if (parent) {
                            (_a = parent.children) === null || _a === void 0 ? void 0 : _a.push(node);
                        }
                    }
                    permissions.splice(0, 1);
                }
                return treeData;
            }
            catch (error) {
                console.log(error);
                return treeData;
            }
        });
    }
}
exports.default = RolePermissionRepository;
