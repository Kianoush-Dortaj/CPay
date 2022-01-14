"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ComissionController_1 = __importDefault(require("../../Controllers/ComissionController/ComissionController"));
const ComissionValidator_1 = __importDefault(require("./ComissionValidator"));
const comissionRouter = express_1.default.Router();
comissionRouter.post('/create', 
// authController.AuthToken,
ComissionValidator_1.default.CreateHandle(), ComissionController_1.default.CreateComission);
comissionRouter.put('/update/:id', 
// authController.AuthToken,
ComissionValidator_1.default.UpdateHandle(), ComissionController_1.default.UpdateComission);
comissionRouter.delete('/delete/:id', 
// authController.AuthToken,
ComissionValidator_1.default.GetItemByIdHandle(), ComissionController_1.default.DeleteComission);
comissionRouter.get('/getById/:id', 
// authController.AuthToken,
ComissionValidator_1.default.GetItemByIdHandle(), ComissionController_1.default.GetByIdComission);
comissionRouter.post('/getAll', 
// authController.AuthToken,
ComissionController_1.default.GetAllComissionPaging);
exports.default = comissionRouter;
