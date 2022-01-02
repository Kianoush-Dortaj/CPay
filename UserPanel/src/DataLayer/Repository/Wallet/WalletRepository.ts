import OperationResult from "../../../core/Operation/OperationResult";
import { CreateWalletresultModel } from "../../../DTO/GRPC/Network/CreateWalletresultModel";
import { CreateWalletModel } from "../../../DTO/Wallet/CreateWalletModel";
import { IWalletDoc } from "../../Context/Wallet/IIWalletDoc";
import { WalletEntitie } from "../../Context/Wallet/Wallet";
import UnitOfWork from "../UnitOfWork/UnitOfWork";
import { IWalletRepository } from "./IWalletRepository";


export default class WalletRepository implements IWalletRepository {

    async GetUserWallet(userId: string): Promise<OperationResult<IWalletDoc[]>> {
        try {

            const walletAddress = await WalletEntitie.find({ userId: userId });

            return OperationResult.BuildSuccessResult("list of wallets", walletAddress);

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

    async CreateWallet(item: CreateWalletModel): Promise<OperationResult<string>> {
        try {

            const walletAddress = await WalletEntitie.build({
                coinId: item.coinId,
                amount: item.amount,
                networkId: item.networkId,
                privateKey: item.privateKey,
                publicAddress: item.publicAddress,
                userId: item.userId
            });

            walletAddress.save();

            return OperationResult.BuildSuccessResult("create wallet for user", 'Success Create Wallet for User');

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }
    }

    async GenerateWalletForNetwork(networkName: string): Promise<OperationResult<CreateWalletresultModel>> {

        try {

            switch (networkName) {

                case "ERC20":
                    const ERC20WalletInfo = await UnitOfWork.ERC20Network.CreateWallet();
                    if (ERC20WalletInfo.success && ERC20WalletInfo.result)
                        return OperationResult.BuildSuccessResult("ERC20-Wallet Info", ERC20WalletInfo.result);
                    else
                        return OperationResult.BuildFailur(ERC20WalletInfo.message);

                case "TRC20":
                    const TRC20WalletInfo = await UnitOfWork.TRC20Network.CreateWallet();
                    console.log(TRC20WalletInfo);
                    if (TRC20WalletInfo.success && TRC20WalletInfo.result)
                        return OperationResult.BuildSuccessResult("TRC20-Wallet Info", TRC20WalletInfo.result);
                    else
                        return OperationResult.BuildFailur(TRC20WalletInfo.message);
                default:
                    return OperationResult.BuildFailur("we can not reconize this network");

            }

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }


    }

}