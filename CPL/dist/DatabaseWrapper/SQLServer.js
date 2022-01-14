"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQLServerCloud_1 = __importDefault(require("./SQLServerCloud"));
const SQLServerRegular_1 = __importDefault(require("./SQLServerRegular"));
class SQLSserver {
    RegularConnect() {
        return new SQLServerRegular_1.default();
    }
    CloudConnect() {
        return new SQLServerCloud_1.default();
    }
}
exports.default = SQLSserver;
