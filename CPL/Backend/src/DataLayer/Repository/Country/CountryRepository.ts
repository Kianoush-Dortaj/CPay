import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { AddCountryModel } from '../../../DTO/Country/AddCountry';
import { GetCountryInfoModel } from '../../../DTO/Country/GetCountryInfo';
import { UpdateCountryModel } from '../../../DTO/Country/UpdateCountry';
import { ICountryDoc } from '../../Context/Country/ICountryDoc';
import { CountryEntitie } from '../../Context/Country/Country';
import UtilService from '../../../Utilities/Util';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllCountryFilter } from '../../../DTO/Country/GetAllCountryFilter';
import { ICountryRepository } from './ICountryRepository';


export default class CountryRepository implements ICountryRepository {

    /****
      *
      * Create Country
      *
      ****/
    async CreateCountry(item: AddCountryModel): Promise<OperationResult<boolean>> {

        try {

            if (item.isDefault == true) {

                const changeIsDefulatItem = await this
                    .FindIsDefulatItemAndChangeIt();

                if (!changeIsDefulatItem.success) {
                    return OperationResult.BuildFailur(changeIsDefulatItem.message);

                }
            }

            let flag = UtilService.getDirectoryImage(
                `${item.flag.destination}/${item.flag.originalname}`
            );

            const Country = await CountryEntitie.build({
                displayOrder: item.displayOrder,
                flag: flag,
                isDefault: item.isDefault,
                isDelete: false,
                isPublish: item.isPublish,
                name: item.name,
                callCode: item.callCode,
                iso2Code: item.iso2Code,
                iso3Code: item.iso3Code,
                languageId: item.languageId,
            });

            await Country.save();

            return OperationResult.BuildSuccessResult("Success Create Country", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Country
      *
      ****/
    async UpdateCountry(item: UpdateCountryModel): Promise<OperationResult<boolean>> {
        try {

            let flag;

            if (item.isDefault == true) {

                const changeIsDefulatItem = await this.FindIsDefulatItemAndChangeIt();
                if (!changeIsDefulatItem.success) {
                    return OperationResult.BuildFailur(changeIsDefulatItem.message);

                }
            }

            if (item.flag) {

                flag = UtilService.getDirectoryImage(
                    `${item.flag.destination}/${item.flag.originalname}`
                );
            } else {
                const coinItem = await this.GetByIdCountry(item.id);
                flag = coinItem.result?.flag;
            }

            await CountryEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        displayOrder: item.displayOrder,
                        flag: flag,
                        isDefault: item.isDefault,
                        isDelete: false,
                        isPublish: item.isPublish,
                        name: item.name,
                        callCode: item.callCode,
                        iso2Code: item.iso2Code,
                        iso3Code: item.iso3Code,
                        languageId: item.languageId,
                    }
                });


            return OperationResult.BuildSuccessResult("Success Update Country", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Country
     *
     ****/
    async DeleteCountry(id: string): Promise<OperationResult<boolean>> {

        try {

            await CountryEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete Country", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllCountrySelect(): Promise<OperationResult<ICountryDoc[]>> {

        try {

            const getAllCountry = await CountryEntitie.find({})
                .where("isDelete")
                .equals(false)
                .where("isPublish")
                .equals(true)
                .sort([['displayOrder', "descending"], ['isDefault', -1]])
                .select("name iso3Code callCode flagImageFileName isDefault");

            return OperationResult.BuildSuccessResult("Get All Countrys", getAllCountry);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll Country
    *
    ****/
    async GetAllCountryPaging(items: FilterViewModel<GetAllCountryFilter>): Promise<OperationResult<ICountryDoc[]>> {

        try {
            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllCountryFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'uniqueSeoCode' && value) {
                    query.push({ uniqueSeoCode: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let userList = await CountryEntitie.find(...query).skip((items.page - 1) * items.pageSize)
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
    async GetByIdCountry(id: string): Promise<OperationResult<GetCountryInfoModel>> {

        try {

            let getAllPermission: FileNode[] = [];

            const getCountryById = await CountryEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getCountryById) {

                return OperationResult.BuildFailur("Can not find this Country");

            }


            return OperationResult.BuildSuccessResult("Get All Countrys", {
                id: getCountryById._id,
                displayOrder: getCountryById.displayOrder,
                isDefault: getCountryById.isDefault,
                isPublish: getCountryById.isPublish,
                name: getCountryById.name,
                callCode: getCountryById.callCode,
                iso2Code: getCountryById.iso2Code,
                iso3Code: getCountryById.iso3Code,
                languageId: getCountryById.languageId,
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


            const getCountryById = await CountryEntitie.findOne({ isDefault: true })
                .where("isDelete")
                .equals(false);

            if (!getCountryById) {

                return OperationResult.BuildSuccessResult(
                    "Can not find this Country", true);

            }

            const updateCountry = await this.UpdateCountry({
                id: getCountryById._id,
                displayOrder: getCountryById.displayOrder,
                flag: getCountryById.flag,
                isDefault: getCountryById.isDefault,
                isPublish: getCountryById.isPublish,
                name: getCountryById.name,
                callCode: getCountryById.callCode,
                iso2Code: getCountryById.iso2Code,
                iso3Code: getCountryById.iso3Code,
                languageId: getCountryById.languageId,
            });

            if (!updateCountry.success) {
                return OperationResult.BuildFailur(updateCountry.message);

            }

            return OperationResult.BuildSuccessResult("Get All Countrys", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
    /****
    *
    * Get Defualt
    *
    ****/
    async GetDefulatCountry(): Promise<OperationResult<GetCountryInfoModel>> {

        try {

            const getCountryById = await CountryEntitie.findOne({})
                .where("isDelete")
                .equals(false)
                .where("isDefault")
                .equals(true);

            if (!getCountryById) {

                return OperationResult.BuildFailur("Can not find this Country");

            }

            return OperationResult.BuildSuccessResult("Get All Country", {
                id: getCountryById._id,
                displayOrder: getCountryById.displayOrder,
                isDefault: getCountryById.isDefault,
                isPublish: getCountryById.isPublish,
                name: getCountryById.name,
                callCode: getCountryById.callCode,
                iso2Code: getCountryById.iso2Code,
                iso3Code: getCountryById.iso3Code,
                languageId: getCountryById.languageId
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
    /****
      *
      * Get Country By UniSeo Code
      *
      ****/
    async FindCountryByUniSeoCode(code: string): Promise<OperationResult<GetCountryInfoModel>> {
        try {

            const getCountryById = await CountryEntitie.findOne({ uniqueSeoCode: code })
                .where("isDelete")
                .equals(false);

            if (!getCountryById) {

                return OperationResult.BuildFailur("Can not find this Country");

            }

            return OperationResult.BuildSuccessResult("Get All Countrys", {
                id: getCountryById._id,
                displayOrder: getCountryById.displayOrder,
                isDefault: getCountryById.isDefault,
                isPublish: getCountryById.isPublish,
                name: getCountryById.name,
                callCode: getCountryById.callCode,
                iso2Code: getCountryById.iso2Code,
                iso3Code: getCountryById.iso3Code,
                languageId: getCountryById.languageId,
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

}