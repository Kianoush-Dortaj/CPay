import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUserRoleAttrs } from './IUserRoleAttr';
import { IUserRoleDoc } from './IUserRoleDock';
import { IUserRoleModel } from './IUserRoleModel';

const UserRoleSchema = new mongoose.Schema({
    roles: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    toJSON: { virtuals: true },
})

// UserRoleSchema.plugin(BaseSchema);

UserRoleSchema.statics.build = (attrs: IUserRoleAttrs) => {
    return new UserRoleEntitie(attrs);
}


const UserRoleEntitie = mongoose.model<IUserRoleDoc, IUserRoleModel>("UserRole", UserRoleSchema);

export { UserRoleEntitie }