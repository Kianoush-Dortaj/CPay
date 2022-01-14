import mongoose from 'mongoose';
import uniqueString from 'unique-string';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { ICountryAttrs } from './ICountryAttrs';
import { ICountryDoc } from './ICountryDoc';
import { ICountryModel } from './ICountryModel';

const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    languageId: {
        type: Schema.Types.ObjectId,
        ref: 'Language',
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'FiatCurrency',
    },
    iso3Code: {
        type: String,
        required: true
    },
    iso2Code: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    callCode: {
        type: String,
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
    displayOrder: {
        type: Number,
        require: true
    }
}, {
    toJSON: { virtuals: true },
})


CountrySchema.statics.build = (attrs: ICountryAttrs) => {
    return new CountryEntitie(attrs);
}

const CountryEntitie = mongoose.model<ICountryDoc, ICountryModel>("Country", CountrySchema);

export { CountryEntitie }