
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import path from "path";

export default new class CoinValidation {

    CreateHandle() {
        return [

            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("symbol").notEmpty().withMessage("Symbol Can not be Empty"),
            check("icon").custom(async (value, { req }) => {
                if (req.file) {
                    if (!value) {
                        throw new Error(" Please Add Icon");
                    } else {
                        const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                        if (!fileExe.includes(path.extname(value).toLowerCase())) {
                            throw new Error("file is not Image , Please Select the Image File");
                        }
                    }
                }
            }),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty")
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {

                    let data = await unitofWotk.CoinRepository
                        .GetByIdCoin(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Record , Please try again"
                        );
                    }
                }
            }),
            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("symbol").notEmpty().withMessage("Symbol Can not be Empty"),
            check("icon").custom(async (value, { req }) => {
                console.log(req.file)
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(value).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                }
            }),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty")
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {

                    let data = await unitofWotk.CoinRepository
                        .GetByIdCoin(req.params.id);

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
