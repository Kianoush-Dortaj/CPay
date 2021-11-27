import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";

export interface GetCoinInfoModel {
    id: string;
    name: string;
    symbol: string;
    isPublish:boolean;
    icon: any;
    locals: any;
}