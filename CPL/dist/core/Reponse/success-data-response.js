"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessDataResponse = void 0;
const RequestStatus_1 = require("./Models/RequestStatus");
const Response_1 = __importDefault(require("./Response"));
class SuccessDataResponse extends Response_1.default {
    constructor(result, message) {
        super(RequestStatus_1.ResponseStatus.SUCCESS, message, true, result);
    }
}
exports.SuccessDataResponse = SuccessDataResponse;