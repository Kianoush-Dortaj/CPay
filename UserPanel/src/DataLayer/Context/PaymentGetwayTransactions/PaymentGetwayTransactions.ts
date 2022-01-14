import mongoose from 'mongoose';
import uniqueString from 'unique-string';
// import { BaseSchema } from './BaseSchema';
import { Schema } from 'mongoose';
import { IPaymentGetwayTransactionsAttrs } from './IPaymentGetwayTransactionsAttrs';
import { IPaymentGetwayTransactionsDoc } from './IPaymentGetwayTransactionsDoc';
import { IPaymentGetwayTransactionsModel } from './IPaymentGetwayTransactionsModel';

const PaymentGetwayTransactionsSchema = new mongoose.Schema({
    payTransactionId: {
        type: String,
        required: true
    },
    payTransactionObject: {
        type: String,
        required: true
    },
    payTransactionChargesId: {
        type: String,
        required: true
    },
    payTransactionChargesObject: {
        type: String,
        required: true
    },
    payTransactionChargesBalanceTransaction: {
        type: String,
        required: true
    },
    payTransactionChargesCreated: {
        type: Number,
        required: true
    },
    payTransactionChargesCurrency: {
        type: String,
        required: true
    },
    payTransactionChargesCustomer: {
        type: String,
        required: true
    },
    payTransactionChargesPaid: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardBrand: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardCountry: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardExpMonth: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardExpYear: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardFingerprint: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardFunding: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardLast4: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethodDetailsCardNetwork: {
        type: String,
        required: true
    },
    payTransactionChargesClientSecret: {
        type: String,
        required: true
    },
    payTransactionChargesPaymentMethod: {
        type: String,
        required: true
    },
    payTransactionChargesStatus: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    transactionForWallet: {
        type: Schema.Types.ObjectId,
        ref: 'FiatAsset',
    },
}, {
    toJSON: { virtuals: true },
});

PaymentGetwayTransactionsSchema.statics.build = (attrs: IPaymentGetwayTransactionsAttrs) => {
    return new PaymentGetwayTransactionsEntitie(attrs);
}


const PaymentGetwayTransactionsEntitie = mongoose.model<IPaymentGetwayTransactionsDoc, IPaymentGetwayTransactionsModel>("PaymentGetwayTransactions", PaymentGetwayTransactionsSchema);

export { PaymentGetwayTransactionsEntitie }