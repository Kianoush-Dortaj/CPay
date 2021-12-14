import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';
import { CountryEntitie } from '../../DataLayer/Context/Country/Country';

export default new class CountryController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Country ****/
    async CreateCountry(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const {
            name,
            iso3Code,
            iso2Code,
            callCode,
            isDefault,
            displayOrder,
            languageId,
            isPublish
        } = req.body;

        if (!validationData.haveError) {

            const createCountry = await UnitOfWork.CountryRepository.CreateCountry({
                name,
                iso3Code,
                iso2Code,
                callCode,
                isDefault,
                displayOrder,
                languageId,
                isPublish,
                flag: req.file
            });

            if (createCountry.success) {
                return this.Ok(res, "Success Create Country");

            }

            return this.BadRerquest(res, createCountry.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateCountry ****/
    async UpdateCountry(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const CountryId = req.params.id;
            const {
                name,
                iso3Code,
                iso2Code,
                callCode,
                isDefault,
                languageId,
                displayOrder,
                isPublish, } = req.body;

            const updateCountry = await UnitOfWork.CountryRepository.UpdateCountry(
                {
                    id: CountryId,
                    name,
                    iso3Code,
                    iso2Code,
                    callCode,
                    isDefault,
                    displayOrder,
                    languageId,
                    isPublish,
                    flag: req.file
                }
            );

            if (updateCountry.success) {
                return this.Ok(res, "Update Country");

            }
            return this.BadRerquest(res, updateCountry.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Country ****/
    async DeleteCountry(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteCountry = await UnitOfWork.CountryRepository.DeleteCountry(req.params.id)

            if (deleteCountry.success) {
                return this.Ok(res, "Success Delete Country");

            }
            return this.BadRerquest(res, deleteCountry.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Country Paging ****/
    async GetAllCountryPaging(req: Request, res: Response, next: NextFunction) {


        let langauge = await UnitOfWork.CountryRepository.GetAllCountryPaging(req.body);

        return this.OkObjectResultPager(res, {
            count: langauge.result !== undefined ? langauge.result.length : 0,
            data: langauge.result
        }, '')
    }

    /*** GetAll Country Select ****/
    async GetAllCountrySelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllCountrySelectCountry = await UnitOfWork.CountryRepository
                .GetAllCountrySelect();

            if (getAllCountrySelectCountry.success) {
                return this.OkObjectResult(res, {
                    data: getAllCountrySelectCountry.result
                }, "Get All Country Paging");

            }
            return this.BadRerquest(res, getAllCountrySelectCountry.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Country ****/
    async GetByIdCountry(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const CountryId = req.params.id;

            const getCountrybyId = await UnitOfWork.CountryRepository
                .GetByIdCountry(CountryId);

            if (getCountrybyId.success) {
                return this.OkObjectResult(res, {
                    data: getCountrybyId.result
                }, "Get Country By Id");

            }
            return this.BadRerquest(res, getCountrybyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


    /***
    * Get User Image
    */
    async GetCountryImage(req: Request, res: Response, next: NextFunction) {
        let country = await CountryEntitie.findById(req.params.id).select("flag");
        if (country) {

            if (!country.flag) {
                return this.Notfound(res);
            }

            fs.readFile(`./src/public${country.flag}`, (error: any, data: any) => {
                if (error) throw error;
                res.writeHead(200, { "Content-Type": "image/png" });
                res.end(data);
            });

        }
    }

}