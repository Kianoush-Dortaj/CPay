"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTowFactor = void 0;
const Handler_1 = require("./Handler");
const RedisRepository_1 = __importDefault(require("./../../../../Utilities/Redis/RedisRepository"));
const RedisKey_1 = __importDefault(require("./../../../../Utilities/Redis/RedisKey"));
const Util_1 = __importDefault(require("./../../../../Utilities/Util"));
const unique_string_1 = __importDefault(require("unique-string"));
class ValidateTowFactor extends Handler_1.Handler {
    handle(request) {
        if (!request.towFactorEnabled) {
            return super.handle(request);
        }
        let hash = (0, unique_string_1.default)();
        RedisRepository_1.default.SetValueWithexiperationTime(RedisKey_1.default.TowfactorKey + request.email, {
            code: Util_1.default.getRandomInt(1111111, 999999),
            hash: hash
        }, 120).then(data => {
            return {
                Context: {
                    hash: data.result,
                    isTowfactor: true,
                    token: ''
                },
                HaveError: false,
                Message: 'we are send code to your phone number . plase enter that code in this'
            };
        }).catch(error => {
            return {
                Context: request,
                HaveError: true,
                Message: 'we have error to send yuor activation code . please try again in 10 minutes'
            };
        });
        return {
            Context: {
                hash: hash,
                isTowfactor: true,
                token: ''
            },
            HaveError: false,
            Message: 'we are send code to your phone number . plase enter that code in this'
        };
    }
}
exports.ValidateTowFactor = ValidateTowFactor;
