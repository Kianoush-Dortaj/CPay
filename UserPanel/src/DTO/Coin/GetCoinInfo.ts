import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";
import { GetNetworksForUpdateCurrencyPair } from "./GetNetworksForUpdateCurrencyPair";

export interface GetCoinInfoModel {
    id: string;
    name: string;
    symbol: string;
    networks : GetNetworksForUpdateCurrencyPair[];
    isPublish:boolean;
    icon: any;
    locals: any;
}