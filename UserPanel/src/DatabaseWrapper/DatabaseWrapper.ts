import { DatabaseType } from "./DataBaseType";
import MongoDB from "./MongoDB";
import SQLSserver from "./SQLServer";


export default class DatabaseWrapper {

    private dbType: DatabaseType;

    constructor(dbtype: DatabaseType) {
        this.dbType = dbtype;
    }

    connect(): any {

        switch (this.dbType) {

            case DatabaseType.MongoDBRegular:
                return new MongoDB().RegularConnect().connect();
                break;

            case DatabaseType.MongoDBCloud:
                return new MongoDB().CloudConnect().connect();
                break;
            case DatabaseType.SQLServerCloud:
                return new SQLSserver().CloudConnect().connect();
                break;

            case DatabaseType.SQLServerRegular:
                return new SQLSserver().RegularConnect().connect();
                break;
            default:
                return new MongoDB().RegularConnect().connect();
                break;

        }


    }


}