import { IGetwayTypeLocalItem } from "../../DataLayer/Context/GetwayType/IGetwayTypeLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";

export interface AddGetwayTypeModel {
    name: string;
    description: string;
    comission:number;
    isPublish: boolean;
    icon: any;
    locals: MultiLanguageSelect<IGetwayTypeLocalItem>[];
}