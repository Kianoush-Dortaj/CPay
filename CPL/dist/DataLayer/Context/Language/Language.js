"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LanguageSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    displayOrder: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Boolean,
        required: true
    },
    isPublish: {
        type: Boolean,
        required: true
    },
    isDefault: {
        type: Boolean,
        required: true
    },
    rtl: {
        type: Boolean,
        required: true
    },
    uniqueSeoCode: {
        type: String,
        required: true
    },
    flagImageFileName: {
        type: String,
        required: true
    }
}, {
    toJSON: { virtuals: true },
});
LanguageSchema.statics.build = (attrs) => {
    return new LanguageEntitie(attrs);
};
const LanguageEntitie = mongoose_1.default.model("Language", LanguageSchema);
exports.LanguageEntitie = LanguageEntitie;
