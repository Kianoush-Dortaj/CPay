import OperationResult from '../../../core/Operation/OperationResult';
import { AddUserLevelModel } from '../../../DTO/UserLevel/AddUserLevel';
import { UpdateUserLevelModel } from '../../../DTO/UserLevel/UpdateUserLevel';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { IUserLevelDoc } from '../../Context/UserLevel/IUserLevelDoc';
import { UserLevelEntitie } from '../../Context/UserLevel/UserLevel';
import { IUserLevelRepository } from './IUserLevelRepository';
import { GetUserLevelInfoModel } from '../../../DTO/UserLevel/GetUserLevelInfo';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllUserLevelFilter } from '../../../DTO/UserLevel/GetAllUserLevelFilter';
import RedisRepository from '../../../Utilities/Redis/RedisRepository';
import RedisKey from '../../../Utilities/Redis/RedisKey';


export default class UserLevelRepository implements IUserLevelRepository {


    /****
      *
      * Create UserLevel
      *
      ****/
    async CreateUserLevel(item: AddUserLevelModel): Promise<OperationResult<boolean>> {

        try {

            if (item.isDefault === true) {

                const changeIsDefulatItem = await this.FindIsDefulatItemAndChangeIt();
                if (!changeIsDefulatItem.success) {
                    return OperationResult.BuildFailur(changeIsDefulatItem.message);

                }
            }
            const userLevel = await UserLevelEntitie.build(
                {
                    name: item.name,
                    isDelete: false,
                    isDefault: item.isDefault,
                    isPublish: item.isPublish
                });

            await userLevel.save();

            if (item.isDefault === true) {
                await RedisRepository.Set(RedisKey.UserGroup,
                    {
                        name: item.name,
                        id: userLevel._id,
                    });
            }

            return OperationResult.BuildSuccessResult("Success Create UserLevel", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set UserLevel
      *
      ****/
    async UpdateUserLevel(item: UpdateUserLevelModel): Promise<OperationResult<boolean>> {
        try {

            if (item.isDefault === true) {

                const changeIsDefulatItem = await this.FindIsDefulatItemAndChangeIt();
                if (!changeIsDefulatItem.success) {
                    return OperationResult.BuildFailur(changeIsDefulatItem.message);

                }
            }

            await UserLevelEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        isDefault: item.isDefault,
                        isPublish: item.isPublish
                    }
                });

            if (item.isDefault) {
                await RedisRepository.ResetSingleItem(RedisKey.UserGroup,
                    {
                        name: item.name,
                        id: item.id,
                    })
            }

            return OperationResult.BuildSuccessResult("Success Update UserLevel", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete UserLevel
     *
     ****/
    async DeleteUserLevel(id: string): Promise<OperationResult<boolean>> {

        try {

            await UserLevelEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete UserLevel", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * Get All UserLevel Select
    *
    ****/
    async GetAllUserLevelSelect(): Promise<OperationResult<IUserLevelDoc[]>> {

        try {

            const getAllUserLevel = await UserLevelEntitie.find({})
                .where("isDelete")
                .equals(false)
                .select("name");

            return OperationResult.BuildSuccessResult("Get All UserLevels", getAllUserLevel);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll UserLevel Paging
    *
    ****/
    async GetAllUserLevelPaging(items: FilterViewModel<GetAllUserLevelFilter>): Promise<OperationResult<GetAllPagingModel<any>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllUserLevelFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let userLevelList = await UserLevelEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await UserLevelEntitie.find({})
                .where("isDelete")
                .equals(false)
                .estimatedDocumentCount();

            return OperationResult.BuildSuccessResult<GetAllPagingModel<any>>("Get All data Paging", {
                data: userLevelList,
                count: count
            });

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    /****
    *
    *  Find isDefulat Item
    *
    ****/
    async FindIsDefulatItemAndChangeIt(): Promise<OperationResult<boolean>> {

        try {


            const getUserLevelById = await UserLevelEntitie.findOne({ isDefault: true })
                .where("isDelete")
                .equals(false);

            if (!getUserLevelById) {

                return OperationResult.BuildSuccessResult(
                    "Can not find this UserLevel", true);

            }

            const updateUserLevel = await this.UpdateUserLevel({
                id: getUserLevelById._id,
                isDefault: false,
                isPublish: getUserLevelById.isPublish,
                name: getUserLevelById.name
            });

            if (!updateUserLevel.success) {
                return OperationResult.BuildFailur(updateUserLevel.message);

            }

            return OperationResult.BuildSuccessResult("Get All UserLevels", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
    *
    *  Get User Level By Id
    *
    ****/
    async GetByIdUserLevel(id: string): Promise<OperationResult<GetUserLevelInfoModel>> {

        try {

            const getUserLevelById = await UserLevelEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);
            if (!getUserLevelById) {

                return OperationResult.BuildFailur("Can not find this Recored");

            }


            return OperationResult.BuildSuccessResult("Get All Roles", {
                id: getUserLevelById.id,
                isDefault: getUserLevelById.isDelete,
                isPublish: getUserLevelById.isPublish,
                name: getUserLevelById.name
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}