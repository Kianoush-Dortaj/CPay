import { MultiLanguageSelect } from "../Common/MultiSelectLang";
import { IGetwayTypeLocalItem } from "../../DataLayer/Context/GetwayType/IGetwayTypeLocalItems";

export interface UpdateGetwayTypeModel {
    id: string;
    name: string;
    description: string;
    comission:number;
    isPublish: boolean;
    icon: any;
    locals: MultiLanguageSelect<IGetwayTypeLocalItem>[];
}