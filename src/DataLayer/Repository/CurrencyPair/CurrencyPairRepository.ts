import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { AddCurrencyPairModel } from '../../../DTO/CurrencyPair/AddCurrencyPair';
import { GetCurrencyPairInfoModel, GetPairsForUpdateCurrencyPair } from '../../../DTO/CurrencyPair/GetCurrencyPairInfo';
import { UpdateCurrencyPairModel } from '../../../DTO/CurrencyPair/UpdateCurrencyPair';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { ICurrencyPairDoc } from '../../Context/CurrencyPair/ICurrencyPairDoc';
import { CurrencyPairEntitie } from '../../Context/CurrencyPair/CurrencyPair';
import { ICurrencyPairRepository } from './ICurrencyPairRepository';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllCurrencyPairFilter } from '../../../DTO/CurrencyPair/GetAllCurrencyPairFilter';
import UnitOfWork from '../UnitOfWork/UnitOfWork';

export default class CurrencyPairRepository implements ICurrencyPairRepository {

    /****
      *
      * Create CurrencyPair
      *
      ****/
    async CreateCurrencyPair(item: AddCurrencyPairModel): Promise<OperationResult<boolean>> {

        try {

            const CurrencyPair = await CurrencyPairEntitie.
                build({
                    coinId: item.coinId,
                    exchangeId: item.exchangeId,
                    isPublish: item.isPublish,
                    pairs: [...item.pairs]
                });

            await CurrencyPair.save();

            return OperationResult.BuildSuccessResult("Success Create CurrencyPair", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set CurrencyPair
      *
      ****/
    async UpdateCurrencyPair(item: UpdateCurrencyPairModel): Promise<OperationResult<boolean>> {
        try {



            await CurrencyPairEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        coinId: item.coinId,
                        exchangeId: item.exchangeId,
                        isPublish: item.isPublish,
                        pairs: [...item.pairs]
                    }
                });

            return OperationResult.BuildSuccessResult("Success Update CurrencyPair", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete CurrencyPair
     *
     ****/
    async DeleteCurrencyPair(id: string): Promise<OperationResult<boolean>> {

        try {

            await CurrencyPairEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete CurrencyPair", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllCurrencyPairSelect(): Promise<OperationResult<ICurrencyPairDoc[]>> {

        try {

            const getAllCurrencyPair = await CurrencyPairEntitie.find({})
                .where("isDelete")
                .equals(false)
                .where("isPublish")
                .equals(true);

            return OperationResult.BuildSuccessResult("Get All CurrencyPairs", getAllCurrencyPair);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll CurrencyPair Paging
    *
    ****/
    async GetAllCurrencyPairPaging(items: FilterViewModel<GetAllCurrencyPairFilter>): Promise<OperationResult<GetAllPagingModel<ICurrencyPairDoc>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllCurrencyPairFilter];

                query.push({ [key]: value });

            });

            let exchnageList = await CurrencyPairEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await CurrencyPairEntitie.find({})
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
    async GetByIdCurrencyPair(id: string): Promise<OperationResult<GetCurrencyPairInfoModel>> {

        try {

            let coinsSelectModel: GetPairsForUpdateCurrencyPair[] = [];

            const getCurrencyPairById = await CurrencyPairEntitie.findById({ _id: id })
                .where("isPublish")
                .equals(true);

            if (!getCurrencyPairById) {

                return OperationResult.BuildFailur("Can not find this CurrencyPair");

            }

            const coinsSelect = await UnitOfWork.CoinRepository.
                GetAllCoinSelect();

            coinsSelect.result?.forEach((data: any) => {

                getCurrencyPairById.pairs.forEach((element: any) => {
                    coinsSelectModel.push({
                        id: data.id,
                        isSelected: data.id.toString() === element.toString(),
                        symbol: data.symbol,
                        name: data.name
                    })
                })

            })

            return OperationResult.BuildSuccessResult("Get All CurrencyPairs", {
                id: getCurrencyPairById._id,
                coinId: getCurrencyPairById.coinId,
                exchangeId: getCurrencyPairById.exchangeId,
                isPublish: getCurrencyPairById.isPublish,
                pairs: coinsSelectModel
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}