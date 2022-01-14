"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OperationResult_1 = __importDefault(require("../../../core/Operation/OperationResult"));
const Util_1 = __importDefault(require("./../../../Utilities/Util"));
const UserActivityEnum_1 = require("../../../DTO/UserActivity/UserActivityEnum");
class SettingRepository {
    /***
     *
     * Set Setting
     *
     ****/
    GetAllUserActivitySelect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getUserActivity = Util_1.default.convertEnumToArray(UserActivityEnum_1.UserActivityEnum);
                console.log(getUserActivity);
                return OperationResult_1.default.BuildSuccessResult("Get All User Activity Setting", getUserActivity);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
}
exports.default = SettingRepository;
