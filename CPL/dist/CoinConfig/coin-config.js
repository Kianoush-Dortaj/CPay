"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const cpayCoin = require('./../../../../Coin/build/contracts/CpayCoin.json');
exports.default = new class CpayCoin {
    constructor() {
    }
    get coin() { return CpayCoin.coin; }
    set coin(val) { CpayCoin.coin = val; }
    Initialweb3() {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = new web3_1.default('HTTP://127.0.0.1:7545');
            global.web3 = web3;
            global.web3.eth.defaultAccount = '0xeDAc8F3681e866702032c0b1d3f39904Ef9eb17E';
            this.InitialCoin();
        });
    }
    InitialCoin() {
        return __awaiter(this, void 0, void 0, function* () {
            let coinData = yield cpayCoin.networks['5777'];
            CpayCoin.coin = new global.web3.eth.Contract(cpayCoin.abi, coinData.address);
            global.web3.eth.defaultAccount = '0xeDAc8F3681e866702032c0b1d3f39904Ef9eb17E';
            let cpayCointotalSupply = yield CpayCoin.coin.methods
                .transfer('0xD4d5220652a766f3880A66Ce01dd0569465B233C', 10000)
                .send({ from: '0xeDAc8F3681e866702032c0b1d3f39904Ef9eb17E' })
                .then((data) => {
                console.log({
                    trx: data.transactionHash,
                    from: data.from,
                    blockHash: data.events.Transfer.blockHash,
                    blockNumber: data.events.Transfer.blockNumber,
                    event: data.events.Transfer.event,
                    signature: data.events.Transfer.signature
                });
            });
            let getBalance = yield CpayCoin.coin.methods
                .balanceOf('0xD4d5220652a766f3880A66Ce01dd0569465B233C').call();
            console.log(getBalance);
        });
    }
};
