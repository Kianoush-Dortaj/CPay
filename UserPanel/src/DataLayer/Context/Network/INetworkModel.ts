import { INetworkAttrs } from "./INetworkAttrs";
import { INetworkDoc } from "./INetworkDoc";
import mongoose from 'mongoose';

export interface INetworkModel extends mongoose.Model<INetworkDoc> {
    build(roleAttrs: INetworkAttrs): INetworkDoc;
}