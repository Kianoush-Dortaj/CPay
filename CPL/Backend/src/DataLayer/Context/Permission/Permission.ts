import { Schema, model, Document } from 'mongoose';
import IPermissionAttr from './IPermissionAttrs';
import IPermissionDoc from './IPermissionDoc';
import { IPermissionModel } from './IPermissionModel';

const PermissionSchema = new Schema({
    name: { type: String, require: true },
    parentId: { type: String },
    permissionId: { type: String, require: true },
    isDelete: { type: Boolean, default: false }
},
    {
        toJSON: { virtuals: true },
    });

    
PermissionSchema.statics.build = (attrs: IPermissionAttr) => {
    return new PermissionEntitie(attrs);
}

const PermissionEntitie = model<IPermissionDoc, IPermissionModel>("Permission", PermissionSchema);

export { PermissionEntitie }