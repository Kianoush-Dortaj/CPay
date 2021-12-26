
import express from 'express';
import UserVerificationController from '../../Controllers/UserVerificationController/UserVerifivationController';
import authController from '../../Utilities/Middllware/Authorization';
import FileToField from '../../Utilities/Middllware/FileToField';
import uploadVerification from './../../Utilities/Multer/Varification';

const settingRouter = express.Router();

settingRouter.put("/SetPhoneNumber",
    authController.AuthToken,
    UserVerificationController.SetPhoneNumber);

settingRouter.post("/CheckPhoneNumber",
    authController.AuthToken,
    UserVerificationController.CheckActivePhoneNumber);

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
    UserVerificationController.SendVerification);

export default settingRouter;
