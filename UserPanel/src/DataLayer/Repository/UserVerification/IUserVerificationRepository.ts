import OperationResult from "../../../core/Operation/OperationResult";
import { UserVerificationModel } from "../../../DTO/UserVerification/user-verification-model";
import { UserVerificationResult } from "../../../DTO/UserVerification/verification-result";

export interface IUserVerificationRepository {

    setPhoneNumber(userId: string, phoneNumber: string): Promise<OperationResult<string>>;
    checkPhoneNumber(userId: string, code: string, hash: string, phoneNumber: string): Promise<OperationResult<boolean>>;
    verification(userId: string, item: UserVerificationModel): Promise<OperationResult<UserVerificationResult>>;
    getUServerificationInfo(userId: string): Promise<OperationResult<UserVerificationResult>>;
}