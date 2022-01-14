import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { SETTING_ENUM } from "../../DTO/Sertting/setting-enum";
import { SettingRegisterUserRole } from '../../DTO/Sertting/setting-register-user-role';
import unitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';

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

            const { setDefaultRegisterUserLevel, registerUserAdmin, registerUserRole, registerUserSupport } = req.body;

            const setRegisterSetting = await unitOfWork.SettingRepository
                .SetSetting<SettingRegisterUserRole>
                (SETTING_ENUM.REGISTER_SETTING, {
                    registerUserAdmin,
                    registerUserRole,
                    registerUserSupport,
                    setDefaultRegisterUserLevel
                });

            if (setRegisterSetting.success) {
                return this.Ok(res, "Success Set Setting");
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

            const getRegisterSettingValue = await unitOfWork.SettingRepository
                .GetSetting<SettingRegisterUserRole>(SETTING_ENUM.REGISTER_SETTING);

            if (getRegisterSettingValue.success) {

                return this.OkObjectResult(res, {
                    data: JSON.parse(getRegisterSettingValue.result)
                }, "Get Register Setting");
            }

            return this.BadRerquest(res, getRegisterSettingValue.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
     *
     * Set Activation Link Setting
     *
     ************/
    async SetLinkActivationSetting(req: Request, res: Response, next: NextFunction) {
        try {

            const { activationLink } = req.body;

            const serActivationLink = await unitOfWork.SettingRepository
                .SetSetting<string>
                (SETTING_ENUM.ACTIVATION_LINK, activationLink);

            if (serActivationLink.success) {
                return this.Ok(res, "Success Set Setting");
            }

            return this.BadRerquest(res, serActivationLink.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }
    /**********
     *
     * Get Activation Link Setting
     *
     ************/
    async GetLinkActivationSetting(req: Request, res: Response, next: NextFunction) {

        try {

            const getLinkActivationLink = await unitOfWork.SettingRepository
                .GetSetting<string>(SETTING_ENUM.ACTIVATION_LINK);

            if (getLinkActivationLink.success) {

                return this.OkObjectResult(res, {
                    data: JSON.parse(getLinkActivationLink.result)
                }, "Get Activation Link Setting");
            }

            return this.BadRerquest(res, getLinkActivationLink.message);
        } catch (error: any) {

            return this.BadRerquest(res, error.message);
        }
    }

}