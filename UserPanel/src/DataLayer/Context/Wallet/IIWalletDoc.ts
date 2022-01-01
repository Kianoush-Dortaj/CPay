import mongoose from 'mongoose';

export interface IWalletDoc extends mongoose.Document {
    publicAddress: string;
    privateKey: string;
    userId: any;
    networkId: any;
    coinId: any;
    amount:number;
}