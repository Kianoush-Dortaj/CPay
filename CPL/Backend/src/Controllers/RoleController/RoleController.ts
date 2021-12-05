import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class RoleController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Role ****/
    async CreateRole(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name, permissions } = req.body;

        if (!validationData.haveError) {

            const createRole = await UnitOfWork.RoleRepository.CreateRole({
                name,
                permissions
            });

            if (createRole.success) {
                return this.Ok(res, "Success Create Role");

            }

            return this.BadRerquest(res, createRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateRole ****/
    async UpdateRole(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const roleId = req.params.id;
            const { name, permissions } = req.body;

            const updateRole = await UnitOfWork.RoleRepository.UpdateRole(
                {
                    id: roleId,
                    name,
                    permissions
                }
            );

            if (updateRole.success) {
                this.Ok(res, "Update Role");

            }
            return this.BadRerquest(res, updateRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Role ****/
    async DeleteRole(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteRole = await UnitOfWork.RoleRepository.DeleteRole(req.params.id)

            if (deleteRole.success) {
                return this.Ok(res, "Success Delete Role");

            }
            return this.BadRerquest(res, deleteRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Role Paging ****/
    async GetAllRolePaging(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            let getAllrolePagingRole = await UnitOfWork.RoleRepository
                .GetAllRolePaging(req.body);


            if (getAllrolePagingRole.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllrolePagingRole.result !== undefined ? getAllrolePagingRole.result.length : 0,
                    data: getAllrolePagingRole.result
                }, '')

            }
            return this.BadRerquest(res, getAllrolePagingRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Role Select ****/
    async GetAllRoleSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const { pageNumber, pageSize } = req.query;

            const getAllroleSelectRole = await UnitOfWork.RoleRepository
                .GetAllRoleSelect();

            if (getAllroleSelectRole.success) {
                return this.OkObjectResult(res, {
                    data: getAllroleSelectRole.result
                }, "Get All Role Paging");

            }
            return this.BadRerquest(res, getAllroleSelectRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Role Paging ****/
    // async GetAllRole(req: Request, res: Response, next: NextFunction) {

    //     let validationData = await this.ValidationAction(req, res);

    //     if (!validationData.haveError) {


    //         const selectListRole = await UnitOfWork.RoleRepository
    //             .GetAllRole();

    //         if (selectListRole.success) {
    //             this.OkObjectResult(res, {
    //                 data: selectListRole.result
    //             }, "Select Role List");

    //         }
    //         return this.BadRerquest(res, selectListRole.message);

    //     } else {
    //         return this.BadRerquest(res, validationData.errorMessage.toString());
    //     }
    // }

    /*** GetById Role ****/
    async GetByIdRole(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const roleId = req.params.id;

            const getRolebyId = await UnitOfWork.RoleRepository
                .GetByIdRole(roleId);

            if (getRolebyId.success) {
                return this.OkObjectResult(res, {
                    data: getRolebyId.result
                }, "Get Role By Id");

            }
            return this.BadRerquest(res, getRolebyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Get All Permission ById Role ****/
    // async GetAllPermissionByRoleId(req, res, next) {
    //     let validationData = await this.ValidationAction(req, res);
    //     if (!validationData.haveError) {
    //         RolePermissionRepository.GetAllPermissonsByRoleId(req.params.id)
    //             .then((data) => {
    //                 return this.OkObjectResult(res, data);
    //             })
    //             .catch((error) => {
    //                 return this.BadRerquest(res, error);
    //             });
    //     } else {
    //         return this.BadRerquest(res, validationData.errorMessage);
    //     }
    // }

}