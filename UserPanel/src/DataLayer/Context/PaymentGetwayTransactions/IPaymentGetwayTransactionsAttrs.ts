export interface IPaymentGetwayTransactionsAttrs {
    payTransactionId:string;
    payTransactionObject:string;
    payTransactionChargesId:string;
    payTransactionChargesObject:string;
    payTransactionChargesBalanceTransaction:any;
    payTransactionChargesCreated:number;
    payTransactionChargesCurrency:string;
    transactionForWallet:string | null;
    payTransactionChargesCustomer:any;
    payTransactionChargesPaid:any;
    payTransactionChargesPaymentMethodDetailsCardBrand:any;
    payTransactionChargesPaymentMethodDetailsCardCountry:any;
    payTransactionChargesPaymentMethodDetailsCardExpMonth:any;
    payTransactionChargesPaymentMethodDetailsCardExpYear:any;
    payTransactionChargesPaymentMethodDetailsCardFingerprint:any;
    payTransactionChargesPaymentMethodDetailsCardFunding:any;
    payTransactionChargesPaymentMethodDetailsCardLast4:any;
    payTransactionChargesPaymentMethodDetailsCardNetwork:any;
    payTransactionChargesClientSecret:any;
    payTransactionChargesPaymentMethod:any;
    payTransactionChargesStatus:string;
    userId:string;
}