"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateBlocked = void 0;
const Handler_1 = require("./Handler");
class ValidateBlocked extends Handler_1.Handler {
    handle(request) {
        if (!request.locked) {
            return super.handle(request);
        }
        else {
            if (request.lockedDate < new Date(new Date().toUTCString())) {
                request.accountFail = 0;
                request.locked = false;
                request.lockedDate = undefined;
                request.save();
                return super.handle(request);
            }
            else {
                return {
                    Context: {
                        hash: '',
                        isTowfactor: false,
                        token: ''
                    },
                    HaveError: true,
                    Message: `Your Account Blocked to Date : ${request.lockedDate}`
                };
            }
        }
    }
}
exports.ValidateBlocked = ValidateBlocked;
