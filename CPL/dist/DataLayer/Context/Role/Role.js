"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const unique_string_1 = __importDefault(require("unique-string"));
const RoleSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    securityStamp: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
});
// RoleSchema.plugin(BaseSchema);
RoleSchema.virtual("rolePermissionId", {
    foreignField: "roleId",
    ref: "RolePermission",
    localField: "_id"
});
RoleSchema.pre('save', function () {
    this.set({ securityStamp: (0, unique_string_1.default)() });
});
RoleSchema.pre('updateOne', function () {
    this.set({ securityStamp: (0, unique_string_1.default)() });
});
RoleSchema.statics.build = (attrs) => {
    return new RoleEntitie(attrs);
};
const RoleEntitie = mongoose_1.default.model("Role", RoleSchema);
exports.RoleEntitie = RoleEntitie;
