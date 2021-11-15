import OperationResult from "../../../core/Operation/OperationResult";
import { CreatRolePermission } from "../../../DTO/Permission/create-permission";
import { FileNode } from "../../../DTO/Permission/file-node";
import { UpdatePermission } from "../../../DTO/Permission/update_permission";
import IPermissionDoc from "../../Context/Permission/IPermissionDoc";
import { PermissionEntitie } from "../../Context/Permission/Permission";
import { IPermissionRepository } from './IPermissionRepository';

export default class PermissionRepository implements IPermissionRepository {

    /****
      *
      * Create Permission
      *
      ****/
    async CreatePermission(value: CreatRolePermission): Promise<OperationResult<boolean>> {

        try {
            const permission = await PermissionEntitie.build({
                name: value.name,
                parentId: value.parentId,
                permissionId: value.permissionId,
                isDelete: false
            });

            permission.save();
            return OperationResult.BuildSuccessResult("Success Add Permission", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Permission
      *
      ****/
    async UpdatePermission(item: UpdatePermission): Promise<OperationResult<boolean>> {

        try {

            await PermissionEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        parentId: item.parentId,
                        permissionId: item.permissionId
                    }
                });

            return OperationResult.BuildSuccessResult("Success Set Permission", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    /****
     *
     * Delete Permission
     *
     ****/
    async DeletePermission(id: string): Promise<OperationResult<boolean>> {

        try {

            await PermissionEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } });

            return OperationResult.BuildSuccessResult("Success Set Permission", true);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }
    /****
     *
     * GetAll Permission
     *
     ****/
    async GetAllPermission(): Promise<OperationResult<FileNode[]>> {
        try {

            let treeData: FileNode[] = [];

            const getAllPermission = await PermissionEntitie.find({})
                .where("isDelete")
                .equals(false)
                .select("name parentId permissionId");

            if (getAllPermission.length > 0) {
                treeData = await this.MakeTreePermission(getAllPermission);
            }

            return OperationResult.BuildSuccessResult("Success Set Permission", treeData);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

    /****
     *
     * Get ById Permission
     *
     ****/
    async GetByIdPermission(id: string): Promise<OperationResult<IPermissionDoc | null>> {

        try {

            const getAllPermission = await PermissionEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false)
                .select("name permissionId parentId ");

            return OperationResult.BuildSuccessResult("Success Set Permission", getAllPermission);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

    /**
     * 
     * 
     * Make Tree Permission
     */
    private async MakeTreePermission(permissions: any): Promise<FileNode[]> {

        let treeData: FileNode[] = [];
        let queue: FileNode[] = [];

        while (permissions.length > 0) {

            let data = permissions[0];

            let node = {
                id: data._id,
                name: data.name,
                parentId: data.parentId,
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
    }

}