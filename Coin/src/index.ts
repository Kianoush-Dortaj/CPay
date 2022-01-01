import express from 'express';
import router from './router/Router';
import { DatabaseType } from './DatabaseWrapper/DataBaseType';
import DatabaseWrapper from './DatabaseWrapper/DatabaseWrapper';
import cros from 'cors';
import UnitOfWork from './DataLayer/Repository/UnitOfWork/UnitOfWork';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json';
import Web3 from "web3";
import CpayCoin from './CoinConfig/coin-config';
import { GRPCConfig } from './Utilities/GRPC/utiles/GRPC.config';

declare global {
    var web3: Web3;
}

export default new class Startup {
    app = express();
    port = 1148;

    constructor() {

        GRPCConfig.inital();

        // clientService.CreateWallet(param).then(data => {
        //     console.log(data)
        // });
        CpayCoin.Initialweb3();
        this.CreateServer();
        this.ConfigMidllware();
        this.ConfigDatabase();
    }


    /**
     * Run Server
     */
    CreateServer(): void {

        this.app.listen(1148, () => {
            console.log(`Cpay is listening on port ${this.port}`);
        })

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
        // this.app.use(router);
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    }
    /**
     * Config Database
     */
    ConfigDatabase(): void {
        new DatabaseWrapper(DatabaseType.MongoDBRegular).connect();
    }
}

