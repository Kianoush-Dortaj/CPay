import mongoose, { Schema } from 'mongoose';
import { IGetwayAttrs } from './IGetwayAttrs';
import { IGetwayDoc } from './IGetwayDoc';
import { IGetwayModel } from './IGetwayModel';

const GetwaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    description: {
        type: String,
        required: true
    },
    isPublish: { type: Boolean, require: true },
    icon: {
        type: String,
        required: true
    },
    locals:
        [{
            lang: { type: String },
            value: {
                name: { type: String },
                description: { type: Schema.Types.ObjectId }
            }
        }]
}, {
    toJSON: { virtuals: true },
})


GetwaySchema.statics.build = (attrs: IGetwayAttrs) => {
    return new GetwayEntitie(attrs);
}


const GetwayEntitie = mongoose.model<IGetwayDoc, IGetwayModel>("Getway", GetwaySchema);

export { GetwayEntitie }