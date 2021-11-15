import OperationResult from "../../../core/Operation/OperationResult";
import { CreateUserRoleDto } from "../../../DTO/UserRole/UserRoleDto";
import { IUserRoleDoc } from "../../Context/UserRole/IUserRoleDock";
import { UserRoleEntitie } from "../../Context/UserRole/UserRole";
import { IUserRoleRepository } from "./IUserRoleRepository";

export default class UserRoleRepository implements IUserRoleRepository {


    /*******
    * Set User Role For User
    ******/

    async SetUserRole(item: CreateUserRoleDto): Promise<OperationResult<IUserRoleDoc>> {
        try {

            let userRole = await UserRoleEntitie
                .build({ roles: [...item.roles], userId: item.userId })

            await userRole.save();

            return OperationResult.BuildSuccessResult('Operation Success', userRole);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /*******
    * Update User Role For User
    ******/

    async UpdateUserRole(item: CreateUserRoleDto): Promise<OperationResult<boolean>> {

        try {

            const findItem = await UserRoleEntitie.updateOne(
                {
                    userId: item.userId,
                }, {
                $set: {
                    roles: [...item.roles]
                }
            });

            if (findItem) {
                return OperationResult.BuildSuccessResult('Operation Success', true);
            }

            return OperationResult.BuildSuccessResult('Operation Success', false);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /*******
* Find User By RoleId
******/

    async findUserByRoleId(roleId: string): Promise<OperationResult<boolean>> {

        try {

            const findItem = await UserRoleEntitie.findOne({ roleId: roleId });

            if (findItem) {
                return OperationResult.BuildSuccessResult('Operation Success', true);
            }

            return OperationResult.BuildSuccessResult('Operation Success', false);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

        /*******
* Find Roles By UserId
******/

async findRolesByUserId(userId: string): Promise<OperationResult<string[]>> {

    try {

        const findItem = await UserRoleEntitie.findOne({ userId: userId });

        if (findItem) {
            return OperationResult.BuildSuccessResult('Operation Success', findItem.roles);
        }

        return OperationResult.BuildFailur("Can not find User");

    } catch (error: any) {
        return OperationResult.BuildFailur(error.message);
    }

}


}