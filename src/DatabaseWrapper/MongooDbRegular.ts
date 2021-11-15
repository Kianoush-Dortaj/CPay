import mongoose from 'mongoose';
import { IRegular } from './IReular';
// product
export default class MongooDbRegular implements IRegular {


    connect(): void {
        const databaseUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
        const databaseName = process.env.DB_NAME || 'CPAY';

        const dataBaseUrl = (databaseUrl + '/' + databaseName).toString();

        mongoose.connect(dataBaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, () => [
            console.log(`Connecto To Database : ${dataBaseUrl}`)
        ])

    }


}