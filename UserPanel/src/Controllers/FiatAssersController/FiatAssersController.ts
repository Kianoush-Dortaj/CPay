import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class FiatAssetsController extends BaseController {

    constructor() {
        super();
    }

    /*** GetById Comission ****/
    async GetByUserIdFiatAssets(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const getFiatAssetsbyId = await UnitOfWork.FiatAssetRepository
                .GetFiatAssetsByUserId(userId);

            if (getFiatAssetsbyId.success) {
                return this.OkObjectResult(res, {
                    data: getFiatAssetsbyId.result
                }, "Get User Fiat Assets");

            }
            return this.BadRerquest(res, getFiatAssetsbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** TransferFrom Fiat ****/
    async TransferFromFiatAsset(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const { from, to, amount } = req.body;

            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const getFiatAssetsbyId = await UnitOfWork.FiatAssetRepository
                .FiatTransferFrom(from, to, amount, userId);

            if (getFiatAssetsbyId.success) {
                return this.OkObjectResult(res, {
                    data: getFiatAssetsbyId.result
                }, "Success Transfer To Fiat Wallet");

            }
            return this.BadRerquest(res, getFiatAssetsbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


}