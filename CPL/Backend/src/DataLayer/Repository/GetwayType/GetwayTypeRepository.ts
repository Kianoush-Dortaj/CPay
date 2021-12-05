import OperationResult from '../../../core/Operation/OperationResult';
import { AddGetwayTypeModel } from '../../../DTO/GetwayType/AddGetwayType';
import { GetGetwayTypeInfoModel } from '../../../DTO/GetwayType/GetGetwayTypeInfo';
import { UpdateGetwayTypeModel } from '../../../DTO/GetwayType/UpdateGetwayType';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { IGetwayTypeDoc } from '../../Context/GetwayType/IGetwayTypeDoc';
import { GetwayTypeEntitie } from '../../Context/GetwayType/GetwayType';
import { IGetwayTypeRepository } from './IGetwayTypeRepository';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllGetwayTypeFilter } from '../../../DTO/GetwayType/GetAllGetwayTypeFilter';
import UtilService from '../../../Utilities/Util';
import { GetAllGetwayTypeSelect } from '../../../DTO/GetwayType/GetAllGetwayTypeSelect';

export default class GetwayTypeRepository implements IGetwayTypeRepository {

    /****
      *
      * Create GetwayType
      *
      ****/
    async CreateGetwayType(item: AddGetwayTypeModel): Promise<OperationResult<boolean>> {

        try {

            let avatarUrl = UtilService.getDirectoryImage(
                `${item.icon.destination}/${item.icon.originalname}`
            );
            const GetwayType = await GetwayTypeEntitie.
                build({
                    name: item.name,
                    isDelete: false,
                    description: item.description,
                    comission: item.comission,
                    isPublish: item.isPublish,
                    icon: avatarUrl,
                    locals: [...item.locals]
                });

            await GetwayType.save();

            return OperationResult.BuildSuccessResult("Success Create GetwayType", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set GetwayType
      *
      ****/
    async UpdateGetwayType(item: UpdateGetwayTypeModel): Promise<OperationResult<boolean>> {
        try {

            let avatarUrl;

            if (item.icon) {

                avatarUrl = UtilService.getDirectoryImage(
                    `${item.icon.destination}/${item.icon.originalname}`
                );
            } else {
                const coinItem = await this.GetByIdGetwayType(item.id);
                avatarUrl = coinItem.result?.icon;
            }

            await GetwayTypeEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        description: item.description,
                        icon: avatarUrl,
                        comission: item.comission,
                        isPublish: item.isPublish,
                        locals: [...item.locals]
                    }
                });

            return OperationResult.BuildSuccessResult("Success Update GetwayType", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete GetwayType
     *
     ****/
    async DeleteGetwayType(id: string): Promise<OperationResult<boolean>> {

        try {

            await GetwayTypeEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete GetwayType", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllGetwayTypeSelect(lang?: string): Promise<OperationResult<GetAllGetwayTypeSelect[]>> {

        try {

            const getSelectedGetwayType: GetAllGetwayTypeSelect[] = [];

            const getAllGetwayType = await GetwayTypeEntitie.find({})
                .where("isDelete")
                .equals(false)
                .where("isPublish")
                .equals(true)
                .select("name description  icon locals");

            getAllGetwayType.forEach(data => {

                const name = data.locals.find(x => x.lang === lang)?.value.name;
                const description = data.locals.find(x => x.lang === lang)?.value.description;

                getSelectedGetwayType.push({
                    id: data.id,
                    icon: data.icon,
                    description: description ?
                        data.locals.find(x => x.lang === lang)?.value.description :
                        data.description,
                    name: name ?
                        data.locals.find(x => x.lang === lang)?.value.name :
                        data.name
                });
            });

            return OperationResult.BuildSuccessResult("Get All Select GetwayType GetwayTypes", getSelectedGetwayType);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll GetwayType Paging
    *
    ****/
    async GetAllGetwayTypePaging(items: FilterViewModel<GetAllGetwayTypeFilter>): Promise<OperationResult<GetAllPagingModel<IGetwayTypeDoc>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllGetwayTypeFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let exchnageList = await GetwayTypeEntitie.find(...query)
                .skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await GetwayTypeEntitie.find({})
                .where("isDelete")
                .equals(false)
                .estimatedDocumentCount();

            return OperationResult.BuildSuccessResult<GetAllPagingModel<any>>("Get All data Paging", {
                data: exchnageList,
                count: count
            });

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    /****
    *
    * Get ById
    *
    ****/
    async GetByIdGetwayType(id: string): Promise<OperationResult<GetGetwayTypeInfoModel>> {

        try {

            const getGetwayTypeById = await GetwayTypeEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getGetwayTypeById) {

                return OperationResult.BuildFailur("Can not find this GetwayType");

            }

            return OperationResult.BuildSuccessResult("Get All GetwayTypes", {
                id: getGetwayTypeById._id,
                name: getGetwayTypeById.name,
                description: getGetwayTypeById.description,
                isPublish: getGetwayTypeById.isPublish,
                comission : getGetwayTypeById.comission,
                icon: getGetwayTypeById.icon,
                locals: getGetwayTypeById.locals
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}