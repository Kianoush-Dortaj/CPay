import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { GetwayEntitie } from '../../DataLayer/Context/Getway/Getway';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';
import { IGetwayLocalItem } from '../../DataLayer/Context/Getway/IGetwayLocalItems';
import { MultiLanguageSelect } from '../../DTO/Common/MultiSelectLang';
import utilService from '../../Utilities/Util';

export default new class GetwayController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Getway ****/
    async CreateGetway(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name, description, isPublish } = req.body;

        let getwayLocalItem: MultiLanguageSelect<IGetwayLocalItem>[] = [];

        for (var i = 0; i < Infinity; i++) {
            if (req.body[`locals[${i}].lang`]) {
                getwayLocalItem.push({
                    lang: req.body[`locals[${i}].lang`],
                    value: {
                        name: req.body[`locals[${i}].value.name`],
                        description: req.body[`locals[${i}].value.description`]
                    }
                });
            } else {
                break;
            }
        }

        if (!validationData.haveError) {

            const createGetway = await UnitOfWork.GetwayRepository.CreateGetway({
                name,
                description,
                isPublish,
                icon: req.file,
                locals: getwayLocalItem
            });

            if (createGetway.success) {
                return this.Ok(res, "Success Create Getway");

            }

            return this.BadRerquest(res, createGetway.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateGetway ****/
    async UpdateGetway(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const GetwayId = req.params.id;
            const { name, description, isPublish } = req.body;

            let getwayLocalItem: MultiLanguageSelect<IGetwayLocalItem>[] = [];

            for (var i = 0; i < Infinity; i++) {
                if (req.body[`locals[${i}].lang`]) {
                    getwayLocalItem.push({
                        lang: req.body[`locals[${i}].lang`],
                        value: {
                            name: req.body[`locals[${i}].value.name`],
                            description: req.body[`locals[${i}].value.description`]
                        }
                    });
                } else {
                    break;
                }
            }

            const updateGetway = await UnitOfWork.GetwayRepository.UpdateGetway(
                {
                    id: GetwayId,
                    name,
                    description,
                    isPublish,
                    icon: req.file,
                    locals: getwayLocalItem
                }
            );

            if (updateGetway.success) {
                return this.Ok(res, "Update Getway");

            }
            return this.BadRerquest(res, updateGetway.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Getway ****/
    async DeleteGetway(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteGetway = await UnitOfWork.GetwayRepository.DeleteGetway(req.params.id)

            if (deleteGetway.success) {
                return this.Ok(res, "Success Delete Getway");

            }
            return this.BadRerquest(res, deleteGetway.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Getway Paging ****/
    async GetAllGetwayPaging(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);
        let lang: string = '';

        if (!validationData.haveError) {

            if (req.headers['accept-language']) {
                lang = req.headers['accept-language'];
            } else {

                const defaultItem = await UnitOfWork.LanguageRepository.
                    GetDefulatLanguage();

                if (defaultItem.success) {

                    lang = defaultItem.success ?
                        defaultItem.result ?
                            defaultItem.result?.uniqueSeoCode : 'en' : 'en';
                }
            }

            const findLangInfo = await UnitOfWork.LanguageRepository.
                FindLanguageByUniSeoCode(lang);

            if (findLangInfo.success && findLangInfo.result !== undefined) {

                const getAllGetwayPagingGetway = await UnitOfWork.GetwayRepository
                    .GetAllGetwayPaging(req.body);

                if (getAllGetwayPagingGetway.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllGetwayPagingGetway.result ? getAllGetwayPagingGetway.result?.count : 0,
                        data: getAllGetwayPagingGetway.result?.data
                    }, "Get All Getway Paging");

                }

                return this.BadRerquest(res, getAllGetwayPagingGetway.message);

            } else if (!findLangInfo.success) {
                return this.BadRerquest(res, "we can not find your langauge selector");
            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        }
    }

    /*** GetAll Getway Select ****/
    async GetAllGetwaySelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            let lang = await utilService.getAcceptLang(req);

            const getAllGetwaySelectGetway = await UnitOfWork.GetwayRepository
                .GetAllGetwaySelect(lang);

            if (getAllGetwaySelectGetway.success) {
                return this.OkObjectResult(res, {
                    data: getAllGetwaySelectGetway.result
                }, "Get All Getway Paging");

            }
            return this.BadRerquest(res, getAllGetwaySelectGetway.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Getway ****/
    async GetByIdGetway(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const GetwayId = req.params.id;

            const getGetwaybyId = await UnitOfWork.GetwayRepository
                .GetByIdGetway(GetwayId);

            if (getGetwaybyId.success) {
                return this.OkObjectResult(res, {
                    data: getGetwaybyId.result
                }, "Get Getway By Id");

            }
            return this.BadRerquest(res, getGetwaybyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    async GetGetwayImage(req: Request, res: Response, next: NextFunction) {

        let manager = await UnitOfWork.GetwayRepository.GetByIdGetway(req.params.id);

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