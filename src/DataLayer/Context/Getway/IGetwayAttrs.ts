import { MultiLanguageSelect } from "../../../DTO/Common/MultiSelectLang";
import { IGetwayLocalItem } from "./IGetwayLocalItems";

export interface IGetwayAttrs {
    name: string;
    isDelete: boolean;
    description: string;
    isPublish: boolean;
    icon: string;
    locals: MultiLanguageSelect<IGetwayLocalItem>[];
}

