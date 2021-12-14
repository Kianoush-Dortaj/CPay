
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class CurrencyPairValidation {

    CreateHandle() {
        return [
            check("coinId").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.CoinRepository
                        .GetByIdCoin(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this coinId , Please try again"
                        );
                    }
                }
            }),
            check("exchangeId").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.ExchangeRepository
                        .GetByIdExchange(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this exchangeId , Please try again"
                        );
                    }
                }
            }),
            check("pairs").notEmpty().withMessage("pairs Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {

                if (req.params) {

                    let data = await unitofWotk.CurrencyPairRepository
                        .GetByIdCurrencyPair(req.params.id,'');

                    if (!data.success) {
                        return Promise.reject(
                            data.message
                        );
                    }
                }
            }),
            check("coinId").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.CoinRepository
                        .GetByIdCoin(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this coinId , Please try again"
                        );
                    }
                }
            }),
            check("exchangeId").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.ExchangeRepository
                        .GetByIdExchange(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this exchangeId , Please try again"
                        );
                    }
                }
            }),
            check("pairs").notEmpty().withMessage("pairs Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.CoinRepository
                        .GetByIdCoin(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Currency Pair Id , Please try again"
                        );
                    }
                }
            })
        ];
    }
}
