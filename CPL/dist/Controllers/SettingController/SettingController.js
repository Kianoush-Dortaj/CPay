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
const setting_enum_1 = require("../../DTO/Sertting/setting-enum");
const UnitOfWork_1 = __importDefault(require("./../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
exports.default = new class SettingController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /**********
     *
     * Set Register Setting
     *
     ************/
    SetRegisterSetting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { setDefaultRegisterUserLevel, registerUserAdmin, registerUserRole, registerUserSupport } = req.body;
                const setRegisterSetting = yield UnitOfWork_1.default.SettingRepository
                    .SetSetting(setting_enum_1.SETTING_ENUM.REGISTER_SETTING, {
                    registerUserAdmin,
                    registerUserRole,
                    registerUserSupport,
                    setDefaultRegisterUserLevel
                });
                if (setRegisterSetting.success) {
                    return this.Ok(res, "Success Set Setting");
                }
                return this.BadRerquest(res, setRegisterSetting.message);
            }
            catch (error) {
                return this.BadRerquest(res, error.message);
            }
        });
    }
    /**********
   *
   * Get Register Setting
   *
   ************/
    GetRegisterSetting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getRegisterSettingValue = yield UnitOfWork_1.default.SettingRepository
                    .GetSetting(setting_enum_1.SETTING_ENUM.REGISTER_SETTING);
                if (getRegisterSettingValue.success) {
                    return this.OkObjectResult(res, {
                        data: JSON.parse(getRegisterSettingValue.result)
                    }, "Get Register Setting");
                }
                return this.BadRerquest(res, getRegisterSettingValue.message);
            }
            catch (error) {
                return this.BadRerquest(res, error.message);
            }
        });
    }
    /**********
     *
     * Set Activation Link Setting
     *
     ************/
    SetLinkActivationSetting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { activationLink } = req.body;
                const serActivationLink = yield UnitOfWork_1.default.SettingRepository
                    .SetSetting(setting_enum_1.SETTING_ENUM.ACTIVATION_LINK, activationLink);
                if (serActivationLink.success) {
                    return this.Ok(res, "Success Set Setting");
                }
                return this.BadRerquest(res, serActivationLink.message);
            }
            catch (error) {
                return this.BadRerquest(res, error.message);
            }
        });
    }
    /**********
     *
     * Get Activation Link Setting
     *
     ************/
    GetLinkActivationSetting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getLinkActivationLink = yield UnitOfWork_1.default.SettingRepository
                    .GetSetting(setting_enum_1.SETTING_ENUM.ACTIVATION_LINK);
                if (getLinkActivationLink.success) {
                    return this.OkObjectResult(res, {
                        data: JSON.parse(getLinkActivationLink.result)
                    }, "Get Activation Link Setting");
                }
                return this.BadRerquest(res, getLinkActivationLink.message);
            }
            catch (error) {
                return this.BadRerquest(res, error.message);
            }
        });
    }
};
