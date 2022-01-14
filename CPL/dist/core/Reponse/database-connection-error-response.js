"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionResponse = void 0;
const RequestStatus_1 = require("./Models/RequestStatus");
const Response_1 = __importDefault(require("./Response"));
class DatabaseConnectionResponse extends Response_1.default {
    constructor(message) {
        super(RequestStatus_1.ResponseStatus.INTERNAL_ERROR, message, false);
    }
}
exports.DatabaseConnectionResponse = DatabaseConnectionResponse;