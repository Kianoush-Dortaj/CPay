
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class ComissinValidation {

    CreateHandle() {
        return [
            check("userLevelId").custom(async (value, { req }) => {
                if (value) {

                    let data = await unitofWotk.UserLevelRepository
                    .GetByIdUserLevel(value);
                    
                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this UserLevelId , Please try again"
                        );
                    }
                }
            }),
            check("actionType").notEmpty().withMessage("isPublish Can not be Empty"),
            check("comission").notEmpty().withMessage("isDefault Can not be Empty"),
      
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {

                if (req.params) {


                    let data = await unitofWotk.ComissionRepository
                    .GetByIdComission(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            data.message
                        );
                    }
                }
            }),
            check("userLevelId").custom(async (value, { req }) => {
                if (value) {
                    let data = await unitofWotk.UserLevelRepository
                    .GetByIdUserLevel(value);
                    
                    if (!data.success) {
                        return Promise.reject(
                            "We Can not Find this UserLevelId , Please try again"
                        );
                    }
                }
            }),
            check("actionType").notEmpty().withMessage("isPublish Can not be Empty"),
            check("comission").notEmpty().withMessage("isDefault Can not be Empty"),
      
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {
                   
                    let data = await unitofWotk.ComissionRepository
                    .GetByIdComission(req.params.id);
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
