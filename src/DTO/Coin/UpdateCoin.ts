import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";

export interface UpdateCoinModel {
    id: string;
    name: string;
    symbol: string;
    isPublish: boolean;
    icon: any;
    locals: ICoinLocalItem[]
}