
import WebSocket from 'ws';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { UserOnlineModel } from '../../DTO/Websocket/UserOnineModel';
import Authorization from '../Middllware/Authorization';
import { SendData } from './model/send-data';
import { Listen } from './Pattern/listen-chanel';
import { ListenType } from './Pattern/listen-type';

export default class Websocket {

    wss: WebSocket.Server;
    userOnlineInfo: any[] = [];

    constructor() {
        this.wss = new WebSocket.Server({ port: 3259 })
    }

    InitialWebsocket(): void {

        const functions = this;

        this.wss.on('connection', async function connection(ws, req) {

            ws.on('message', async function incoming(message) {

                let token = req.headers['sec-websocket-protocol'];
                let authrization = await UnitOfWork.jwtRepository.DecodeWebsocketToken(token);
                if (authrization.success) {

                    functions.listen(message.toString(), authrization.result, ws);
                } else {
                    this.close();
                }

            });

        });

        this.wss.addListener('request', (message, userId) => {
            functions.userOnlineInfo[userId].send(message);
        })

    }

    emit(msg: string): void {
        this.wss.clients.forEach(client => {
            client.send(msg);
        })
    }

    sendMessageToUser<T>(data: SendData<T>, sendTo: string): void {

        try {

            const msg = JSON.stringify(data);

            this.wss.emit('request', msg, sendTo);

        } catch (error) {

        }


    }

    listen(message: any, userId: string, ws?: any): void {

        const msg = JSON.parse(message);

        if (msg.type === ListenType.Initial) {

            const userOnlie = this.userOnlineInfo.find(x => x.userId === msg.userId);

            if (!userOnlie) {
                this.userOnlineInfo[msg.userId] = ws;
            }
        }

        new Listen(msg.type).listen({
            userId: userId,
            data: msg.data
        });

    }

}