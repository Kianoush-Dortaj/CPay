import { check } from "express-validator";
import path from "path";
import unitofWotk from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

export default new class UserValidation {

    CreateHandle() {
        return [

            check("name").notEmpty().withMessage("نام نمیتواند خالی باشد"),
            check("family").notEmpty().withMessage("نام خانوادگی نمیتواند خالی باشد"),
            check("email").custom(async (value, { req }) => {
                if (req.body.email) {

                    let data = await unitofWotk.userRepository.FindUserByEmail(value);
                    if (data.success) {
                        return Promise.reject(
                            "  ایمیل وارد شده تکراری است . لطفا یک  ایمیل دیگر وارد کنید"
                        );
                    }
                }
            }),
            check("password").notEmpty().withMessage("رمز عبور نمیتواند خالی باشد")
        ];
    }
}
//   }

//   UpdateHandle() {
//     return [
//       check("firstName").notEmpty().withMessage("نام نمیتواند خالی باشد"),
//       check("lastName")
//         .notEmpty()
//         .withMessage("نام خانوادگی نمیتواند خالی باشد"),
//       check("phoneNumber")
//         .notEmpty()
//         .withMessage("شماره نمیتواند خالی باشد")
//         .custom(async (value, { req }) => {
//           await UserModel.findOne({ phoneNumber: value }).then((data) => {
//             if (data) {
//               if (value === data.phoneNumber && req.params.id != data._id)
//                 return Promise.reject(
//                   " شماره تلفن وارد شده تکراری است . لطفا یک  شماره تلفن دیگر وارد کنید"
//                 );
//             }
//           });
//         }),
//       check("avatar").custom(async (value, { req }) => {
//         if (req.file) {
//           if (!value) {
//             throw new Error(" آواتار را وارد کنید");
//           } else {
//             const fileExe = [".png", ".jpg", ".jepg", ".svg"];
//             if (!fileExe.includes(path.extname(value).toLowerCase())) {
//               throw new Error("فایل انتخابی تصویر نمی باشد");
//             }
//           }
//         }
//       }),
//     ];
//   }

//   DeleteHandle() {
//     return [
//       check("id").notEmpty().withMessage("شناسه نقش مورد نظر نا معتبر میباشد")
//     ];
//   }

//   ChangePasswordHandle() {
//     return [
//       check("password").notEmpty().withMessage("رمز عبور نمیتواند خالی باشد"),
//       check("confirmPassword")
//         .notEmpty()
//         .withMessage("تکرار رمز عبور نمیتواند خالی باشد")
//         .custom((value, { req }) => {
//           if (value != req.body.password) {
//             throw new Error("رمز عبور و تکرار رمز عبور یکسان نیستند");
//           }
//           return true;
//         }),
//     ];
//   }

//   EditAccountInfoHandle() {
//     return [
//       check("email")
//         .custom((value, { req }) => {
//           return UserModel.findOne({ email: value }).then((user) => {
//             if (user) {
//               if (value === user.email && req.params.id != user._id)
//                 return Promise.reject(
//                   "  ایمیل وارد شده تکراری است . لطفا یک ایمیل دیگر وارد کنید"
//                 );
//             }
//           });
//         })
//         .notEmpty()
//         .withMessage("  ایمیل  نمیتواند خالی باشد"),
//       check("confirmEmail")
//         .custom((value, { req }) => {
//           if (value) {
//             if (value != req.body.email) {
//               throw new Error(" ایمیل و تکرار  ایمیل یکسان نیستند");
//             }
//           }
//           return true;
//         }),
//       check("isActive")
//         .notEmpty()
//         .withMessage(" وضعیت فعال بودن یا نبودن کاربر با مشخص شود "),
//       check("isWriter")
//     ];
//   }



// };
