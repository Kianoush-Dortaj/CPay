
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import path from "path";

export default new class CoinValidation {

    CreateHandle() {
        return [

            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("description").notEmpty().withMessage("description Can not be Empty"),
            check("icon").custom(async (value, { req }) => {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                } else {
                    throw new Error(" Please Add icon");

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
            check("description").notEmpty().withMessage("description Can not be Empty"),
            check("icon").custom(async (value, { req }) => {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                } else {
                    throw new Error(" Please Add icon");

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
