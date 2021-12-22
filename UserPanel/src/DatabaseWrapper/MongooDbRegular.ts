import mongoose from 'mongoose';
import { IRegular } from './IReular';
import config from './../Configs/index';
// product
export default class MongooDbRegular implements IRegular {


    connect(): void {

        mongoose.connect(config.dbconfig.DatabaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            authSource: 'admin'
        }, () => {
            console.log(`Connecto To Database`)
        })

    }


}