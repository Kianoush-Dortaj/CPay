import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class ComissionController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Comission ****/
    async CreateComission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { userLevelId,
            actionType,
            comission } = req.body;

        if (!validationData.haveError) {

            const createComission = await UnitOfWork.ComissionRepository.CreateComission({
                userLevelId,
                actionType,
                comission
            });

            if (createComission.success) {
                return this.Ok(res, "Success Create Comission");

            }

            return this.BadRerquest(res, createComission.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateComission ****/
    async UpdateComission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const roleId = req.params.id;
            const { userLevelId,
                actionType,
                comission } = req.body;

            const updateComission = await UnitOfWork.ComissionRepository.UpdateComission(
                {
                    id: roleId,
                    userLevelId,
                    actionType,
                    comission
                }
            );

            if (updateComission.success) {
                this.Ok(res, "Update Comission");

            }
            return this.BadRerquest(res, updateComission.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Comission ****/
    async DeleteComission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteComission = await UnitOfWork.ComissionRepository.DeleteComission(req.params.id)

            if (deleteComission.success) {
                return this.Ok(res, "Success Delete Comission");

            }
            return this.BadRerquest(res, deleteComission.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Comission Paging ****/
    async GetAllComissionPaging(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {


            const getAllrolePagingComission = await UnitOfWork.ComissionRepository
                .GetAllComissionPaging(req.body);

            if (getAllrolePagingComission.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllrolePagingComission.result ? getAllrolePagingComission.result?.count : 0,
                    data: getAllrolePagingComission.result?.data
                }, "Get All Comission Paging");

            }
            return this.BadRerquest(res, getAllrolePagingComission.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Comission ****/
    async GetByIdComission(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const roleId = req.params.id;

            const getComissionbyId = await UnitOfWork.ComissionRepository
                .GetByIdComission(roleId);

            if (getComissionbyId.success) {
                return this.OkObjectResult(res, {
                    data: getComissionbyId.result
                }, "Get Comission By Id");

            }
            return this.BadRerquest(res, getComissionbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

}