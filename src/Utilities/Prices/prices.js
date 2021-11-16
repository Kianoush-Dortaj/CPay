// const WebSocket = require('ws')
// const marketAPI = require('./main');
// const wss = new WebSocket.Server({ port: 8520 });

// (async () => {


//   const market = marketAPI();

//   market.on('logged', async () => {

//     const searchBTC = (await market.search('bitcoin tether', 'crypto', 'BTCUSDT', 'BINANCE'));
//     market.subscribe(searchBTC.id);

//     const searchDoge = (await market.search('doge tether', 'crypto', 'DOGEUSDT', 'BINANCE'));
//     market.subscribe(searchDoge.id);

//   });

//   market.on('price', (data) => {
//     // console.log(data.symbol, '=>', data.price);
//     const symbol = data.symbol;
//     const price = data.price;

//     sendDataToClient({ symbol, price })
//   });

// })();


// function sendDataToClient(message) {
//   wss.on('connection', ws => {
//     // ws.on('message', message => {
//       // console.log(message)
//       // console.log(`Received message => ${JSON.stringify(message)}`)
//     // })

//     ws.send(message)
//   })
// }
