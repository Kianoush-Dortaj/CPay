import mongoose from 'mongoose';
import { IFiatCurrencyDoc } from '../FiatCurrency/IFiatCurrencyDoc';

export interface ICountryDoc extends mongoose.Document {
    name: string;
    iso3Code: string;
    iso2Code: string;
    flag: string;
    callCode: string;
    isDelete: boolean;
    currency:any;
    isDefault: boolean;
    displayOrder:number;
    languageId:any;
    isPublish:boolean;

}