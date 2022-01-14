import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { Status } from "../../../DTO/Common/Status.enum";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { UserVerificationDetail } from "../../../DTO/UserVerification/user-verification-detail.model";
import { UserVerificationGetAll } from "../../../DTO/UserVerification/user-verification-getall.model";

export interface IUserVerificationRepository {

   getUServerificationList(items: FilterViewModel<any>): Promise<OperationResult<GetAllPagingModel<UserVerificationGetAll>>>;
   getUServerificationById(id: string): Promise<OperationResult<UserVerificationDetail>>;
   GetById(id: string): Promise<OperationResult<any>>;
   changeUserVerificationStatus(id: string, status: Status, description: string): Promise<OperationResult<boolean>>;
}