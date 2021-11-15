import mongoose from 'mongoose';
import { ICoinAttrs } from './ICoinAttrs';
import { ICoinDoc } from './ICoinDoc';
import { ICoinModel } from './ICoinModel';

const CoinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    symbol: {
        type: String,
        required: true
    },
    isPublish: { type: Boolean, require: true },
    icon: {
        type: String,
        required: true
    }
}, {
    toJSON: { virtuals: true },
})


CoinSchema.statics.build = (attrs: ICoinAttrs) => {
    return new CoinEntitie(attrs);
}


const CoinEntitie = mongoose.model<ICoinDoc, ICoinModel>("Coin", CoinSchema);

export { CoinEntitie }