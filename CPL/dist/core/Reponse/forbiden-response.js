"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenResponse = void 0;
const RequestStatus_1 = require("./Models/RequestStatus");
const Response_1 = __importDefault(require("./Response"));
class ForbiddenResponse extends Response_1.default {
    constructor(message) {
        super(RequestStatus_1.ResponseStatus.FORBIDDEN, message, false);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
