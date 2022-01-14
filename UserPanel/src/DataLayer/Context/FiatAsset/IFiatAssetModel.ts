import { IFiatAssetAttrs } from "./IFiatAssetAttrs";
import { IFiatAssetDoc } from "./IFiatAssetDoc";
import mongoose from 'mongoose';

export interface IFiatAssetModel extends mongoose.Model<IFiatAssetDoc> {
    build(roleAttrs: IFiatAssetAttrs): IFiatAssetDoc;
}