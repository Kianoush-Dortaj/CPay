"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Middllware_1 = __importDefault(require("./Middllware"));
exports.default = new class FileToField extends Middllware_1.default {
    FileToAvatar(req, res, next) {
        if (!req.file) {
            req.body.avatar = undefined;
        }
        else {
            req.body.avatar = req.file.originalname;
        }
        next();
    }
};
