
import express from 'express';
import UserVerificationController from '../../Controllers/UserVerificationController/UserVerifivationController';
import authController from '../../Utilities/Middllware/Authorization';
import FileToField from '../../Utilities/Middllware/FileToField';
import userVerification from './user-verification.validation';
import uploadVerification from './../../Utilities/Multer/Varification';

const settingRouter = express.Router();

settingRouter.put("/SetPhoneNumber",
    authController.AuthToken,
    UserVerificationController.SetPhoneNumber);

settingRouter.post("/CheckPhoneNumber",
    authController.AuthToken,
    UserVerificationController.CheckActivePhoneNumber);

settingRouter.put("/ChangeEmail",
    authController.AuthToken,
    UserVerificationController.SetEmail);

settingRouter.post("/CheckActivationEmail",
    authController.AuthToken,
    UserVerificationController.CheckActiveEmail);

settingRouter.get("/GetUSerVerificationInfo",
    authController.AuthToken,
    UserVerificationController.GetUserVerification);

settingRouter.post("/Verification",
    authController.AuthToken,
    uploadVerification.fields([
        { name: "frontImage", maxCount: 1 },
        { name: "backImage", maxCount: 1 },
        { name: "image", maxCount: 1 },
        { name: "selfieImage", maxCount: 1 }

    ]),
    FileToField.FileToBackImage,
    FileToField.FileToFrontImage,
    FileToField.FileToImage,
    FileToField.FileToSelfieImage,
    userVerification.CreateHandle(),
    UserVerificationController.SendVerification);

export default settingRouter;
