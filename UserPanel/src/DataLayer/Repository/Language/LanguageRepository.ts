import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { AddLanguageModel } from '../../../DTO/Language/AddLanguage';
import { GetLanguageInfoModel } from '../../../DTO/Language/GetLanguageInfo';
import { UpdateLanguageModel } from '../../../DTO/Language/UpdateLanguage';
import { ILanguageDoc } from '../../Context/Language/ILanguageDoc';
import { LanguageEntitie } from '../../Context/Language/Language';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllLanguageFilter } from '../../../DTO/Language/GetAllLangaugeFilter';
import { ILanguageRepository } from './ILanguageRepository';
import UtilService from '../../../Utilities/Util';


export default class LanguageRepository implements ILanguageRepository {

    /****
      *
      * Create Language
      *
      ****/
    async CreateLanguage(item: AddLanguageModel): Promise<OperationResult<boolean>> {

        try {

            if (item.isDefault == true) {

                const changeIsDefulatItem = await this
                    .FindIsDefulatItemAndChangeIt();

                if (!changeIsDefulatItem.success) {
                    return OperationResult.BuildFailur(changeIsDefulatItem.message);

                }
            }

            let flagImageFileName = UtilService.getDirectoryImage(
                `${item.flagImageFileName.destination}/${item.flagImageFileName.originalname}`
            );

            const Language = await LanguageEntitie.build({
                displayOrder: item.displayOrder,
                flagImageFileName: flagImageFileName,
                isDefault: item.isDefault,
                isDelete: false,
                isPublish: item.isPublish,
                name: item.name,
                rtl: item.rtl,
                uniqueSeoCode: item.uniqueSeoCode
            });

            await Language.save();

            return OperationResult.BuildSuccessResult("Success Create Language", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Language
      *
      ****/
    async UpdateLanguage(item: UpdateLanguageModel): Promise<OperationResult<boolean>> {
        try {

            let flagImageFileName;

            if (item.isDefault == true) {

                const changeIsDefulatItem = await this.FindIsDefulatItemAndChangeIt();
                if (!changeIsDefulatItem.success) {
                    return OperationResult.BuildFailur(changeIsDefulatItem.message);

                }
            }

            if (item.flagImageFileName) {

                flagImageFileName = UtilService.getDirectoryImage(
                    `${item.flagImageFileName.destination}/${item.flagImageFileName.originalname}`
                );
            } else {
                const coinItem = await this.GetByIdLanguage(item.id);
                flagImageFileName = coinItem.result?.flagImageFileName;
            }

            await LanguageEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        displayOrder: item.displayOrder,
                        flagImageFileName: flagImageFileName,
                        isDefault: item.isDefault,
                        isDelete: false,
                        isPublish: item.isPublish,
                        name: item.name,
                        rtl: item.rtl,
                        uniqueSeoCode: item.uniqueSeoCode
                    }
                });


            return OperationResult.BuildSuccessResult("Success Update Language", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Language
     *
     ****/
    async DeleteLanguage(id: string): Promise<OperationResult<boolean>> {

        try {

            await LanguageEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete Language", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllLanguageSelect(): Promise<OperationResult<ILanguageDoc[]>> {

        try {

            const getAllLanguage = await LanguageEntitie.find({})
                .where("isDelete")
                .equals(false)
                .sort([['displayOrder', "descending"], ['isDefault', -1]])
                .select("name uniqueSeoCode rtl flagImageFileName isDefault");

            return OperationResult.BuildSuccessResult("Get All Languages", getAllLanguage);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll Langauge
    *
    ****/
    async GetAllLangaugePaging(items: FilterViewModel<GetAllLanguageFilter>): Promise<OperationResult<ILanguageDoc[]>> {

        try {
            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllLanguageFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'uniqueSeoCode' && value) {
                    query.push({ uniqueSeoCode: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let userList = await LanguageEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            return OperationResult.BuildSuccessResult('Operation Success', userList);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }
    /****
    *
    * Get ById Permission
    *
    ****/
    async GetByIdLanguage(id: string): Promise<OperationResult<GetLanguageInfoModel>> {

        try {

            let getAllPermission: FileNode[] = [];

            const getLanguageById = await LanguageEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getLanguageById) {

                return OperationResult.BuildFailur("Can not find this Language");

            }


            return OperationResult.BuildSuccessResult("Get All Languages", {
                id: getLanguageById._id,
                displayOrder: getLanguageById.displayOrder,
                flagImageFileName: getLanguageById.flagImageFileName,
                isDefault: getLanguageById.isDefault,
                isPublish: getLanguageById.isPublish,
                name: getLanguageById.name,
                rtl: getLanguageById.rtl,
                uniqueSeoCode: getLanguageById.uniqueSeoCode
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


            const getLanguageById = await LanguageEntitie.findOne({ isDefault: true })
                .where("isDelete")
                .equals(false);

            if (!getLanguageById) {

                return OperationResult.BuildSuccessResult(
                    "Can not find this Language", true);

            }

            const updateLanguage = await this.UpdateLanguage({
                id: getLanguageById._id,
                isDefault: false,
                isPublish: getLanguageById.isPublish,
                name: getLanguageById.name,
                displayOrder: getLanguageById.displayOrder,
                flagImageFileName: getLanguageById.flagImageFileName,
                rtl: getLanguageById.rtl,
                uniqueSeoCode: getLanguageById.uniqueSeoCode
            });

            if (!updateLanguage.success) {
                return OperationResult.BuildFailur(updateLanguage.message);

            }

            return OperationResult.BuildSuccessResult("Get All Languages", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
    /****
    *
    * Get Defualt
    *
    ****/
    async GetDefulatLanguage(): Promise<OperationResult<GetLanguageInfoModel>> {

        try {

            const getLanguageById = await LanguageEntitie.findOne({})
                .where("isDelete")
                .equals(false)
                .where("isDefault")
                .equals(true);

            if (!getLanguageById) {

                return OperationResult.BuildFailur("Can not find this Language");

            }

            return OperationResult.BuildSuccessResult("Get All Language", {
                id: getLanguageById._id,
                displayOrder: getLanguageById.displayOrder,
                flagImageFileName: getLanguageById.flagImageFileName,
                isDefault: getLanguageById.isDefault,
                isPublish: getLanguageById.isPublish,
                name: getLanguageById.name,
                rtl: getLanguageById.rtl,
                uniqueSeoCode: getLanguageById.uniqueSeoCode
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
    /****
      *
      * Get Langauge By UniSeo Code
      *
      ****/
    async FindLanguageByUniSeoCode(code: string): Promise<OperationResult<GetLanguageInfoModel>> {
        try {

            const getLanguageById = await LanguageEntitie.findOne({ uniqueSeoCode: code })
                .where("isDelete")
                .equals(false);

            if (!getLanguageById) {

                return OperationResult.BuildFailur("Can not find this Language");

            }

            return OperationResult.BuildSuccessResult("Get All Languages", {
                id: getLanguageById._id,
                displayOrder: getLanguageById.displayOrder,
                flagImageFileName: getLanguageById.flagImageFileName,
                isDefault: getLanguageById.isDefault,
                isPublish: getLanguageById.isPublish,
                name: getLanguageById.name,
                rtl: getLanguageById.rtl,
                uniqueSeoCode: getLanguageById.uniqueSeoCode
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

}