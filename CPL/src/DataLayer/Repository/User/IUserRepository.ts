import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { ChangePassword } from "../../../DTO/User/ChangePasswordModel";
import { CreateUserDto } from "../../../DTO/User/CreateUserDto";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { GetUserAccountInfoModel } from "../../../DTO/User/GetUserAccountInfoModel";
import { GetUserInformationModel } from "../../../DTO/User/GetUserInformatinoModel";
import { UpdateUserModel } from "../../../DTO/User/UpdateUserModel";
import { GetProfileInfoModel } from "../../../DTO/User/UserInfoProfile";
import { IUserDoc } from "../../Context/User/IUserDock";
import { InfoForLoginModel } from "./InfoForLoginModel";


export default interface IUserRepository {

    RegisterUser(createUserDto: CreateUserDto): Promise<OperationResult<IUserDoc>>;
    FindUserById(id: string): Promise<OperationResult<IUserDoc>>;
    FindUserByEmail(email: string): Promise<OperationResult<IUserDoc>>;
    GenerateActivationCode(userId: string, hash: string): Promise<OperationResult<any>>;
    CheckUserConfirmCode(email: string, hashCode: string): Promise<OperationResult<any>>;
    Resendactivationcode(email: string): Promise<OperationResult<any>>;
    GetUserInfo(id: string): Promise<OperationResult<IUserDoc | undefined>>;
    GetUserByUsername(userName: string): Promise<OperationResult<IUserDoc | undefined>>;
    UpdateUserInfo(item: UpdateUserModel): Promise<OperationResult<boolean>>;
    ChangePassword(item: ChangePassword): Promise<OperationResult<boolean>>;
    GetUserProfileInformation(userId: string): Promise<OperationResult<GetProfileInfoModel>>;
    GetUserInfoForLogin(username: string): Promise<OperationResult<InfoForLoginModel>>;
    UpdateAccountInfo(userId: string, email: string, isActive: boolean): Promise<OperationResult<boolean>>;
    GetAllManagerPaging(items: FilterViewModel<GetAllUserFilter>): Promise<OperationResult<IUserDoc[]>>;
    GetUserAccountInfo(id: string): Promise<OperationResult<GetUserAccountInfoModel>>; 
    GetUserInformation(id: string): Promise<OperationResult<GetUserInformationModel>>;
}