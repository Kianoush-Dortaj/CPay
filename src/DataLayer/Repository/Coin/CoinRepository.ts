import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { AddCoinModel } from '../../../DTO/Coin/AddCoin';
import { GetCoinInfoModel } from '../../../DTO/Coin/GetCoinInfo';
import { UpdateCoinModel } from '../../../DTO/Coin/UpdateCoin';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { ICoinDoc } from '../../Context/Coin/ICoinDoc';
import { CoinEntitie } from '../../Context/Coin/Coin';
import { ICoinRepository } from './ICoinRepository';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllCoinFilter } from '../../../DTO/Coin/GetAllCoinFilter';
import UtilService from './../../../Utilities/Util';
import { Listen } from '../../../Utilities/Websocket/Pattern/listen-chanel';
import { ListenType } from '../../../Utilities/Websocket/Pattern/listen-type';
import { ICoinLocalItem } from '../../Context/Coin/ICoinLocalItems';
import { MultiLanguageSelect } from '../../../DTO/Common/MultiSelectLang';
import { GetAllCoinSelect } from '../../../DTO/Coin/GetAllCoinSelect';

export default class CoinRepository implements ICoinRepository {

    /****
      *
      * Create Coin
      *
      ****/
    async CreateCoin(item: AddCoinModel): Promise<OperationResult<boolean>> {

        try {

            let avatarUrl = UtilService.getDirectoryImage(
                `${item.icon.destination}/${item.icon.originalname}`
            );
            const Coin = await CoinEntitie.
                build({
                    name: item.name,
                    isDelete: false,
                    symbol: item.symbol,
                    isPublish: item.isPublish,
                    icon: avatarUrl,
                    locals: [...item.locals]
                });

            await Coin.save();

            return OperationResult.BuildSuccessResult("Success Create Coin", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Coin
      *
      ****/
    async UpdateCoin(item: UpdateCoinModel): Promise<OperationResult<boolean>> {
        try {

            let avatarUrl;

            if (item.icon) {

                avatarUrl = UtilService.getDirectoryImage(
                    `${item.icon.destination}/${item.icon.originalname}`
                );
            } else {
                const coinItem = await this.GetByIdCoin(item.id);
                avatarUrl = coinItem.result?.icon;
            }

            await CoinEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        symbol: item.symbol,
                        icon: avatarUrl,
                        isPublish: item.isPublish,
                        locals: [...item.locals]
                    }
                });

            new Listen(ListenType.UpdateCurrencyPairs).listen({
                data: '',
                userId: ''
            });

            return OperationResult.BuildSuccessResult("Success Update Coin", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Coin
     *
     ****/
    async DeleteCoin(id: string): Promise<OperationResult<boolean>> {

        try {

            await CoinEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            new Listen(ListenType.UpdateCurrencyPairs).listen({
                data: '',
                userId: ''
            });

            return OperationResult.BuildSuccessResult("Success Delete Coin", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllCoinSelect(lang?: string): Promise<OperationResult<GetAllCoinSelect[]>> {

        try {

            const getSelectedCoin: GetAllCoinSelect[] = [];

            const getAllCoin = await CoinEntitie.find({})
                .where("isDelete")
                .equals(false)
                .where("isPublish")
                .equals(true)
                .select("name symbol icon locals");

            getAllCoin.forEach(data => {
                getSelectedCoin.push({
                    id:data.id,
                    icon: data.icon,
                    symbol: data.symbol,
                    name: lang ?
                        data.locals.find(x => x.lang === lang)?.value.name :
                        data.name
                });
            });

            return OperationResult.BuildSuccessResult("Get All Select Coin Coins", getSelectedCoin);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Coin Paging
    *
    ****/
    async GetAllCoinPaging(items: FilterViewModel<GetAllCoinFilter>, lang: ICoinLocalItem): Promise<OperationResult<GetAllPagingModel<ICoinDoc>>> {
        console.log(lang)
        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllCoinFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'symbol' && value) {
                    query.push({ symbol: { $regex: `(.*)${value}(.*)` } });
                }
            });

            let exchnageList = await CoinEntitie.find(...query)
                .skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await CoinEntitie.find({})
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
    async GetByIdCoin(id: string): Promise<OperationResult<GetCoinInfoModel>> {

        try {

            const getCoinById = await CoinEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getCoinById) {

                return OperationResult.BuildFailur("Can not find this Coin");

            }

            return OperationResult.BuildSuccessResult("Get All Coins", {
                id: getCoinById._id,
                name: getCoinById.name,
                symbol: getCoinById.symbol,
                isPublish: getCoinById.isPublish,
                icon: getCoinById.icon,
                locals: getCoinById.locals
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}