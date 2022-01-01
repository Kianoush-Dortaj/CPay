import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { CoinEntitie } from '../../DataLayer/Context/Coin/Coin';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';
import { ICoinLocalItem } from '../../DataLayer/Context/Coin/ICoinLocalItems';
import { MultiLanguageSelect } from '../../DTO/Common/MultiSelectLang';
import utilService from './../../Utilities/Util';

export default new class CoinController extends BaseController {

    constructor() {
        super();
    }


    /*** GetAll Coin Select ****/
    async GetAllCoinSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            let lang = await utilService.getAcceptLang(req);

            const getAllCoinSelectCoin = await UnitOfWork.CoinRepository
                .GetAllCoinSelect(lang);

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

            const coinSymbol = req.params.symbol;
            let lang = await utilService.getAcceptLang(req);
            let userId = (await UnitOfWork.jwtRepository.DecodeToken(req, res, next)).result;

            const getCoinbyId = await UnitOfWork.CoinRepository
                .GetBySymbolCoin(coinSymbol, userId , lang);

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

    // async GetCoinImage(req: Request, res: Response, next: NextFunction) {

    //     let manager = await UnitOfWork.CoinRepository.GetByIdCoin(req.params.id);

    //     if (manager) {

    //         if (!manager.result?.icon) {
    //             return this.Notfound(res);
    //         }

    //         fs.readFile(`./src/public${manager.result?.icon}`, (error: any, data: any) => {
    //             if (error) throw error;
    //             res.writeHead(200, { "Content-Type": "image/png" });
    //             res.end(data);
    //         });

    //     }
    // }

}