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
class PermissionRepository {
    /****
      *
      * Create Permission
      *
      ****/
    CreatePermission(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permission = yield Permission_1.PermissionEntitie.build({
                    name: value.name,
                    parentId: value.parentId,
                    permissionId: value.permissionId,
                    isDelete: false
                });
                permission.save();
                return OperationResult_1.default.BuildSuccessResult("Success Add Permission", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
      *
      * Set Permission
      *
      ****/
    UpdatePermission(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Permission_1.PermissionEntitie.updateOne({ _id: item.id }, {
                    $set: {
                        name: item.name,
                        parentId: item.parentId,
                        permissionId: item.permissionId
                    }
                });
                return OperationResult_1.default.BuildSuccessResult("Success Set Permission", true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /****
     *
     * Delete Permission
     *
     ****/
    DeletePermission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Permission_1.PermissionEntitie.updateOne({ _id: id }, { $set: { isDelete: true } });
                return OperationResult_1.default.BuildSuccessResult("Success Set Permission", true);
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
    GetAllPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let treeData = [];
                const getAllPermission = yield Permission_1.PermissionEntitie.find({})
                    .where("isDelete")
                    .equals(false)
                    .select("name parentId permissionId");
                if (getAllPermission.length > 0) {
                    treeData = yield this.MakeTreePermission(getAllPermission);
                }
                return OperationResult_1.default.BuildSuccessResult("Success Set Permission", treeData);
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
    GetByIdPermission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllPermission = yield Permission_1.PermissionEntitie.findById({ _id: id })
                    .where("isDelete")
                    .equals(false)
                    .select("name permissionId parentId ");
                if (!getAllPermission) {
                    return OperationResult_1.default.BuildFailur("We Can not find this Record");
                }
                return OperationResult_1.default.BuildSuccessResult("Success Set Permission", getAllPermission);
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
            let treeData = [];
            let queue = [];
            while (permissions.length > 0) {
                let data = permissions[0];
                let node = {
                    id: data._id,
                    name: data.name,
                    parentId: data.parentId,
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
        });
    }
}
exports.default = PermissionRepository;
