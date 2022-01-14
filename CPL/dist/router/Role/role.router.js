"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoleController_1 = __importDefault(require("../../Controllers/RoleController/RoleController"));
const RoleValidator_1 = __importDefault(require("./RoleValidator"));
const roleRouter = express_1.default.Router();
roleRouter.post('/create', 
// authController.AuthToken,
RoleValidator_1.default.CreateHandle(), RoleController_1.default.CreateRole);
roleRouter.put('/update/:id', 
// authController.AuthToken,
RoleValidator_1.default.UpdateHandle(), RoleController_1.default.UpdateRole);
roleRouter.delete('/delete/:id', 
// authController.AuthToken,
RoleValidator_1.default.GetItemByIdHandle(), RoleController_1.default.DeleteRole);
roleRouter.get('/getById/:id', 
// authController.AuthToken,
RoleValidator_1.default.GetItemByIdHandle(), RoleController_1.default.GetByIdRole);
roleRouter.get('/select', 
// authController.AuthToken,
RoleController_1.default.GetAllRoleSelect);
roleRouter.post('/getAll', 
// authController.AuthToken,
RoleController_1.default.GetAllRolePaging);
exports.default = roleRouter;
