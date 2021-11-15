import mongoose from 'mongoose';

export interface ICoinDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    symbol: string;
    isPublish:boolean;
    icon:string;
}