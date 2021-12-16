import { ValidateEmailConfrim } from './ValidatoinPattern/ValidateEmailConfirm';
import { ILoginRepository } from "./ILoginRepository";
import { ValidateIsAdmin } from "./ValidatoinPattern/ValidateIsAdmin";
import { ValidateBlocked } from "./ValidatoinPattern/ValidateBlocked";
import { IHandler } from './ValidatoinPattern/IHandler';
import { GenerateCode, ValidationContext } from './ValidatoinPattern/ValidationContext';
import bcrypte from 'bcrypt';
import { ValidatePassword } from './ValidatoinPattern/ValidatePassword';
import { ValidateTowFactor } from './ValidatoinPattern/ValidateTowFactor';
import unitofWork from './../UnitOfWork/UnitOfWork';
import OperationResult from '../../../core/Operation/OperationResult';
import RedisKey from '../../../Utilities/Redis/RedisKey';
import RedisRepository from '../../../Utilities/Redis/RedisRepository';
import Emailrepository from './../../../Utilities/Email/NodeMailer';
import { UserEntite } from '../../Context/User/User';
import { IUserDoc } from '../../Context/User/IUserDock';
import { ValidateGoogleAuth } from './ValidatoinPattern/ValidateGoogleAuth';
import { USER_SETTING_ENUM } from '../../../DTO/UserSetting/user-setting-enum';
import speakeasy from 'speakeasy';

export default class LoginRepository implements ILoginRepository {

    // Login Special for login

    async UserLogin(username: string, password: string): Promise<OperationResult<GenerateCode>> {

        let user = await unitofWork.userRepository.FindUserByEmailForLogin(username);

        if (user.success) {

            const isBlocked = new ValidateBlocked();
            const isEmailComfirmed = new ValidateEmailConfrim();
            const isValidatePassword = new ValidatePassword(password);
            const isvalidatetowfactor = new ValidateTowFactor();
            const isvalidateGoogleAuth = new ValidateGoogleAuth();

            isValidatePassword.setNext(isBlocked)
                .setNext(isEmailComfirmed)
                .setNext(isvalidatetowfactor)
                .setNext(isvalidateGoogleAuth);

            let result = await this.ValidationManagerForLogin(isValidatePassword, user.result);

            if (result.HaveError) {
                return OperationResult.BuildFailur(result.Message)
            }

            if (result.Context.isTowfactor) {

                let displayName = user.result.firstName + user.result.lastName;
                let code = await RedisRepository.Get<any>(RedisKey.TowfactorKey + username);

                if (code.result) {
                    Emailrepository.sendTwofactorCode(username, 'Twfactor Code', displayName, code.result.code);
                    return OperationResult.BuildSuccessResult(result.Message, result.Context)
                }

                return OperationResult.BuildFailur('Error in generate code twofactor');
            }

            if (result.Context.isGoogle2FA) {

                return OperationResult.BuildSuccessResult(result.Message, result.Context)

            }

            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(username);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message)
            }

            let token = await unitofWork.jwtRepository.GenerateToken(userInfo.result);

            if (token.success) {

                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    isGoogle2FA: false,
                    token: token.result,
                    userInfo: {
                        displayName: userInfo.result?.displayName
                    }
                });
            }
            return OperationResult.BuildFailur(token.message)

        }
        return OperationResult.BuildFailur("Username or password is not currenct")

    }

    /*******
     * check Auth towfactor Code
     ******/

    async CheckAuthTwofactorCode(hash: string, code: string, email: string): Promise<OperationResult<GenerateCode>> {

        try {


            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(email);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }

            let findKeyInRedis = await RedisRepository.Get<{ code: string, hash: string }>(RedisKey.TowfactorKey + email);

            if (!findKeyInRedis.success) {

                return OperationResult.BuildFailur(findKeyInRedis.message);
            } else if (findKeyInRedis.result?.code != code || findKeyInRedis.result?.hash != hash) {

                return OperationResult.BuildFailur('Your code is Expire . please Type again');
            }

            let token = await unitofWork.jwtRepository.GenerateToken(userInfo.result);

            if (token.success) {
                let displayName = userInfo.result?.displayName;
                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    isGoogle2FA: false,
                    token: token.result,
                    userInfo: {
                        displayName: displayName
                    }
                });
            }

            return OperationResult.BuildFailur(token.message);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    /*******
 * check Auth Google 2FA
 ******/

    async CheckAuthGoogle2FA(code: string, email: string): Promise<OperationResult<GenerateCode>> {

        try {


            let userInfo = await unitofWork.adminRepository.FindUserByEmailForLogin(email);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }

            let userSettingInfo = await unitofWork.UserSettingRepository
                .GetSetting(USER_SETTING_ENUM.GOOGLE_AUTH_2FA, userInfo.result.id);

            if (!userSettingInfo.success) {
                return OperationResult.BuildFailur("User not Found");

            }

            const soeasy = speakeasy.totp.verify({
                secret: userSettingInfo.result.secretKey.base32,
                token: code,
                encoding: 'base32',
                window: 1
            })

            if (!soeasy) {
                return OperationResult.BuildFailur("Code was Expired");
            }

            let token = await unitofWork.jwtRepository.GenerateToken(userInfo.result);

            if (token.success) {
                let displayName = userInfo.result?.firstName + ' ' + userInfo.result?.lastName;
                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    isGoogle2FA: false,
                    token: token.result,
                    userInfo: {
                        displayName: displayName,
                        userId: userInfo.result?._id,
                    }
                });
            }

            return OperationResult.BuildFailur(token.message);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    // Validatoin Manager Login

    async ValidationManagerForLogin(handler: IHandler, user: IUserDoc): Promise<ValidationContext> {

        let result = handler.handle(user);
        return result;
    }

}