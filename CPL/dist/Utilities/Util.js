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
const UnitOfWork_1 = __importDefault(require("../DataLayer/Repository/UnitOfWork/UnitOfWork"));
exports.default = new class UtilService {
    getDirectoryImage(dir) {
        return dir.substring(10);
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    convertEnumToArray(value) {
        const map = [];
        for (let key in value) {
            //TypeScript does not allow enum keys to be numeric
            if (!isNaN(Number(key)))
                continue;
            const val = value[key];
            //TypeScript does not allow enum value to be null or undefined
            if (val !== undefined && val !== null)
                map.push({
                    key: val,
                    value: key
                });
        }
        return map;
    }
    getAcceptLang(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let lang = null;
            if (req.headers['accept-language']) {
                lang = req.headers['accept-language'];
            }
            else {
                const defaultItem = yield UnitOfWork_1.default.LanguageRepository.
                    GetDefulatLanguage();
                if (defaultItem.success) {
                    lang = defaultItem.success ?
                        defaultItem.result ?
                            (_a = defaultItem.result) === null || _a === void 0 ? void 0 : _a.uniqueSeoCode : 'en' : 'en';
                }
                else {
                    lang = null;
                }
            }
            return lang;
        });
    }
};
