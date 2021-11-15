import mongoose from 'mongoose';
import { IRegular } from './IReular';
// product
export default class SQLSErverRegular implements IRegular {


    connect(): void {
       
        console.log('connect to SQL server regular')

    }


}