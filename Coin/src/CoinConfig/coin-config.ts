import Web3 from "web3";
const cpayCoin = require('./../../build/contracts/CpayCoin.json');

export default new class CpayCoin {

    static coin: any;
    get coin(): any { return CpayCoin.coin; }
    set coin(val: any) { CpayCoin.coin = val; }

    constructor() {


    }

    async Initialweb3(): Promise<any> {
        const web3 = new Web3('HTTP://127.0.0.1:7545');
        global.web3 = web3;
        global.web3.eth.defaultAccount = '0xeDAc8F3681e866702032c0b1d3f39904Ef9eb17E';
        this.InitialCoin();
    }

    async InitialCoin(): Promise<any> {

        let coinData = await cpayCoin.networks['5777'];

        CpayCoin.coin = new global.web3.eth.Contract(cpayCoin.abi, coinData.address);
        global.web3.eth.defaultAccount = '0xeDAc8F3681e866702032c0b1d3f39904Ef9eb17E';

    
    }


}