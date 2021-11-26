import { ICoinLocalItem } from "./ICoinLocalItems";

export interface ICoinAttrs {
    name: string;
    isDelete: boolean;
    symbol: string;
    isPublish: boolean;
    icon: string;
    locals: ICoinLocalItem[];
}

