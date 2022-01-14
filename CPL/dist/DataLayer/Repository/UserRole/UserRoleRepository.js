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
const UserRole_1 = require("../../Context/UserRole/UserRole");
class UserRoleRepository {
    /*******
    * Set User Role For User
    ******/
    SetUserRole(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userRole = yield UserRole_1.UserRoleEntitie
                    .build({ roles: [...item.roles], userId: item.userId });
                yield userRole.save();
                return OperationResult_1.default.BuildSuccessResult('Operation Success', userRole);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /*******
    * Update User Role For User
    ******/
    UpdateUserRole(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findItem = yield UserRole_1.UserRoleEntitie.updateOne({
                    userId: item.userId,
                }, {
                    $set: {
                        roles: [...item.roles]
                    }
                });
                if (findItem) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', true);
                }
                return OperationResult_1.default.BuildSuccessResult('Operation Success', false);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /*******
* Find User By RoleId
******/
    findUserByRoleId(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findItem = yield UserRole_1.UserRoleEntitie.findOne({ roleId: roleId });
                if (findItem) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', true);
                }
                return OperationResult_1.default.BuildSuccessResult('Operation Success', false);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /*******
* Find Roles By UserId
******/
    findRolesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findItem = yield UserRole_1.UserRoleEntitie.findOne({ userId: userId });
                if (findItem) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', findItem.roles);
                }
                return OperationResult_1.default.BuildFailur("Can not find User");
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = UserRoleRepository;
