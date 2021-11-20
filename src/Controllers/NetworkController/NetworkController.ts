import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { NetworkEntitie } from '../../DataLayer/Context/Network/Network';
import UnitOfWork from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';
import * as fs from 'fs';


export default new class NetworkController extends BaseController {

    constructor() {
        super();
    }

    /*** Create Network ****/
    async CreateNetwork(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        const { name, symbol , isPublish } = req.body;

        if (!validationData.haveError) {

            const createNetwork = await UnitOfWork.NetworkRepository.CreateNetwork({
                name,
                symbol,
                isPublish
            });

            if (createNetwork.success) {
                return this.Ok(res, "Success Create Network");

            }

            return this.BadRerquest(res, createNetwork.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** UpdateNetwork ****/
    async UpdateNetwork(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const NetworkId = req.params.id;
            const { name, symbol , isPublish } = req.body;

            const updateNetwork = await UnitOfWork.NetworkRepository.UpdateNetwork(
                {
                    id: NetworkId,
                    name,
                    symbol,
                    isPublish
                }
            );

            if (updateNetwork.success) {
              return  this.Ok(res, "Update Network");

            }
            return this.BadRerquest(res, updateNetwork.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** Delete Network ****/
    async DeleteNetwork(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const deleteNetwork = await UnitOfWork.NetworkRepository.DeleteNetwork(req.params.id)

            if (deleteNetwork.success) {
                return this.Ok(res, "Success Delete Network");

            }
            return this.BadRerquest(res, deleteNetwork.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Network Paging ****/
    async GetAllNetworkPaging(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllNetworkPagingNetwork = await UnitOfWork.NetworkRepository
                .GetAllNetworkPaging(req.body);

            if (getAllNetworkPagingNetwork.success) {
                return this.OkObjectResultPager(res, {
                    count: getAllNetworkPagingNetwork.result ? getAllNetworkPagingNetwork.result?.count : 0,
                    data: getAllNetworkPagingNetwork.result?.data
                }, "Get All Network Paging");

            }
            return this.BadRerquest(res, getAllNetworkPagingNetwork.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetAll Network Select ****/
    async GetAllNetworkSelect(req: Request, res: Response, next: NextFunction) {


        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const getAllNetworkSelectNetwork = await UnitOfWork.NetworkRepository
                .GetAllNetworkSelect();

            if (getAllNetworkSelectNetwork.success) {
                return this.OkObjectResult(res, {
                    data: getAllNetworkSelectNetwork.result
                }, "Get All Network Paging");

            }
            return this.BadRerquest(res, getAllNetworkSelectNetwork.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }

    /*** GetById Network ****/
    async GetByIdNetwork(req: Request, res: Response, next: NextFunction) {

        let validationData = await this.ValidationAction(req, res);

        if (!validationData.haveError) {

            const NetworkId = req.params.id;

            const getNetworkbyId = await UnitOfWork.NetworkRepository
                .GetByIdNetwork(NetworkId);

            if (getNetworkbyId.success) {
                return this.OkObjectResult(res, {
                    data: getNetworkbyId.result
                }, "Get Network By Id");

            }
            return this.BadRerquest(res, getNetworkbyId.message);

        } else {
            return this.BadRerquest(res, validationData.errorMessage.toString());
        }
    }


}