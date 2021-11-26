
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import path from "path";

export default new class LanguageValidation {

    CreateHandle() {
        return [

            check("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            check("isDefault").notEmpty().withMessage("isDefault Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("rtl").notEmpty().withMessage("rtl Can not be Empty"),
            check("uniqueSeoCode").notEmpty().withMessage("uniqueSeoCode Can not be Empty"),
            check("flagImageFileName").custom(async (value, { req }) => {
 
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                } else {
                    throw new Error(" Please Add flagImageFileName");

                }
            })
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {

                    let data = await unitofWotk.LanguageRepository
                        .GetByIdLanguage(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Record , Please try again"
                        );
                    }
                }
            }),
            check("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            check("isDefault").notEmpty().withMessage("isDefault Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("rtl").notEmpty().withMessage("rtl Can not be Empty"),
            check("uniqueSeoCode").notEmpty().withMessage("uniqueSeoCode Can not be Empty"),
            check("flagImageFileName").custom(async (value, { req }) => {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                } else {
                    throw new Error(" Please Add flagImageFileName");

                }
            })
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {

                    let data = await unitofWotk.LanguageRepository
                        .GetByIdLanguage(req.params.id);

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
