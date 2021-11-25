
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class UserLevelValidation {

    CreateHandle() {
        return [

            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("isDefault").notEmpty().withMessage("isDefault Can not be Empty"),
      
        ];
    }

    UpdateHandle() {
        return [
            query("id").custom(async (value, { req }) => {

                if (req.params) {

                    let data = await unitofWotk.UserLevelRepository
                        .GetByIdUserLevel(req.params.id);

                    if (!data.success) {
                        return Promise.reject(
                            data.message
                        );
                    }
                }
            }),
            check("name").notEmpty().withMessage("Name Can not be Empty"),
            check("isPublish").notEmpty().withMessage("isPublish Can not be Empty"),
            check("isDefault").notEmpty().withMessage("isDefault Can not be Empty")
        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {
                   
                    let data = await unitofWotk.UserLevelRepository
                        .GetByIdUserLevel(req.params.id);

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
