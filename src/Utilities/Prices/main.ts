// import { CallbackModel } from "./callbackmodel";
// import WebSocket from 'ws';

// export default class MainPrices {

//     ws: WebSocket.Server;

//     constructor() {
//         this.ws = new WebSocket.Server({ port: 12479 })
//     }

//     callbacks: CallbackModel = {
//         connected: [],
//         data: [],
//         disconnected: [],
//         error: [],
//         event: [],
//         logged: [],
//         ping: [],
//         price: [],
//         subscribed: []
//     };

//     chartEventNames = [
//         'du', 'timescale_update',
//         'series_loading', 'series_completed', 'series_error',
//         'symbol_resolved', 'symbol_error',
//         'study_loading', 'study_error',
//     ];

//     logged = false;
//     /** ID of the quote session */
//     sessionId = '';

//     /** List of subscribed symbols */
//     subscribed = [];

//     /** Websockets status */
//     isEnded = false;

//     /**
//  * Unsubscribe to a market
//  * @param {string} symbol Market symbol (Example: BTCEUR or COINBASE:BTCEUR)
//  */
//     subscribe(symbol: never) {
//         if (this.subscribed.includes(symbol)) return;
//         this.send('quote_add_symbols', [this.sessionId, symbol]);
//         this.subscribed.push(symbol);
//     }

//     /**
//      * Unsubscribe from a market
//      * @param {string} symbol Market symbol (Example: BTCEUR or COINBASE:BTCEUR)
//      */
//     unsubscribe(symbol: never) {
//         if (!this.subscribed.includes(symbol)) return;
//         this.send('quote_remove_symbols', [this.sessionId, symbol]);
//         this.subscribed = this.subscribed.filter((s) => s !== symbol);
//     }

//     send(t: any, p: any = []) {
//         if (!this.sessionId) return;

//         const msg = JSON.stringify({ m: t, p });
//         ws.send(`~m~${msg.length}~m~${msg}`);
//     }

//     handleEvent(ev: any, ...data: any) {
//         this.callbacks[ev].forEach((e: any) => e(...data));
//         this.callbacks.event.forEach((e: any) => e(ev, ...data));
//     }

//     handleError(...msgs: any) {
//         if (this.callbacks.error.length === 0) console.error(...msgs);
//         else this.handleEvent('error', ...msgs);
//     }

//     onPacket = (packet: any, autoInit = true) => {
//         if (packet.type === 'ping') {
//             const pingStr = `~h~${packet.ping}`;
//             this.ws.send(`~m~${pingStr.length}~m~${pingStr}`);
//             this.handleEvent('ping', packet.ping);
//             return;
//         }

//         if (packet.type === 'quote_completed' && packet.data) {
//             this.handleEvent('subscribed', packet.data);
//             return;
//         }

//         if (packet.type === 'qsd' && packet.data.n && packet.data.v.lp) {
//             this.handleEvent('price', {
//                 symbol: packet.data.n,
//                 price: packet.data.v.lp,
//             });

//             return;
//         }

//         // if (this.chartEventNames.includes(packet.type) && chartCBs[packet.session]) {
//         //     chartCBs[packet.session](packet);
//         //     return;
//         // }

//         if (!this.logged && packet.type === 'info') {
//             if (autoInit) {
//                 this.send('set_auth_token', ['unauthorized_user_token']);
//                 this.send('quote_create_session', [this.sessionId]);
//                 this.send('quote_set_fields', [this.sessionId, 'lp']);

//                 this.subscribed.forEach((symbol) => this.send('quote_add_symbols', [this.sessionId, symbol]));
//             }

//             this.handleEvent('logged', packet);
//             return;
//         }

//         if (packet.type === 'error') {
//             this.handleError(`Market API critical error: ${packet.syntax}`);
//             ws.close();
//             return;
//         }

//         this.handleEvent('data', packet);
//     };


// }