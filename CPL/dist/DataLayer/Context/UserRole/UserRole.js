"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleEntitie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserRoleSchema = new mongoose_1.default.Schema({
    roles: {
        type: [
            {
                type: mongoose_2.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true
    },
    userId: { type: mongoose_2.Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    toJSON: { virtuals: true },
});
// UserRoleSchema.plugin(BaseSchema);
UserRoleSchema.statics.build = (attrs) => {
    return new UserRoleEntitie(attrs);
};
const UserRoleEntitie = mongoose_1.default.model("UserRole", UserRoleSchema);
exports.UserRoleEntitie = UserRoleEntitie;
