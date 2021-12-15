import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { SETTING_ENUM } from "../../DTO/Sertting/setting-enum";
import { SettingRegisterUserRole } from '../../DTO/Sertting/setting-register-user-role';
import unitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { UserSettingAuthGoogle2FA } from '../../DTO/UserSetting/user-setting-register-user-role';
import { USER_SETTING_ENUM } from '../../DTO/UserSetting/user-setting-enum';
import { SpeakEeasy } from '../../Utilities/Speakeasy/SpeakEasyConfig';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
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
    async SetRegisterSetting(req: Request, res: Response, next: NextFunction) {
        try {

            const { isEnable } = req.body;
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;
            const tempSecret = SpeakEeasy.generate();

            const setRegisterSetting = await unitOfWork.UserSettingRepository
                .SetSetting<UserSettingAuthGoogle2FA>
                (USER_SETTING_ENUM.GOOGLE_AUTH_2FA, userId, {
                    isEnable: isEnable,
                    secretKey: tempSecret
                });

            if (setRegisterSetting.success) {
                const qr =await qrCode.toDataURL(tempSecret.otpauth_url);
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
    async GetRegisterSetting(req: Request, res: Response, next: NextFunction) {

        try {

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

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

}