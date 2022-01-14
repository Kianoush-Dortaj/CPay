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
const express_validator_1 = require("express-validator");
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const path_1 = __importDefault(require("path"));
exports.default = new class UserValidation {
    CreateHandle() {
        return [
            (0, express_validator_1.check)("firstName").notEmpty().withMessage("firstName Can not be Empty"),
            (0, express_validator_1.check)("email").notEmpty().withMessage("email Can not be Empty"),
            (0, express_validator_1.check)("email").custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    const data = yield UnitOfWork_1.default.adminRepository
                        .GetUserByUsername(value);
                    if (data.success) {
                        throw new Error(" This email is Exsist");
                    }
                }
            })),
            (0, express_validator_1.check)("password").notEmpty().withMessage("password Can not be Empty"),
            (0, express_validator_1.check)("gender").notEmpty().withMessage("gender Can not be Empty"),
            (0, express_validator_1.check)("roles").notEmpty().withMessage("roles Can not be Empty"),
            (0, express_validator_1.check)("roles").custom((value) => __awaiter(this, void 0, void 0, function* () {
                if (value) {
                    const data = yield UnitOfWork_1.default.RoleRepository
                        .GetByIdRole(value);
                    if (!data.success) {
                        throw new Error(" This Role is not Exsist");
                    }
                }
            })),
            (0, express_validator_1.check)("lastName").notEmpty().withMessage("lastName Can not be Empty"),
        ];
    }
    UpdateUserHandle() {
        return [
            (0, express_validator_1.check)("firstName").notEmpty().withMessage("firstName Can not be Empty"),
            (0, express_validator_1.check)("gender").notEmpty().withMessage("gender Can not be Empty"),
            (0, express_validator_1.check)("avatar").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path_1.default.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                }
                else {
                    throw new Error(" Please Add icon");
                }
            })),
            (0, express_validator_1.check)("lastName").notEmpty().withMessage("lastName Can not be Empty"),
        ];
    }
    ChangePasswordHandle() {
        return [
            (0, express_validator_1.check)("password").notEmpty().withMessage("password Can not be Empty"),
            (0, express_validator_1.check)("confirmPassword").notEmpty().withMessage("confirmPassword Can not be Empty"),
            (0, express_validator_1.check)("confirmPassword").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (value !== req.body.password) {
                    throw new Error("Password and Confirm Password not matched");
                }
            }))
        ];
    }
    ChangeUserRoleHandle() {
        return [
            (0, express_validator_1.check)("roles").notEmpty().withMessage("roles Can not be Empty"),
            (0, express_validator_1.check)("roles").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                let hasError = false;
                if (value) {
                    for (let item of value) {
                        let data = yield UnitOfWork_1.default.RoleRepository
                            .GetByIdRole(item);
                        if (!data.success) {
                            hasError = true;
                            break;
                        }
                    }
                    if (hasError) {
                        throw new Error(" This Role is not Exsist");
                    }
                }
            }))
        ];
    }
    GetItemByIdHandle() {
        return [
            (0, express_validator_1.query)("id").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.params) {
                    let data = yield UnitOfWork_1.default.adminRepository
                        .FindUserById(req.params.id);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this Record , Please try again");
                    }
                }
            }))
        ];
    }
};
