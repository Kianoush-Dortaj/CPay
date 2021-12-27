import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { UserVerificationModel } from "../../../DTO/UserVerification/user-verification-model";
import { UserVerificationResult } from "../../../DTO/UserVerification/verification-result";

export interface IUserVerificationRepository {

    getUServerificationInfo(items: FilterViewModel<any>): Promise<OperationResult<GetAllPagingModel<any>>>;
}