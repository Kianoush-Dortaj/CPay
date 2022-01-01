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
import Web3 from "web3";
import * as dotenv from 'dotenv';
import Sms from './Utilities/SMS/Sms';
import Email from './Utilities/Email/Email';
import { CpayNotification } from './Utilities/Notification/Notification';

declare global {
    var web3: Web3;
}

export default new class Startup {
    app = express();
    port = process.env.PORT || 1348;

    constructor() {
        
        this.CreateServer();
        this.ConfigMidllware();
        this.ConfigDatabase();
        Email.Config();
        Sms.Initial();

        dotenv.config();
    }

    /**
     * Run Server
     */
    CreateServer(): void {

        this.app.listen(this.port, () => {
            console.log(`Cpay is listening on port ${this.port}`);
        });

        UnitOfWork.websocket.InitialWebsocket();
        CpayNotification.Initial();

    }
    /**
     * Config Midllware
     */
    ConfigMidllware(): void {

        const corsOptions = {
            origin: ['https://adminpay.vercel.app', 'http://localhost:3000'],
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

