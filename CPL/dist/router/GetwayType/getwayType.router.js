"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GetwayTypeController_1 = __importDefault(require("../../Controllers/GetwayTypeController/GetwayTypeController"));
const GetwayType_1 = __importDefault(require("../../Utilities/Multer/GetwayType"));
const GetwayTypeValidator_1 = __importDefault(require("./GetwayTypeValidator"));
const getwayRouter = express_1.default.Router();
getwayRouter.post('/create', 
// authController.AuthToken,
GetwayType_1.default.single("icon"), GetwayTypeValidator_1.default.CreateHandle(), GetwayTypeController_1.default.CreateGetwayType);
getwayRouter.put('/update/:id', 
// authController.AuthToken,
GetwayType_1.default.single("icon"), GetwayTypeValidator_1.default.UpdateHandle(), GetwayTypeController_1.default.UpdateGetwayType);
getwayRouter.delete('/delete/:id', 
// authController.AuthToken,
GetwayTypeValidator_1.default.GetItemByIdHandle(), GetwayTypeController_1.default.DeleteGetwayType);
getwayRouter.get('/getById/:id', 
// authController.AuthToken,
GetwayTypeValidator_1.default.GetItemByIdHandle(), GetwayTypeController_1.default.GetByIdGetwayType);
getwayRouter.get('/select', 
// authController.AuthToken,
GetwayTypeController_1.default.GetAllGetwayTypeSelect);
getwayRouter.post('/getAll', 
// authController.AuthToken,
GetwayTypeController_1.default.GetAllGetwayTypePaging);
getwayRouter.get('/getGetwayTypeImage/:id', 
// authController.AuthToken,
GetwayTypeValidator_1.default.GetItemByIdHandle(), GetwayTypeController_1.default.GetGetwayTypeImage);
exports.default = getwayRouter;
