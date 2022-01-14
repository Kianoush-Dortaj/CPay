import { NetworkInfos } from "../../../DTO/Coin/NetworkInfoItems";
import { MultiLanguageSelect } from "../../../DTO/Common/MultiSelectLang";
import { ICoinLocalItem } from "./ICoinLocalItems";

export interface ICoinAttrs {
    name: string;
    isDelete: boolean;
    symbol: string;
    isPublish: boolean;
    icon: string;
    networks: NetworkInfos[];
    locals: MultiLanguageSelect<ICoinLocalItem>[];
}

