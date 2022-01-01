
export interface GetCoinBySymbol {

    coinId: string;
    coinName: string;
    coinIcon: string;
    coinLocalName: string;
    coinNetworks: GetCoinNetworks[] | undefined;

}

export interface GetCoinNetworks {
    networkName: string;
    networkUserAddress: string;
    symbol: string;
    networkRate: number;
}