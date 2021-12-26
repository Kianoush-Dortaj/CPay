import OperationResult from "../../../core/Operation/OperationResult";
import { ReigsterUserModel } from "../../../DTO/RegisterUser/RegisterUserMode";
import { SettingRegisterUserRole } from "../../../DTO/Sertting/setting-register-user-role";
import { UserEntite } from "../../Context/User/User";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { IRegisterRepository } from "./IRegisterRepository";
import bcrypte, { hash } from 'bcrypt';
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import emailRepo from '../../../Utilities/Email/NodeMailer';
import { SETTING_ENUM } from "../../../DTO/Sertting/setting-enum";
import { UserSettingModel } from "../../../DTO/UserSetting/user-setting-model";
import { SendNotificationType } from "../../../DTO/UserSetting/notification-type.setting";

export default class RegisterRepository implements IRegisterRepository {


    async registerUser(item: ReigsterUserModel): Promise<OperationResult<string>> {


        try {

            let userLevel = await UnitOfWork.SettingRepository.GetSetting<SettingRegisterUserRole>(SETTING_ENUM.REGISTER_SETTING)

            const result = JSON.parse(userLevel.result)
            if (!result.setDefaultRegisterUserLevel) {
                return OperationResult.BuildFailur("We Can not Find User Level Setting");
            }

            var find = '/';
            var re = new RegExp(find, 'g');

            let password = await bcrypte.hash(item.password, 5);
            let hashCode = await (await bcrypte.hash(item.email, 5)).replace(re, '');

            let displayName = item.firstName + ' ' + item.lastName;
            let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);

            const userSession = UserEntite.startSession();
            (await userSession).startTransaction();

            let registerUser = await UserEntite.build({
                firstName: item.firstName,
                gender: undefined,
                isAdmin: false,
                isSupport: false,
                confirmPhoneNumber: false,
                userLevel: result.setDefaultRegisterUserLevel,
                password: password,
                email: item.email,
                lastName: item.lastName,
                accountFail: 0,
                avatar: undefined,
                poster: undefined,
                birthDate: undefined,
                confirmEmail: false,
                towFactorEnabled: false,
                isActive: false,
                locked: false,
                lockedDate: undefined,
                phoneNumber: undefined,
                securityStamp: securityStamp
            });

            const setUserLevel = await UnitOfWork.UserActiveLevelRepository
                .SetUserActiveLevel({
                    userId: registerUser.id,
                    level: result.setDefaultRegisterUserLevel
                });

            if (setUserLevel.success) {

                registerUser.save();

                const setRegisterSetting = await UnitOfWork.UserSettingRepository
                    .SetSetting<UserSettingModel>
                    (registerUser.id, {
                        googleAuth: {
                            isEnable: false,
                            secretKey: null
                        },
                        notification: SendNotificationType.EMAIL,
                        twofactor: {
                            isEnable: false
                        }
                    });

                if (setRegisterSetting.success) {

                    const generateActiveCode = await this.GenerateActivationCode(RedisKey.RegisterConfirm + registerUser.email, hashCode);
                    if (generateActiveCode.success) {

                        const sendEmail = await emailRepo.sendActivationCodeEmail(registerUser.email, 'CPay Configm Email', displayName, hashCode);

                    }
                } else {
                    return OperationResult.BuildFailur("can not set user setting");

                }

            }

            (await userSession).commitTransaction();
            (await userSession).endSession();
            return OperationResult.BuildSuccessResult("We Are Sent Activatoin to Your Email", '');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    async GenerateActivationCode(userId: string, hash: string): Promise<OperationResult<any>> {

        try {
            await RedisManager.SetValueWithexiperationTime(userId, hash, 1000);

            return OperationResult.BuildSuccessResult('Suyccess Set Value in Redis', '');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

}