import mongoose from 'mongoose';

export interface IExchangeDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    symbol: string;
    isPublish : boolean;

}