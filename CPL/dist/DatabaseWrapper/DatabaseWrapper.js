"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataBaseType_1 = require("./DataBaseType");
const MongoDB_1 = __importDefault(require("./MongoDB"));
const SQLServer_1 = __importDefault(require("./SQLServer"));
class DatabaseWrapper {
    constructor(dbtype) {
        this.dbType = dbtype;
    }
    connect() {
        switch (this.dbType) {
            case DataBaseType_1.DatabaseType.MongoDBRegular:
                return new MongoDB_1.default().RegularConnect().connect();
                break;
            case DataBaseType_1.DatabaseType.MongoDBCloud:
                return new MongoDB_1.default().CloudConnect().connect();
                break;
            case DataBaseType_1.DatabaseType.SQLServerCloud:
                return new SQLServer_1.default().CloudConnect().connect();
                break;
            case DataBaseType_1.DatabaseType.SQLServerRegular:
                return new SQLServer_1.default().RegularConnect().connect();
                break;
            default:
                return new MongoDB_1.default().RegularConnect().connect();
                break;
        }
    }
}
exports.default = DatabaseWrapper;
