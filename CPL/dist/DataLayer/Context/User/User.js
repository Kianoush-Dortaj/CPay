"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntite = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const unique_string_1 = __importDefault(require("unique-string"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, require: false },
    email: { type: String, defult: null },
    gender: { type: Number, require: true },
    isAdmin: { type: Boolean, require: true, default: false },
    isActive: { type: Boolean, default: false },
    isSupport: { type: Boolean, default: false },
    poster: { type: String },
    confirmEmail: { type: Boolean, default: false },
    towFactorEnabled: { type: Boolean, default: false },
    avatar: { type: String },
    userRole: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'UserRole',
    },
    userLevel: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'UserLevel',
    },
    birthDate: { type: Date },
    locked: { type: Boolean, default: false },
    lockedDate: { type: Date, default: null },
    accountFail: { type: Number, default: 0 },
    password: { type: String, require: true },
    securityStamp: { type: String },
}, {
    toJSON: { virtuals: true },
});
// UserSchema.plugin(BaseSchema);
UserSchema.pre('updateOne', function () {
    this.set({ securityStamp: (0, unique_string_1.default)() });
});
UserSchema.statics.build = (attrs) => {
    return new UserEntite(attrs);
};
// UserSchema.virtual("userRole", {
//     foreignField: "userRole",
//     ref: "UserRole",
//     localField: "userId"
// })
const UserEntite = mongoose_1.default.model("User", UserSchema);
exports.UserEntite = UserEntite;
