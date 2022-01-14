
export interface UpdateCurrencyPairModel {
    id: string;
    coinId: string;
    exchangeId: string;
    pairs: string[];
    isPublish: boolean;
}