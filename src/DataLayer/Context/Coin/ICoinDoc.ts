import mongoose from 'mongoose';
import { MultiLanguageSelect } from '../../../DTO/Common/MultiSelectLang';
import { ICoinLocalItem } from './ICoinLocalItems';

export interface ICoinDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    symbol: string;
    isPublish:boolean;
    icon:string;
    locals:  MultiLanguageSelect<ICoinLocalItem>[];
}