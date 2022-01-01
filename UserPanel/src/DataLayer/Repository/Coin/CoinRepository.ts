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
import { GetCoinBySymbol, GetCoinNetworks } from '../../../DTO/Coin/GetCoinBySymbol';
import { INetworkDoc } from '../../Context/Network/INetworkDoc';
import { IWalletDoc } from '../../Context/Wallet/IIWalletDoc';

export default class CoinRepository implements ICoinRepository {

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
    * Get ById
    *
    ****/
    async GetByIdCoin(id: string): Promise<OperationResult<any>> {

        try {


            const getCoinById = await CoinEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false)
                .populate([{
                    path: 'networks',
                    match: { isPublish: true, isDelete: false },
                    select: 'symbol name comission '
                }]);

            if (!getCoinById) {

                return OperationResult.BuildFailur("Can not find this Coin");

            }


            return OperationResult.BuildSuccessResult("Get All Coins", getCoinById);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
     *
     * Get ById
     *
     ****/
    async GetBySymbolCoin(symbol: string, userId: string, langId: string): Promise<OperationResult<GetCoinBySymbol>> {

        try {

            let walletsForNetworks;

            const getCoinById = await CoinEntitie.findOne({ symbol: symbol })
                .where("isDelete")
                .equals(false)
                .populate([{
                    path: 'networks',
                    match: { isPublish: true, isDelete: false },
                    select: 'symbol name comission'
                }]);

            const getUserWallets = await UnitOfWork.WalletRepository.GetUserWallet(userId);

            if (getCoinById && getCoinById.networks.length > 0) {

                walletsForNetworks = await this.WalletsForNetwork(getCoinById.networks, userId, getCoinById.id, getUserWallets.result);

            }

            if (!getCoinById) {

                return OperationResult.BuildFailur("Can not find this Coin");

            }

            const coinLocalName = getCoinById.locals.find(x => x.lang === langId)?.value.name;

            return OperationResult.BuildSuccessResult("Get All Coins", {
                coinIcon: getCoinById.icon,
                coinId: getCoinById.id,
                coinLocalName: coinLocalName ? coinLocalName : getCoinById.name,
                coinName: getCoinById.name,
                coinNetworks: walletsForNetworks?.result
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    async WalletsForNetwork(networks: INetworkDoc[], userId: string, coinId: string, userWallets?: IWalletDoc[]): Promise<OperationResult<GetCoinNetworks[]>> {

        let model: GetCoinNetworks[] = [];

        const mapLoop = async () => {

            const get = networks.map(async (res) => {

                let generateWalletAddress: string = '';

                let findUsercoinWalletByNetworkId = userWallets?.find(x => x.networkId == res.id);

                if (!findUsercoinWalletByNetworkId) {

                    const walletAddress = await UnitOfWork.WalletRepository.GenerateWalletForNetwork(res.symbol);

                    if (walletAddress.result) {

                        const createWallet = await UnitOfWork.WalletRepository.CreateWallet({
                            amount: 0,
                            coinId: coinId,
                            networkId: res.id,
                            privateKey: walletAddress.result.privateKey,
                            userId: userId,
                            publicAddress: walletAddress.result.publicAddrress
                        });

                        generateWalletAddress = walletAddress.result.publicAddrress;

                        if (!createWallet.success) {
                            return OperationResult.BuildFailur("we can not create wallet for this network , please try again");

                        }
                    } else {
                        return OperationResult.BuildFailur("we can not create wallet for this network , please try again");
                    }
                }
                model.push({
                    networkName: res.name,
                    networkRate: res.comission,
                    networkUserAddress: findUsercoinWalletByNetworkId ?
                        findUsercoinWalletByNetworkId.publicAddress :
                        generateWalletAddress,
                    symbol: res.symbol
                });
            });

            await Promise.all(get);
        }
        await mapLoop();

        return OperationResult.BuildSuccessResult("", model);
    }
}