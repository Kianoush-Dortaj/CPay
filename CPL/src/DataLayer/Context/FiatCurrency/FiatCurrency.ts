import mongoose from 'mongoose';
import uniqueString from 'unique-string';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { IFiatCurrencyAttrs } from './IFiatCurrencyAttrs';
import { IFiatCurrencyDoc } from './IFiatCurrencyDoc';
import { IFiatCurrencyModel } from './IFiatCurrencyModel';

const FiatCurrencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isPublish: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: true
    },
    displayOrder:{
        type:Number,
        require:true
    },
    logo: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false }
}, {
    toJSON: { virtuals: true },
});

FiatCurrencySchema.pre('save', function () {
    this.set({ securityStamp: uniqueString() });
});

FiatCurrencySchema.pre('updateOne', function () {
    this.set({ securityStamp: uniqueString() });
});


FiatCurrencySchema.statics.build = (attrs: IFiatCurrencyAttrs) => {
    return new FiatCurrencyEntitie(attrs);
}


const FiatCurrencyEntitie = mongoose.model<IFiatCurrencyDoc, IFiatCurrencyModel>("FiatCurrency", FiatCurrencySchema);

export { FiatCurrencyEntitie }