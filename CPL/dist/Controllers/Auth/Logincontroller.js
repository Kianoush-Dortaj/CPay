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
exports.default = new class LoginController extends BaseController_1.BaseController {
    LoginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validation = yield this.ValidationAction(req, res);
                if (!validation.haveError) {
                    const { email, password } = req.body;
                    let loginUser = yield UnitOfWork_1.default.LoginRepository.UserLogin(email, password);
                    if (loginUser.success) {
                        return this.OkObjectResult(res, loginUser.result, "Success Login");
                    }
                    else {
                        return this.BadRerquest(res, loginUser.message);
                    }
                }
                return this.BadRerquest(res, validation.errorMessage[0]);
            }
            catch (error) {
                return this.InternalServerError(res, error.message);
            }
        });
    }
    AdminCheckAuthTowfactor(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { hash, code, email } = req.body;
            let result = yield UnitOfWork_1.default.LoginRepository.CheckAuthTwofactorCode(hash, code, email);
            if (result.success && !((_a = result.result) === null || _a === void 0 ? void 0 : _a.isTowfactor)) {
                return this.OkObjectResult(res, {
                    data: result.result
                }, "Success Towfactor");
            }
            return this.BadRerquest(res, result.message);
        });
    }
};
