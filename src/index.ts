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

export default new class Startup {
    app = express();
    port = process.env.PORT || 1248;

    constructor() {
        this.CreateServer();
        this.ConfigMidllware();
        this.ConfigDatabase();
    }

    /**
     * Run Server
     */
    CreateServer(): void {

        this.app.listen(this.port, () => {
            console.log(`Profile is listening on port ${this.port}`);
        })

        UnitOfWork.websocket.InitialWebsocket();

    }
    /**
     * Config Midllware
     */
    ConfigMidllware(): void {
        this.app.use(express.json());
        this.app.use(cros())
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
