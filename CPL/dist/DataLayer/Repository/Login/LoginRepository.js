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
const ValidateEmailConfirm_1 = require("./ValidatoinPattern/ValidateEmailConfirm");
const ValidateBlocked_1 = require("./ValidatoinPattern/ValidateBlocked");
const ValidatePassword_1 = require("./ValidatoinPattern/ValidatePassword");
const ValidateTowFactor_1 = require("./ValidatoinPattern/ValidateTowFactor");
const UnitOfWork_1 = __importDefault(require("./../UnitOfWork/UnitOfWork"));
const OperationResult_1 = __importDefault(require("../../../core/Operation/OperationResult"));
const RedisKey_1 = __importDefault(require("../../../Utilities/Redis/RedisKey"));
const RedisRepository_1 = __importDefault(require("../../../Utilities/Redis/RedisRepository"));
const NodeMailer_1 = __importDefault(require("./../../../Utilities/Email/NodeMailer"));
class LoginRepository {
    // Login Special for login
    UserLogin(username, password) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield UnitOfWork_1.default.adminRepository.FindUserByEmailForLogin(username);
            if (user.success) {
                const permissions = [];
                const isBlocked = new ValidateBlocked_1.ValidateBlocked();
                const isEmailComfirmed = new ValidateEmailConfirm_1.ValidateEmailConfrim();
                const isValidatePassword = new ValidatePassword_1.ValidatePassword(password);
                const isenavledtowfactor = new ValidateTowFactor_1.ValidateTowFactor();
                isValidatePassword.setNext(isBlocked)
                    .setNext(isEmailComfirmed).setNext(isenavledtowfactor);
                let result = yield this.ValidationManagerForLogin(isValidatePassword, user.result);
                if (result.HaveError) {
                    return OperationResult_1.default.BuildFailur(result.Message);
                }
                if (result.Context.isTowfactor) {
                    let displayName = user.result.firstName + user.result.lastName;
                    let code = yield RedisRepository_1.default.Get(RedisKey_1.default.TowfactorKey + username);
                    if (code.result) {
                        NodeMailer_1.default.sendTwofactorCode(username, 'Twfactor Code', displayName, code.result.code);
                        return OperationResult_1.default.BuildSuccessResult(result.Message, result.Context);
                    }
                    return OperationResult_1.default.BuildFailur('Error in generate code twofactor');
                }
                let userInfo = yield UnitOfWork_1.default.adminRepository.GetUserInfoForLogin(username);
                if (!userInfo.success) {
                    return OperationResult_1.default.BuildFailur(userInfo.message);
                }
                let token = yield UnitOfWork_1.default.jwtRepository.GenerateToken(userInfo.result);
                if (token.success) {
                    user.result.userRole.roles.forEach((element) => {
                        element.rolePermissionId.forEach((data) => {
                            data.permissionId.forEach((permissionItems) => {
                                permissions.push(permissionItems.permissionId);
                            });
                        });
                    });
                    return OperationResult_1.default.BuildSuccessResult(token.message, {
                        hash: '',
                        isTowfactor: false,
                        token: token.result,
                        userInfo: {
                            displayName: (_a = userInfo.result) === null || _a === void 0 ? void 0 : _a.displayName,
                            userId: (_b = userInfo.result) === null || _b === void 0 ? void 0 : _b.userId,
                            roles: permissions
                        }
                    });
                }
                return OperationResult_1.default.BuildFailur(token.message);
            }
            return OperationResult_1.default.BuildFailur("Username or password is not currenct");
        });
    }
    /*******
     * check Auth towfactor Code
     ******/
    CheckAuthTwofactorCode(hash, code, email) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permissions = [];
                let userInfo = yield UnitOfWork_1.default.adminRepository.FindUserByEmailForLogin(email);
                if (!userInfo.success) {
                    return OperationResult_1.default.BuildFailur(userInfo.message);
                }
                let findKeyInRedis = yield RedisRepository_1.default.Get(RedisKey_1.default.TowfactorKey + email);
                if (!findKeyInRedis.success) {
                    return OperationResult_1.default.BuildFailur(findKeyInRedis.message);
                }
                else if (((_a = findKeyInRedis.result) === null || _a === void 0 ? void 0 : _a.code) != code || ((_b = findKeyInRedis.result) === null || _b === void 0 ? void 0 : _b.hash) != hash) {
                    return OperationResult_1.default.BuildFailur('Your code is Expire . please Type again');
                }
                let token = yield UnitOfWork_1.default.jwtRepository.GenerateToken(userInfo.result);
                if (token.success) {
                    userInfo.result.userRole.roles.forEach((element) => {
                        element.rolePermissionId.forEach((data) => {
                            data.permissionId.forEach((permissionItems) => {
                                permissions.push(permissionItems.permissionId);
                            });
                        });
                    });
                    return OperationResult_1.default.BuildSuccessResult(token.message, {
                        hash: '',
                        isTowfactor: false,
                        token: token.result,
                        userInfo: {
                            displayName: (_c = userInfo.result) === null || _c === void 0 ? void 0 : _c.displayName,
                            userId: (_d = userInfo.result) === null || _d === void 0 ? void 0 : _d.userId,
                            roles: permissions
                        }
                    });
                }
                return OperationResult_1.default.BuildFailur(token.message);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    // Validatoin Manager Login
    ValidationManagerForLogin(handler, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = handler.handle(user);
            return result;
        });
    }
}
exports.default = LoginRepository;
