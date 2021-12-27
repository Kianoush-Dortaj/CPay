import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { UserVerificationModel } from "../../../DTO/UserVerification/user-verification-model";
import { UserVerificationResult } from "../../../DTO/UserVerification/verification-result";
import { IUserVerificationDoc } from "../../Context/UserVerification/IUserVerificationDock";

export interface IUserVerificationRepository {

   getUServerificationList(items: FilterViewModel<any>): Promise<OperationResult<IUserVerificationDoc[]>>;
}