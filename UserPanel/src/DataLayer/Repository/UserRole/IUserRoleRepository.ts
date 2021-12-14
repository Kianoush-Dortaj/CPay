import OperationResult from "../../../core/Operation/OperationResult";
import { CreateUserRoleDto } from "../../../DTO/UserRole/UserRoleDto";
import { IUserRoleDoc } from "../../Context/UserRole/IUserRoleDock";

export interface IUserRoleRepository {
    SetUserRole(item: CreateUserRoleDto): Promise<OperationResult<IUserRoleDoc>>;
    UpdateUserRole(item: CreateUserRoleDto): Promise<OperationResult<boolean>>;
    findUserByRoleId(roleId:string): Promise<OperationResult<boolean>>;
    findRolesByUserId(userId: string): Promise<OperationResult<string[]>>;
}