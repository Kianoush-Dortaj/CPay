import { IPaymentGetwayTransactionsAttrs } from "./IPaymentGetwayTransactionsAttrs";
import { IPaymentGetwayTransactionsDoc } from "./IPaymentGetwayTransactionsDoc";
import mongoose from 'mongoose';

export interface IPaymentGetwayTransactionsModel extends mongoose.Model<IPaymentGetwayTransactionsDoc> {
    build(roleAttrs: IPaymentGetwayTransactionsAttrs): IPaymentGetwayTransactionsDoc;
}