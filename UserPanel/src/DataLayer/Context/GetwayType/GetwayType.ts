import mongoose, { Schema } from 'mongoose';
import { IGetwayTypeAttrs } from './IGetwayTypeAttrs';
import { IGetwayTypeDoc } from './IGetwayTypeDoc';
import { IGetwayTypeModel } from './IGetwayTypeModel';

const GetwayTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    description: {
        type: String,
        required: true
    },
    comission: {
        type: Number,
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
                description: { type: String },
                langId: { type: Schema.Types.ObjectId }
            }
        }]
}, {
    toJSON: { virtuals: true },
})


GetwayTypeSchema.statics.build = (attrs: IGetwayTypeAttrs) => {
    return new GetwayTypeEntitie(attrs);
}


const GetwayTypeEntitie = mongoose.model<IGetwayTypeDoc, IGetwayTypeModel>("GetwayType", GetwayTypeSchema);

export { GetwayTypeEntitie }