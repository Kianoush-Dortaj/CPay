
import OperationResult from "../../../core/Operation/OperationResult";
import { GenerateCode } from "./ValidatoinPattern/ValidationContext";

export interface ILoginRepository {
    UserLogin(username: string, password: string): Promise<OperationResult<any>>;
    CheckAuthTwofactorCode(hash: string, code: string, phoneNumber: string): Promise<OperationResult<GenerateCode>>;
    CheckAuthGoogle2FA(code: string, email: string): Promise<OperationResult<GenerateCode>>;
}