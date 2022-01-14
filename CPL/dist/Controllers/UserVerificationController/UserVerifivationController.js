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
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
exports.default = new class UserVerificationController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /**********
    *
    * Get User Verification
    *
    ************/
    GetAllUserVerifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                let getAllrolePagingRole = yield UnitOfWork_1.default.UserVerification
                    .getUServerificationList(req.body);
                if (getAllrolePagingRole.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllrolePagingRole.result !== undefined ? getAllrolePagingRole.result.count : 0,
                        data: getAllrolePagingRole.result
                    }, '');
                }
                return this.BadRerquest(res, getAllrolePagingRole.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /**********
    *
    * Get User Verification By Id
    *
    ************/
    GetByIdUserVerification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const userVerificationId = req.params.id;
                const getCountrybyId = yield UnitOfWork_1.default.UserVerification
                    .getUServerificationById(userVerificationId);
                if (getCountrybyId.success) {
                    return this.OkObjectResult(res, {
                        data: getCountrybyId.result
                    }, "Get User Verification By Id");
                }
                return this.BadRerquest(res, getCountrybyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
    /**********
    *
    * Change User Verification Status
    *
    ************/
    ChangeUserVerificationStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationData = yield this.ValidationAction(req, res);
            if (!validationData.haveError) {
                const userVerificationId = req.params.id;
                const { status, description } = req.body;
                const getCountrybyId = yield UnitOfWork_1.default.UserVerification
                    .changeUserVerificationStatus(userVerificationId, status, description);
                if (getCountrybyId.success) {
                    return this.OkObjectResult(res, {
                        data: getCountrybyId.result
                    }, "Change User status");
                }
                return this.BadRerquest(res, getCountrybyId.message);
            }
            else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        });
    }
};
