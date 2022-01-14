"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OperationResult {
    constructor(success, message, result) {
        this.success = success;
        this.message = message;
        this.result = result;
    }
    static BuildSuccessResult(message, reult) {
        return new OperationResult(true, message, reult);
    }
    static BuildFailur(message) {
        return new OperationResult(false, message);
    }
}
exports.default = OperationResult;
