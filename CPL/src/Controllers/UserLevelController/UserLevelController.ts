import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class UserLevelController extends BaseController {

    constructor() {
        super();
    }

    /*** Create UserLevel ****/
    async CreateUserLevel(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name, isDefault, isPublish } = req.body;

        if (!validationData.haveError) {

            const createUserLevel = await UnitOfWork.UserLevelRepository.CreateUserLevel({
                name,
                isDefault,
                isPublish
            });

            if (createUserLevel.success) {
                return this.Ok(res, "Success Create UserLevel");

            }

            return this.BadRerquest(res, createUserLevel.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateUserLevel ****/
    async UpdateUserLevel(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const roleId = req.params.id;
            const { name, isDefault, isPublish } = req.body;

            const updateUserLevel = await UnitOfWork.UserLevelRepository.UpdateUserLevel(
                {
                    id: roleId,
                    name,
                    isDefault,
                    isPublish
                }
            );

            if (updateUserLevel.success) {
                this.Ok(res, "Update UserLevel");

            }
            return this.BadRerquest(res, updateUserLevel.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete UserLevel ****/
    async DeleteUserLevel(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteUserLevel = await UnitOfWork.UserLevelRepository.DeleteUserLevel(req.params.id)

            if (deleteUserLevel.success) {
                return this.Ok(res, "Success Delete UserLevel");

            }
            return this.BadRerquest(res, deleteUserLevel.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll UserLevel Paging ****/
    async GetAllUserLevelPaging(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {


            const getAllrolePagingUserLevel = await UnitOfWork.UserLevelRepository
                .GetAllUserLevelPaging(req.body);

            if (getAllrolePagingUserLevel.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllrolePagingUserLevel.result ? getAllrolePagingUserLevel.result?.count : 0,
                    data: getAllrolePagingUserLevel.result?.data
                }, "Get All UserLevel Paging");

            }
            return this.BadRerquest(res, getAllrolePagingUserLevel.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll UserLevel Select ****/
    async GetAllUserLevelSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllroleSelectUserLevel = await UnitOfWork.UserLevelRepository
                .GetAllUserLevelSelect();

            if (getAllroleSelectUserLevel.success) {
                return this.OkObjectResult(res, {
                    data: getAllroleSelectUserLevel.result
                }, "Get All UserLevel Paging");

            }
            return this.BadRerquest(res, getAllroleSelectUserLevel.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById UserLevel ****/
    async GetByIdUserLevel(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const roleId = req.params.id;

            const getUserLevelbyId = await UnitOfWork.UserLevelRepository
                .GetByIdUserLevel(roleId);

            if (getUserLevelbyId.success) {
                return this.OkObjectResult(res, {
                    data: getUserLevelbyId.result
                }, "Get UserLevel By Id");

            }
            return this.BadRerquest(res, getUserLevelbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

}