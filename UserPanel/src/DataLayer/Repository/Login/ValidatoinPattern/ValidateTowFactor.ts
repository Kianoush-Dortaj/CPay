import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import redisManager from './../../../../Utilities/Redis/RedisRepository';
import RedisKey from "./../../../../Utilities/Redis/RedisKey";
import utility from "./../../../../Utilities/Util";
import uniqueString from 'unique-string';
import UtilService from "./../../../../Utilities/Util";

export class ValidateTowFactor extends Handler {

    async handle(request: IUserDoc): Promise<ValidationContext> {

        if (!request.towFactorEnabled) {
            return super.handle(request);
        }

        const generateHashCode = await UtilService.GerateHashCode(RedisKey.TowfactorKey + request.email);

        if (generateHashCode.success && generateHashCode.result) {
            return {
                Context: {
                    hash: generateHashCode.result?.hash,
                    isTowfactor: true,
                    isGoogle2FA: false,
                    token: ''
                },
                HaveError: false,
                Message: 'we are send code to your phone number . plase enter that code in this'
            }
        }

        return {
            Context: {
                hash: '',
                isGoogle2FA: false,
                isTowfactor: false,
                token: ''
            },
            HaveError: false,
            Message: 'We have an Error in Generate your activation code . please try again for activation later'
        }



    }

}