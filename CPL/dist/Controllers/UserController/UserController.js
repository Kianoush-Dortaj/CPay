"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const User_1 = require("../../DataLayer/Context/User/User");
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const fs = __importStar(require("fs"));
exports.default = new class UserController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /***
      * Create
      */
    Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const { firstName, gender, password, lastName, email, roles } = req.body;
                const createUser = yield UnitOfWork_1.default.userRepository.RegisterUser({
                    name: firstName,
                    gender,
                    password,
                    family: lastName,
                    email,
                    roles: roles
                });
                if (createUser.success) {
                    return this.Ok(res, "Success Register User");
                }
                else {
                    return this.BadRerquest(res, createUser.message);
                }
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
     * Update
     */
    Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const userId = req.params.id;
                const { firstName, gender, avatar, lastName } = req.body;
                const updateUser = yield UnitOfWork_1.default.userRepository
                    .UpdateUserInfo({
                    file: req.file,
                    firstName: firstName,
                    gender,
                    lastName: lastName,
                    userId: userId,
                    exAvatarUrl: avatar
                });
                if (updateUser.success) {
                    return this.Ok(res, "Success Update User");
                }
                return this.BadRerquest(res, updateUser.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
     * Edit Account Info
     */
    EditAccountInfoUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const userId = req.params.id;
                const { email, confirmEmail, isActive } = req.body;
                if (email !== confirmEmail) {
                    return this.BadRerquest(res, "Email and Confirm Email is not match");
                }
                const accountInfo = yield UnitOfWork_1.default.userRepository.UpdateAccountInfo(userId, email, isActive);
                if (accountInfo.success) {
                    return this.Ok(res, "Success Update Account Info");
                }
                return this.BadRerquest(res, accountInfo.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
     * Change Password
     */
    ChangePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const userId = req.params.id;
                const { password, confirmPassword } = req.body;
                if (password !== confirmPassword) {
                    return this.BadRerquest(res, "Password and Confirm Password is not match");
                }
                const changePassword = yield UnitOfWork_1.default.userRepository.ChangePassword({
                    password: password,
                    userId: userId
                });
                if (changePassword.success) {
                    return this.Ok(res, "Success Change Password");
                }
                return this.BadRerquest(res, changePassword.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
     * Get User Account Info
     */
    GetUserInfoAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const userId = req.params.id;
                const getManagerAccountInfo = yield UnitOfWork_1.default.userRepository.GetUserAccountInfo(userId);
                if (getManagerAccountInfo.success) {
                    return this.OkObjectResult(res, {
                        data: getManagerAccountInfo.result
                    }, "Get Manager Account Info");
                }
                return this.BadRerquest(res, getManagerAccountInfo.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
    * Get User Account Info
    */
    GetUserPersonalInformation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const userId = req.params.id;
                const getManagerPersonalInfo = yield UnitOfWork_1.default.userRepository.GetUserInformation(userId);
                if (getManagerPersonalInfo.success) {
                    return this.OkObjectResult(res, {
                        data: getManagerPersonalInfo.result
                    }, "Get Manager Personal Info");
                }
                return this.BadRerquest(res, getManagerPersonalInfo.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /***
    * Get User Image
    */
    GetUserImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let manager = yield User_1.UserEntite.findById(req.params.id).select("avatar");
            if (manager) {
                if (!manager.avatar) {
                    return this.Notfound(res);
                }
                fs.readFile(`./src/public${manager.avatar}`, (error, data) => {
                    if (error)
                        throw error;
                    res.writeHead(200, { "Content-Type": "image/png" });
                    res.end(data);
                });
            }
        });
    }
    // Get Manager Pagination
    GetAllManagerPaging(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let Managers = yield UnitOfWork_1.default.userRepository.GetAllManagerPaging(req.body);
            return this.OkObjectResultPager(res, {
                count: Managers.result !== undefined ? Managers.result.length : 0,
                data: Managers.result
            }, '');
        });
    }
};
