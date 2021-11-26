import { ICoinLocalItem } from "../../DataLayer/Context/Coin/ICoinLocalItems";

export interface AddCoinModel {
    name: string;
    symbol: string;
    isPublish: boolean;
    icon: any;
    locals: ICoinLocalItem[]
}