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
exports.UserRepository = void 0;
const OperationResult_1 = __importDefault(require("../../../core/Operation/OperationResult"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../Context/User/User");
const RedisRepository_1 = __importDefault(require("../../../Utilities/Redis/RedisRepository"));
const RedisKey_1 = __importDefault(require("../../../Utilities/Redis/RedisKey"));
const Gender_1 = require("../../Context/User/Gender");
const NodeMailer_1 = __importDefault(require("../../../Utilities/Email/NodeMailer"));
const Util_1 = __importDefault(require("../../../Utilities/Util"));
const UnitOfWork_1 = __importDefault(require("../UnitOfWork/UnitOfWork"));
const setting_enum_1 = require("../../../DTO/Sertting/setting-enum");
class UserRepository {
    RegisterUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userLevel = yield UnitOfWork_1.default.SettingRepository.GetSetting(setting_enum_1.SETTING_ENUM.REGISTER_SETTING);
                const result = JSON.parse(userLevel.result);
                if (!result.setDefaultRegisterUserLevel) {
                    return OperationResult_1.default.BuildFailur("We Can not Find User Level Setting");
                }
                var find = '/';
                var re = new RegExp(find, 'g');
                let password = yield bcrypt_1.default.hash(createUserDto.password, 5);
                let hashCode = yield (yield bcrypt_1.default.hash(createUserDto.email, 5)).replace(re, '');
                let displayName = createUserDto.name + ' ' + createUserDto.family;
                let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
                let registerUser = yield User_1.UserEntite.build({
                    firstName: createUserDto.name,
                    gender: Number(createUserDto.gender),
                    isAdmin: false,
                    isSupport: false,
                    userLevel: result.setDefaultRegisterUserLevel,
                    password: password,
                    email: createUserDto.email,
                    lastName: createUserDto.family,
                    accountFail: 0,
                    avatar: undefined,
                    poster: undefined,
                    birthDate: undefined,
                    confirmEmail: false,
                    towFactorEnabled: false,
                    isActive: false,
                    locked: false,
                    lockedDate: undefined,
                    phoneNumber: undefined,
                    securityStamp: securityStamp
                });
                registerUser.save();
                yield RedisRepository_1.default.Set(RedisKey_1.default.UserInfo + registerUser._id, registerUser);
                yield this.GenerateActivationCode(RedisKey_1.default.RegisterConfirm + registerUser.email, hashCode);
                yield NodeMailer_1.default.sendActivationCodeEmail(registerUser.email, 'CPay Configm Email', displayName, hashCode);
                return OperationResult_1.default.BuildSuccessResult("We Are Sent Activatoin to Your Email", registerUser);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    FindUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield User_1.UserEntite.findOne({ email: email, isAdmin: false, isSupport: false });
                if (user) {
                    return new OperationResult_1.default(true, "User Find", user);
                }
                return new OperationResult_1.default(false, "User can Not find");
            }
            catch (error) {
                return new OperationResult_1.default(false, error.message);
            }
        });
    }
    FindUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield User_1.UserEntite.findById(id)
                    .where("isAdmin").equals(false)
                    .where("isSupport").equals(false);
                if (user) {
                    return new OperationResult_1.default(true, "User Find", user);
                }
                return new OperationResult_1.default(false, "User can Not find");
            }
            catch (error) {
                return new OperationResult_1.default(false, error.message);
            }
        });
    }
    // async FindUserByEmailForLogin(email: string): Promise<OperationResult<any>> {
    //     try {
    //         let user = await UserEntite.findOne({ email: email })
    //             .populate({
    //                 path: "userRole",
    //                 populate: [
    //                     {
    //                         path: "roles",
    //                         populate: {
    //                             path: "rolePermissionId",
    //                             populate: {
    //                                 path: "permissionId",
    //                                 select: "permissionId"
    //                             }
    //                         }
    //                     }
    //                 ],
    //             });
    //         if (user) {
    //             return OperationResult.BuildSuccessResult("Operation Success", user);
    //         }
    //         return OperationResult.BuildFailur("Can not find User");
    //     } catch (error: any) {
    //         return OperationResult.BuildFailur(error.message);
    //     }
    // }
    GenerateActivationCode(userId, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let code = yield RedisRepository_1.default.SetValueWithexiperationTime(userId, hash, 1000);
                return new OperationResult_1.default(true, '');
            }
            catch (error) {
                return new OperationResult_1.default(false, error.message);
            }
        });
    }
    CheckUserConfirmCode(email, hashCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let item = yield RedisRepository_1.default.Get(RedisKey_1.default.RegisterConfirm + email);
                if (item.success && item.result == hashCode) {
                    yield User_1.UserEntite.findOneAndUpdate({ email: email }, {
                        $set: {
                            isActive: true,
                            confirmEmail: true
                        }
                    });
                    let deleteActivatinCode = yield RedisRepository_1.default.Remove(RedisKey_1.default.RegisterConfirm + email);
                    if (deleteActivatinCode.success) {
                        return new OperationResult_1.default(true, '');
                    }
                    return new OperationResult_1.default(false, 'Error When Deleting Redis Key');
                }
                return new OperationResult_1.default(false, 'Your Confirm code was Exiper');
            }
            catch (error) {
                return new OperationResult_1.default(false, error.message);
            }
        });
    }
    Resendactivationcode(email) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var find = '/';
            var re = new RegExp(find, 'g');
            let hashCode = yield (yield bcrypt_1.default.hash(email, 5)).replace(re, '');
            let displayName;
            let userInfo = yield this.FindUserByEmail(email);
            if (userInfo.success && userInfo.result) {
                displayName = userInfo.result.firstName + ((_a = userInfo.result) === null || _a === void 0 ? void 0 : _a.lastName);
                let generateKey = yield this.GenerateActivationCode(RedisKey_1.default.RegisterConfirm + email, hashCode);
                if (generateKey.success && generateKey.result) {
                    let sendEmail = yield NodeMailer_1.default.sendActivationCodeEmail(userInfo.result.email, 'Truvel Budy Configm Email', displayName, hashCode);
                    if (sendEmail.success) {
                        return new OperationResult_1.default(true, '');
                    }
                    return new OperationResult_1.default(false, sendEmail.message);
                }
                return new OperationResult_1.default(false, generateKey.message);
            }
            return new OperationResult_1.default(false, userInfo.message);
        });
    }
    /**********
    * Get Manager Account Info
    ********/
    GetUserAccountInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let redisValue = yield RedisRepository_1.default.Get(RedisKey_1.default.UserAccount + id);
                if (redisValue.result) {
                    return OperationResult_1.default
                        .BuildSuccessResult('Operation Success', {
                        email: redisValue.result.email,
                        isActive: redisValue.result.isActive
                    });
                }
                let getUserInfo = yield User_1.UserEntite.findById(id)
                    .where("isAdmin").equals(false)
                    .where("isSupport").equals(false)
                    .select('email isActive id');
                if (getUserInfo) {
                    let setRedisValue = yield RedisRepository_1.default.Set(RedisKey_1.default.UserAccount + id, {
                        email: getUserInfo.email,
                        id: getUserInfo.id,
                        isActive: getUserInfo.isActive
                    });
                    if (setRedisValue.success) {
                        return OperationResult_1.default.BuildSuccessResult('Operation Success', {
                            email: getUserInfo.email,
                            isActive: getUserInfo.isActive
                        });
                    }
                    return OperationResult_1.default.BuildFailur(setRedisValue.message);
                }
                else {
                    return OperationResult_1.default.BuildFailur('User NotFound');
                }
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**********
   * Get Manager Info
   ********/
    GetUserInformation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let redisValue = yield RedisRepository_1.default.Get(RedisKey_1.default.UserInforamtion + id);
                if (redisValue.result) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', redisValue.result);
                }
                let getUserInfo = yield User_1.UserEntite.findById(id)
                    .where("isAdmin").equals(false)
                    .where("isSupport").equals(false)
                    .select('firstName avatar lastName gender id');
                if (getUserInfo) {
                    let setRedisValue = yield RedisRepository_1.default.Set(RedisKey_1.default.UserInforamtion + id, {
                        firstName: getUserInfo.firstName,
                        id: getUserInfo.id,
                        gender: Gender_1.Gender[getUserInfo.gender],
                        lastName: getUserInfo.lastName,
                        avatar: getUserInfo.avatar
                    });
                    if (setRedisValue.success) {
                        return OperationResult_1.default.BuildSuccessResult('Operation Success', {
                            firstName: getUserInfo.firstName,
                            gender: getUserInfo.gender,
                            hasAvatar: getUserInfo.avatar ? true : false,
                            id: getUserInfo._id,
                            lastName: getUserInfo.lastName
                        });
                    }
                    return OperationResult_1.default.BuildFailur(setRedisValue.message);
                }
                else {
                    return OperationResult_1.default.BuildFailur('User NotFound');
                }
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**********
     * Get User Info
     ********/
    GetUserInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let redisValue = yield RedisRepository_1.default.Get(RedisKey_1.default.UserInfo + id);
            if (redisValue.result) {
                return OperationResult_1.default.BuildSuccessResult('Operation Success', redisValue.result);
            }
            let getUserInfo = yield User_1.UserEntite.findById(id)
                .where("isAdmin").equals(false)
                .where("isSupport").equals(false);
            if (getUserInfo) {
                let setRedisValue = yield RedisRepository_1.default.Set(RedisKey_1.default.UserInforamtion + id, getUserInfo);
                if (setRedisValue.success) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', getUserInfo);
                }
                return OperationResult_1.default.BuildFailur(setRedisValue.message);
            }
            else {
                return OperationResult_1.default.BuildFailur('User NotFound');
            }
        });
    }
    /**********
     * Get User Info by Username
     ********/
    GetUserByUsername(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            let redisValue = yield RedisRepository_1.default.Get(RedisKey_1.default.UserInfo + userName);
            if (redisValue.result) {
                return OperationResult_1.default.BuildSuccessResult('Operation Success', redisValue.result);
            }
            let getUserInfo = yield User_1.UserEntite.findOne({ email: userName, isAdmin: false, isSupport: false });
            if (getUserInfo) {
                let setRedisValue = yield RedisRepository_1.default.Set(RedisKey_1.default.UserInforamtion + userName, getUserInfo);
                if (setRedisValue.success) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', getUserInfo);
                }
                return OperationResult_1.default.BuildFailur(setRedisValue.message);
            }
            else {
                return OperationResult_1.default.BuildFailur('User NotFound');
            }
        });
    }
    /**********
     * Update Manager Info
     ********/
    UpdateUserInfo(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let avatarUrl = undefined;
            try {
                if (item.file) {
                    avatarUrl = Util_1.default.getDirectoryImage(`${item.file.destination}/${item.file.originalname}`);
                }
                yield User_1.UserEntite.updateOne({ _id: item.userId }, {
                    $set: {
                        firstName: item.firstName,
                        gender: Number(item.gender),
                        lastName: item.lastName,
                        avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
                    },
                });
                yield RedisRepository_1.default.ResetSingleItem(RedisKey_1.default.UserInforamtion + item.userId, {
                    firstName: item.firstName,
                    id: item.userId,
                    gender: Gender_1.Gender[item.gender],
                    lastName: item.lastName,
                    avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
                });
                return OperationResult_1.default.BuildSuccessResult('', true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**********
     * Update Account Manager Info
     ********/
    UpdateAccountInfo(userId, email, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            let avatarUrl = undefined;
            try {
                const updateAcountInfo = yield User_1.UserEntite.updateOne({ _id: userId }, {
                    $set: {
                        email: email,
                        isActive: isActive
                    },
                });
                yield RedisRepository_1.default.Remove(RedisKey_1.default.UserInfo + userId);
                return OperationResult_1.default.BuildSuccessResult('', true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**********
    * ChangePassword
    ********/
    ChangePassword(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let password = yield bcrypt_1.default.hash(item.password, 5);
                yield User_1.UserEntite.updateOne({ _id: item.userId }, {
                    $set: {
                        password: password
                    },
                });
                return OperationResult_1.default.BuildSuccessResult('', true);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**********
   * Get User Info for Login
   ********/
    GetUserInfoForLogin(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let model;
                let userInfo = yield User_1.UserEntite.findOne({ email: username, isAdmin: false, isSupport: false })
                    .select("securityStamp firstName lastName");
                if (userInfo) {
                    model = {
                        userSecurityStamp: userInfo.securityStamp,
                        displayName: userInfo.firstName + ' ' + userInfo.lastName,
                        userId: userInfo.id,
                    };
                    return OperationResult_1.default.BuildSuccessResult('', model);
                }
                return OperationResult_1.default.BuildFailur('Error');
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**********
   * Get User Profile Information
   ********/
    GetUserProfileInformation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userInfo = yield User_1.UserEntite.findById(userId);
                if (userInfo) {
                    return OperationResult_1.default.BuildSuccessResult('User Found', {
                        displayName: userInfo.firstName + ' ' + userInfo.lastName,
                        emailConfirm: userInfo.confirmEmail,
                        gender: Gender_1.Gender[Number(userInfo.gender)],
                        hasAvatar: userInfo.avatar ? true : false,
                        hasPoster: userInfo.poster ? true : false,
                        id: userInfo.id,
                        owner: true,
                        aboutMe: ''
                    });
                }
                return OperationResult_1.default.BuildFailur('User not Found');
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /**********
    * Get All Manager
    ********/
    GetAllManagerPaging(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = [];
            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key];
                if (key === 'email' && value) {
                    query.push({ email: { $regex: `(.*)${value}(.*)` } });
                }
                else {
                    query.push({ [key]: value });
                }
            });
            let userList = yield User_1.UserEntite.find(...query).where({ isUser: true }).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize);
            return OperationResult_1.default.BuildSuccessResult('Operation Success', userList);
        });
    }
}
exports.UserRepository = UserRepository;
