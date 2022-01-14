import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";
import { NetworkInfos } from "./NetworkInfoItems";

export interface AddCoinModel {
    name: string;
    symbol: string;
    isPublish: boolean;
    networks: NetworkInfos[];
    icon: any;
    locals: MultiLanguageSelect<ICoinLocalItem>[];
}