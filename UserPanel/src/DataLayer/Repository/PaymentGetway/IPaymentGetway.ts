import OperationResult from "../../../core/Operation/OperationResult";
import Stripe from 'stripe';
import { IPaymentGetwayTransactionsDoc } from "../../Context/PaymentGetwayTransactions/IPaymentGetwayTransactionsDoc";

export interface IPaymentGetway {

    payment(fiatCurrencyId:string,userId:string,userEmail: string, amount: number, currency: string, cardNumber: string, expireMonth: number, expireYear: number, cvc: string): Promise<OperationResult<string>>

    getPaymentInfoById(paymentId:string): Promise<OperationResult<IPaymentGetwayTransactionsDoc>>;

    getPaymentsInfoByUserId(userId:string): Promise<OperationResult<IPaymentGetwayTransactionsDoc[]>>;

}