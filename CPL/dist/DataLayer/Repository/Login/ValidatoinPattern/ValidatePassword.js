"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePassword = void 0;
const Handler_1 = require("./Handler");
const bcrypt_1 = __importDefault(require("bcrypt"));
class ValidatePassword extends Handler_1.Handler {
    constructor(password) {
        super();
        this.password = password;
    }
    handle(request) {
        if (bcrypt_1.default.compareSync(this.password, request.password)) {
            return super.handle(request);
        }
        else {
            if (request.accountFail < 5) {
                request.accountFail++;
            }
            else {
                request.locked = true;
                request.lockedDate = new Date(new Date().setUTCHours(72));
            }
            request.save();
            return {
                Context: {
                    hash: '',
                    isTowfactor: false,
                    token: ''
                },
                HaveError: true,
                Message: 'Username or password is not Valid'
            };
        }
    }
}
exports.ValidatePassword = ValidatePassword;
