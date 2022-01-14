"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionEntitie = void 0;
const mongoose_1 = require("mongoose");
const PermissionSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    parentId: { type: String },
    permissionId: { type: String, require: true },
    isDelete: { type: Boolean, default: false }
}, {
    toJSON: { virtuals: true },
});
PermissionSchema.statics.build = (attrs) => {
    return new PermissionEntitie(attrs);
};
const PermissionEntitie = (0, mongoose_1.model)("Permission", PermissionSchema);
exports.PermissionEntitie = PermissionEntitie;
