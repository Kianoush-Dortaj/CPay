import { Request, Response, NextFunction } from 'express';
import UnitOfWork from './../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import { BaseController } from "../../core/Controller/BaseController";

export default new class PermissionController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Permission ****/
    async CreatePermission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);


        if (!validationData.haveError) {

            const { name, parentId, permissionId } = req.body;

            const createRole = await UnitOfWork.PermissionRepository
                .CreatePermission({
                    name,
                    parentId,
                    permissionId
                });
            if (createRole.success) {
                return this.Ok(res, "Success Created Role");

            }
            return this.BadRerquest(res, createRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }
    /*** Set Permission ****/
    async UpdatePermission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const id = req.params.id;

            const { name, parentId, permissionId } = req.body;

            const updatePermission = await UnitOfWork.PermissionRepository
                .UpdatePermission({
                    id: id,
                    name: name,
                    parentId: parentId,
                    permissionId: permissionId
                });

            if (updatePermission.success) {
                return this.Ok(res, "Update Permission");

            }
            return this.BadRerquest(res, updatePermission.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }

    }
    /*** Delete Permission ****/
    async DeletePermission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);


        if (!validationData.haveError) {

            const permissionId = req.params.id;

            const createRole = await UnitOfWork.PermissionRepository
                .DeletePermission(permissionId);

            if (createRole.success) {
                return this.Ok(res, "Success Delete Permission");

            }
            return this.BadRerquest(res, createRole.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }

    }
    /*** GetAll Permission ****/
    async GetAllPermission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);


        if (!validationData.haveError) {


            const getAllPermission = await UnitOfWork.PermissionRepository
                .GetAllPermission();

            if (getAllPermission.success) {

                return this.OkObjectResult(res, {
                    data: getAllPermission.result
                }, "Get All Permission");

            }
            return this.BadRerquest(res, getAllPermission.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }

    }
    /*** GetById Permission ****/
    async GetByIdPermission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);


        if (!validationData.haveError) {

            const permissionId = req.params.id;

            const getPermissionById = await UnitOfWork.PermissionRepository
                .GetByIdPermission(permissionId);

            if (getPermissionById.success) {
                return this.OkObjectResult(res, {
                    data: getPermissionById
                }, "Get Permission By Id");

            }
            return this.BadRerquest(res, getPermissionById.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


}