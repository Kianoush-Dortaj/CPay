import { ValidateEmailConfrim } from './ValidatoinPattern/ValidateEmailConfirm';
import { ILoginRepository } from "./ILoginRepository";
import { ValidateBlocked } from "./ValidatoinPattern/ValidateBlocked";
import { IHandler } from './ValidatoinPattern/IHandler';
import { GenerateCode, ValidationContext } from './ValidatoinPattern/ValidationContext';
import { ValidatePassword } from './ValidatoinPattern/ValidatePassword';
import { ValidateTowFactor } from './ValidatoinPattern/ValidateTowFactor';
import unitofWork from './../UnitOfWork/UnitOfWork';
import OperationResult from '../../../core/Operation/OperationResult';
import RedisKey from '../../../Utilities/Redis/RedisKey';
import RedisRepository from '../../../Utilities/Redis/RedisRepository';
import Emailrepository from './../../../Utilities/Email/NodeMailer';
import { IUserDoc } from '../../Context/User/IUserDock';
import { ValidateGoogleAuth } from './ValidatoinPattern/ValidateGoogleAuth';
import { USER_SETTING_ENUM } from '../../../DTO/UserSetting/user-setting-enum';
import speakeasy from 'speakeasy';
import utility from "./../../../Utilities/Util";
import uniqueString from 'unique-string';
import UtilService from './../../../Utilities/Util';
import { CpayNotification } from '../../../Utilities/Notification/Notification';

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

                let code = await RedisRepository.Get<any>(RedisKey.TowfactorKey + username);

                if (code.result) {
                    const resultTwofactor = JSON.parse(code.result)
                    CpayNotification.send(user.result.id, resultTwofactor.code, 'Twofactor Code');
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

            let redisValue;
            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(email);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }

            let findKeyInRedis = await RedisRepository.Get<any>(RedisKey.TowfactorKey + email);

            if (findKeyInRedis.result) {
                redisValue = JSON.parse(findKeyInRedis.result);
            }

            if (!findKeyInRedis.success) {

                return OperationResult.BuildFailur(findKeyInRedis.message);
            } else if (redisValue.code != code || redisValue.hash != hash) {

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
     * check Auth Forgetpassword Code
     ******/

    async CheckAuthForgetPasswordCode(hash: string, code: string, email: string): Promise<OperationResult<string>> {

        try {


            let userInfo = await unitofWork.userRepository.GetUserInfoForLogin(email);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message);
            }

            let findKeyInRedis = await RedisRepository.Get<any>(RedisKey.ForgetPasswordKey + email);

            const resultredis = JSON.parse(findKeyInRedis.result);

            if (!findKeyInRedis.success) {

                return OperationResult.BuildFailur(findKeyInRedis.message);
            } else if (resultredis.code != code || resultredis.hash != hash) {

                return OperationResult.BuildFailur('Your code is Expire . please Type again');
            }

            const generateHashCode = await UtilService.GerateHashCode(RedisKey.ForgetPasswordKey + email);

            if (generateHashCode.result && generateHashCode.success) {
                return OperationResult.BuildSuccessResult("Success Validation", generateHashCode.result?.hash);
            }

            return OperationResult.BuildFailur(generateHashCode.message);

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
                .getGoogleAuthSetting(userInfo.result.id);

            if (!userSettingInfo.success) {
                return OperationResult.BuildFailur("User not Found");

            }

            const soeasy = speakeasy.totp.verify({
                secret: userSettingInfo.result?.secretKey.base32,
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
                        displayName: displayName
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

    /*******
     * Forget Password
     ******/
    async ForgetPassword(email: string): Promise<OperationResult<string>> {
        try {

            let user = await unitofWork.userRepository.FindUserByEmailForLogin(email);
            const generateHashCode = await UtilService.GerateHashCode(RedisKey.ForgetPasswordKey + email);


            if (!user.success) {
                return OperationResult.BuildFailur('We can not find this email');

            }

            let displayName = user.result.firstName + ' ' + user.result.lastName;

            let emailData = `<h1>Forget Password Code</h1>
            <h2>Hello ${displayName}</h2>
            <p>This is your Forget Password Code for Login in CPAY Website </p>
            <h1>${generateHashCode.result?.code}</h1>
            <p>This code Will be Expire in 2 Minutes </p>
            </div>`;

            if (generateHashCode.success) {
                const sendEmail = await CpayNotification.send(user.result.id, emailData, 'Forget Password');

                if (sendEmail.success && generateHashCode.result) {
                    return OperationResult.BuildSuccessResult("Success Send Email", generateHashCode.result?.hash)
                }
                return OperationResult.BuildFailur(sendEmail.message);

            }

            return OperationResult.BuildFailur('Error in generate code twofactor');
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

}