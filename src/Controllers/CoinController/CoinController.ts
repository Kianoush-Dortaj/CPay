import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { CoinEntitie } from '../../DataLayer/Context/Coin/Coin';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';


export default new class CoinController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Coin ****/
    async CreateCoin(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name, symbol , isPublish ,locals } = req.body;

        if (!validationData.haveError) {
           console.log(req.body) 
            const createCoin = await UnitOfWork.CoinRepository.CreateCoin({
                name,
                symbol,
                isPublish,
                icon: req.file,
                locals :locals
            });

            if (createCoin.success) {
                return this.Ok(res, "Success Create Coin");

            }

            return this.BadRerquest(res, createCoin.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateCoin ****/
    async UpdateCoin(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const CoinId = req.params.id;
            const { name, symbol , isPublish ,locals } = req.body;

            const updateCoin = await UnitOfWork.CoinRepository.UpdateCoin(
                {
                    id: CoinId,
                    name,
                    symbol,
                    isPublish,
                    icon: req.file,
                    locals :locals
                }
            );

            if (updateCoin.success) {
              return  this.Ok(res, "Update Coin");

            }
            return this.BadRerquest(res, updateCoin.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Coin ****/
    async DeleteCoin(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteCoin = await UnitOfWork.CoinRepository.DeleteCoin(req.params.id)

            if (deleteCoin.success) {
                return this.Ok(res, "Success Delete Coin");

            }
            return this.BadRerquest(res, deleteCoin.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Coin Paging ****/
    async GetAllCoinPaging(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllCoinPagingCoin = await UnitOfWork.CoinRepository
                .GetAllCoinPaging(req.body);

            if (getAllCoinPagingCoin.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllCoinPagingCoin.result ? getAllCoinPagingCoin.result?.count : 0,
                    data: getAllCoinPagingCoin.result?.data
                }, "Get All Coin Paging");

            }
            return this.BadRerquest(res, getAllCoinPagingCoin.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Coin Select ****/
    async GetAllCoinSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllCoinSelectCoin = await UnitOfWork.CoinRepository
                .GetAllCoinSelect();

            if (getAllCoinSelectCoin.success) {
                return this.OkObjectResult(res, {
                    data: getAllCoinSelectCoin.result
                }, "Get All Coin Paging");

            }
            return this.BadRerquest(res, getAllCoinSelectCoin.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Coin ****/
    async GetByIdCoin(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const CoinId = req.params.id;

            const getCoinbyId = await UnitOfWork.CoinRepository
                .GetByIdCoin(CoinId);

            if (getCoinbyId.success) {
                return this.OkObjectResult(res, {
                    data: getCoinbyId.result
                }, "Get Coin By Id");

            }
            return this.BadRerquest(res, getCoinbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    async GetCoinImage(req: Request, res: Response, next: NextFunction) {

        let manager = await UnitOfWork.CoinRepository.GetByIdCoin(req.params.id);

        if (manager) {

            if (!manager.result?.icon) {
                return this.Notfound(res);
            }

            fs.readFile(`./src/public${manager.result?.icon}`, (error: any, data: any) => {
                if (error) throw error;
                res.writeHead(200, { "Content-Type": "image/png" });
                res.end(data);
            });

        }
    }

}