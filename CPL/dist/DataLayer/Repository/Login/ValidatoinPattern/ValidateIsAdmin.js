"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIsAdmin = void 0;
const Handler_1 = require("./Handler");
class ValidateIsAdmin extends Handler_1.Handler {
    handle(request) {
        if (request.isAdmin) {
            return super.handle(request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                token: ''
            },
            HaveError: true,
            Message: 'User Not Admin'
        };
    }
}
exports.ValidateIsAdmin = ValidateIsAdmin;
