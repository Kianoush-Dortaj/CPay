
const TronWeb = require('tronweb');


module.exports = new (class TRC20Network {

    Initial() {

        const fullNode = 'https://api.shasta.trongrid.io';
        const solidityNode = 'https://api.shasta.trongrid.io';
        const eventServer = 'https://api.shasta.trongrid.io';
        const privateKey = '4b3479c301087f32fa429926a71f6daee4b2e199c64fac168a11303df4563282';
        tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

    }

    async getBalance(blance) {

        const balance = await tronWeb.trx.getBalance(blance);
        console.log('balance', { balance });

    }

    async createWallet() {
        const account = await tronWeb.createAccount();
        console.log(account);
    }

    async createWallet() {
        const account = await tronWeb.createAccount();
        console.log(account);
    }


})();