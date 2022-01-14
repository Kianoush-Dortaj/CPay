"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = __importDefault(require("../../Controllers/AdminController/AdminController"));
const AvatarUser_1 = __importDefault(require("../../Utilities/Multer/AvatarUser"));
const AdminValidator_1 = __importDefault(require("./AdminValidator"));
const adminRouter = express_1.default.Router();
adminRouter.post('/create', 
// authController.AuthToken,
AdminValidator_1.default.CreateHandle(), AdminController_1.default.Create);
adminRouter.put('/personalInfo/:id', 
// authController.AuthToken,
AvatarUser_1.default.single("avatar"), AdminValidator_1.default.UpdateUserHandle(), AdminController_1.default.Update);
adminRouter.put('/accountInfo/:id', 
// authController.AuthToken,
AdminController_1.default.EditAccountInfoUser);
adminRouter.put('/changeUserRole/:id', 
// authController.AuthToken,
AdminValidator_1.default.ChangeUserRoleHandle(), AdminController_1.default.ChangeUseRole);
adminRouter.put('/changePassword/:id', 
// authController.AuthToken,
AdminValidator_1.default.ChangePasswordHandle(), AdminController_1.default.ChangePassword);
adminRouter.get('/getPersonalInformation/:id', 
// authController.AuthToken,
AdminValidator_1.default.GetItemByIdHandle(), AdminController_1.default.GetUserPersonalInformation);
adminRouter.get('/getAccountInformation/:id', 
// authController.AuthToken,
AdminValidator_1.default.GetItemByIdHandle(), AdminController_1.default.GetUserInfoAccount);
adminRouter.get('/getUserRoles/:id', 
// authController.AuthToken,
AdminValidator_1.default.GetItemByIdHandle(), AdminController_1.default.GetUserRoles);
adminRouter.get('/getUserImage/:id', 
// authController.AuthToken,
AdminValidator_1.default.GetItemByIdHandle(), AdminController_1.default.GetUserImage);
adminRouter.post('/getUserPaging', 
// authController.AuthToken,
AdminController_1.default.GetAllManagerPaging);
exports.default = adminRouter;
