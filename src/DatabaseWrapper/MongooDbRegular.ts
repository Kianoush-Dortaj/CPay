import mongoose from 'mongoose';
import { IRegular } from './IReular';
// product
export default class MongooDbRegular implements IRegular {


    connect(): void {
        const databaseName = process.env.DB_NAME || 'CPAY';
        const databaseUrl = process.env.MONGO_URL || `mongodb://root:d5zh6QsjAZxqm6sTwUAAYNSF@cpay-db-mongo:27017/${databaseName}?authSource=admin`;

        const dataBaseUrl = (databaseUrl).toString();

        mongoose.connect(dataBaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            authSource: 'admin'
        }, () => {
            console.log(`Connecto To Database : ${dataBaseUrl}`)
        })

    }


}