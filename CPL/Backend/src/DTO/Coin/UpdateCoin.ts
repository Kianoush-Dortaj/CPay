import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";
import { NetworkInfos } from "./NetworkInfoItems";

export interface UpdateCoinModel {
    id: string;
    name: string;
    symbol: string;
    networks: NetworkInfos[];
    isPublish: boolean;
    icon: any;
    locals: MultiLanguageSelect<ICoinLocalItem>[];
}