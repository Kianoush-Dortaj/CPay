import OperationResult from "../../../core/Operation/OperationResult";
import { IPaymentGetway } from "./IPaymentGetway";
import Stripe from 'stripe';
import { uriToString } from "@grpc/grpc-js/build/src/uri-parser";
import { PaymentGetwayTransactionsEntitie } from "../../Context/PaymentGetwayTransactions/PaymentGetwayTransactions";
import { IPaymentGetwayTransactionsDoc } from "../../Context/PaymentGetwayTransactions/IPaymentGetwayTransactionsDoc";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
const stripe = new Stripe('sk_test_51KGiyNC6Ey0nTIwfpHsVGfcBEealcsz8X7Alxe6RE9uHpxVLERBNrxn3YIrL6nChquJcqiCBH6ZVlgOdlkugxGWw00SrUROxEz', {
    apiVersion: '2020-08-27',
});
export class PaymentGetway implements IPaymentGetway {

    constructor() {


    }

    async payment(fiatCurrencyId: string, userId: string, userEmail: string, amount: number, currency: string, cardNumber: string, expireMonth: number, expireYear: number, cvc: string): Promise<OperationResult<string>> {
        try {

            const cUser = await this.createUser(userEmail);

            if (cUser.result && cUser.success) {

                const pay = await this.proccessPayment(amount, cUser.result, currency, cardNumber, expireMonth, expireYear, cvc);

                if (pay.result && pay.success) {

                    const fillFiatAsset = await UnitOfWork.FiatAssetRepository
                        .UpdateOrCreateWallet(fiatCurrencyId, amount.toString(), userId);

                    const saveTransaction = await PaymentGetwayTransactionsEntitie.build({
                        payTransactionId: pay.result.id,
                        transactionForWallet: fillFiatAsset.result ? fillFiatAsset.result : null,
                        payTransactionObject: pay.result.object,
                        payTransactionChargesId: pay.result.charges.data[0].id,
                        payTransactionChargesObject: pay.result.charges.data[0].object,
                        payTransactionChargesBalanceTransaction: pay.result.charges.data[0].balance_transaction,
                        payTransactionChargesCreated: pay.result.charges.data[0].created,
                        payTransactionChargesCurrency: pay.result.charges.data[0].currency,
                        payTransactionChargesCustomer: pay.result.charges.data[0].customer,
                        payTransactionChargesPaid: pay.result.charges.data[0].paid,
                        payTransactionChargesPaymentMethodDetailsCardBrand: pay.result.charges.data[0].payment_method_details?.card?.brand,
                        payTransactionChargesPaymentMethodDetailsCardCountry: pay.result.charges.data[0].payment_method_details?.card?.country,
                        payTransactionChargesPaymentMethodDetailsCardExpMonth: pay.result.charges.data[0].payment_method_details?.card?.exp_month,
                        payTransactionChargesPaymentMethodDetailsCardExpYear: pay.result.charges.data[0].payment_method_details?.card?.exp_year,
                        payTransactionChargesPaymentMethodDetailsCardFingerprint: pay.result.charges.data[0].payment_method_details?.card?.fingerprint,
                        payTransactionChargesPaymentMethodDetailsCardFunding: pay.result.charges.data[0].payment_method_details?.card?.funding,
                        payTransactionChargesPaymentMethodDetailsCardLast4: pay.result.charges.data[0].payment_method_details?.card?.last4,
                        payTransactionChargesPaymentMethodDetailsCardNetwork: pay.result.charges.data[0].payment_method_details?.card?.network,
                        // payTransactionChargesPaymentMethodDetailsCardCard: pay.result.charges.data[0].payment_method_details?.card,
                        payTransactionChargesClientSecret: pay.result.client_secret,
                        payTransactionChargesPaymentMethod: pay.result.payment_method,
                        payTransactionChargesStatus: pay.result.status,
                        userId: userId
                    });
                    saveTransaction.save();

                    if (fillFiatAsset.success) {
                        return OperationResult.BuildSuccessResult("success payment", saveTransaction.id);
                    }

                    return OperationResult.BuildFailur("your Trnsaction was success but we have problem for save money in your wallet . please connect to suppurt center");

                }
                return OperationResult.BuildFailur(pay.message);
            }
            return OperationResult.BuildFailur(cUser.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async getPaymentInfoById(paymentId: string): Promise<OperationResult<IPaymentGetwayTransactionsDoc>> {

        try {

            const paymentTransactionInfobyId = await PaymentGetwayTransactionsEntitie.findById(paymentId);

            if (paymentTransactionInfobyId) {
                return OperationResult.BuildSuccessResult("", paymentTransactionInfobyId);
            }
            return OperationResult.BuildFailur("we can not find this trnasaction");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    async getPaymentsInfoByUserId(userId: string): Promise<OperationResult<IPaymentGetwayTransactionsDoc[]>> {
        try {

            const paymentTransactionInfobyId = await PaymentGetwayTransactionsEntitie.find({ userId: userId });

            if (paymentTransactionInfobyId) {
                return OperationResult.BuildSuccessResult("", paymentTransactionInfobyId);
            }
            return OperationResult.BuildFailur("we can not find this trnasaction");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    private async createUser(userEmail: string): Promise<OperationResult<Stripe.Customer>> {
        try {
            const params: Stripe.CustomerCreateParams = {
                email: userEmail,
            };

            const user = await stripe.customers.create(params);

            return OperationResult.BuildSuccessResult("success create User", user);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    private async attachPaymentMethod(user: Stripe.Customer, cardNumber: string, expireMonth: number, expireYear: number, cvc: string): Promise<OperationResult<Stripe.PaymentMethod>> {
        try {
            const createPaymentMethod = await this.createPaymentMethod(cardNumber, expireMonth, expireYear, cvc);

            if (createPaymentMethod.result && createPaymentMethod.success) {

                const userPaymentMethod = await stripe.paymentMethods.attach(createPaymentMethod.result.id, {
                    customer: user.id
                });

                return OperationResult.BuildSuccessResult("success create payment", userPaymentMethod);

            }

            return OperationResult.BuildFailur(createPaymentMethod.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    private async createPaymentMethod(cardNumber: string, expireMonth: number, expireYear: number, cvc: string): Promise<OperationResult<Stripe.PaymentMethod>> {
        try {

            const paymentMethod = await stripe.paymentMethods.create({
                type: 'card',
                card: {
                    number: cardNumber,
                    exp_month: expireMonth,
                    exp_year: expireYear,
                    cvc: cvc
                }
            });

            return OperationResult.BuildSuccessResult("success create Payment Method", paymentMethod);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    private async proccessPayment(amount: number, user: Stripe.Customer, currency: string, cardNumber: string, expireMonth: number, expireYear: number, cvc: string): Promise<OperationResult<Stripe.PaymentIntent>> {
        try {

            const attachcard = await this.attachPaymentMethod(user, cardNumber, expireMonth, expireYear, cvc);

            if (attachcard.result && attachcard.success) {

                const paymentIntent = await stripe.paymentIntents
                    .create({
                        amount: amount * 100,
                        customer: user.id,
                        currency: currency,
                        payment_method: attachcard.result.id
                    });

                const paymentConfirm = await this.confirmPayment(paymentIntent.id);

                if (paymentConfirm.success && paymentConfirm.result) {
                    return OperationResult.BuildSuccessResult("create payment", paymentConfirm.result);
                }

                return OperationResult.BuildFailur(paymentConfirm.message)

            }
            return OperationResult.BuildFailur(attachcard.message)

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }
    }

    private async confirmPayment(paymentId: string): Promise<OperationResult<Stripe.PaymentIntent>> {
        try {


            const paymentConfirm = await stripe.paymentIntents
                .confirm(paymentId);

            return OperationResult.BuildSuccessResult("confirm payment", paymentConfirm)


        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }
    }


}