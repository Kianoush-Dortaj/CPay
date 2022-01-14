"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PermissionController_1 = __importDefault(require("../../Controllers/PermissionController/PermissionController"));
const PermissionValidator_1 = __importDefault(require("./PermissionValidator"));
const permissionRouter = express_1.default.Router();
permissionRouter.post('/create', 
// authController.AuthToken,
PermissionValidator_1.default.CreateHandle(), PermissionController_1.default.CreatePermission);
permissionRouter.put('/update/:id', 
// authController.AuthToken,
PermissionValidator_1.default.UpdateHandle(), PermissionController_1.default.UpdatePermission);
permissionRouter.delete('/delete/:id', 
// authController.AuthToken,
PermissionValidator_1.default.GetItemByIdHandle(), PermissionController_1.default.DeletePermission);
permissionRouter.get('/getById/:id', 
// authController.AuthToken,
PermissionValidator_1.default.GetItemByIdHandle(), PermissionController_1.default.GetByIdPermission);
permissionRouter.get('/getAll', 
// authController.AuthToken,
PermissionController_1.default.GetAllPermission);
exports.default = permissionRouter;
