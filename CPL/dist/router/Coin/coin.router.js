"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CoinController_1 = __importDefault(require("../../Controllers/CoinController/CoinController"));
const CoinIcon_1 = __importDefault(require("../../Utilities/Multer/CoinIcon"));
const CoinValidator_1 = __importDefault(require("./CoinValidator"));
const getwayRouter = express_1.default.Router();
getwayRouter.post('/create', 
// authController.AuthToken,
CoinIcon_1.default.single("icon"), CoinValidator_1.default.CreateHandle(), CoinController_1.default.CreateCoin);
getwayRouter.put('/update/:id', 
// authController.AuthToken,
CoinIcon_1.default.single("icon"), CoinValidator_1.default.UpdateHandle(), CoinController_1.default.UpdateCoin);
getwayRouter.delete('/delete/:id', 
// authController.AuthToken,
CoinValidator_1.default.GetItemByIdHandle(), CoinController_1.default.DeleteCoin);
getwayRouter.get('/getById/:id', 
// authController.AuthToken,
CoinValidator_1.default.GetItemByIdHandle(), CoinController_1.default.GetByIdCoin);
getwayRouter.get('/select', 
// authController.AuthToken,
CoinController_1.default.GetAllCoinSelect);
getwayRouter.post('/getAll', 
// authController.AuthToken,
CoinController_1.default.GetAllCoinPaging);
getwayRouter.get('/getCoinImage/:id', 
// authController.AuthToken,
CoinValidator_1.default.GetItemByIdHandle(), CoinController_1.default.GetCoinImage);
exports.default = getwayRouter;
