import mongoose from 'mongoose';

export interface IFiatCurrencyDoc extends mongoose.Document {
    name: string;
    isPublish: boolean;
    currencyCode: string;
    logo: string;
    displayOrder:number;

}