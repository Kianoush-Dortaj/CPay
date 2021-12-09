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

export default class LoginRepository implements ILoginRepository {

    // Login Special for login

    async UserLogin(username: string, password: string): Promise<OperationResult<GenerateCode>> {

        let user = await unitofWork.adminRepository.FindUserByEmailForLogin(username);

        if (user.success) {

            const permissions: string[] = [];

            const isBlocked = new ValidateBlocked();
            const isEmailComfirmed = new ValidateEmailConfrim();
            const isValidatePassword = new ValidatePassword(password);
            const isenavledtowfactor = new ValidateTowFactor();
  
            isValidatePassword.setNext(isBlocked)
                .setNext(isEmailComfirmed).setNext(isenavledtowfactor);

            let result = await this.ValidationManagerForLogin(isValidatePassword, user.result);
            console.log(result)
            if (result .HaveError) {
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

            let userInfo = await unitofWork.adminRepository.GetUserInfoForLogin(username);

            if (!userInfo.success) {
                return OperationResult.BuildFailur(userInfo.message)
            }

            let token = await unitofWork.jwtRepository.GenerateToken(userInfo.result);

            if (token.success) {

                user.result.userRole.roles.forEach((element: any) => {
                    element.rolePermissionId.forEach((data: any) => {
                        data.permissionId.forEach((permissionItems:any) => {
                            permissions.push(permissionItems.permissionId)
                        });
                    })
                });
              
                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    token: token.result,
                    userInfo: {
                        displayName: userInfo.result?.displayName,
                        userId: userInfo.result?.userId,
                        roles: permissions
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

            const permissions: string[] = [];

            let userInfo = await unitofWork.adminRepository.FindUserByEmailForLogin(email);

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

                userInfo.result.userRole.roles.forEach((element: any) => {
                    element.rolePermissionId.forEach((data: any) => {
                        data.permissionId.forEach((permissionItems:any) => {
                            permissions.push(permissionItems.permissionId)
                        });
                    })
                });

                return OperationResult.BuildSuccessResult(token.message, {
                    hash: '',
                    isTowfactor: false,
                    token: token.result,
                    userInfo: {
                        displayName: userInfo.result?.displayName,
                        userId: userInfo.result?.userId,
                        roles: permissions
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