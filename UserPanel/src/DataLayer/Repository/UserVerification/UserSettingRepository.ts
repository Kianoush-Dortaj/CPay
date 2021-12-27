import OperationResult from "../../../core/Operation/OperationResult";
import { UserSettingEntitie } from "../../Context/UserSetting/UserSetting";
import RedisManager from '../../../Utilities/Redis/RedisRepository';
import { USER_SETTING_ENUM } from "../../../DTO/UserSetting/user-setting-enum";
import { UserSettingAuthGoogle2FA } from "../../../DTO/UserSetting/user-setting-register-user-role";
import { SpeakEeasy } from './../../../Utilities/Speakeasy/SpeakEasyConfig';
import { UserSettingModel } from "../../../DTO/UserSetting/user-setting-model";
import { GoogleAuthSetting } from "../../../DTO/UserSetting/google-auth.setting";
import { NotificationSetting } from "../../../DTO/UserSetting/notification.setting";
import { GetNotificationSetting } from "../../../DTO/UserSetting/get-notification.setting";
import { SendNotificationType } from "../../../DTO/UserSetting/notification-type.setting";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { CpayNotification } from "../../../Utilities/Notification/Notification";
import { UserEntite } from "../../Context/User/User";
import UtilService from "../../../Utilities/Util";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import Sms from "../../../Utilities/SMS/Sms";
import { IUserVerificationRepository } from "./IUserVerificationRepository";
import { UserVerificationResult } from "../../../DTO/UserVerification/verification-result";
import { UserVerificationModel } from "../../../DTO/UserVerification/user-verification-model";
import { UserVerificationEntitie } from "../../Context/UserVerification/UserVerification";
import { Status } from "../../../DTO/Common/Status.enum";

export default class UserVerificationRepository implements IUserVerificationRepository {

    async setPhoneNumber(userId: string, phoneNumber: string): Promise<OperationResult<string>> {

        try {


            let userInfo = await UnitOfWork.userRepository.FindUserById(userId);

            if (userInfo.success) {

                let findUserByPhoneNmber = await UnitOfWork.userRepository
                    .FindUserByPhoneNmber(phoneNumber);

                if (findUserByPhoneNmber.success) {
                    if (findUserByPhoneNmber.result.id === userId) {

                        return OperationResult.BuildFailur("you are selected this phone number , please try an other number");

                    }

                    return OperationResult.BuildFailur("you can not select this phone number , this number selected by other user");

                }
                const generateCode = await UtilService.GerateHashCode(RedisKey.ConfirmPhoneNumber + userId);

                if (generateCode.success && generateCode.result) {

                    const sendSMS = await Sms.sendMessage('Confirm Phone Number', phoneNumber, generateCode.result.code)
                    if (sendSMS.success) {

                        return OperationResult.BuildSuccessResult('Success Send Code to Your Phone', generateCode.result?.hash);

                    }
                    return OperationResult.BuildFailur('we have a problem with send code yo your phone number , please try a few minute later');

                }

            }
            return OperationResult.BuildFailur('We can not find this user , please try with currect information');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async checkPhoneNumber(userId: string, code: string, hash: string, phoneNumber: string): Promise<OperationResult<boolean>> {

        try {

            const checkHashCode = await UtilService.CheckHashCode(RedisKey.ConfirmPhoneNumber + userId, code, hash)

            if (checkHashCode.success) {

                let findUserByPhoneNmber = await UnitOfWork.userRepository
                    .FindUserByPhoneNmber(phoneNumber);

                if (findUserByPhoneNmber.success) {
                    if (findUserByPhoneNmber.result.id === userId) {

                        return OperationResult.BuildFailur("you are selected this phone number , please try an other number");

                    }

                    return OperationResult.BuildFailur("you can not select this phone number , this number selected by other user");

                }

                const userchangePhoneNumberStatus = await UnitOfWork.userRepository
                    .ChangePhoneNumberStatus(userId, true, phoneNumber);

                if (userchangePhoneNumberStatus.success) {
                    return OperationResult.BuildSuccessResult("Success Set Phone Number", true);

                }
                return OperationResult.BuildFailur(checkHashCode.message);

            }

            return OperationResult.BuildFailur(checkHashCode.message);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async verification(userId: string, item: UserVerificationModel): Promise<OperationResult<UserVerificationResult>> {

        try {


            const userVerification = UserVerificationEntitie.build({
                backImage: item.backImage,
                birthDate: item.birthDate,
                frontImage: item.frontImage,
                image: item.image,
                userId: userId,
                nationality: item.nationality,
                selfieImage: item.selfieImage,
                status: Status.Pending,
                typeVerification: item.typeVerification
            });

            userVerification.save();
            console.log(userVerification);
            return OperationResult.BuildSuccessResult("success send verification", {
                createdAt: userVerification.createdAt,
                id: userVerification.id,
                status: userVerification.status,
                type: userVerification.typeVerification,
                updatedAt: userVerification.updateAt
            });

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    async getUServerificationInfo(userId: string): Promise<OperationResult<UserVerificationResult>> {

        try {


            const userVerification = await UserVerificationEntitie.findOne({ userId: userId }, {}, { sort: { createdAt: -1 } })

            if (!userVerification) {
                return OperationResult.BuildFailur("we can not find user verfication inforamtion for this user");

            }

            return OperationResult.BuildSuccessResult("success send verification", {
                createdAt: userVerification.createdAt,
                id: userVerification.id,
                status: userVerification.status,
                type: userVerification.typeVerification,
                updatedAt: userVerification.updateAt
            });

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

}