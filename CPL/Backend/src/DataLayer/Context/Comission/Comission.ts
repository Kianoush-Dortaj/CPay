import mongoose from 'mongoose';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { IComissionAttrs } from './IComissionAttrs';
import { IComissionDoc } from './IComissionDoc';
import { IComissionModel } from './IComissionModel';

const ComissionSchema = new mongoose.Schema({
    userLevelId: {
        type: Schema.Types.ObjectId,
        ref: "UserLevel",
        required: true
    },
    actionType: { type: Number, default: false },
    comission: { type: Number, default: false }
}, {
    toJSON: { virtuals: true },
})

ComissionSchema.statics.build = (attrs: IComissionAttrs) => {
    return new ComissionEntitie(attrs);
}


const ComissionEntitie = mongoose.model<IComissionDoc, IComissionModel>("Comission", ComissionSchema);

export { ComissionEntitie }