import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { IFiatAssetDoc } from '../../Context/FiatAsset/IFiatAssetDoc';
import { FiatAssetEntitie } from '../../Context/FiatAsset/FiatAsset';
import { IFiatAssetRepository } from './IFiatAssetRepository';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllFiatAssetFilter } from '../../../DTO/FiatAsset/GetAllFiatAssetFilter';
import { GetFiatAssetInfoModel } from '../../../DTO/FiatAsset/GetFiatAssetInfo';
import { UpdateFiatAssetModel } from '../../../DTO/FiatAsset/UpdateFiatAsset';
import { AddFiatAssetModel } from '../../../DTO/FiatAsset/AddFiatAsset';
import { GetAssetWalletInfo } from '../../../DTO/FiatAsset/GetAssetWalletInfo';
import UtilService from '../../../Utilities/Util';
import { FiatUtil } from '../../../Utilities/Convert/Fiat/FiatUtil';

export default class FiatAssetRepository implements IFiatAssetRepository {


    /****
      *
      * Create FiatAsset
      *
      ****/
    async CreateFiatAsset(item: AddFiatAssetModel): Promise<OperationResult<string>> {

        try {

            const FiatAsset = await FiatAssetEntitie.
                build({
                    currency: item.currency,
                    inventory: item.inventory,
                    isActive: item.isActive,
                    userId: item.userId,
                    walletAddress: UtilService.genRanHex(12)
                });

            await FiatAsset.save();

            return OperationResult.BuildSuccessResult("Success Create FiatAsset", FiatAsset.id);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set FiatAsset
      *
      ****/
    async UpdateFiatAsset(item: UpdateFiatAssetModel): Promise<OperationResult<string>> {
        try {

            await FiatAssetEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        currency: item.currency,
                        inventory: item.inventory,
                        isActive: item.isActive,
                        userId: item.userId
                    }
                });

            return OperationResult.BuildSuccessResult("Success Update FiatAsset", item.id);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete FiatAsset
     *
     ****/
    async DeleteFiatAsset(id: string): Promise<OperationResult<boolean>> {

        try {

            await FiatAssetEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete FiatAsset", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllFiatAssetSelect(): Promise<OperationResult<IFiatAssetDoc[]>> {

        try {

            const getAllFiatAsset = await FiatAssetEntitie.find({})
                .where("isDelete")
                .equals(false)
                .select("name symbol");

            return OperationResult.BuildSuccessResult("Get All FiatAssets", getAllFiatAsset);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll FiatAsset Paging
    *
    ****/
    async GetAllFiatAssetPaging(items: FilterViewModel<GetAllFiatAssetFilter>): Promise<OperationResult<GetAllPagingModel<IFiatAssetDoc>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllFiatAssetFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'symbol' && value) {
                    query.push({ symbol: { $regex: `(.*)${value}(.*)` } });
                }
            });

            let exchnageList = await FiatAssetEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await FiatAssetEntitie.find({})
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
    async GetByIdFiatAsset(id: string): Promise<OperationResult<GetFiatAssetInfoModel>> {

        try {

            const getFiatAssetById = await FiatAssetEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getFiatAssetById) {

                return OperationResult.BuildFailur("Can not find this FiatAsset");

            }


            return OperationResult.BuildSuccessResult("Get All FiatAssets", {
                id: getFiatAssetById._id,
                currency: getFiatAssetById.currency,
                inventory: getFiatAssetById.inventory,
                isActive: getFiatAssetById.isActive,
                userId: getFiatAssetById.userId,
                walletAddress: getFiatAssetById.walletAddress
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
    *
    * Get Assetes By UserId
    *
    ****/
    async GetFiatAssetsByUserId(id: string): Promise<OperationResult<GetAssetWalletInfo[]>> {

        try {

            const fiatAssets: GetAssetWalletInfo[] = [];

            const getFiatAssetById = await FiatAssetEntitie.find({ userId: id })
                .where("isActive")
                .equals(true)
                .populate({
                    path: 'currency'
                });

            console.log(getFiatAssetById)

            if (!getFiatAssetById) {

                return OperationResult.BuildFailur("Can not find this FiatAsset");

            }

            getFiatAssetById.forEach(data => {
                fiatAssets.push({
                    assetInventory: data.inventory,
                    assetLogo: data.currency.logo,
                    assetName: data.currency.name,
                    walletAddress: data.walletAddress
                })
            })

            return OperationResult.BuildSuccessResult("Get All FiatAssets", fiatAssets);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
    *
    * Get Assetes By CurrencyId
    *
    ****/
    async GetFiatAssetsByCurrencyId(id: string): Promise<OperationResult<GetAssetWalletInfo>> {

        try {

            const getFiatAssetById = await FiatAssetEntitie.findOne({ currency: id })
                .where("isActive")
                .equals(false)
                .populate("currency");

            if (!getFiatAssetById) {

                return OperationResult.BuildFailur("Can not find this FiatAsset");

            }

            return OperationResult.BuildSuccessResult("Get FiatAssets By Currency Id", {
                assetInventory: getFiatAssetById.inventory,
                assetLogo: getFiatAssetById.currency.logo,
                assetName: getFiatAssetById.currency.name,
                walletAddress: getFiatAssetById.walletAddress
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }


    /****
    *
    * Get Assetes By CurrencyId
    *
    ****/
    async CheckValidateAssetsForUser(assetId: string, userId: string): Promise<OperationResult<IFiatAssetDoc>> {

        try {
            const getFiatAssetById = await FiatAssetEntitie.findOne({ _id: assetId, userId: userId })
                .where("isActive")
                .equals(true)
                .populate("currency");

            if (!getFiatAssetById) {

                return OperationResult.BuildFailur("this is not youe wallet");

            }

            return OperationResult.BuildSuccessResult("Get FiatAssets By Currency Id", getFiatAssetById);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
    *
    * Get Assetes By CurrencyId
    *
    ****/
    async UpdateOrCreateWallet(id: string, amount: string, userId: string): Promise<OperationResult<string>> {

        try {
            let result: OperationResult<any>;

            const getFiatAssetById = await FiatAssetEntitie.findOne({ currency: id })
                .where("isActive")
                .equals(true);

            if (getFiatAssetById) {

                let inventory = (Number(getFiatAssetById.inventory) + Number(amount)).toString();

                result = await this.UpdateFiatAsset({
                    currency: id,
                    id: getFiatAssetById.id,
                    inventory: inventory,
                    isActive: true,
                    userId: getFiatAssetById.userId
                });

            } else {
                result = await this.CreateFiatAsset({
                    currency: id,
                    inventory: amount,
                    isActive: true,
                    userId: userId
                });

            }

            if (result.success && result.result) {
                return OperationResult
                    .BuildSuccessResult("Get FiatAssets By Currency Id", result.result);

            }

            return OperationResult.BuildFailur(result.message);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
    /****
    *
    * confirm transfer Fiat Assets
    *
    ****/
    private async ConfirmTransfer(from: string, assetFromId: string, assettoId: string, to: string, valueFrom: string, valueTo: string, amount: number): Promise<OperationResult<any>> {
        try {

            const calcAmount = await FiatUtil.CalcuateCurrencyPairs(from, to, amount);

            if (calcAmount.result && calcAmount.success) {

                const withdraw = await this.WithdrawFromFiatAsset(assetFromId, valueFrom, amount);

                if (withdraw.success) {

                    const deposit = await this.DepositFiatAsset(assettoId, valueTo, calcAmount.result);

                    if (deposit.success) {
                        return OperationResult.BuildSuccessResult("Success Withdraw FiatAsset", true);

                    } else {
                        return OperationResult.BuildFailur(deposit.message);

                    }
                } else {
                    return OperationResult.BuildFailur(withdraw.message);
                }
            }
            return OperationResult.BuildFailur(calcAmount.message);
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }


    /****
      *
      * withdraw From FiatAsset
      *
      ****/
    async WithdrawFromFiatAsset(assetId: string, assetValue: string, amount: number): Promise<OperationResult<boolean>> {
        try {

            const calcInventory = (Number(assetValue) - Number(amount)).toString();

            await FiatAssetEntitie.updateOne(
                { _id: assetId },
                {
                    $set: {
                        inventory: calcInventory
                    }
                });

            return OperationResult.BuildSuccessResult("Success Withdraw FiatAsset", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * Deposit To FiatAsset
    *
    ****/
    async DepositFiatAsset(assetId: string, assetValue: string, amount: number): Promise<OperationResult<boolean>> {
        try {

            const calcInventory = (Number(assetValue) + Number(amount)).toString();

            await FiatAssetEntitie.updateOne(
                { _id: assetId },
                {
                    $set: {
                        inventory: calcInventory
                    }
                });

            return OperationResult.BuildSuccessResult("Success Withdraw FiatAsset", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * Convert Fiat Assets
    *
    ****/
    async FiatTransferFrom(from: string, to: string, amount: string, userId: string): Promise<OperationResult<any>> {


        try {

            const checkFromAsset = await this.CheckValidateAssetsForUser(from, userId);
            let checkToAsset = await this.CheckValidateAssetsForUser(to, userId);

            if (checkFromAsset.result && !checkFromAsset.success) {
                return OperationResult.BuildFailur("we can not find your From selected wallet . please try again")
            }

            if (!checkToAsset.success) {
                const createFiatAssetForUser = await this.CreateFiatAsset({
                    currency: to,
                    inventory: '0',
                    isActive: true,
                    userId
                });
                if (createFiatAssetForUser.success && createFiatAssetForUser.result) {

                    checkToAsset = await this.CheckValidateAssetsForUser(createFiatAssetForUser.result, userId);

                    if (!createFiatAssetForUser.success) {
                        return OperationResult.BuildFailur(checkToAsset.message)

                    }
                } else {
                    return OperationResult.BuildFailur(createFiatAssetForUser.message)
                }

            }

            if (checkFromAsset.result && checkFromAsset.success && !checkFromAsset.result.isActive) {
                return OperationResult.BuildFailur("your from wallet is deactive . please try again")
            }

            if (checkToAsset.result && checkToAsset.success && !checkToAsset.result.isActive) {
                return OperationResult.BuildFailur("your to wallet is deactive . please try again")
            }

            if (!checkFromAsset.success) {
                return OperationResult.BuildFailur("we can not find your From selected wallet . please try again")
            }

            if (!checkFromAsset.success) {
                return OperationResult.BuildFailur("we can not find your To selected wallet . please try again")
            }

            if (checkToAsset.result && checkFromAsset.result && checkFromAsset.result.inventory >= amount) {

                const from = checkFromAsset.result.currency.currencyCode;
                const to = checkToAsset.result.currency.currencyCode;
                const amountValue = Number(amount);

                const conformTransfer = await this.ConfirmTransfer(from,
                    checkFromAsset.result.id,
                    checkToAsset.result.id,
                    to,
                    checkFromAsset.result.inventory,
                    checkToAsset.result.inventory,
                    amountValue);

                if (conformTransfer.result && conformTransfer.success) {
                    return OperationResult.BuildSuccessResult("convert your amount", conformTransfer.result);
                }
                return OperationResult.BuildFailur(conformTransfer.message)
            } else {
                return OperationResult.BuildFailur(`you have not ${amount} amount . please charge your wallet`)
            }
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message)
        }

    }
}