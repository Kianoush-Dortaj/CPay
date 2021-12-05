import { MultiLanguageSelect } from "../../../DTO/Common/MultiSelectLang";
import { IGetwayTypeLocalItem } from "./IGetwayTypeLocalItems";

export interface IGetwayTypeAttrs {
    name: string;
    isDelete: boolean;
    description: string;
    comission:number;
    isPublish: boolean;
    icon: string;
    locals: MultiLanguageSelect<IGetwayTypeLocalItem>[];
}

