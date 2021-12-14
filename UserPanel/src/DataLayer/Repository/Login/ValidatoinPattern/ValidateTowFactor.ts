import { IUserDoc } from "./../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import redisManager from './../../../../Utilities/Redis/RedisRepository';
import RedisKey from "./../../../../Utilities/Redis/RedisKey";
import utility from "./../../../../Utilities/Util";
import uniqueString from 'unique-string';

export class ValidateTowFactor extends Handler {

    handle(request: IUserDoc): ValidationContext {

        if (!request.towFactorEnabled) {
            return super.handle(request);
        }

        let hash = uniqueString();
        redisManager.SetValueWithexiperationTime(RedisKey.TowfactorKey + request.email, {
            code: utility.getRandomInt(1111111, 999999),
            hash: hash
        }, 120).then(data => {
            return {
                Context: {
                    hash: data.result,
                    isTowfactor: true,
                    token: ''
                },
                HaveError: false,
                Message: 'we are send code to your phone number . plase enter that code in this'
            }
        }).catch(error => {
            return {
                Context: request,
                HaveError: true,
                Message: 'we have error to send yuor activation code . please try again in 10 minutes'
            }
        })
        return {
            Context: {
                hash: hash,
                isTowfactor: true,
                token: ''
            },
            HaveError: false,
            Message: 'we are send code to your phone number . plase enter that code in this'
        }
    }

}