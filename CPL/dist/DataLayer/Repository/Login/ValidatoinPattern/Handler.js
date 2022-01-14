"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    setNext(handler) {
        this.nextHandler = handler;
        return this.nextHandler;
    }
    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return {
            Context: {
                hash: '',
                isTowfactor: false,
                token: ''
            },
            HaveError: false,
            Message: ''
        };
    }
}
exports.Handler = Handler;
