
import { body, check, param, query } from "express-validator";
import unitofWotk from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class NetworkValidation {

    CreateHandle() {
        return [

            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("symbol").notEmpty().withMessage("Symbol Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty")
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                console.log(value)
                if (req.params) {

                    let data = await unitofWotk.NetworkRepository
                        .GetByIdNetwork(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Record , Please try again"
                        );
                    }
                }
            }),
            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("symbol").notEmpty().withMessage("Symbol Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty")
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {

                    let data = await unitofWotk.NetworkRepository
                        .GetByIdNetwork(req.params.id);

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
