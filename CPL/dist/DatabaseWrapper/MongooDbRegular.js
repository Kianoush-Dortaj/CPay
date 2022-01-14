"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// product
class MongooDbRegular {
    connect() {
        const databaseName = process.env.DB_NAME || 'CPAY';
        const databaseUrl = process.env.MONGO_URL || `mongodb://root:d5zh6QsjAZxqm6sTwUAAYNSF@tommy.iran.liara.ir:30513/${databaseName}?authSource=admin`;
        const dataBaseUrl = (databaseUrl).toString();
        mongoose_1.default.connect(dataBaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            authSource: 'admin'
        }, () => {
            console.log(`Connecto To Database : ${dataBaseUrl}`);
        });
    }
}
exports.default = MongooDbRegular;
