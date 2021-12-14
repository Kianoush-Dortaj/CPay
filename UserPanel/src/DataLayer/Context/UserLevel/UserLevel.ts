import mongoose from 'mongoose';
import uniqueString from 'unique-string';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { IUserLevelAttrs } from './IUserLevelAttrs';
import { IUserLevelDoc } from './IUserLevelDoc';
import { IUserLevelModel } from './IUserLevelModel';

const UserLevelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    isDefault: { type: Boolean, default: false },
    isPublish: { type: Boolean, default: false }
}, {
    toJSON: { virtuals: true },
})

// UserLevelSchema.plugin(BaseSchema);

UserLevelSchema.statics.build = (attrs: IUserLevelAttrs) => {
    return new UserLevelEntitie(attrs);
}


const UserLevelEntitie = mongoose.model<IUserLevelDoc, IUserLevelModel>("UserLevel", UserLevelSchema);

export { UserLevelEntitie }