import mongoose from 'mongoose';
import uniqueString from 'unique-string';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { IWalletAttrs } from './IWalletAttrs';
import { IWalletDoc } from './IIWalletDoc';
import { IWalletModel } from './IIWalletModel';

const WalletSchema = new mongoose.Schema({
    publicAddress: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    networkId: {
        type: Schema.Types.ObjectId,
        ref: "Network",
        required: true
    },
    coinId: {
        type: Schema.Types.ObjectId,
        ref: "Coin",
        required: true
    },
    disabled: { type: Boolean, default: false }
}, {
    toJSON: { virtuals: true },
})

// WalletSchema.virtual("rolePermissionId", {
//     foreignField: "roleId",
//     ref: "RolePermission",
//     localField: "_id"
// });


WalletSchema.statics.build = (attrs: IWalletAttrs) => {
    return new WalletEntitie(attrs);
}


const WalletEntitie = mongoose.model<IWalletDoc, IWalletModel>("Wallet", WalletSchema);

export { WalletEntitie }