"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logincontroller_1 = __importDefault(require("../../Controllers/Auth/Logincontroller"));
const usersRouter = express_1.default.Router();
usersRouter.post('/login', Logincontroller_1.default.LoginUser);
usersRouter.post('/checkTwofactoe', Logincontroller_1.default.AdminCheckAuthTowfactor);
exports.default = usersRouter;
