import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';


export default new class ExchangeController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Exchange ****/
    async CreateExchange(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name, symbol , isPublish} = req.body;

        if (!validationData.haveError) {

            const createExchange = await UnitOfWork.ExchangeRepository.CreateExchange({
                name,
                symbol,
                isPublish
            });

            if (createExchange.success) {
                return this.Ok(res, "Success Create Exchange");

            }

            return this.BadRerquest(res, createExchange.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateExchange ****/
    async UpdateExchange(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const ExchangeId = req.params.id;
            const { name, symbol , isPublish} = req.body;

            const updateExchange = await UnitOfWork.ExchangeRepository.UpdateExchange(
                {
                    id: ExchangeId,
                    name,
                    symbol,
                    isPublish
                }
            );

            if (updateExchange.success) {
                this.Ok(res, "Update Exchange");

            }
            return this.BadRerquest(res, updateExchange.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Exchange ****/
    async DeleteExchange(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteExchange = await UnitOfWork.ExchangeRepository.DeleteExchange(req.params.id)

            if (deleteExchange.success) {
                return this.Ok(res, "Success Delete Exchange");

            }
            return this.BadRerquest(res, deleteExchange.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Exchange Paging ****/
    async GetAllExchangePaging(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllExchangePagingExchange = await UnitOfWork.ExchangeRepository
                .GetAllExchangePaging(req.body);

            if (getAllExchangePagingExchange.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllExchangePagingExchange.result ? getAllExchangePagingExchange.result?.count : 0,
                    data: getAllExchangePagingExchange.result?.data
                }, "Get All Exchange Paging");

            }
            return this.BadRerquest(res, getAllExchangePagingExchange.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Exchange Select ****/
    async GetAllExchangeSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllExchangeSelectExchange = await UnitOfWork.ExchangeRepository
                .GetAllExchangeSelect();

            if (getAllExchangeSelectExchange.success) {
                return this.OkObjectResult(res, {
                    data: getAllExchangeSelectExchange.result
                }, "Get All Exchange Paging");

            }
            return this.BadRerquest(res, getAllExchangeSelectExchange.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Exchange ****/
    async GetByIdExchange(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const ExchangeId = req.params.id;

            const getExchangebyId = await UnitOfWork.ExchangeRepository
                .GetByIdExchange(ExchangeId);

            if (getExchangebyId.success) {
                return this.OkObjectResult(res, {
                    data: getExchangebyId.result
                }, "Get Exchange By Id");

            }
            return this.BadRerquest(res, getExchangebyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


}