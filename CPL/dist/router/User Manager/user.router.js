"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../../Controllers/UserController/UserController"));
const UserAvatar_1 = __importDefault(require("../../Utilities/Multer/UserAvatar"));
const UserValidator_1 = __importDefault(require("./UserValidator"));
const userRouter = express_1.default.Router();
userRouter.post('/create', 
// authController.AuthToken,
UserValidator_1.default.CreateHandle(), UserController_1.default.Create);
userRouter.put('/personalInfo/:id', 
// authController.AuthToken,
UserAvatar_1.default.single("avatar"), UserValidator_1.default.UpdateUserHandle(), UserController_1.default.Update);
userRouter.put('/accountInfo/:id', 
// authController.AuthToken,
UserController_1.default.EditAccountInfoUser);
userRouter.put('/changePassword/:id', 
// authController.AuthToken,
UserValidator_1.default.ChangePasswordHandle(), UserController_1.default.ChangePassword);
userRouter.get('/getPersonalInformation/:id', 
// authController.AuthToken,
UserValidator_1.default.GetItemByIdHandle(), UserController_1.default.GetUserPersonalInformation);
userRouter.get('/getAccountInformation/:id', 
// authController.AuthToken,
UserValidator_1.default.GetItemByIdHandle(), UserController_1.default.GetUserInfoAccount);
userRouter.get('/getUserImage/:id', 
// authController.AuthToken,
UserValidator_1.default.GetItemByIdHandle(), UserController_1.default.GetUserImage);
userRouter.post('/getUserPaging', 
// authController.AuthToken,
UserController_1.default.GetAllManagerPaging);
exports.default = userRouter;
