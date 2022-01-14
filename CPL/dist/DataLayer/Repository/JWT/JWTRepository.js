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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const OperationResult_1 = __importDefault(require("../../../core/Operation/OperationResult"));
class JWTRepository {
    /********
     * Generate Token
     *******/
    GenerateToken(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var payload = {
                    iss: "a57bb14a44455e98800d6a513953fc0",
                    sub: "a57bb14a445541e98800d6a513953fc0",
                    aud: "Store.com",
                    expiresIn: 360,
                    iat: 360,
                };
                let token = jsonwebtoken_1.default.sign({ info: info, payload }, "travelbudy", { expiresIn: 60 * 24 });
                return OperationResult_1.default.BuildSuccessResult('', token);
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    /********
  * Decode Token
  *******/
    DecodeToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = yield this.GetToken(req);
                if (token) {
                    let tokenInfo = yield jsonwebtoken_1.default.verify(token, "travelbudy");
                    if (tokenInfo) {
                        return OperationResult_1.default.BuildSuccessResult('success decode', tokenInfo.info.userId);
                    }
                }
                return OperationResult_1.default.BuildFailur('Error Decode');
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    DecodeWebsocketToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (token) {
                    let tokenInfo = yield jsonwebtoken_1.default.verify(token, "travelbudy");
                    if (tokenInfo) {
                        return OperationResult_1.default.BuildSuccessResult('success decode', tokenInfo.info.userId);
                    }
                }
                return OperationResult_1.default.BuildFailur('Error Decode');
            }
            catch (error) {
                return OperationResult_1.default.BuildFailur(error.message);
            }
        });
    }
    GetToken(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers["authorization"];
            if (token &&
                token.toLowerCase().startsWith("bearer ")) {
                return token.substring(7);
            }
            return null;
        });
    }
}
exports.default = JWTRepository;
