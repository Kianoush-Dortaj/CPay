"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const path_1 = __importDefault(require("path"));
exports.default = new class LanguageValidation {
    CreateHandle() {
        return [
            (0, express_validator_1.check)("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            (0, express_validator_1.check)("isDefault").notEmpty().withMessage("isDefault Can not be Empty"),
            (0, express_validator_1.check)("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            (0, express_validator_1.check)("rtl").notEmpty().withMessage("rtl Can not be Empty"),
            (0, express_validator_1.check)("uniqueSeoCode").notEmpty().withMessage("uniqueSeoCode Can not be Empty"),
            (0, express_validator_1.check)("flagImageFileName").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path_1.default.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                }
                else {
                    throw new Error(" Please Add flagImageFileName");
                }
            }))
        ];
    }
    UpdateHandle() {
        return [
            (0, express_validator_1.query)("id").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.params) {
                    let data = yield UnitOfWork_1.default.LanguageRepository
                        .GetByIdLanguage(req.params.id);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this Record , Please try again");
                    }
                }
            })),
            (0, express_validator_1.check)("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            (0, express_validator_1.check)("isDefault").notEmpty().withMessage("isDefault Can not be Empty"),
            (0, express_validator_1.check)("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            (0, express_validator_1.check)("rtl").notEmpty().withMessage("rtl Can not be Empty"),
            (0, express_validator_1.check)("uniqueSeoCode").notEmpty().withMessage("uniqueSeoCode Can not be Empty"),
            (0, express_validator_1.check)("flagImageFileName").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path_1.default.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                }
                else {
                    throw new Error(" Please Add flagImageFileName");
                }
            }))
        ];
    }
    GetItemByIdHandle() {
        return [
            (0, express_validator_1.query)("id").custom((value, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.params) {
                    let data = yield UnitOfWork_1.default.LanguageRepository
                        .GetByIdLanguage(req.params.id);
                    if (!data.success) {
                        return Promise.reject("We Can not Find this Record , Please try again");
                    }
                }
            }))
        ];
    }
};
