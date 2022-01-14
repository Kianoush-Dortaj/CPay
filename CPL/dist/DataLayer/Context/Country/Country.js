"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { BaseSchema } from './BaseSchema';
const mongoose_2 = require("mongoose");
const CountrySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    languageId: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'Language',
    },
    currency: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'FiatCurrency',
    },
    iso3Code: {
        type: String,
        required: true
    },
    iso2Code: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    callCode: {
        type: String,
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
    displayOrder: {
        type: Number,
        require: true
    }
}, {
    toJSON: { virtuals: true },
});
CountrySchema.statics.build = (attrs) => {
    return new CountryEntitie(attrs);
};
const CountryEntitie = mongoose_1.default.model("Country", CountrySchema);
exports.CountryEntitie = CountryEntitie;
