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
exports.CurrencyPairClient = void 0;
const UnitOfWork_1 = __importDefault(require("../../../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const RedisRepository_1 = __importDefault(require("../../../Redis/RedisRepository"));
const RedisKey_1 = __importDefault(require("../../../Redis/RedisKey"));
const RedisRepository_2 = __importDefault(require("./../../../../Utilities/Redis/RedisRepository"));
class CurrencyPairClient {
    update(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencyPairLists = yield UnitOfWork_1.default.CurrencyPairRepository
                .GetAllCurrencyPairs();
            if (currencyPairLists) {
                const setRedisValue = yield RedisRepository_1.default.Set(RedisKey_1.default.CurrencyPairList, currencyPairLists);
                if (!setRedisValue.success) {
                    return;
                }
                console.log(currencyPairLists.result);
                RedisRepository_2.default.Subscribe(currencyPairLists.result);
            }
        });
    }
}
exports.CurrencyPairClient = CurrencyPairClient;
