import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { AddExchangeModel } from '../../../DTO/Exchange/AddExchange';
import { GetExchangeInfoModel } from '../../../DTO/Exchange/GetExchangeInfo';
import { UpdateExchangeModel } from '../../../DTO/Exchange/UpdateExchange';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { IExchangeDoc } from '../../Context/Exchange/IExchangeDoc';
import { ExchangeEntitie } from '../../Context/Exchange/Exchange';
import { IExchangeRepository } from './IExchangeRepository';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllExchangeFilter } from '../../../DTO/Exchange/GetAllExchangeFilter';

export default class ExchangeRepository implements IExchangeRepository {

    /****
      *
      * Create Exchange
      *
      ****/
    async CreateExchange(item: AddExchangeModel): Promise<OperationResult<boolean>> {

        try {

            const Exchange = await ExchangeEntitie.
                build({
                    name: item.name,
                    isDelete: false,
                    symbol: item.symbol,
                    isPublish: item.isPublish
                });

            await Exchange.save();

            return OperationResult.BuildSuccessResult("Success Create Exchange", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Exchange
      *
      ****/
    async UpdateExchange(item: UpdateExchangeModel): Promise<OperationResult<boolean>> {
        try {

            await ExchangeEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        symbol: item.symbol,
                        isPublish: item.isPublish
                    }
                });

            return OperationResult.BuildSuccessResult("Success Update Exchange", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Exchange
     *
     ****/
    async DeleteExchange(id: string): Promise<OperationResult<boolean>> {

        try {

            await ExchangeEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete Exchange", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllExchangeSelect(): Promise<OperationResult<IExchangeDoc[]>> {

        try {

            const getAllExchange = await ExchangeEntitie.find({})
                .where("isDelete")
                .equals(false)
                .select("name symbol");

            return OperationResult.BuildSuccessResult("Get All Exchanges", getAllExchange);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Exchange Paging
    *
    ****/
    async GetAllExchangePaging(items: FilterViewModel<GetAllExchangeFilter>): Promise<OperationResult<GetAllPagingModel<IExchangeDoc>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllExchangeFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'symbol' && value) {
                    query.push({ symbol: { $regex: `(.*)${value}(.*)` } });
                }
            });

            let exchnageList = await ExchangeEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await ExchangeEntitie.find({})
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
    * Get ById Permission
    *
    ****/
    async GetByIdExchange(id: string): Promise<OperationResult<GetExchangeInfoModel>> {

        try {

            let getAllPermission: FileNode[] = [];

            const getExchangeById = await ExchangeEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getExchangeById) {

                return OperationResult.BuildFailur("Can not find this Exchange");

            }


            return OperationResult.BuildSuccessResult("Get All Exchanges", {
                id: getExchangeById._id,
                name: getExchangeById.name,
                symbol: getExchangeById.symbol,
                isPublish: getExchangeById.isPublish
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}