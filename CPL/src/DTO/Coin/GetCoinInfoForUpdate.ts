import { NetworkInfos } from "./NetworkInfoItems";

export interface GetCoinInfoForUpdateModel {
    id: string;
    name: string;
    symbol: string;
    networks : NetworkInfos[];
    isPublish:boolean;
    icon: any;
    locals: any;
}