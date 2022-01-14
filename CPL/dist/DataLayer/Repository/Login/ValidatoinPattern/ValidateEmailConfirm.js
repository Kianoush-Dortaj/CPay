"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmailConfrim = void 0;
const Handler_1 = require("./Handler");
class ValidateEmailConfrim extends Handler_1.Handler {
    handle(request) {
        if (request.confirmEmail) {
            return super.handle(request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                token: ''
            },
            HaveError: true,
            Message: 'Your Email is Not Confirm . Please Click on this link for Send Again Email Activation'
        };
    }
}
exports.ValidateEmailConfrim = ValidateEmailConfrim;
