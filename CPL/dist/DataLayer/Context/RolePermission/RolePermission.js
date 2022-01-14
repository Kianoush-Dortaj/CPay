"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionEntitie = void 0;
const mongoose_1 = require("mongoose");
const RolePermission = new mongoose_1.Schema({
    roleId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role" },
    permissionId: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Permission" }],
}, {
    toJSON: { virtuals: true },
});
exports.RolePermissionEntitie = (0, mongoose_1.model)("RolePermission", RolePermission);
