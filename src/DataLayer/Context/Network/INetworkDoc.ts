import mongoose from 'mongoose';

export interface INetworkDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    comission:number;
    symbol: string;
    isPublish:boolean;
}