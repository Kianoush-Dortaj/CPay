import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { CurrencyPairEntitie } from '../../DataLayer/Context/CurrencyPair/CurrencyPair';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';


export default new class CurrencyPairController extends BaseController {

    constructor() {
        super();
    }

    /*** Create CurrencyPair ****/
    async CreateCurrencyPair(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { coinId, exchangeId, pairs, isPublish } = req.body;

        if (!validationData.haveError) {

            const createCurrencyPair = await UnitOfWork.CurrencyPairRepository.CreateCurrencyPair({
                coinId,
                exchangeId,
                pairs,
                isPublish
            });

            if (createCurrencyPair.success) {
                return this.Ok(res, "Success Create CurrencyPair");

            }

            return this.BadRerquest(res, createCurrencyPair.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateCurrencyPair ****/
    async UpdateCurrencyPair(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const CurrencyPairId = req.params.id;
            const { coinId, exchangeId, pairs, isPublish } = req.body;

            const updateCurrencyPair = await UnitOfWork.CurrencyPairRepository
            .UpdateCurrencyPair(
                {
                    id: CurrencyPairId,
                    coinId,
                    exchangeId,
                    pairs,
                    isPublish
                }
            );

            if (updateCurrencyPair.success) {
                return this.Ok(res, "Update CurrencyPair");

            }
            return this.BadRerquest(res, updateCurrencyPair.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete CurrencyPair ****/
    async DeleteCurrencyPair(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteCurrencyPair = await UnitOfWork.CurrencyPairRepository.DeleteCurrencyPair(req.params.id)

            if (deleteCurrencyPair.success) {
                return this.Ok(res, "Success Delete CurrencyPair");

            }
            return this.BadRerquest(res, deleteCurrencyPair.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll CurrencyPair Paging ****/
    async GetAllCurrencyPairPaging(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllCurrencyPairPagingCurrencyPair = await UnitOfWork.CurrencyPairRepository
                .GetAllCurrencyPairPaging(req.body);

            if (getAllCurrencyPairPagingCurrencyPair.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllCurrencyPairPagingCurrencyPair.result ? getAllCurrencyPairPagingCurrencyPair.result?.count : 0,
                    data: getAllCurrencyPairPagingCurrencyPair.result?.data
                }, "Get All CurrencyPair Paging");

            }
            return this.BadRerquest(res, getAllCurrencyPairPagingCurrencyPair.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById CurrencyPair ****/
    async GetByIdCurrencyPair(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const CurrencyPairId = req.params.id;

            const getCurrencyPairbyId = await UnitOfWork.CurrencyPairRepository
                .GetByIdCurrencyPair(CurrencyPairId);

            if (getCurrencyPairbyId.success) {
                return this.OkObjectResult(res, {
                    data: getCurrencyPairbyId.result
                }, "Get CurrencyPair By Id");

            }
            return this.BadRerquest(res, getCurrencyPairbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    
    /*** GetById CurrencyPair ****/
    async GetAllCurrenyPairs(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

       
            const getCurrencyPairbyId = await UnitOfWork.CurrencyPairRepository
                .GetAllCurrencyPairs();

            if (getCurrencyPairbyId.success) {
                return this.OkObjectResult(res, {
                    data: getCurrencyPairbyId.result
                }, "Get CurrencyPair By Id");

            }
            return this.BadRerquest(res, getCurrencyPairbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

}