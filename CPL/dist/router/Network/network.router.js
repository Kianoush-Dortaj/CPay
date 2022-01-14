"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NetworkController_1 = __importDefault(require("../../Controllers/NetworkController/NetworkController"));
const NetworkValidator_1 = __importDefault(require("./NetworkValidator"));
const networkRouter = express_1.default.Router();
networkRouter.post('/create', 
// authController.AuthToken,
NetworkValidator_1.default.CreateHandle(), NetworkController_1.default.CreateNetwork);
networkRouter.put('/update/:id', 
// authController.AuthToken,
NetworkValidator_1.default.UpdateHandle(), NetworkController_1.default.UpdateNetwork);
networkRouter.delete('/delete/:id', 
// authController.AuthToken,
NetworkValidator_1.default.GetItemByIdHandle(), NetworkController_1.default.DeleteNetwork);
networkRouter.get('/getById/:id', 
// authController.AuthToken,
NetworkValidator_1.default.GetItemByIdHandle(), NetworkController_1.default.GetByIdNetwork);
networkRouter.get('/select', 
// authController.AuthToken,
NetworkController_1.default.GetAllNetworkSelect);
networkRouter.post('/getAll', 
// authController.AuthToken,
NetworkController_1.default.GetAllNetworkPaging);
exports.default = networkRouter;
