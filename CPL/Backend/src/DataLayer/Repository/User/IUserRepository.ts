import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { ChangePassword } from "../../../DTO/User/ChangePasswordModel";
import { CreateUserDto } from "../../../DTO/User/CreateUserDto";
import { GetAdminAccountInfoModel } from "../../../DTO/User/GetAdminAccountInfoModel";
import { GetAdminInformationModel } from "../../../DTO/User/GetAdminInformatinoModel";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { UpdateUserModel } from "../../../DTO/User/UpdateUserModel";
import { GetProfileInfoModel } from "../../../DTO/User/UserInfoProfile";
import { IUserDoc } from "../../Context/User/IUserDock";
import { InfoForLoginModel } from "./InfoForLoginModel";


export default interface IUserRepository {

    RegisterAdmin(createUserDto: CreateUserDto): Promise<OperationResult<IUserDoc>>;
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
    ChangeUserRole(userId: string, rolesId: string[]): Promise<OperationResult<boolean>>;
    GetManagerAccountInfo(id: string): Promise<OperationResult<GetAdminAccountInfoModel>>;
    GetManagerInformation(id: string): Promise<OperationResult<GetAdminInformationModel>>;
    GetUserroles(userId: string): Promise<OperationResult<string[] | undefined>>;
    GetAllManagerPaging(items: FilterViewModel<GetAllUserFilter>): Promise<OperationResult<IUserDoc[]>>;
    FindUserByEmailForLogin(email: string): Promise<OperationResult<any>> ;
}