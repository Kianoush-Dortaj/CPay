
import mongoose from 'mongoose';
import { IWalletDoc } from './IIWalletDoc';
import { IWalletAttrs } from './IWalletAttrs';

export interface IWalletModel extends mongoose.Model<IWalletDoc> {
    build(roleAttrs: IWalletAttrs): IWalletDoc;
}