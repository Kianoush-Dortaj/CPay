"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotificationController_1 = __importDefault(require("../../Controllers/NotificationController/NotificationController"));
const Authorization_1 = __importDefault(require("../../Utilities/Middllware/Authorization"));
const usersRouter = express_1.default.Router();
usersRouter.get('/GetAllUnread', Authorization_1.default.AuthToken, NotificationController_1.default.GetAllUnSeenNotificationByUserId);
usersRouter.get('/GetAll', Authorization_1.default.AuthToken, NotificationController_1.default.GetAllNotification);
usersRouter.put('/ُSeen', Authorization_1.default.AuthToken, NotificationController_1.default.SeenNotification);
exports.default = usersRouter;
