"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiatCurrencyEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const unique_string_1 = __importDefault(require("unique-string"));
const FiatCurrencySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    isPublish: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    },
    displayOrder: {
        type: Number,
        require: true
    },
    logo: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false }
}, {
    toJSON: { virtuals: true },
});
FiatCurrencySchema.pre('save', function () {
    this.set({ securityStamp: (0, unique_string_1.default)() });
});
FiatCurrencySchema.pre('updateOne', function () {
    this.set({ securityStamp: (0, unique_string_1.default)() });
});
FiatCurrencySchema.statics.build = (attrs) => {
    return new FiatCurrencyEntitie(attrs);
};
const FiatCurrencyEntitie = mongoose_1.default.model("FiatCurrency", FiatCurrencySchema);
exports.FiatCurrencyEntitie = FiatCurrencyEntitie;
