"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserActivityController_1 = __importDefault(require("../../Controllers/UserActivityController/UserActivityController"));
const userActivityRouter = express_1.default.Router();
userActivityRouter.get("/select", 
// authController.AuthToken,
UserActivityController_1.default.GetUserActivitySelect);
exports.default = userActivityRouter;
