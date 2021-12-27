import OperationResult from "../../../core/Operation/OperationResult";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import UtilService from "../../../Utilities/Util";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import { IUserVerificationRepository } from "./IUserVerificationRepository";
import { UserVerificationResult } from "../../../DTO/UserVerification/verification-result";
import { UserVerificationModel } from "../../../DTO/UserVerification/user-verification-model";
import { UserVerificationEntitie } from "../../Context/UserVerification/UserVerification";
import { Status } from "../../../DTO/Common/Status.enum";
import { IUserVerificationDoc } from "../../Context/UserVerification/IUserVerificationDock";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";

export default class UserVerificationRepository implements IUserVerificationRepository {


    async getUServerificationList(items: FilterViewModel<any>): Promise<OperationResult<IUserVerificationDoc[]>> {

        try {
            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof any];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let userList = await UserVerificationEntitie.find(...query)
            .sort({ createdAt:-1 })
            .populate("userId").skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            return OperationResult.BuildSuccessResult('Operation Success', userList);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

}