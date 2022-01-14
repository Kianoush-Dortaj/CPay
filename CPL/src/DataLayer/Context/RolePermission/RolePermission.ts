import { Schema, model, Document } from 'mongoose';
import { IRolePermissionDoc } from './IRolePermissionDoc';
import { IRolePermissionModel } from './IRolePermissionModel';


const RolePermission = new Schema(
    {
        roleId: { type: Schema.Types.ObjectId, ref: "Role" },
        permissionId: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    },
    {
        toJSON: { virtuals: true },
    }
);

export const RolePermissionEntitie = model<IRolePermissionDoc, IRolePermissionModel>("RolePermission", RolePermission)

