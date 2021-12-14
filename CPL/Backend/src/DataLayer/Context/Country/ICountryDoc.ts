import mongoose from 'mongoose';

export interface ICountryDoc extends mongoose.Document {
    name: string;
    iso3Code: string;
    iso2Code: string;
    flag: string;
    callCode: string;
    isDelete: boolean;
    isDefault: boolean;
    displayOrder:number;
    languageId:any;
    isPublish:boolean;

}