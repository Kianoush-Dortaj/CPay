import mongoose from 'mongoose';
import uniqueString from 'unique-string';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { ILanguageAttrs } from './ILanguageAttrs';
import { ILanguageDoc } from './ILanguageDoc';
import { ILanguageModel } from './ILanguageModel';

const LanguageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayOrder: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Boolean,
        required: true
    },
    isPublish: {
        type: Boolean,
        required: true
    },
    isDefault: {
        type: Boolean,
        required: true
    },
    rtl: {
        type: Boolean,
        required: true
    },
    uniqueSeoCode: {
        type: String,
        required: true
    },
    flagImageFileName: {
        type: String,
        required: true
    }
}, {
    toJSON: { virtuals: true },
})


LanguageSchema.statics.build = (attrs: ILanguageAttrs) => {
    return new LanguageEntitie(attrs);
}


const LanguageEntitie = mongoose.model<ILanguageDoc, ILanguageModel>("Language", LanguageSchema);

export { LanguageEntitie }