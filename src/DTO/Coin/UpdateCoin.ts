import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";

export interface UpdateCoinModel {
    id: string;
    name: string;
    symbol: string;
    isPublish: boolean;
    icon: any;
    locals: MultiLanguageSelect<ICoinLocalItem>[];
}