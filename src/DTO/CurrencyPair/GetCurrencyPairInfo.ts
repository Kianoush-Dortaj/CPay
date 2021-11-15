
export interface GetCurrencyPairInfoModel {
    id: string;
    coinId: string;
    exchangeId: string;
    isPublish: boolean;
    pairs: GetPairsForUpdateCurrencyPair[];
}

export interface GetPairsForUpdateCurrencyPair {
    id: string;
    name: string;
    symbol: string;
    isSelected: boolean;
}