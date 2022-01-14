"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./router/Router"));
const DataBaseType_1 = require("./DatabaseWrapper/DataBaseType");
const DatabaseWrapper_1 = __importDefault(require("./DatabaseWrapper/DatabaseWrapper"));
const RedisRepository_1 = __importDefault(require("./Utilities/Redis/RedisRepository"));
const cors_1 = __importDefault(require("cors"));
const NodeMailer_1 = __importDefault(require("./Utilities/Email/NodeMailer"));
const UnitOfWork_1 = __importDefault(require("./DataLayer/Repository/UnitOfWork/UnitOfWork"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
exports.default = new class Startup {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 1248;
        this.CreateServer();
        this.ConfigMidllware();
        this.ConfigDatabase();
    }
    /**
     * Run Server
     */
    CreateServer() {
        this.app.listen(this.port, () => {
            console.log(`Cpay is listening on port ${this.port}`);
        });
        UnitOfWork_1.default.websocket.InitialWebsocket();
        // new Listen(ListenType.UpdateCurrencyPairs).listen({
        //     data: '',
        //     userId: ''
        // });
    }
    /**
     * Config Midllware
     */
    ConfigMidllware() {
        const corsOptions = {
            origin: ['https://adminpay.vercel.app', 'http://localhost:3000'],
            optionsSuccessStatus: 200
        };
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)(corsOptions));
        this.app.use(express_1.default.static('./../../../Coin/build/contracts'));
        this.app.use(Router_1.default);
        this.app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
        NodeMailer_1.default.Config();
    }
    /**
     * Config Database
     */
    ConfigDatabase() {
        new DatabaseWrapper_1.default(DataBaseType_1.DatabaseType.MongoDBRegular).connect();
        RedisRepository_1.default.Connet();
    }
};
