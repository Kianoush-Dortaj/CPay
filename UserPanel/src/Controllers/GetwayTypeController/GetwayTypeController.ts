import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';
import { IGetwayTypeLocalItem } from '../../DataLayer/Context/GetwayType/IGetwayTypeLocalItems';
import { MultiLanguageSelect } from '../../DTO/Common/MultiSelectLang';
import utilService from '../../Utilities/Util';

export default new class GetwayTypeController extends BaseController {

    constructor() {
        super();
    }

    /*** Create GetwayType ****/
    async CreateGetwayType(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name, description, comission , isPublish } = req.body;

        let getwayLocalItem: MultiLanguageSelect<IGetwayTypeLocalItem>[] = [];

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

            const createGetwayType = await UnitOfWork.GetwayTypeRepository.CreateGetwayType({
                name,
                description,
                isPublish,
                comission,
                icon: req.file,
                locals: getwayLocalItem
            });

            if (createGetwayType.success) {
                return this.Ok(res, "Success Create GetwayType");

            }

            return this.BadRerquest(res, createGetwayType.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateGetwayType ****/
    async UpdateGetwayType(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const GetwayTypeId = req.params.id;
            const { name, description, comission , isPublish } = req.body;

            let getwayLocalItem: MultiLanguageSelect<IGetwayTypeLocalItem>[] = [];

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

            const updateGetwayType = await UnitOfWork.GetwayTypeRepository.UpdateGetwayType(
                {
                    id: GetwayTypeId,
                    name,
                    description,
                    isPublish,
                    comission,
                    icon: req.file,
                    locals: getwayLocalItem
                }
            );

            if (updateGetwayType.success) {
                return this.Ok(res, "Update GetwayType");

            }
            return this.BadRerquest(res, updateGetwayType.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete GetwayType ****/
    async DeleteGetwayType(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteGetwayType = await UnitOfWork.GetwayTypeRepository.DeleteGetwayType(req.params.id)

            if (deleteGetwayType.success) {
                return this.Ok(res, "Success Delete GetwayType");

            }
            return this.BadRerquest(res, deleteGetwayType.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll GetwayType Paging ****/
    async GetAllGetwayTypePaging(req: Request, res: Response, next: NextFunction) {

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

                const getAllGetwayTypePagingGetwayType = await UnitOfWork.GetwayTypeRepository
                    .GetAllGetwayTypePaging(req.body);

                if (getAllGetwayTypePagingGetwayType.success) {
                    return this.OkObjectResultPager(res, {
                        count: getAllGetwayTypePagingGetwayType.result ? getAllGetwayTypePagingGetwayType.result?.count : 0,
                        data: getAllGetwayTypePagingGetwayType.result?.data
                    }, "Get All GetwayType Paging");

                }

                return this.BadRerquest(res, getAllGetwayTypePagingGetwayType.message);

            } else if (!findLangInfo.success) {
                return this.BadRerquest(res, "we can not find your langauge selector");
            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        }
    }

    /*** GetAll GetwayType Select ****/
    async GetAllGetwayTypeSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            let lang = await utilService.getAcceptLang(req);

            const getAllGetwayTypeSelectGetwayType = await UnitOfWork.GetwayTypeRepository
                .GetAllGetwayTypeSelect(lang);

            if (getAllGetwayTypeSelectGetwayType.success) {
                return this.OkObjectResult(res, {
                    data: getAllGetwayTypeSelectGetwayType.result
                }, "Get All GetwayType Paging");

            }
            return this.BadRerquest(res, getAllGetwayTypeSelectGetwayType.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById GetwayType ****/
    async GetByIdGetwayType(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const GetwayTypeId = req.params.id;

            const getGetwayTypebyId = await UnitOfWork.GetwayTypeRepository
                .GetByIdGetwayType(GetwayTypeId);

            if (getGetwayTypebyId.success) {
                return this.OkObjectResult(res, {
                    data: getGetwayTypebyId.result
                }, "Get GetwayType By Id");

            }
            return this.BadRerquest(res, getGetwayTypebyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    async GetGetwayTypeImage(req: Request, res: Response, next: NextFunction) {

        let manager = await UnitOfWork.GetwayTypeRepository.GetByIdGetwayType(req.params.id);

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