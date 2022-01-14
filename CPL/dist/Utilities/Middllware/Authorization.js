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
const auth_failure_error_1 = __importDefault(require("../../core/Reponse/auth-failure-error"));
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
exports.default = new class Authrization {
    constructor() { }
    AuthToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let decodeToken = yield UnitOfWork_1.default.jwtRepository.DecodeToken(req, res, next);
            if (decodeToken.success) {
                return next();
            }
            return new auth_failure_error_1.default("Ivalid Token").send(res);
        });
    }
};
