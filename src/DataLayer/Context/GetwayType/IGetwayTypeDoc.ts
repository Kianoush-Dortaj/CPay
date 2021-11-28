import mongoose from 'mongoose';
import { MultiLanguageSelect } from '../../../DTO/Common/MultiSelectLang';
import { IGetwayTypeLocalItem } from './IGetwayTypeLocalItems';

export interface IGetwayTypeDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    description: string;
    comission:number;
    isPublish: boolean;
    icon: string;
    locals: MultiLanguageSelect<IGetwayTypeLocalItem>[];
}