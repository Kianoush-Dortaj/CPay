import { IUserDoc } from "../../../Context/User/IUserDock";
import { Handler } from "./Handler";
import { ValidationContext } from "./ValidationContext";
import redisManager from '../../../../Utilities/Redis/RedisRepository';
import RedisKey from "../../../../Utilities/Redis/RedisKey";
import utility from "../../../../Utilities/Util";
import uniqueString from 'unique-string';
import UnitOfWork from "../../UnitOfWork/UnitOfWork";
import { USER_SETTING_ENUM } from "../../../../DTO/UserSetting/user-setting-enum";
import { UserSettingAuthGoogle2FA } from "../../../../DTO/UserSetting/user-setting-register-user-role";

export class ValidateGoogleAuth extends Handler {

    async handle(request: IUserDoc): Promise<ValidationContext> {

        const getUserSetting =await UnitOfWork.UserSettingRepository.getGoogleAuthSetting(request.id)

        if (getUserSetting.result?.isEnable === false) {
  
            return super.handle(request);
        }

        return {
            Context: {
                hash: '',
                isTowfactor: false,
                isGoogle2FA: true,
                token: ''
            },
            HaveError: false,
            Message: 'Please Use the Google authenticator for Login '
        }
    }

}