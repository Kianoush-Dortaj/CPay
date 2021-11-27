import { IGetwayLocalItem } from "../../DataLayer/Context/Getway/IGetwayLocalItems";
import { MultiLanguageSelect } from "../Common/MultiSelectLang";

export interface UpdateGetwayModel {
    id: string;
    name: string;
    description: string;
    isPublish: boolean;
    icon: any;
    locals: MultiLanguageSelect<IGetwayLocalItem>[];
}