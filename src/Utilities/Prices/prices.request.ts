

// export default class PriceRequest {

//     constructor() { }
//     /**
//      * @param {https.RequestOptions} options HTTPS Request options
//      * @param {boolean} [raw] Get raw or JSON data
//      * @param {string} [content] Request body content
//      * @returns {Promise<string | object | array>} Result
//      */
//     request(options = {}, raw = false, content = '') {
//         return new Promise((cb, err) => {
//             const req = https.request(options, (res: any) => {
//                 let data = '';
//                 res.on('data', (c: any) => { data += c; });
//                 res.on('end', () => {
//                     if (raw) {
//                         cb(data);
//                         return;
//                     }

//                     try {
//                         data = JSON.parse(data);
//                     } catch (error) {
//                         err(new Error('Can\'t parse server response'));
//                         return;
//                     }

//                     cb(data);
//                 });
//             });

//             req.on('error', err);
//             req.end(content);
//         });
//     }

//     async fetchScanData(tickers = [], type = '', columns = []) {
//         let data: any = await request({
//             method: 'POST',
//             hostname: 'scanner.tradingview.com',
//             path: `/${type}/scan`,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         }, true, JSON.stringify({ symbols: { tickers }, columns }));

//         if (!data.startsWith('{')) throw new Error('Wrong screener or symbol');

//         try {
//             data = JSON.parse(data);
//         } catch (e) {
//             throw new Error('Can\'t parse server response');
//         }

//         return data;
//     }

//     getScreener(exchange: any) {
//         const e = exchange.toUpperCase();
//         if (['NASDAQ', 'NYSE', 'NYSE ARCA', 'OTC'].includes(e)) return 'america';
//         if (['ASX'].includes(e)) return 'australia';
//         if (['TSX', 'TSXV', 'CSE', 'NEO'].includes(e)) return 'canada';
//         if (['EGX'].includes(e)) return 'egypt';
//         if (['FWB', 'SWB', 'XETR'].includes(e)) return 'germany';
//         if (['BSE', 'NSE'].includes(e)) return 'india';
//         if (['TASE'].includes(e)) return 'israel';
//         if (['MIL', 'MILSEDEX'].includes(e)) return 'italy';
//         if (['LUXSE'].includes(e)) return 'luxembourg';
//         if (['NEWCONNECT'].includes(e)) return 'poland';
//         if (['NGM'].includes(e)) return 'sweden';
//         if (['BIST'].includes(e)) return 'turkey';
//         if (['LSE', 'LSIN'].includes(e)) return 'uk';
//         if (['HNX'].includes(e)) return 'vietnam';
//         return exchange.toLowerCase();
//     }

//     async getTA(screener: any, id: any) {
//         const advice: any = {};

//         const cols = ['1', '5', '15', '60', '240', '1D', '1W', '1M']
//             .map((t) => indicators.map((i) => (t !== '1D' ? `${i}|${t}` : i)))
//             .flat();

//         const rs: any = await fetchScanData([id], screener, cols);
//         if (!rs.data || !rs.data[0]) return false;

//         rs.data[0].d.forEach((val: any, i: any) => {
//             const [name, period] = cols[i].split('|');
//             const pName = period || '1D';
//             if (!advice[pName]) advice[pName] = {};
//             advice[pName][name.split('.').pop()] = Math.round(val * 1000) / 500;
//         });

//         return advice;
//     }

//     async search(search: any, filter = '', symbol: any, exchange: any) {
//         const data: any = await request({
//             host: 'symbol-search.tradingview.com',
//             path: `/symbol_search/?text=${search.replace(/ /g, '%20')}&type=${filter}`,
//             origin: 'https://www.tradingview.com',
//         });


//         const findData = data.find((s: any) => s.exchange == exchange && s.symbol == symbol);
//         const id = `${findData.exchange}:${findData.symbol}`;
//         const screener = (['forex', 'crypto'].includes(findData.type)
//             ? findData.type
//             : this.getScreener(exchange)
//         );

//         return {
//             id,
//             exchange: findData,
//             fullExchange: findData.exchange,
//             screener,
//             symbol: findData.symbol,
//             description: findData.description,
//             type: findData.type,
//             getTA: () => this.getTA(screener, id),
//         };
//     }

//     async getUser(session: any, location = 'https://www.tradingview.com/') {
//         return new Promise((cb, err) => {
//             https.get(location, {
//                 headers: { cookie: `sessionid=${session}` },
//             }, (res: any) => {
//                 let rs = '';
//                 res.on('data', (d: any) => { rs += d; });
//                 res.on('end', async () => {
//                     if (res.headers.location && location !== res.headers.location) {
//                         cb(await module.exports.getUser(session, res.headers.location));
//                         return;
//                     }
//                     if (rs.includes('auth_token')) {
//                         cb({
//                             id: /"id":([0-9]{1,10}),/.exec(rs)[1],
//                             username: /"username":"(.*?)"/.exec(rs)[1],
//                             firstName: /"first_name":"(.*?)"/.exec(rs)[1],
//                             lastName: /"last_name":"(.*?)"/.exec(rs)[1],
//                             reputation: parseFloat(/"reputation":(.*?),/.exec(rs)[1] || 0),
//                             following: parseFloat(/,"following":([0-9]*?),/.exec(rs)[1] || 0),
//                             followers: parseFloat(/,"followers":([0-9]*?),/.exec(rs)[1] || 0),
//                             notifications: {
//                                 following: parseFloat(/"notification_count":\{"following":([0-9]*),/.exec(rs)[1] || 0),
//                                 user: parseFloat(/"notification_count":\{"following":[0-9]*,"user":([0-9]*)/.exec(rs)[1] || 0),
//                             },
//                             session,
//                             sessionHash: /"session_hash":"(.*?)"/.exec(rs)[1],
//                             privateChannel: /"private_channel":"(.*?)"/.exec(rs)[1],
//                             authToken: /"auth_token":"(.*?)"/.exec(rs)[1],
//                             joinDate: new Date(/"date_joined":"(.*?)"/.exec(rs)[1] || 0),
//                         });
//                     } else err(new Error('Wrong or expired sessionid'));
//                 });

//                 res.on('error', err);
//             }).end();
//         });
//     }

//     async getChartToken(layout: any, credentials: any = {}) {
//         const creds = credentials.id && credentials.session;
//         const userID = creds ? credentials.id : -1;
//         const session = creds ? credentials.session : null;

//         const data: any = await request({
//             host: 'www.tradingview.com',
//             path: `/chart-token/?image_url=${layout}&user_id=${userID}`,
//             headers: { cookie: session ? `sessionid=${session}` : '' },
//         });

//         if (!data.token) throw new Error('Wrong layout or credentials');

//         return data.token;
//     }

// }