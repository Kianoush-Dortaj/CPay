import OperationResult from "../../../core/Operation/OperationResult";
import { CreateUserDto } from "../../../DTO/User/CreateUserDto";
import { IUserDoc } from "../../Context/User/IUserDock";
import bcrypte, { hash } from 'bcrypt';
import { UserEntite } from "../../Context/User/User";
import RedisManager from "../../../Utilities/Redis/RedisRepository";
import RedisKey from "../../../Utilities/Redis/RedisKey";
import { Gender } from "../../Context/User/Gender";
import emailRepo from '../../../Utilities/Email/NodeMailer';
import UtilService from '../../../Utilities/Util';
import { UpdateUserModel } from "../../../DTO/User/UpdateUserModel";
import { ChangePassword } from "../../../DTO/User/ChangePasswordModel";
import { InfoForLoginModel } from "./InfoForLoginModel";
import { GetProfileInfoModel } from "../../../DTO/User/UserInfoProfile";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { UpdateUserAccountViewModel } from "../../../DTO/User/UserAccountviewModel";
import { GetAdminAccountInfoModel } from "../../../DTO/User/GetAdminAccountInfoModel";
import { GetAdminInformationModel } from "../../../DTO/User/GetAdminInformatinoModel";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import IAdminRepository from "./IAdminRepository";

export class AdminRepository implements IAdminRepository {

    async RegisterAdmin(createUserDto: CreateUserDto): Promise<OperationResult<IUserDoc>> {

        try {
            var find = '/';
            var re = new RegExp(find, 'g');

            let password = await bcrypte.hash(createUserDto.password, 5);
            let hashCode = await (await bcrypte.hash(createUserDto.email, 5)).replace(re, '');

            let displayName = createUserDto.name + ' ' + createUserDto.family;
            let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);

            let registerUser = await UserEntite.build({
                firstName: createUserDto.name,
                gender: Number(createUserDto.gender),
                isAdmin: true,
                password: password,
                email: createUserDto.email,
                lastName: createUserDto.family,
                accountFail: 0,
                avatar: undefined,
                poster: undefined,
                birthDate: undefined,
                isSupport: false,
                confirmEmail: false,
                towFactorEnabled: false,
                isActive: false,
                locked: false,
                lockedDate: undefined,
                phoneNumber: undefined,
                securityStamp: securityStamp
            });


            const userRole = await UnitOfWork.UserRoleRepository.SetUserRole({
                roles: createUserDto.roles,
                userId: registerUser._id
            })

            registerUser.userRole = userRole.result?._id;

            registerUser.save();

            await RedisManager.Set(RedisKey.UserInfo + registerUser._id, registerUser);
            await this.GenerateActivationCode(RedisKey.RegisterConfirm + registerUser.email, hashCode);
            await emailRepo.sendActivationCodeEmail(registerUser.email, 'CPay Configm Email', displayName, hashCode);

            return new OperationResult<IUserDoc>(true, "We Are Sent Activatoin to Your Email");

        } catch (error: any) {
            return new OperationResult<IUserDoc>(false, error.message);
        }

    }

    async RegisterUser(createUserDto: CreateUserDto): Promise<OperationResult<IUserDoc>> {

        try {
            var find = '/';
            var re = new RegExp(find, 'g');

            let password = await bcrypte.hash(createUserDto.password, 5);
            let hashCode = await (await bcrypte.hash(createUserDto.email, 5)).replace(re, '');

            let displayName = createUserDto.name + ' ' + createUserDto.family;
            let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);

            let registerUser = await UserEntite.build({
                firstName: createUserDto.name,
                gender: Number(createUserDto.gender),
                isAdmin: false,
                password: password,
                email: createUserDto.email,
                lastName: createUserDto.family,
                accountFail: 0,
                avatar: undefined,
                poster: undefined,
                birthDate: undefined,
                isSupport: false,
                confirmEmail: false,
                towFactorEnabled: false,
                isActive: false,
                locked: false,
                lockedDate: undefined,
                phoneNumber: undefined,
                securityStamp: securityStamp
            });

            registerUser.save();

            await RedisManager.Set(RedisKey.UserInfo + registerUser._id, registerUser);
            await this.GenerateActivationCode(RedisKey.RegisterConfirm + registerUser.email, hashCode);
            await emailRepo.sendActivationCodeEmail(registerUser.email, 'Truvel Budy Configm Email', displayName, hashCode);

            return new OperationResult<IUserDoc>(true, "We Are Sent Activatoin to Your Email");

        } catch (error: any) {
            return new OperationResult<IUserDoc>(false, error.message);
        }

    }

    async RegisterSupport(createUserDto: CreateUserDto): Promise<OperationResult<IUserDoc>> {

        try {
            var find = '/';
            var re = new RegExp(find, 'g');

            let password = await bcrypte.hash(createUserDto.password, 5);
            let hashCode = await (await bcrypte.hash(createUserDto.email, 5)).replace(re, '');

            let displayName = createUserDto.name + ' ' + createUserDto.family;
            let securityStamp = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);

            let registerUser = await UserEntite.build({
                firstName: createUserDto.name,
                gender: Number(createUserDto.gender),
                isAdmin: false,
                password: password,
                email: createUserDto.email,
                lastName: createUserDto.family,
                accountFail: 0,
                avatar: undefined,
                poster: undefined,
                birthDate: undefined,
                isSupport: true,
                confirmEmail: false,
                towFactorEnabled: false,
                isActive: false,
                locked: false,
                lockedDate: undefined,
                phoneNumber: undefined,
                securityStamp: securityStamp
            });

            registerUser.save();

            await RedisManager.Set(RedisKey.UserInfo + registerUser._id, registerUser);
            await this.GenerateActivationCode(RedisKey.RegisterConfirm + registerUser.email, hashCode);
            await emailRepo.sendActivationCodeEmail(registerUser.email, 'Truvel Budy Configm Email', displayName, hashCode);

            return new OperationResult<IUserDoc>(true, "We Are Sent Activatoin to Your Email");

        } catch (error: any) {
            return new OperationResult<IUserDoc>(false, error.message);
        }

    }

    async FindUserByEmail(email: string): Promise<OperationResult<IUserDoc>> {

        try {

            let user = await UserEntite.findOne({ email: email });
            if (user) {
                return new OperationResult<IUserDoc>(true, "User Find", user);
            }
            return new OperationResult<IUserDoc>(false, "User can Not find");
        } catch (error: any) {
            return new OperationResult<IUserDoc>(false, error.message);
        }
    }

    async FindUserById(id: string): Promise<OperationResult<IUserDoc>> {

        try {

            let user = await UserEntite.findById(id);
            if (user) {
                return new OperationResult<IUserDoc>(true, "User Find", user);
            }
            return new OperationResult<IUserDoc>(false, "User can Not find");
        } catch (error: any) {
            return new OperationResult<IUserDoc>(false, error.message);
        }
    }

    async FindUserByEmailForLogin(email: string): Promise<OperationResult<any>> {

        try {

            let user = await UserEntite.findOne({ email: email })
                .populate({
                    path: "userRole",
                    populate: [
                        {
                            path: "roles",
                            populate: {
                                path: "rolePermissionId",
                                populate: {
                                    path: "permissionId",
                                    select: "permissionId"
                                }
                            }
                        }
                    ],
                });

            if (user) {
                return OperationResult.BuildSuccessResult("Operation Success", user);
            }
            return OperationResult.BuildFailur("Can not find User");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    async GenerateActivationCode(userId: string, hash: string): Promise<OperationResult<any>> {

        try {
            let code = await RedisManager.SetValueWithexiperationTime(userId, hash, 1000);

            return new OperationResult<any>(true, '');

        } catch (error: any) {
            return new OperationResult<any>(false, error.message);

        }

    }

    async CheckUserConfirmCode(email: string, hashCode: string): Promise<OperationResult<any>> {

        try {
            let item = await RedisManager.Get<any>(RedisKey.RegisterConfirm + email);
            if (item.success && item.result == hashCode) {
                await UserEntite.findOneAndUpdate({ email: email }, {
                    $set: {
                        isActive: true,
                        confirmEmail: true
                    }
                });
                let deleteActivatinCode = await RedisManager.Remove(RedisKey.RegisterConfirm + email);

                if (deleteActivatinCode.success) {
                    return new OperationResult<any>(true, '');
                }
                return new OperationResult<any>(false, 'Error When Deleting Redis Key');

            }
            return new OperationResult<any>(false, 'Your Confirm code was Exiper')
        } catch (error: any) {
            return new OperationResult<any>(false, error.message)
        }
    }

    async Resendactivationcode(email: string): Promise<OperationResult<any>> {

        var find = '/';
        var re = new RegExp(find, 'g');
        let hashCode = await (await bcrypte.hash(email, 5)).replace(re, '');

        let displayName: string;
        let userInfo = await this.FindUserByEmail(email);

        if (userInfo.success && userInfo.result) {

            displayName = userInfo.result.firstName + userInfo.result?.lastName
            let generateKey = await this.GenerateActivationCode(RedisKey.RegisterConfirm + email, hashCode);
            if (generateKey.success && generateKey.result) {
                let sendEmail = await emailRepo.sendActivationCodeEmail(userInfo.result.email, 'Truvel Budy Configm Email', displayName, hashCode);
                if (sendEmail.success) {
                    return new OperationResult<any>(true, '');
                }
                return new OperationResult<any>(false, sendEmail.message);
            }
            return new OperationResult<any>(false, generateKey.message);
        }
        return new OperationResult<any>(false, userInfo.message);

    }

    /**********
    * Get Manager Account Info
    ********/
    async GetManagerAccountInfo(id: string): Promise<OperationResult<GetAdminAccountInfoModel>> {

        try {

            let redisValue = await RedisManager.Get<UpdateUserAccountViewModel>(RedisKey.UserAccount + id);

            if (redisValue.result) {
                return OperationResult
                    .BuildSuccessResult('Operation Success', {
                        email: redisValue.result.email,
                        isActive: redisValue.result.isActive
                    });
            }

            let getUserInfo = await UserEntite.findById(id).select('email isActive id');

            if (getUserInfo) {
                let setRedisValue = await RedisManager.Set(RedisKey.UserAccount + id,
                    {
                        email: getUserInfo.email,
                        id: getUserInfo.id,
                        isActive: getUserInfo.isActive
                    });
                if (setRedisValue.success) {
                    return OperationResult.BuildSuccessResult('Operation Success', {
                        email: getUserInfo.email,
                        isActive: getUserInfo.isActive
                    });
                }
                return OperationResult.BuildFailur(setRedisValue.message);
            } else {
                return OperationResult.BuildFailur('User NotFound');
            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    /**********
   * Get Manager Info
   ********/
    async GetManagerInformation(id: string): Promise<OperationResult<GetAdminInformationModel>> {

        try {

            let redisValue = await RedisManager.Get<GetAdminInformationModel>(RedisKey.UserInforamtion + id);

            if (redisValue.result) {
                return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
            }

            let getUserInfo = await UserEntite.findById(id).select('firstName avatar lastName gender id');

            if (getUserInfo) {
                let setRedisValue = await RedisManager.Set(RedisKey.UserInforamtion + id,
                    {
                        firstName: getUserInfo.firstName,
                        id: getUserInfo.id,
                        lastName: getUserInfo.lastName,
                        avatar: getUserInfo.avatar
                    });
                if (setRedisValue.success) {
                    return OperationResult.BuildSuccessResult('Operation Success', {
                        firstName: getUserInfo.firstName,
                        hasAvatar: getUserInfo.avatar ? true : false,
                        id: getUserInfo._id,
                        lastName: getUserInfo.lastName
                    });
                }
                return OperationResult.BuildFailur(setRedisValue.message);
            } else {
                return OperationResult.BuildFailur('User NotFound');
            }

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

    /**********
     * Get User Info
     ********/
    async GetUserInfo(id: string): Promise<OperationResult<IUserDoc | undefined>> {

        let redisValue = await RedisManager.Get<IUserDoc>(RedisKey.UserInfo + id);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getUserInfo = await UserEntite.findById(id);

        if (getUserInfo) {
            let setRedisValue = await RedisManager.Set(RedisKey.UserInforamtion + id, getUserInfo);
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getUserInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('User NotFound');
        }
    }

    /**********
     * Change User Role
     ********/
    async ChangeUserRole(userId: string, rolesId: string[]): Promise<OperationResult<boolean>> {

        try {
            let getUserInfo = await UserEntite.findById(userId);

            if (getUserInfo) {

                UnitOfWork.UserRoleRepository.UpdateUserRole({
                    userId: userId,
                    roles: rolesId
                });

                return OperationResult.BuildSuccessResult("Success Update User Role", true);
            } else {
                return OperationResult.BuildFailur('User NotFound');
            }
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    /**********
     * Get User Info by Username
     ********/
    async GetUserByUsername(userName: string): Promise<OperationResult<IUserDoc | undefined>> {

        let redisValue = await RedisManager.Get<IUserDoc>(RedisKey.UserInfo + userName);

        if (redisValue.result) {
            return OperationResult.BuildSuccessResult('Operation Success', redisValue.result);
        }

        let getUserInfo = await UserEntite.findOne({ email: userName });

        if (getUserInfo) {
            let setRedisValue = await RedisManager.Set(RedisKey.UserInforamtion + userName, getUserInfo);
            if (setRedisValue.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getUserInfo);
            }
            return OperationResult.BuildFailur(setRedisValue.message);
        } else {
            return OperationResult.BuildFailur('User NotFound');
        }
    }

    /**********
     * Get User Info by Username
     ********/
    async GetUserroles(userId: string): Promise<OperationResult<string[] | undefined>> {

        try {

            let getuserRoles = await UnitOfWork.UserRoleRepository.findRolesByUserId(userId);
            if (getuserRoles.success) {
                return OperationResult.BuildSuccessResult('Operation Success', getuserRoles.result);
            }

            return OperationResult.BuildFailur('User NotFound');


        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }

    }

    /**********
     * Update Manager Info
     ********/
    async UpdateUserInfo(item: UpdateUserModel): Promise<OperationResult<boolean>> {

        let avatarUrl = undefined;
        try {

            if (item.file) {
                avatarUrl = UtilService.getDirectoryImage(
                    `${item.file.destination}/${item.file.originalname}`
                );
            }

            await UserEntite.updateOne(
                { _id: item.userId },
                {
                    $set: {
                        firstName: item.firstName,
                        gender: Number(item.gender),
                        lastName: item.lastName,
                        avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
                    },
                }
            )
            await RedisManager.ResetSingleItem(RedisKey.UserInforamtion + item.userId, {
                firstName: item.firstName,
                id: item.userId,
                gender: Gender[item.gender],
                lastName: item.lastName,
                avatar: item.file != undefined ? avatarUrl : item.exAvatarUrl
            })
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }


    /**********
     * Update Account Manager Info
     ********/
    async UpdateAccountInfo(userId: string, email: string, isActive: boolean): Promise<OperationResult<boolean>> {

        let avatarUrl = undefined;
        try {

            const updateAcountInfo = await UserEntite.updateOne(
                { _id: userId },
                {
                    $set: {
                        email: email,
                        isActive: isActive
                    },
                }
            )

            await RedisManager.Remove(RedisKey.UserInfo + userId);
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
    * ChangePassword
    ********/
    async ChangePassword(item: ChangePassword): Promise<OperationResult<boolean>> {

        try {
            let password = await bcrypte.hash(item.password, 5);

            await UserEntite.updateOne(
                { _id: item.userId },
                {
                    $set: {
                        password: password
                    },
                }
            );
            return OperationResult.BuildSuccessResult('', true);
        }
        catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
   * Get User Info for Login
   ********/
    async GetUserInfoForLogin(username: string): Promise<OperationResult<InfoForLoginModel>> {

        try {

            let model: InfoForLoginModel;

            let userInfo = await UserEntite.findOne({ email: username })
                .select("securityStamp firstName lastName");

            if (userInfo) {
                model = {
                    userSecurityStamp: userInfo.securityStamp,
                    displayName: userInfo.firstName + ' ' + userInfo.lastName,
                    userId: userInfo.id,
                }

                return OperationResult.BuildSuccessResult('', model);
            }
            return OperationResult.BuildFailur('Error');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }
    }

    /**********
   * Get User Profile Information
   ********/
    async GetUserProfileInformation(userId: string): Promise<OperationResult<GetProfileInfoModel>> {
        try {
            let userInfo = await UserEntite.findById(userId);
            if (userInfo) {
                return OperationResult.BuildSuccessResult('User Found', {
                    displayName: userInfo.firstName + ' ' + userInfo.lastName,
                    emailConfirm: userInfo.confirmEmail,
                    gender: Gender[Number(userInfo.gender)],
                    hasAvatar: userInfo.avatar ? true : false,
                    hasPoster: userInfo.poster ? true : false,
                    id: userInfo.id,
                    owner: true,
                    aboutMe: ''
                });
            }
            return OperationResult.BuildFailur('User not Found');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

    /**********
    * Get All Manager
    ********/
    async GetAllManagerPaging(items: FilterViewModel<GetAllUserFilter>): Promise<OperationResult<IUserDoc[]>> {


        const query: any = [];

        Object.keys(items.filters).forEach(key => {
            const value = items.filters[key as keyof GetAllUserFilter];
            if (key === 'email' && value) {
                query.push({ email: { $regex: `(.*)${value}(.*)` } });
            } else {
                query.push({ [key]: value });
            }
        });

        let userList = await UserEntite.find(...query).where({ isAdmin: true }).skip((items.page - 1) * items.pageSize)
            .limit(items.pageSize)

        return OperationResult.BuildSuccessResult('Operation Success', userList);

    }
}
