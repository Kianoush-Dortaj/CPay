import mongoose from 'mongoose';

export interface IPaymentGetwayTransactionsDoc extends mongoose.Document {
    payTransactionId:string;
    payTransactionObject:string;
    payTransactionChargesId:string;
    payTransactionChargesObject:string;
    payTransactionChargesBalanceTransaction:string;
    payTransactionChargesCreated:number;
    payTransactionChargesCurrency:string;
    transactionForWallet:any;
    payTransactionChargesCustomer:string;
    payTransactionChargesPaid:string;
    payTransactionChargesPaymentMethodDetailsCardBrand:string;
    payTransactionChargesPaymentMethodDetailsCardCountry:string;
    payTransactionChargesPaymentMethodDetailsCardExpMonth:string;
    payTransactionChargesPaymentMethodDetailsCardExpYear:string;
    payTransactionChargesPaymentMethodDetailsCardFingerprint:string;
    payTransactionChargesPaymentMethodDetailsCardFunding:string;
    payTransactionChargesPaymentMethodDetailsCardLast4:string;
    payTransactionChargesPaymentMethodDetailsCardNetwork:string;
    payTransactionChargesClientSecret:string;
    payTransactionChargesPaymentMethod:string;
    payTransactionChargesStatus:string;
    userId:string;

}