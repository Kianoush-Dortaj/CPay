import { NetworkConfigModel } from "./model/network-model";

export class NetworkConfig {

    private static web3Objects: NetworkConfigModel[] = [];

    static Initial(): void {

        try {

        } catch (error) {

        }

    }


    static async AddWeb3Object(tokenName: string, contractAbi: any, contractAddress: string): Promise<void> {

        try {

            var contract = await new web3.eth.Contract(contractAbi, contractAddress)

            this.web3Objects.push({
                token: tokenName,
                contract: contract
            });

        } catch (error) {

        }
    }

}