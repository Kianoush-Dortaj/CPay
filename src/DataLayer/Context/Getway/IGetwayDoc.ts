import mongoose from 'mongoose';
import { MultiLanguageSelect } from '../../../DTO/Common/MultiSelectLang';
import { IGetwayLocalItem } from './IGetwayLocalItems';

export interface IGetwayDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    description: string;
    isPublish: boolean;
    icon: string;
    locals: MultiLanguageSelect<IGetwayLocalItem>[];
}