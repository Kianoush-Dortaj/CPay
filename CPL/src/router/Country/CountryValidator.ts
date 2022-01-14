
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import path from "path";

export default new class CountryValidation {

    CreateHandle() {
        return [
            check("name").notEmpty().withMessage("name Can not be Empty"),
            check("iso3Code").notEmpty().withMessage("iso3Code Can not be Empty"),
            check("iso2Code").notEmpty().withMessage("iso2Code Can not be Empty"),
            check("isDefault").notEmpty().withMessage("isDefault Can not be Empty"),
            check("languageId").notEmpty().withMessage("languageId Can not be Empty"),
            check("callCode").notEmpty().withMessage("languageId Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            check("languageId").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.LanguageRepository
                        .GetByIdLanguage(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this LangaugeId , Please try again"
                        );
                    }
                }
            }),
            check("currency").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.FiatCurrency
                        .GetByIdFiatCurrency(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Currency Code , Please try again"
                        );
                    }
                }
            }),
            check("flag").custom(async (value, { req }) => {

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

                    let data = await unitofWotk.CountryRepository
                        .GetByIdCountry(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Record , Please try again"
                        );
                    }
                }
            }),
            check("name").notEmpty().withMessage("name Can not be Empty"),
            check("iso3Code").notEmpty().withMessage("iso3Code Can not be Empty"),
            check("iso2Code").notEmpty().withMessage("iso2Code Can not be Empty"),
            check("callCode").notEmpty().withMessage("languageId Can not be Empty"),
            check("isDefault").notEmpty().withMessage("isDefault Can not be Empty"),
            check("languageId").notEmpty().withMessage("languageId Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("displayOrder").notEmpty().withMessage("displayOrder Can not be Empty"),
            check("languageId").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.LanguageRepository
                        .GetByIdLanguage(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this LangaugeId , Please try again"
                        );
                    }
                }
            }),
            check("currency").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.FiatCurrency
                        .GetByIdFiatCurrency(value);

                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this Currency Code , Please try again"
                        );
                    }
                }
            }),
            check("flag").custom(async (value, { req }) => {
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

                    let data = await unitofWotk.CountryRepository
                        .GetByIdCountry(req.params.id);

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
