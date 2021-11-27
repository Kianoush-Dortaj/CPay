import OperationResult from '../../../core/Operation/OperationResult';
import { AddGetwayModel } from '../../../DTO/Getway/AddGetway';
import { GetGetwayInfoModel } from '../../../DTO/Getway/GetGetwayInfo';
import { UpdateGetwayModel } from '../../../DTO/Getway/UpdateGetway';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { IGetwayDoc } from '../../Context/Getway/IGetwayDoc';
import { GetwayEntitie } from '../../Context/Getway/Getway';
import { IGetwayRepository } from './IGetwayRepository';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllGetwayFilter } from '../../../DTO/Getway/GetAllGetwayFilter';
import UtilService from '../../../Utilities/Util';
import { Listen } from '../../../Utilities/Websocket/Pattern/listen-chanel';
import { ListenType } from '../../../Utilities/Websocket/Pattern/listen-type';
import { IGetwayLocalItem } from '../../Context/Getway/IGetwayLocalItems';
import { MultiLanguageSelect } from '../../../DTO/Common/MultiSelectLang';
import { GetAllGetwaySelect } from '../../../DTO/Getway/GetAllGetwaySelect';

export default class GetwayRepository implements IGetwayRepository {

    /****
      *
      * Create Getway
      *
      ****/
    async CreateGetway(item: AddGetwayModel): Promise<OperationResult<boolean>> {

        try {

            let avatarUrl = UtilService.getDirectoryImage(
                `${item.icon.destination}/${item.icon.originalname}`
            );
            const Getway = await GetwayEntitie.
                build({
                    name: item.name,
                    isDelete: false,
                    description: item.description,
                    isPublish: item.isPublish,
                    icon: avatarUrl,
                    locals: [...item.locals]
                });

            await Getway.save();

            return OperationResult.BuildSuccessResult("Success Create Getway", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Getway
      *
      ****/
    async UpdateGetway(item: UpdateGetwayModel): Promise<OperationResult<boolean>> {
        try {

            let avatarUrl;

            if (item.icon) {

                avatarUrl = UtilService.getDirectoryImage(
                    `${item.icon.destination}/${item.icon.originalname}`
                );
            } else {
                const coinItem = await this.GetByIdGetway(item.id);
                avatarUrl = coinItem.result?.icon;
            }

            await GetwayEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        description: item.description,
                        icon: avatarUrl,
                        isPublish: item.isPublish,
                        locals: [...item.locals]
                    }
                });

            return OperationResult.BuildSuccessResult("Success Update Getway", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Getway
     *
     ****/
    async DeleteGetway(id: string): Promise<OperationResult<boolean>> {

        try {

            await GetwayEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete Getway", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllGetwaySelect(lang?: string): Promise<OperationResult<GetAllGetwaySelect[]>> {

        try {

            const getSelectedGetway: GetAllGetwaySelect[] = [];

            const getAllGetway = await GetwayEntitie.find({})
                .where("isDelete")
                .equals(false)
                .where("isPublish")
                .equals(true)
                .select("name symbol icon locals");

            getAllGetway.forEach(data => {

                const name = data.locals.find(x => x.lang === lang)?.value.name;
                const description = data.locals.find(x => x.lang === lang)?.value.description;

                getSelectedGetway.push({
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

            return OperationResult.BuildSuccessResult("Get All Select Getway Getways", getSelectedGetway);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Getway Paging
    *
    ****/
    async GetAllGetwayPaging(items: FilterViewModel<GetAllGetwayFilter>): Promise<OperationResult<GetAllPagingModel<IGetwayDoc>>> {
 
        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllGetwayFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let exchnageList = await GetwayEntitie.find(...query)
                .skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await GetwayEntitie.find({})
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
    async GetByIdGetway(id: string): Promise<OperationResult<GetGetwayInfoModel>> {

        try {

            const getGetwayById = await GetwayEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getGetwayById) {

                return OperationResult.BuildFailur("Can not find this Getway");

            }

            return OperationResult.BuildSuccessResult("Get All Getways", {
                id: getGetwayById._id,
                name: getGetwayById.name,
                description: getGetwayById.description,
                isPublish: getGetwayById.isPublish,
                icon: getGetwayById.icon,
                locals: getGetwayById.locals
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}