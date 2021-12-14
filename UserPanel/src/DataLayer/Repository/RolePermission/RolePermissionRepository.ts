import OperationResult from "../../../core/Operation/OperationResult";
import { FileNode } from "../../../DTO/Permission/file-node";
import { GetRolePermissionForEdit } from "../../../DTO/RolePermission/GetRolePermissionForEdit";
import { UpdateRolePermission } from "../../../DTO/RolePermission/UpdateRolePermission";
import { PermissionEntitie } from "../../Context/Permission/Permission";
import { IRolePermissionDoc } from "../../Context/RolePermission/IRolePermissionDoc";
import { RolePermissionEntitie } from "../../Context/RolePermission/RolePermission";
import { IRolePermissionRepository } from "./IRolePermissionRepository";

export default class RolePermissionRepository implements IRolePermissionRepository {

    async UpdatePermission(item: UpdateRolePermission): Promise<OperationResult<string>> {

        try {

            let rolePermissionId: string = '';
            const roles = await this.GetRolePermissionsByRoleId(item.roleId);

            if (roles.result) {

                if (roles.result.length > 0) {
                    await RolePermissionEntitie.update(
                        {
                            roleId: item.roleId,
                        },
                        { $set: { permissionId: [...item.permissionId] } }
                    );
                } else {
                    const rolePermission = new RolePermissionEntitie();
                    rolePermission.roleId = item.roleId;
                    rolePermission.permissionId.push(...item.permissionId);
                    rolePermissionId = rolePermission._id;
                    rolePermission.save();
                }

            }

            return OperationResult.BuildSuccessResult("Success Update Permission", rolePermissionId);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
     *
     * Get Role Permissions By RoleId
     *
     ****/
    async GetRolePermissionsByRoleId(id: any): Promise<OperationResult<IRolePermissionDoc[]>> {
        try {

            const permissionIds = await RolePermissionEntitie.find({
                roleId: id,
            }).select("permissionId");

            return OperationResult.BuildSuccessResult("Get All Permission By RoleId", permissionIds);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    /****
     *
     * Get All Permissions By RoleId
     *
     ****/

    async GetAllRolePermissionForEdit(selectedPermission: any): Promise<OperationResult<FileNode[]>> {

        try {
            let model: GetRolePermissionForEdit[] = [];
            let selectedRolePermissions: string[] = [];

            const permissions = [...selectedPermission];

            permissions.forEach(data => {
                selectedRolePermissions.push(...data.permissionId)
            });

            let rolePermissions = await PermissionEntitie.find({});

            rolePermissions.forEach(data => {

                const selected = selectedRolePermissions.find(x => x.toString() == data._id);

                model.push({
                    id: data._id,
                    parentId: data.parentId,
                    selected: selected ? true : false,
                    name: data.name,
                });
            })

            const treeData = await this.MakeTreePermission(model);

            return OperationResult.BuildSuccessResult("", treeData);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }


    }

    /**
     * 
     * 
     * Make Tree Permission
     */
    private async MakeTreePermission(permissions: any): Promise<FileNode[]> {
        console.log(permissions)
        let treeData: FileNode[] = [];
        try {
            let queue: FileNode[] = [];

            while (permissions.length > 0) {

                let data = permissions[0];

                let node = {
                    id: data.id,
                    name: data.name,
                    parentId: data.parentId,
                    selected: data.selected,
                    children: []
                };

                queue[node.id] = node;

                if (!data.parentId)
                    treeData.push(node);
                else {
                    // find parent
                    let parent = queue[data.parentId]
                    // add to children
                    if (parent) {
                        parent.children?.push(node);
                    }
                }
                permissions.splice(0, 1);
            }

            return treeData;
        } catch (error) {
            console.log(error)
            return treeData;
        }

    }


}