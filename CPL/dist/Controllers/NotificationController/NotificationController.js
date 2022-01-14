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
exports.default = new class RequestController extends BaseController_1.BaseController {
    GetAllUnSeenNotificationByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = (yield UnitOfWork_1.default.jwtRepository.DecodeToken(req, res, next)).result;
                let getAllUnSeenNotificationByUserId = yield UnitOfWork_1.default.NotificationRepository.GetUnseenNotificationByUserId(userId);
                if (getAllUnSeenNotificationByUserId.success) {
                    return this.OkObjectResult(res, {
                        data: getAllUnSeenNotificationByUserId.result
                    }, getAllUnSeenNotificationByUserId.message);
                }
                return this.BadRerquest(res, getAllUnSeenNotificationByUserId.message);
            }
            catch (error) {
                return this.BadRerquest(res, error.message);
            }
        });
    }
    GetAllNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = (yield UnitOfWork_1.default.jwtRepository.DecodeToken(req, res, next)).result;
                let getAllUnSeenNotificationByUserId = yield UnitOfWork_1.default.NotificationRepository.GetAllNotification(userId);
                if (getAllUnSeenNotificationByUserId.success) {
                    return this.OkObjectResult(res, {
                        data: getAllUnSeenNotificationByUserId.result
                    }, getAllUnSeenNotificationByUserId.message);
                }
                return this.BadRerquest(res, getAllUnSeenNotificationByUserId.message);
            }
            catch (error) {
                return this.BadRerquest(res, error.message);
            }
        });
    }
    SeenNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifId = req.params.id;
                let userId = (yield UnitOfWork_1.default.jwtRepository.DecodeToken(req, res, next)).result;
                let getAllUnSeenNotificationByUserId = yield UnitOfWork_1.default.NotificationRepository.SeenNotification(notifId, userId);
                if (getAllUnSeenNotificationByUserId.success) {
                    return this.OkObjectResult(res, {
                        data: getAllUnSeenNotificationByUserId.result
                    }, getAllUnSeenNotificationByUserId.message);
                }
                return this.BadRerquest(res, getAllUnSeenNotificationByUserId.message);
            }
            catch (error) {
                return this.BadRerquest(res, error.message);
            }
        });
    }
};
