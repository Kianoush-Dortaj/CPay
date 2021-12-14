import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';
import { LanguageEntitie } from '../../DataLayer/Context/Language/Language';

export default new class LanguageController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Language ****/
    async CreateLanguage(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name,
            displayOrder,
            isPublish,
            isDefault,
            rtl,
            uniqueSeoCode } = req.body;

        if (!validationData.haveError) {

            const createLanguage = await UnitOfWork.LanguageRepository.CreateLanguage({
                name,
                displayOrder,
                isPublish,
                isDefault,
                rtl,
                uniqueSeoCode,
                flagImageFileName: req.file
            });

            if (createLanguage.success) {
                return this.Ok(res, "Success Create Language");

            }

            return this.BadRerquest(res, createLanguage.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateLanguage ****/
    async UpdateLanguage(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const LanguageId = req.params.id;
            const { name,
                displayOrder,
                isPublish,
                isDefault,
                rtl,
                uniqueSeoCode,
                flagImageFileName } = req.body;

            const updateLanguage = await UnitOfWork.LanguageRepository.UpdateLanguage(
                {
                    id: LanguageId,
                    name,
                    displayOrder,
                    isPublish,
                    isDefault,
                    rtl,
                    uniqueSeoCode,
                    flagImageFileName: req.file
                }
            );

            if (updateLanguage.success) {
               return this.Ok(res, "Update Language");

            }
            return this.BadRerquest(res, updateLanguage.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Language ****/
    async DeleteLanguage(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteLanguage = await UnitOfWork.LanguageRepository.DeleteLanguage(req.params.id)

            if (deleteLanguage.success) {
                return this.Ok(res, "Success Delete Language");

            }
            return this.BadRerquest(res, deleteLanguage.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Language Paging ****/
    async GetAllLanguagePaging(req: Request, res: Response, next: NextFunction) {


        let langauge = await UnitOfWork.LanguageRepository.GetAllLangaugePaging(req.body);

        return this.OkObjectResultPager(res, {
            count: langauge.result !== undefined ? langauge.result.length : 0,
            data: langauge.result
        }, '')
    }

    /*** GetAll Language Select ****/
    async GetAllLanguageSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllLanguageSelectLanguage = await UnitOfWork.LanguageRepository
                .GetAllLanguageSelect();

            if (getAllLanguageSelectLanguage.success) {
                return this.OkObjectResult(res, {
                    data: getAllLanguageSelectLanguage.result
                }, "Get All Language Paging");

            }
            return this.BadRerquest(res, getAllLanguageSelectLanguage.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Language ****/
    async GetByIdLanguage(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const LanguageId = req.params.id;

            const getLanguagebyId = await UnitOfWork.LanguageRepository
                .GetByIdLanguage(LanguageId);

            if (getLanguagebyId.success) {
                return this.OkObjectResult(res, {
                    data: getLanguagebyId.result
                }, "Get Language By Id");

            }
            return this.BadRerquest(res, getLanguagebyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }
    

    /***
    * Get User Image
    */
    async GetLanguageImage(req: Request, res: Response, next: NextFunction) {
        let language = await LanguageEntitie.findById(req.params.id).select("flagImageFileName");
        if (language) {

            if (!language.flagImageFileName) {
                return this.Notfound(res);
            }

            fs.readFile(`./src/public${language.flagImageFileName}`, (error: any, data: any) => {
                if (error) throw error;
                res.writeHead(200, { "Content-Type": "image/png" });
                res.end(data);
            });

        }
    }

}