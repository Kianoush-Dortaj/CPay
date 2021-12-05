import express from 'express';
import router from './router/Router';
import { DatabaseType } from './DatabaseWrapper/DataBaseType';
import DatabaseWrapper from './DatabaseWrapper/DatabaseWrapper';
import RedisManager from './Utilities/Redis/RedisRepository';
import cros from 'cors';
import nodeMailer from './Utilities/Email/NodeMailer';
import UnitOfWork from './DataLayer/Repository/UnitOfWork/UnitOfWork';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json';
import { ListenType } from './Utilities/Websocket/Pattern/listen-type';
import { Listen } from './Utilities/Websocket/Pattern/listen-chanel';
import Web3 from "web3";
import CpayCoin from './CoinConfig/coin-config';

declare global {
    var web3: Web3;
}

export default new class Startup {
    app = express();
    port = process.env.PORT || 1248;

    constructor() {
        CpayCoin.Initialweb3();
        this.CreateServer();
        this.ConfigMidllware();
        this.ConfigDatabase();
    }

    /**
     * Run Server
     */
    CreateServer(): void {

        this.app.listen(this.port, () => {
            console.log(`Cpay is listening on port ${this.port}`);
        })

        UnitOfWork.websocket.InitialWebsocket();

        // new Listen(ListenType.UpdateCurrencyPairs).listen({
        //     data: '',
        //     userId: ''
        // });

    }
    /**
     * Config Midllware
     */
    ConfigMidllware(): void {

        const corsOptions = {
            origin: ['https://adminpay.vercel.app','http://localhost:3000'],
            optionsSuccessStatus: 200 
          };

        this.app.use(express.json());
        this.app.use(cros(corsOptions));
        this.app.use(express.static('./../../../Coin/build/contracts'));
        this.app.use(router);
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        nodeMailer.Config();
    }
    /**
     * Config Database
     */
    ConfigDatabase(): void {
        new DatabaseWrapper(DatabaseType.MongoDBRegular).connect();
        RedisManager.Connet();
    }
}

