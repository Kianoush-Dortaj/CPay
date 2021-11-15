import mongoose from 'mongoose';
import { IExchangeAttrs } from './IExchangeAttrs';
import { IExchangeDoc } from './IExchangeDoc';
import { IExchangeModel } from './IExchangeModel';

const ExchangeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    isPublish : {type : Boolean , require : true},
    symbol: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
})


ExchangeSchema.statics.build = (attrs: IExchangeAttrs) => {
    return new ExchangeEntitie(attrs);
}


const ExchangeEntitie = mongoose.model<IExchangeDoc, IExchangeModel>("Exchange", ExchangeSchema);

export { ExchangeEntitie }