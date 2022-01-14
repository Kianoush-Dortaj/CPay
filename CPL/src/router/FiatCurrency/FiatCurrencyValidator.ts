
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import path from "path";

export default new class FiatCurrencyValidation {

    CreateHandle() {
        return [
            check("name").notEmpty().withMessage("name Can not be Empty"),
            check("currencyCode").notEmpty().withMessage("currencyCode Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            check("logo").custom(async (value, { req }) => {

                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                } else {
                    throw new Error(" Please Add flag");

                }
            })
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {

                    let data = await unitofWotk.FiatCurrency
                        .GetByIdFiatCurrency(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Record , Please try again"
                        );
                    }
                }
            }),
            check("name").notEmpty().withMessage("name Can not be Empty"),
            check("currencyCode").notEmpty().withMessage("currencyCode Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            check("logo").custom(async (value, { req }) => {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                } else {
                    throw new Error(" Please Add flag");

                }
            })
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {

                    let data = await unitofWotk.FiatCurrency
                        .GetByIdFiatCurrency(req.params.id);

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
