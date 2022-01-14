import { IFiatAssetAttrs } from './IFiatAssetAttrs';
import { IFiatAssetDoc } from './IFiatAssetDoc';
import { IFiatAssetModel } from './IFiatAssetModel';
import mongoose, { Schema, model, Document } from 'mongoose';

const FiatAssetSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true
    },
    inventory: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    currency: {
        type: Schema.Types.ObjectId,
        ref: 'FiatCurrency',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    toJSON: { virtuals: true },
});

FiatAssetSchema.statics.build = (attrs: IFiatAssetAttrs) => {
    return new FiatAssetEntitie(attrs);
}


const FiatAssetEntitie = mongoose.model<IFiatAssetDoc, IFiatAssetModel>("FiatAsset", FiatAssetSchema);

export { FiatAssetEntitie }