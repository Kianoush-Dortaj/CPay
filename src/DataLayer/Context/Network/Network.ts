import mongoose from 'mongoose';
import { INetworkAttrs } from './INetworkAttrs';
import { INetworkDoc } from './INetworkDoc';
import { INetworkModel } from './INetworkModel';

const NetworkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false },
    symbol: {
        type: String,
        required: true
    },
    comission: {
        type: Number,
        required: true
    },
    isPublish: { type: Boolean, require: true },
}, {
    toJSON: { virtuals: true },
})


NetworkSchema.statics.build = (attrs: INetworkAttrs) => {
    return new NetworkEntitie(attrs);
}


const NetworkEntitie = mongoose.model<INetworkDoc, INetworkModel>("Network", NetworkSchema);

export { NetworkEntitie }