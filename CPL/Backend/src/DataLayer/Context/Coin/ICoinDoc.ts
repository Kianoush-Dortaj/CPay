import mongoose from 'mongoose';
import { NetworkInfos } from '../../../DTO/Coin/NetworkInfoItems';
import { MultiLanguageSelect } from '../../../DTO/Common/MultiSelectLang';
import { ICoinLocalItem } from './ICoinLocalItems';

export interface ICoinDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    symbol: string;
    networks:  NetworkInfos[];
    isPublish:boolean;
    icon:string;
    locals:  MultiLanguageSelect<ICoinLocalItem>[];
}