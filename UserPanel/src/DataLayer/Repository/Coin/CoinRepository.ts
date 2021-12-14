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
import UnitOfWork from '../UnitOfWork/UnitOfWork';
import { GetNetworksForUpdateCurrencyPair } from '../../../DTO/Coin/GetNetworksForUpdateCurrencyPair';

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

            const checkValidNetwork = await this.checkExsistNetwork(item.networks);

            if (!checkValidNetwork.success) {
                return OperationResult.BuildFailur(checkValidNetwork.message);

            }

            const Coin = await CoinEntitie.
                build({
                    name: item.name,
                    isDelete: false,
                    symbol: item.symbol,
                    isPublish: item.isPublish,
                    icon: avatarUrl,
                    networks: [...item.networks],
                    locals: [...item.locals]
                });

            await Coin.save();

            return OperationResult.BuildSuccessResult("Success Create Coin", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    async checkExsistNetwork(networks: string[]): Promise<OperationResult<boolean>> {
        try {
            let hasError = false;
            const mapLoop = async () => {

                const get = networks.map(async (res: string) => {

                    const data = await UnitOfWork.NetworkRepository.GetByIdNetwork(res);

                    if (!data.success) {
                        hasError = true;
                    }
                });

                const network = await Promise.all(get);
            }

            await mapLoop();

            if (hasError) {
                return OperationResult.BuildFailur("we can not fidn the newtork");

            }
            return OperationResult.BuildSuccessResult("web can not find network selected", true);

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

            const checkValidNetwork = await this.checkExsistNetwork(item.networks);

            if (!checkValidNetwork.success) {
                return OperationResult.BuildFailur(checkValidNetwork.message);

            }

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
                        networks: [...item.networks],
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
                const name = data.locals.find(x => x.lang === lang)?.value.name;
                getSelectedCoin.push({
                    id: data.id,
                    icon: data.icon,
                    symbol: data.symbol,
                    name: name ?
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
    async GetAllCoinPaging(items: FilterViewModel<GetAllCoinFilter>): Promise<OperationResult<GetAllPagingModel<ICoinDoc>>> {
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

            let networkSelectModel: GetNetworksForUpdateCurrencyPair[] = [];

            const getCoinById = await CoinEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getCoinById) {

                return OperationResult.BuildFailur("Can not find this Coin");

            }

            const networkSelectSelect = await UnitOfWork.NetworkRepository.
                GetAllNetworkSelect();

            networkSelectSelect.result?.forEach((data: any) => {

                let selected = false;
                getCoinById.networks.forEach((element: any) => {
                    if (data.id.toString() === element.toString()) {
                        selected = true;
                    }
                })
                networkSelectModel.push({
                    id: data.id,
                    isSelected: selected,
                    name: data.name
                })

            });

            return OperationResult.BuildSuccessResult("Get All Coins", {
                id: getCoinById._id,
                name: getCoinById.name,
                symbol: getCoinById.symbol,
                isPublish: getCoinById.isPublish,
                icon: getCoinById.icon,
                networks: networkSelectModel,
                locals: getCoinById.locals
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}