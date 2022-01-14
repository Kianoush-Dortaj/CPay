"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongooDBCloud_1 = __importDefault(require("./MongooDBCloud"));
const MongooDbRegular_1 = __importDefault(require("./MongooDbRegular"));
class MongoDB {
    RegularConnect() {
        return new MongooDbRegular_1.default();
    }
    CloudConnect() {
        return new MongooDBCloud_1.default();
    }
}
exports.default = MongoDB;
