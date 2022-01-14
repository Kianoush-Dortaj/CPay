"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLevelEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserLevelSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    isDefault: { type: Boolean, default: false },
    isPublish: { type: Boolean, default: false }
}, {
    toJSON: { virtuals: true },
});
// UserLevelSchema.plugin(BaseSchema);
UserLevelSchema.statics.build = (attrs) => {
    return new UserLevelEntitie(attrs);
};
const UserLevelEntitie = mongoose_1.default.model("UserLevel", UserLevelSchema);
exports.UserLevelEntitie = UserLevelEntitie;
