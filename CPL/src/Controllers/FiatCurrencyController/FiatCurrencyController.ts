import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';
import { FiatCurrencyEntitie } from '../../DataLayer/Context/FiatCurrency/FiatCurrency';

export default new class FiatCurrencyController extends BaseController {

    constructor() {
        super();
    }

    /*** Create FiatCurrency ****/
    async CreateFiatCurrency(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const {
            name,
            currencyCode,
            displayOrder,
            isPublish
        } = req.body;

        if (!validationData.haveError) {

            const createFiatCurrency = await UnitOfWork.FiatCurrency.CreateFiatCurrency({
                name,
                displayOrder,
                isPublish,
                logo: req.file,
                currencyCode
            });

            if (createFiatCurrency.success) {
                return this.Ok(res, "Success Create FiatCurrency");

            }

            return this.BadRerquest(res, createFiatCurrency.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateFiatCurrency ****/
    async UpdateFiatCurrency(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const FiatCurrencyId = req.params.id;
            const {
                name,
                currencyCode,
                displayOrder,
                isPublish } = req.body;

            const updateFiatCurrency = await UnitOfWork.FiatCurrency.UpdateFiatCurrency(
                {
                    id: FiatCurrencyId,
                    name,
                    displayOrder,
                    isPublish,
                    logo: req.file,
                    currencyCode
                }
            );

            if (updateFiatCurrency.success) {
                return this.Ok(res, "Update FiatCurrency");

            }
            return this.BadRerquest(res, updateFiatCurrency.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete FiatCurrency ****/
    async DeleteFiatCurrency(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteFiatCurrency = await UnitOfWork.FiatCurrency.DeleteFiatCurrency(req.params.id)

            if (deleteFiatCurrency.success) {
                return this.Ok(res, "Success Delete FiatCurrency");

            }
            return this.BadRerquest(res, deleteFiatCurrency.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll FiatCurrency Paging ****/
    async GetAllFiatCurrencyPaging(req: Request, res: Response, next: NextFunction) {


        let langauge = await UnitOfWork.FiatCurrency.GetAllFiatCurrencyPaging(req.body);

        return this.OkObjectResultPager(res, {
            count: langauge.result !== undefined ? langauge.result.length : 0,
            data: langauge.result
        }, '')
    }

    /*** GetAll FiatCurrency Select ****/
    async GetAllFiatCurrencySelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllFiatCurrencySelectFiatCurrency = await UnitOfWork.FiatCurrency
                .GetAllFiatCurrencySelect();

            if (getAllFiatCurrencySelectFiatCurrency.success) {
                return this.OkObjectResult(res, {
                    data: getAllFiatCurrencySelectFiatCurrency.result
                }, "Get All FiatCurrency Paging");

            }
            return this.BadRerquest(res, getAllFiatCurrencySelectFiatCurrency.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById FiatCurrency ****/
    async GetByIdFiatCurrency(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const FiatCurrencyId = req.params.id;

            const getFiatCurrencybyId = await UnitOfWork.FiatCurrency
                .GetByIdFiatCurrency(FiatCurrencyId);

            if (getFiatCurrencybyId.success) {
                return this.OkObjectResult(res, {
                    data: getFiatCurrencybyId.result
                }, "Get FiatCurrency By Id");

            }
            return this.BadRerquest(res, getFiatCurrencybyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


    /***
    * Get User Image
    */
    // async GetFiatCurrencyImage(req: Request, res: Response, next: NextFunction) {
    //     let FiatCurrency = await FiatCurrencyEntitie.findById(req.params.id).select("flag");
    //     if (FiatCurrency) {

    //         if (!FiatCurrency.flag) {
    //             return this.Notfound(res);
    //         }

    //         fs.readFile(`./src/public${FiatCurrency.flag}`, (error: any, data: any) => {
    //             if (error) throw error;
    //             res.writeHead(200, { "Content-Type": "image/png" });
    //             res.end(data);
    //         });

    //     }
    // }

}