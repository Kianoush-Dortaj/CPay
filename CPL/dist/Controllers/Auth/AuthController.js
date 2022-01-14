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
exports.default = new class AuthController extends BaseController_1.BaseController {
    RegisterUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield this.ValidationAction(req, res);
                if (!validation.haveError) {
                    const { email, name, gender, family, password } = req.body;
                    let registerUser = yield UnitOfWork_1.default.adminRepository.RegisterAdmin({
                        email: email,
                        name: name,
                        gender: gender,
                        family: family,
                        password: password,
                        roles: ['']
                    });
                    if (registerUser.success) {
                        return this.Ok(res, registerUser.message);
                    }
                    else {
                        return this.BadRerquest(res, registerUser.message);
                    }
                }
                return this.BadRerquest(res, validation.errorMessage[0]);
            }
            catch (error) {
                return this.InternalServerError(res, error.message);
            }
        });
    }
    ConfirmCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let confirmUser = yield UnitOfWork_1.default.adminRepository.CheckUserConfirmCode(req.params.email, req.params.hash);
                if (confirmUser.success) {
                    return this.Ok(res, confirmUser.message);
                }
                else {
                    return this.BadRerquest(res, confirmUser.message);
                }
            }
            catch (error) {
                return this.InternalServerError(res, error.message);
            }
        });
    }
    ResendActivationCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let confirmUser = yield UnitOfWork_1.default.adminRepository.Resendactivationcode(req.params.email);
                if (confirmUser.success) {
                    return this.Ok(res, confirmUser.message);
                }
                else {
                    return this.BadRerquest(res, confirmUser.message);
                }
            }
            catch (error) {
                return this.InternalServerError(res, error.message);
            }
        });
    }
};
