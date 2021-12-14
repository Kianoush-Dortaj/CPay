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

export default class RegisterRepository implements IRegisterRepository {


    async registerUser(item: ReigsterUserModel): Promise<OperationResult<string>> {


        try {

            let userLevel = await UnitOfWork.SettingRepository.GetSetting<SettingRegisterUserRole>(SETTING_ENUM.REGISTER_SETTING)

            const result = JSON.parse(userLevel.result);

            if (!result.setDefaultRegisterUserLevel) {
                return OperationResult.BuildFailur("We Can not Find User Level Setting");
            }

            var find = '/';
            var re = new RegExp(find, 'g');

            let password = await bcrypte.hash(item.password, 5);
            let hashCode = await (await bcrypte.hash(item.email, 5)).replace(re, '');

            let displayName = item.firstName + ' ' + item.lastName;
            let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);


            let registerUser = await UserEntite.build({
                firstName: item.firstName,
                isAdmin: false,
                isSupport: false,
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

            registerUser.save();

            await RedisManager.Set(RedisKey.UserInfo + registerUser._id, registerUser);
            await this.GenerateActivationCode(RedisKey.RegisterConfirm + registerUser.email, hashCode);
            await emailRepo.sendActivationCodeEmail(registerUser.email, 'CPay Configm Email', displayName, hashCode);

            return OperationResult.BuildSuccessResult("Success Register User","We Are Sent Activatoin to Your Email");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    async GenerateActivationCode(userId: string, hash: string): Promise<OperationResult<any>> {

        try {
            let code = await RedisManager.SetValueWithexiperationTime(userId, hash, 1000);

            return new OperationResult<any>(true, '');

        } catch (error: any) {
            return new OperationResult<any>(false, error.message);

        }

    }

}