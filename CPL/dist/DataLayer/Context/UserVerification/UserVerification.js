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
exports.UserVerificationEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserVerificationSchema = new mongoose_1.default.Schema({
    birthDate: {
        type: Date,
        require: true
    },
    nationality: {
        type: mongoose_2.Schema.Types.ObjectId, required: true, ref: 'Country'
    },
    typeVerification: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: false
    },
    selfieImage: {
        type: String,
        require: false
    },
    frontImage: {
        type: String,
        require: false
    },
    backImage: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    updateAt: {
        type: Date,
        require: false
    },
    status: {
        type: Number,
        require: true
    },
    userId: { type: mongoose_2.Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    toJSON: { virtuals: true },
});
UserVerificationSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.set({ createdAt: new Date });
    });
});
UserVerificationSchema.pre('updateOne', function () {
    this.set({ updateAt: new Date });
});
UserVerificationSchema.statics.build = (attrs) => {
    return new UserVerificationEntitie(attrs);
};
const UserVerificationEntitie = mongoose_1.default.model("UserVerification", UserVerificationSchema);
exports.UserVerificationEntitie = UserVerificationEntitie;
