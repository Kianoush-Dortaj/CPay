
import { body, check, param, query } from "express-validator";
import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import path from "path";

export default new class UserValidation {

    CreateHandle() {
        return [

            check("firstName").notEmpty().withMessage("firstName Can not be Empty"),
            check("email").notEmpty().withMessage("email Can not be Empty"),
            check("email").custom(async (value) => {

                if (value) {

                    const data = await unitofWotk.userRepository
                        .GetUserByUsername(value);

                    if (data.success) {
                        throw new Error(" This email is Exsist");
                    }
                }
            }),
            check("password").notEmpty().withMessage("password Can not be Empty"),
            check("gender").notEmpty().withMessage("gender Can not be Empty"),
            check("roles").notEmpty().withMessage("roles Can not be Empty"),
            check("roles").custom(async (value) => {

                if (value) {
                    const data = await unitofWotk.RoleRepository
                        .GetByIdRole(value);

                    if (!data.success) {
                        throw new Error(" This Role is not Exsist");
                    }
                }
            }),
            check("lastName").notEmpty().withMessage("lastName Can not be Empty"),
        ];
    }

    UpdateUserHandle() {
        return [

            check("firstName").notEmpty().withMessage("firstName Can not be Empty"),
            check("gender").notEmpty().withMessage("gender Can not be Empty"),
            check("avatar").custom(async (value, { req }) => {
                if (req.file) {
                    const fileExe = [".png", ".jpg", ".jepg", ".svg"];
                    if (!fileExe.includes(path.extname(req.file.filename).toLowerCase())) {
                        throw new Error("file is not Image , Please Select the Image File");
                    }
                } else {
                    throw new Error(" Please Add icon");

                }
            }),
            check("lastName").notEmpty().withMessage("lastName Can not be Empty"),
        ];
    }

    ChangePasswordHandle() {
        return [

            check("password").notEmpty().withMessage("password Can not be Empty"),
            check("confirmPassword").notEmpty().withMessage("confirmPassword Can not be Empty"),
            check("confirmPassword").custom(async (value, { req }) => {

                if (value !== req.body.password) {
                    throw new Error("Password and Confirm Password not matched");
                }
            })

        ];
    }

    ChangeUserRoleHandle() {
        return [

            check("roles").notEmpty().withMessage("roles Can not be Empty"),
            check("roles").custom(async (value, { req }) => {

                let hasError = false;
                if (value) {

                    for (let item of value) {  

                        let data = await unitofWotk.RoleRepository
                            .GetByIdRole(item);

                        if (!data.success) {
                            hasError = true;
                            break;
                        }
                      }

                      if(hasError) {
                        throw new Error(" This Role is not Exsist");
                      }
                      
                }
            })

        ];
    }

    GetItemByIdHandle() {
        return [
            query("id").custom(async (value, { req }) => {
                if (req.params) {
                    let data = await unitofWotk.userRepository
                        .FindUserById(req.params.id);


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
