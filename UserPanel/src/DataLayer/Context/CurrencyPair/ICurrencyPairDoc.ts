import mongoose from 'mongoose';

export interface ICurrencyPairDoc extends mongoose.Document {
    coinId: any;
    exchangeId: any;
    pairs: any;
    isPublish:boolean;
}