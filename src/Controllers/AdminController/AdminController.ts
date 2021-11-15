import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import OperationResult from "../../core/Operation/OperationResult";
import { IUserDoc } from "../../DataLayer/Context/User/IUserDock";
import { UserEntite } from "../../DataLayer/Context/User/User";
import { RedisManager } from '../../Utilities/Redis/RedisRepository';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';

export default new class AdminController extends BaseController {

    constructor() {
        super();
    }

    /***
      * Create
      */
    async Create(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const { firstName, gender, password, lastName, email, roles } = req.body;

            const createAdmin = await UnitOfWork.userRepository.RegisterAdmin({
                name: firstName,
                gender,
                password,
                family: lastName,
                email,
                roles: roles
            });

            if (createAdmin.success) {
                return this.Ok(res, "Success Register Admin");
            } else {
                return this.BadRerquest(res, createAdmin.message);
            }

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /***
     * Update
     */
    async Update(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userId = req.params.id;
            const { firstName, gender, avatar, lastName } = req.body;

            const updateUser = await UnitOfWork.userRepository
                .UpdateUserInfo({
                    file: req.file,
                    firstName: firstName,
                    gender,
                    lastName: lastName,
                    userId: userId,
                    exAvatarUrl: avatar
                });
            if (updateUser.success) {
                return this.Ok(res, "Success Update Admin");
            }
            return this.BadRerquest(res, updateUser.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /***
     * Edit Account Info
     */
    async EditAccountInfoUser(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userId = req.params.id;
            const { email, confirmEmail, isActive } = req.body;

            if (email !== confirmEmail) {
                return this.BadRerquest(res, "Email and Confirm Email is not match");

            }

            const accountInfo = await UnitOfWork.userRepository.UpdateAccountInfo(userId, email, isActive);

            if (accountInfo.success) {
                return this.Ok(res, "Success Update Account Info");
            }

            return this.BadRerquest(res, accountInfo.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /***
     * Change Password
     */
    async ChangePassword(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userId = req.params.id;
            const { password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return this.BadRerquest(res, "Password and Confirm Password is not match");
            }

            const changePassword = await UnitOfWork.userRepository.ChangePassword({
                password: password,
                userId: userId
            })
            if (changePassword.success) {
                return this.Ok(res, "Success Change Password");
            }

            return this.BadRerquest(res, changePassword.message);
        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /***
     * Change UserRole
     */
    async ChangeUseRole(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userId = req.params.id;
            const { roles } = req.body;

            const changePassword = await UnitOfWork.userRepository.ChangeUserRole(
                userId,
                roles
            )
            if (changePassword.success) {
                return this.Ok(res, "Success Change Password");
            }

            return this.BadRerquest(res, changePassword.message);
        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /***
     * Get User Account Info
     */
    async GetUserInfoAccount(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userId = req.params.id;

            const getManagerAccountInfo = await UnitOfWork.userRepository.GetManagerAccountInfo(userId);

            if (getManagerAccountInfo.success) {
                return this.OkObjectResult(res, {
                    data: getManagerAccountInfo.result
                }, "Get Manager Account Info");
            }

            return this.BadRerquest(res, getManagerAccountInfo.message);
        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /***
    * Get User Account Info
    */
    async GetUserPersonalInformation(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userId = req.params.id;

            const getManagerPersonalInfo = await UnitOfWork.userRepository.GetManagerInformation(userId);

            if (getManagerPersonalInfo.success) {
                return this.OkObjectResult(res, {
                    data: getManagerPersonalInfo.result
                }, "Get Manager Personal Info");
            }

            return this.BadRerquest(res, getManagerPersonalInfo.message);
        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /***
     * Get User Roles
     */
    async GetUserRoles(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const userId = req.params.id;

            const getUserRoles = await UnitOfWork.userRepository.GetUserroles(userId);

            if (getUserRoles.success) {
                return this.OkObjectResult(res, {
                    data: getUserRoles.result
                }, "Get Manager Personal Info");
            }

            return this.BadRerquest(res, getUserRoles.message);
        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

     /***
     * Get User Image
     */

    async GetUserImage(req: Request, res: Response, next: NextFunction) {
        let manager = await UserEntite.findById(req.params.id).select("avatar");
        if (manager) {

            if (!manager.avatar) {
                return this.Notfound(res);
            }
            fs.readFile(`./src/public${manager.avatar}`, (error: any, data: any) => {
                if (error) throw error;
                res.writeHead(200, { "Content-Type": "image/png" });
                res.end(data);
            });

        }
    }

    // Get Manager Pagination

    async GetAllManagerPaging(req: Request, res: Response, next: NextFunction) {

        let Managers = await UnitOfWork.userRepository.GetAllManagerPaging(req.body);

        return this.OkObjectResultPager(res, {
            count: Managers.result !== undefined ? Managers.result.length : 0,
            data: Managers.result
        }, '');
    }


}