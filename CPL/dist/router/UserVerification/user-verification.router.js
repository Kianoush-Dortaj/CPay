"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserVerifivationController_1 = __importDefault(require("../../Controllers/UserVerificationController/UserVerifivationController"));
const userLevelRouter = express_1.default.Router();
userLevelRouter.post('/getAll', 
// authController.AuthToken,
UserVerifivationController_1.default.GetAllUserVerifications);
userLevelRouter.get('/getById/:id', 
// authController.AuthToken,
UserVerifivationController_1.default.GetByIdUserVerification);
userLevelRouter.put('/changeStatus/:id', 
// authController.AuthToken,
UserVerifivationController_1.default.ChangeUserVerificationStatus);
exports.default = userLevelRouter;
