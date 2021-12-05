
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class ExchangeValidation {

    CreateHandle() {
        return [

            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("symbol").notEmpty().withMessage("symbol Can not be Empty"),
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {

                if (req.params) {

                    let data = await unitofWotk.ExchangeRepository
                        .GetByIdExchange(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            data.message
                        );
                    }
                }
            }),
            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("symbol").notEmpty().withMessage("symbol Can not be Empty"),
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {
                  
                    let data = await unitofWotk.ExchangeRepository
                    .GetByIdExchange(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Record , Please try again"
                        );
                    }
                }
            })
        ];
    }
}
