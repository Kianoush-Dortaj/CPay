import mongoose from 'mongoose';

export interface ICurrencyPairDoc extends mongoose.Document {
    coinId: string;
    exchangeId: string;
    pairs: string[];
    isPublish:boolean;
}