import OperationResult from '../../../core/Operation/OperationResult';
import { FileNode } from '../../../DTO/Permission/file-node';
import { AddNetworkModel } from '../../../DTO/Network/AddNetwork';
import { GetNetworkInfoModel } from '../../../DTO/Network/GetNetworkInfo';
import { UpdateNetworkModel } from '../../../DTO/Network/UpdateNetwork';
import { GetAllPagingModel } from '../../../DTO/Share/GetAllPaging';
import { INetworkDoc } from '../../Context/Network/INetworkDoc';
import { NetworkEntitie } from '../../Context/Network/Network';
import { INetworkRepository } from './INetworkRepository';
import { FilterViewModel } from '../../../DTO/Common/FilterViewModel';
import { GetAllNetworkFilter } from '../../../DTO/Network/GetAllNetworkFilter';
import UtilService from '../../../Utilities/Util';
import { Listen } from '../../../Utilities/Websocket/Pattern/listen-chanel';
import { ListenType } from '../../../Utilities/Websocket/Pattern/listen-type';

export default class NetworkRepository implements INetworkRepository {

    /****
      *
      * Create Network
      *
      ****/
    async CreateNetwork(item: AddNetworkModel): Promise<OperationResult<boolean>> {

        try {


            const Network = await NetworkEntitie.
                build({
                    name: item.name,
                    isDelete: false,
                    comission : item.comission,
                    symbol: item.symbol,
                    isPublish: item.isPublish
                });

            await Network.save();

            return OperationResult.BuildSuccessResult("Success Create Network", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }

    /****
      *
      * Set Network
      *
      ****/
    async UpdateNetwork(item: UpdateNetworkModel): Promise<OperationResult<boolean>> {
        try {


            await NetworkEntitie.updateOne(
                { _id: item.id },
                {
                    $set: {
                        name: item.name,
                        symbol: item.symbol,
                    comission : item.comission,
                        isPublish: item.isPublish
                    }
                });

            return OperationResult.BuildSuccessResult("Success Update Network", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
     *
     * Delete Network
     *
     ****/
    async DeleteNetwork(id: string): Promise<OperationResult<boolean>> {

        try {

            await NetworkEntitie.updateOne(
                { _id: id },
                { $set: { isDelete: true } }
            );

            return OperationResult.BuildSuccessResult("Success Delete Network", true);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Permission
    *
    ****/
    async GetAllNetworkSelect(): Promise<OperationResult<INetworkDoc[]>> {

        try {

            const getAllNetwork = await NetworkEntitie.find({})
                .where("isDelete")
                .equals(false)
                .where("isPublish")
                .equals(true)
                .select("name symbol comission");

            return OperationResult.BuildSuccessResult("Get All Networks", getAllNetwork);

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }
    }

    /****
    *
    * GetAll Network Paging
    *
    ****/
    async GetAllNetworkPaging(items: FilterViewModel<GetAllNetworkFilter>): Promise<OperationResult<GetAllPagingModel<INetworkDoc>>> {

        try {

            const query: any = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof GetAllNetworkFilter];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else if (key === 'symbol' && value) {
                    query.push({ symbol: { $regex: `(.*)${value}(.*)` } });
                }
            });

            let exchnageList = await NetworkEntitie.find(...query).skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize)

            let count = await NetworkEntitie.find({})
                .where("isDelete")
                .equals(false)
                .estimatedDocumentCount();

            return OperationResult.BuildSuccessResult<GetAllPagingModel<any>>("Get All data Paging", {
                data: exchnageList,
                count: count
            });

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);
        }


    }

    /****
    *
    * Get ById
    *
    ****/
    async GetByIdNetwork(id: string): Promise<OperationResult<GetNetworkInfoModel>> {

        try {

            const getNetworkById = await NetworkEntitie.findById({ _id: id })
                .where("isDelete")
                .equals(false);

            if (!getNetworkById) {

                return OperationResult.BuildFailur("Can not find this Network");

            }


            return OperationResult.BuildSuccessResult("Get All Networks", {
                id: getNetworkById._id,
                name: getNetworkById.name,
                comission : getNetworkById.comission,
                symbol: getNetworkById.symbol,
                isPublish: getNetworkById.isPublish
            });

        } catch (error: any) {

            return OperationResult.BuildFailur(error.message);
        }

    }
}