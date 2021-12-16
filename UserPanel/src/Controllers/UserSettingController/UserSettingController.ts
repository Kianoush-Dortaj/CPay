import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { SETTING_ENUM } from "../../DTO/Sertting/setting-enum";
import { SettingRegisterUserRole } from '../../DTO/Sertting/setting-register-user-role';
import unitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { UserSettingAuthGoogle2FA } from '../../DTO/UserSetting/user-setting-register-user-role';
import { USER_SETTING_ENUM } from '../../DTO/UserSetting/user-setting-enum';
import { SpeakEeasy } from '../../Utilities/Speakeasy/SpeakEasyConfig';
import qrCode from 'qrcode';

export default new class SettingController extends BaseController {

    constructor() {
        super();
    }

    /**********
     *
     * Set Register Setting
     *
     ************/
    async SetGoogleAuth2FASetting(req: Request, res: Response, next: NextFunction) {
        try {

            const { isEnable } = req.body;
            let userId = (await unitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            console.log(userId)
            const findUser = await unitOfWork.userRepository.FindUserById(userId);
            if (!findUser.result) {
                return this.BadRerquest(res, "We can not Find User");

            }

            const tempSecret = SpeakEeasy.generate();

            const setRegisterSetting = await unitOfWork.UserSettingRepository
                .SetSetting<UserSettingAuthGoogle2FA>
                (USER_SETTING_ENUM.GOOGLE_AUTH_2FA, userId, {
                    isEnable: isEnable,
                    secretKey: tempSecret
                });

            if (setRegisterSetting.success) {

                if (isEnable === true && findUser.result?.towFactorEnabled === true) {
                    const change2FAStatus = await unitOfWork.userRepository.Change2FaStatus(userId, false);
                    if (!change2FAStatus.success) {
                        return this.BadRerquest(res, "We Have Problem change the Change 2fa status");
                    }
                }

                const qr = await qrCode.toDataURL(tempSecret.otpauth_url);
                return this.OkObjectResult(res, {
                    data: {
                        qrCode: qr,
                        base32: tempSecret.base32
                    }
                }, "Success Set Setting");
            }

            return this.BadRerquest(res, setRegisterSetting.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
   *
   * Get Register Setting
   *
   ************/
    async GetGoogleAuth2FASetting(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (await unitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const getRegisterSettingValue = await unitOfWork.UserSettingRepository
                .GetSetting<UserSettingAuthGoogle2FA>
                (USER_SETTING_ENUM.GOOGLE_AUTH_2FA, userId);

            if (getRegisterSettingValue.success) {

                return this.OkObjectResult(res, {
                    data: getRegisterSettingValue.result
                }, "Get Register Setting");
            }

            return this.BadRerquest(res, getRegisterSettingValue.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

    /**********
     *
     * Set Register Setting
     *
     ************/
    async SetTwofactorSetting(req: Request, res: Response, next: NextFunction) {
        try {

            const { isEnableTwofactor } = req.body;
            let userId = (await unitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const findUser = await unitOfWork.userRepository.FindUserById(userId);

            if (!findUser.result) {
                return this.BadRerquest(res, "We can not Find User");

            }

            const change2FAStatus = await unitOfWork.userRepository.Change2FaStatus(userId, isEnableTwofactor);

            if (!change2FAStatus.success) {
                return this.BadRerquest(res, "We Have Problem change the Change 2fa status");
            }

            const getRegisterSettingValue = await unitOfWork.UserSettingRepository
                .GetSetting<UserSettingAuthGoogle2FA>
                (USER_SETTING_ENUM.GOOGLE_AUTH_2FA, userId);

            if (getRegisterSettingValue.result.isEnable === true) {

                const tempSecret = SpeakEeasy.generate();

                const setRegisterSetting = await unitOfWork.UserSettingRepository
                    .SetSetting<UserSettingAuthGoogle2FA>
                    (USER_SETTING_ENUM.GOOGLE_AUTH_2FA, userId, {
                        isEnable: false,
                        secretKey: tempSecret
                    });

                if (setRegisterSetting.success === false) {
                    return this.BadRerquest(res, "We Have Problem change the Change Google Auth status");

                }
            }

            return this.Ok(res, change2FAStatus.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
   *
   * Get Register Setting
   *
   ************/
    async GetTwofactorSetting(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (await unitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const getTwofactorSetting = await unitOfWork.userRepository
                .FindUserById(userId);

            if (getTwofactorSetting.success) {

                return this.OkObjectResult(res, {
                    data: {
                        isEnableTwofactor: getTwofactorSetting.result?.towFactorEnabled
                    }
                }, "Get Twofactor Setting");
            }

            return this.BadRerquest(res, getTwofactorSetting.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

}