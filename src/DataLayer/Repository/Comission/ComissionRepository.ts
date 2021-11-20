import OperationResult from '../../../core/Operation/OperationResult';
import { AddComissionModel } from '../../../DTO/Comission/AddComission';
import { UpdateComissionModel } from '../../../DTO/Comission/UpdateComission';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { ComissionEntitie } from '../../Context/Comission/Comission';
import { GetComissionInfoModel } from '../../../DTO/Comission/GetComissionInfo';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllComissionFilter } from '../../../DTO/Comission/GetAllComissionFilter';
import RedisRepository from '../../../Utilities/Redis/RedisRepository';
import RedisKey from '../../../Utilities/Redis/RedisKey';
import { IComissionRepository } from './IComissionRepository';


export default class ComissionRepository implements IComissionRepository {


    /****
      *
      * Create Comission
      *
      ****/
    async CreateComission(item: AddComissionModel): Promise<OperationResult<boolean>> {

        try {

            const userLevel = await ComissionEntitie.build(
                {
                    userLevelId: item.userLevelId,
                    actionType: item.actionType,
                    comission: item.comission
                });

            await userLevel.save();

            return OperationResult.BuildSuccessResult("Success Create Comission", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Comission
      *
      ****/
    async UpdateComission(item: UpdateComissionModel): Promise<OperationResult<boolean>> {
        try {


            await ComissionEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        userLevelId: item.userLevelId,
                        actionType: item.actionType,
                        comission: item.comission
                    }
                });

            return OperationResult.BuildSuccessResult("Success Update Comission", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Comission
     *
     ****/
    async DeleteComission(id: string): Promise<OperationResult<boolean>> {

        try {

            await ComissionEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete Comission", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Comission Paging
    *
    ****/
    async GetAllComissionPaging(items: FilterViewModel<GetAllComissionFilter>): Promise<OperationResult<GetAllPagingModel<any>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {

                const value = items.filters[key as keyof GetAllComissionFilter];

                query.push({ [key]: value });

            });

            let userLevelList = await ComissionEntitie.find(...query)
                .populate({
                    path: "userLevelId",
                    select: "name"
                }).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await ComissionEntitie.find({})
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
    *  Get User Level By Id
    *
    ****/
    async GetByIdComission(id: string): Promise<OperationResult<GetComissionInfoModel>> {

        try {

            const getComissionById = await ComissionEntitie.findById({ _id: id });

            if (!getComissionById) {

                return OperationResult.BuildFailur("Can not find this Role");

            }

            return OperationResult.BuildSuccessResult("Get All Roles", {
                id: getComissionById._id,
                userLevelId: getComissionById.userLevelId,
                actionType: getComissionById.actionType,
                comission: getComissionById.comission
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}