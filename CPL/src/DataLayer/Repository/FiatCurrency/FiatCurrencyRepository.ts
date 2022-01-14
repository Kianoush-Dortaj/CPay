import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { IFiatCurrencyDoc } from '../../Context/FiatCurrency/IFiatCurrencyDoc';
import { FiatCurrencyEntitie } from '../../Context/FiatCurrency/FiatCurrency';
import UtilService from '../../../Utilities/Util';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { IFiatCurrencyRepository } from './IFiatCurrencyRepository';
import { AddFiatCurrencyModel } from '../../../DTO/FiatCurrency/AddFiatCurrency';
import { UpdateFiatCurrencyModel } from '../../../DTO/FiatCurrency/UpdateFiatCurrency';
import { GetAllFiatCurrencyFilter } from '../../../DTO/FiatCurrency/GetAllFiatCurrencyFilter';
import { GetFiatCurrencyInfoModel } from '../../../DTO/FiatCurrency/GetFiatCurrencyInfo';


export default class FiatCurrencyRepository implements IFiatCurrencyRepository {

    /****
      *
      * Create FiatCurrency
      *
      ****/
    async CreateFiatCurrency(item: AddFiatCurrencyModel): Promise<OperationResult<boolean>> {

        try {

            let flag = UtilService.getDirectoryImage(
                `${item.logo.destination}/${item.logo.originalname}`
            );

            const FiatCurrency = await FiatCurrencyEntitie.build({
                currencyCode: item.currencyCode,
                isPublish: item.isPublish,
                logo: flag,
                name: item.name,
                displayOrder:item.displayOrder
            });

            await FiatCurrency.save();

            return OperationResult.BuildSuccessResult("Success Create FiatCurrency", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set FiatCurrency
      *
      ****/
    async UpdateFiatCurrency(item: UpdateFiatCurrencyModel): Promise<OperationResult<boolean>> {
        try {

            let flag;

            if (item.logo) {

                flag = UtilService.getDirectoryImage(
                    `${item.logo.destination}/${item.logo.originalname}`
                );
            } else {
                const coinItem = await this.GetByIdFiatCurrency(item.id);
                flag = coinItem.result?.logo;
            }

            await FiatCurrencyEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        currencyCode: item.currencyCode,
                        isPublish: item.isPublish,
                        logo: flag,
                        name: item.name,
                        displayOrder:item.displayOrder
                    }
                });


            return OperationResult.BuildSuccessResult("Success Update FiatCurrency", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete FiatCurrency
     *
     ****/
    async DeleteFiatCurrency(id: string): Promise<OperationResult<boolean>> {

        try {

            await FiatCurrencyEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete FiatCurrency", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllFiatCurrencySelect(): Promise<OperationResult<IFiatCurrencyDoc[]>> {

        try {

            const getAllFiatCurrency = await FiatCurrencyEntitie.find({})
                .where("isDelete")
                .equals(false)
                .where("isPublish")
                .equals(true)
                .sort([['displayOrder', "descending"]])
                .select("name logo currencyCode");

            return OperationResult.BuildSuccessResult("Get All FiatCurrencys", getAllFiatCurrency);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }
    /****
    *
    * GetAll FiatCurrency
    *
    ****/
    async GetAllFiatCurrencyPaging(items: FilterViewModel<GetAllFiatCurrencyFilter>): Promise<OperationResult<IFiatCurrencyDoc[]>> {

        try {
            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllFiatCurrencyFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'uniqueSeoCode' && value) {
                    query.push({ uniqueSeoCode: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let userList = await FiatCurrencyEntitie.find(...query).skip((items.page - 1) * items.pageSize)
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
    async GetByIdFiatCurrency(id: string): Promise<OperationResult<GetFiatCurrencyInfoModel>> {

        try {

            let getAllPermission: FileNode[] = [];

            const getFiatCurrencyById = await FiatCurrencyEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getFiatCurrencyById) {

                return OperationResult.BuildFailur("Can not find this FiatCurrency");

            }


            return OperationResult.BuildSuccessResult("Get All FiatCurrencys", {
                id: getFiatCurrencyById._id,
                displayOrder: getFiatCurrencyById.displayOrder,
                isPublish: getFiatCurrencyById.isPublish,
                name: getFiatCurrencyById.name,
                currencyCode:getFiatCurrencyById.currencyCode,
                logo:getFiatCurrencyById.logo
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
    

}