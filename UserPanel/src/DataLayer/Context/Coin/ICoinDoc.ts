import mongoose from 'mongoose';
import { MultiLanguageSelect } from '../../../DTO/Common/MultiSelectLang';
import { INetworkDoc } from '../Network/INetworkDoc';
import { ICoinLocalItem } from './ICoinLocalItems';

export interface ICoinDoc extends mongoose.Document {
    name: string;
    isDelete: boolean;
    symbol: string;
    networks:INetworkDoc[];
    isPublish:boolean;
    icon:string;
    locals:  MultiLanguageSelect<ICoinLocalItem>[];
}