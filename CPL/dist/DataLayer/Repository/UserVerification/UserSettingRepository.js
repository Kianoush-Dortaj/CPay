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
const UserVerification_1 = require("../../Context/UserVerification/UserVerification");
class UserVerificationRepository {
    getUServerificationList(items) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = [];
                const getAllModel = [];
                Object.keys(items.filters).forEach(key => {
                    const value = items.filters[key];
                    if (key === 'name' && value) {
                        query.push({ name: { $regex: `(.*)${value}(.*)` } });
                    }
                    else {
                        query.push({ [key]: value });
                    }
                });
                let userList = yield UserVerification_1.UserVerificationEntitie.find(...query)
                    .sort({ createdAt: -1 })
                    .populate("userId").skip((items.page - 1) * items.pageSize)
                    .limit(items.pageSize);
                let count = yield UserVerification_1.UserVerificationEntitie.find({})
                    .estimatedDocumentCount();
                userList.forEach(data => {
                    getAllModel.push({
                        birthDate: data.birthDate,
                        id: data.id,
                        nationalName: data.nationality,
                        status: data.status,
                        typeVerification: data.typeVerification,
                        createAt: data.createdAt,
                        updateAd: data.updateAt,
                        userInfo: {
                            email: data.userId.email,
                            firstName: data.userId.firstName,
                            lastName: data.userId.lastName,
                            userAvatar: data.userId.avatar,
                            userId: data.userId.id
                        }
                    });
                });
                return OperationResult_1.default.BuildSuccessResult('Operation Success', {
                    count: count,
                    data: getAllModel
                });
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    getUServerificationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userVerificationDetail = yield UserVerification_1.UserVerificationEntitie.findById(id)
                    .populate("userId");
                if (userVerificationDetail) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', {
                        backImage: userVerificationDetail.backImage,
                        birthDate: userVerificationDetail.birthDate,
                        frontImage: userVerificationDetail.frontImage,
                        id: userVerificationDetail.id,
                        image: userVerificationDetail.image,
                        nationalName: userVerificationDetail.nationality,
                        selfieImage: userVerificationDetail.selfieImage,
                        status: userVerificationDetail.status,
                        typeVerification: userVerificationDetail.typeVerification,
                        createAt: userVerificationDetail.createdAt,
                        updateAd: userVerificationDetail.updateAt,
                        userInfo: {
                            confirmEmail: userVerificationDetail.userId.confirmEmail,
                            confirmPhoneNumber: userVerificationDetail.userId.confirmPhoneNumber,
                            email: userVerificationDetail.userId.email,
                            firstName: userVerificationDetail.userId.firstName,
                            lastName: userVerificationDetail.userId.lastName,
                            phoneNumber: userVerificationDetail.userId.phoneNumber,
                            userAvatar: userVerificationDetail.userId.avatar,
                            userId: userVerificationDetail.userId.id
                        }
                    });
                }
                return OperationResult_1.default.BuildFailur("we can not find this user verification");
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    GetById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userVerificationDetail = yield UserVerification_1.UserVerificationEntitie.findById(id)
                    .populate("userId");
                if (userVerificationDetail) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', userVerificationDetail);
                }
                return OperationResult_1.default.BuildFailur("we can not find this user verification");
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    changeUserVerificationStatus(id, status, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userVerificationDetail = yield UserVerification_1.UserVerificationEntitie.updateOne({
                    _id: id
                }, {
                    $set: {
                        status: status,
                        description: description
                    }
                });
                if (userVerificationDetail) {
                    return OperationResult_1.default.BuildSuccessResult('Operation Success', true);
                }
                return OperationResult_1.default.BuildFailur("we can not find this user verification");
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = UserVerificationRepository;
