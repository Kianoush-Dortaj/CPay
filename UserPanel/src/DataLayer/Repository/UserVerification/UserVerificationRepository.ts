import OperationResult from "../../../core/Operation/OperationResult";
import { UserSettingEntitie } from "../../Context/UserSetting/UserSetting";
import RedisManager from '../../../Utilities/Redis/RedisRepository';
import { USER_SETTING_ENUM } from "../../../DTO/UserSetting/user-setting-enum";
import { UserSettingAuthGoogle2FA } from "../../../DTO/UserSetting/user-setting-register-user-role";
import { SpeakEeasy } from '../../../Utilities/Speakeasy/SpeakEasyConfig';
import { UserSettingModel } from "../../../DTO/UserSetting/user-setting-model";
import { GoogleAuthSetting } from "../../../DTO/UserSetting/google-auth.setting";
import { NotificationSetting } from "../../../DTO/UserSetting/notification.setting";
import { GetNotificationSetting } from "../../../DTO/UserSetting/get-notification.setting";
import { SendNotificationType } from "../../../DTO/UserSetting/notification-type.setting";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { CpayNotification } from "../../../Utilities/Notification/Notification";
import { UserEntite } from "../../Context/User/User";
import UtilService from "../../../Utilities/Util";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import Sms from "../../../Utilities/SMS/Sms";
import { IUserVerificationRepository } from "./IUserVerificationRepository";
import { UserVerificationResult } from "../../../DTO/UserVerification/verification-result";
import { UserVerificationModel } from "../../../DTO/UserVerification/user-verification-model";
import { UserVerificationEntitie } from "../../Context/UserVerification/UserVerification";
import { Status } from "../../../DTO/Common/Status.enum";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";

export default class UserVerificationRepository implements IUserVerificationRepository {


    async getUServerificationInfo(items: FilterViewModel<any>): Promise<OperationResult<GetAllPagingModel<any>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof any];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'symbol' && value) {
                    query.push({ symbol: { $regex: `(.*)${value}(.*)` } });
                }
            });

            let exchnageList = await UserVerificationEntitie.find(...query,{},{ sort: { createdAt: -1 }}).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await UserVerificationEntitie.find({})
                .where("isDelete")
                .equals(false)
                .estimatedDocumentCount();

            return OperationResult.BuildSuccessResult<GetAllPagingModel<any>>("Get All data Paging", {
                data: exchnageList,
                count: count
            });

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

}