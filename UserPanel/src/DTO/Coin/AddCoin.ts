import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";

export interface AddCoinModel {
    name: string;
    symbol: string;
    isPublish: boolean;
    networks: string[];
    icon: any;
    locals: MultiLanguageSelect<ICoinLocalItem>[];
}