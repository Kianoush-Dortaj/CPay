"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserLevelController_1 = __importDefault(require("../../Controllers/UserLevelController/UserLevelController"));
const UserLevelValidator_1 = __importDefault(require("./UserLevelValidator"));
const userLevelRouter = express_1.default.Router();
userLevelRouter.post('/create', 
// authController.AuthToken,
UserLevelValidator_1.default.CreateHandle(), UserLevelController_1.default.CreateUserLevel);
userLevelRouter.put('/update/:id', 
// authController.AuthToken,
UserLevelValidator_1.default.UpdateHandle(), UserLevelController_1.default.UpdateUserLevel);
userLevelRouter.delete('/delete/:id', 
// authController.AuthToken,
UserLevelValidator_1.default.GetItemByIdHandle(), UserLevelController_1.default.DeleteUserLevel);
userLevelRouter.get('/getById/:id', 
// authController.AuthToken,
UserLevelValidator_1.default.GetItemByIdHandle(), UserLevelController_1.default.GetByIdUserLevel);
userLevelRouter.get('/select', 
// authController.AuthToken,
UserLevelController_1.default.GetAllUserLevelSelect);
userLevelRouter.post('/getAll', 
// authController.AuthToken,
UserLevelController_1.default.GetAllUserLevelPaging);
exports.default = userLevelRouter;
