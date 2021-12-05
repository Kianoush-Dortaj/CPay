import mongoose, { Schema } from 'mongoose';
import { ICurrencyPairAttrs } from './ICurrencyPairAttrs';
import { ICurrencyPairDoc } from './ICurrencyPairDoc';
import { ICurrencyPairModel } from './ICurrencyPairModel';

const CurrencyPairSchema = new mongoose.Schema({
    coinId: {
        type: Schema.Types.ObjectId,
        ref: 'Coin',
    },
    exchangeId: {
        type: Schema.Types.ObjectId,
        ref: 'Exchange',
    },
     pairs: [{
        type: Schema.Types.ObjectId,
        ref: 'Coin',
    }],
    isPublish: { type: Boolean, require: true }
}, {
    toJSON: { virtuals: true },
})


CurrencyPairSchema.statics.build = (attrs: ICurrencyPairAttrs) => {
    return new CurrencyPairEntitie(attrs);
}


const CurrencyPairEntitie = mongoose.model<ICurrencyPairDoc, ICurrencyPairModel>("CurrencyPair", CurrencyPairSchema);

export { CurrencyPairEntitie }