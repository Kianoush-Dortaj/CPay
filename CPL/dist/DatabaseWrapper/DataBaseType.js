"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseType = void 0;
var DatabaseType;
(function (DatabaseType) {
    DatabaseType[DatabaseType["MongoDBRegular"] = 1] = "MongoDBRegular";
    DatabaseType[DatabaseType["MongoDBCloud"] = 2] = "MongoDBCloud";
    DatabaseType[DatabaseType["SQLServerCloud"] = 3] = "SQLServerCloud";
    DatabaseType[DatabaseType["SQLServerRegular"] = 4] = "SQLServerRegular";
})(DatabaseType = exports.DatabaseType || (exports.DatabaseType = {}));
