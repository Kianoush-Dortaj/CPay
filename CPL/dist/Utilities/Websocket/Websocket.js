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
const ws_1 = __importDefault(require("ws"));
const UnitOfWork_1 = __importDefault(require("../../DataLayer/Repository/UnitOfWork/UnitOfWork"));
const listen_chanel_1 = require("./Pattern/listen-chanel");
const listen_type_1 = require("./Pattern/listen-type");
class Websocket {
    constructor() {
        this.userOnlineInfo = [];
        this.wss = new ws_1.default.Server({ port: 3259 });
    }
    InitialWebsocket() {
        const functions = this;
        this.wss.on('connection', function connection(ws, req) {
            return __awaiter(this, void 0, void 0, function* () {
                ws.on('message', function incoming(message) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let token = req.headers['sec-websocket-protocol'];
                        let authrization = yield UnitOfWork_1.default.jwtRepository.DecodeWebsocketToken(token);
                        if (authrization.success) {
                            functions.listen(message.toString(), authrization.result, ws);
                        }
                        else {
                            this.close();
                        }
                    });
                });
            });
        });
        this.wss.addListener('request', (message, userId) => {
            functions.userOnlineInfo[userId].send(message);
        });
    }
    emit(msg) {
        this.wss.clients.forEach(client => {
            client.send(msg);
        });
    }
    sendMessageToUser(data, sendTo) {
        try {
            const msg = JSON.stringify(data);
            this.wss.emit('request', msg, sendTo);
        }
        catch (error) {
        }
    }
    listen(message, userId, ws) {
        const msg = JSON.parse(message);
        if (msg.type === listen_type_1.ListenType.Initial) {
            const userOnlie = this.userOnlineInfo.find(x => x.userId === msg.userId);
            if (!userOnlie) {
                this.userOnlineInfo[msg.userId] = ws;
            }
        }
        new listen_chanel_1.Listen(msg.type).listen({
            userId: userId,
            data: msg.data
        });
    }
}
exports.default = Websocket;
