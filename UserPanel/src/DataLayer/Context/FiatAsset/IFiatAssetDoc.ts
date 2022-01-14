import mongoose from 'mongoose';

export interface IFiatAssetDoc extends mongoose.Document {
    walletAddress: string;
    inventory: string;
    isActive: boolean;
    currency: any;
    userId: any;
}