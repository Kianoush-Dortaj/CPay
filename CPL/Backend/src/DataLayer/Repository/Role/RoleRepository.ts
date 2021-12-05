import OperationResult from '../../../core/Operation/OperationResult';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { FileNode } from '../../../DTO/Permission/file-node';
import { AddRoleModel } from '../../../DTO/Role/AddRole';
import { GetAllroleFilter } from '../../../DTO/Role/GetAllRoleFilter';
import { GetRoleInfoModel } from '../../../DTO/Role/GetRoleInfo';
import { UpdateRoleModel } from '../../../DTO/Role/UpdateRole';
import { GetRolePermissionForEdit } from '../../../DTO/RolePermission/GetRolePermissionForEdit';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { IRoleDoc } from '../../Context/Role/IRoleDoc';
import { RoleEntitie } from '../../Context/Role/Role';
import UnitOfWork from '../UnitOfWork/UnitOfWork';

export default class RoleRepository {

    /****
      *
      * Create Role
      *
      ****/
    async CreateRole(item: AddRoleModel): Promise<OperationResult<boolean>> {

        try {

            const role = await RoleEntitie.build({ name: item.name, isDelete: false });

            const rolePermission = await UnitOfWork.RolePermissionRepository
                .UpdatePermission({
                    roleId: role._id,
                    permissionId: item.permissions
                });

            role.rolePermissionId = rolePermission.result;

            await role.save();

            return OperationResult.BuildSuccessResult("Success Create Role", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Role
      *
      ****/
    async UpdateRole(item: UpdateRoleModel): Promise<OperationResult<boolean>> {
        try {

            await RoleEntitie.updateOne(
                { _id: item.id },
                { $set: { name: item.name } });

            await UnitOfWork.RolePermissionRepository.UpdatePermission({ roleId: item.id, permissionId: item.permissions });

            return OperationResult.BuildSuccessResult("Success Update Role", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Role
     *
     ****/
    async DeleteRole(id: string): Promise<OperationResult<boolean>> {

        try {

            let findUserRole = await UnitOfWork.UserRoleRepository
                .findUserByRoleId(id);

            if (findUserRole.result === true) {

                return OperationResult.BuildFailur("User Has Register With this Role . with can not Delete this Role");

            }

            await RoleEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete Role", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllRoleSelect(): Promise<OperationResult<IRoleDoc[]>> {

        try {

            const getAllRole = await RoleEntitie.find({})
                .where("isDelete")
                .equals(false)
                .select("name");

            return OperationResult.BuildSuccessResult("Get All Roles", getAllRole);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll Role Paging
    *
    ****/
    async GetAllRolePaging(items: FilterViewModel<GetAllroleFilter>): Promise<OperationResult<any>> {

        try {
            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllroleFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let userList = await RoleEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            return OperationResult.BuildSuccessResult('Operation Success', userList);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }
    /****
    *
    * Get ById Permission
    *
    ****/
    async GetByIdRole(id: string): Promise<OperationResult<GetRoleInfoModel>> {

        try {

            let getAllPermission: FileNode[] = [];

            const getRoleById = await RoleEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false)
                .populate({
                    path: "rolePermissionId",
                    select: "permissionId"
                })

            if (!getRoleById) {

                return OperationResult.BuildFailur("Can not find this Role");

            }

            if (getRoleById && getRoleById.rolePermissionId) {

                const getPermissions = await UnitOfWork.RolePermissionRepository
                    .GetAllRolePermissionForEdit(getRoleById.rolePermissionId);

                if (getPermissions.result) {
                    getAllPermission = getPermissions.result;
                }

            }


            return OperationResult.BuildSuccessResult("Get All Roles", {
                id: getRoleById._id,
                name: getRoleById.name,
                permissions: getAllPermission
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
    /****
    *
    * Get All Role Permission Selected
    *
    ****/

}