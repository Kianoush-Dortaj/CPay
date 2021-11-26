import mongoose from 'mongoose';

export interface ILanguageDoc extends mongoose.Document {
    name: string;
    displayOrder: number;
    isDelete: boolean;
    isPublish: boolean;
    isDefault: boolean;
    rtl: boolean;
    uniqueSeoCode: string;
    flagImageFileName: string;
}