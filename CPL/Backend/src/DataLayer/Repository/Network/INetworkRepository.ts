import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddNetworkModel } from "../../../DTO/Network/AddNetwork";
import { GetAllNetworkFilter } from "../../../DTO/Network/GetAllNetworkFilter";
import { GetNetworkInfoModel } from "../../../DTO/Network/GetNetworkInfo";
import { UpdateNetworkModel } from "../../../DTO/Network/UpdateNetwork";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { INetworkDoc } from "../../Context/Network/INetworkDoc";

export interface INetworkRepository {

    CreateNetwork(item: AddNetworkModel): Promise<OperationResult<boolean>>;
    UpdateNetwork(item: UpdateNetworkModel): Promise<OperationResult<boolean>>;
    DeleteNetwork(id: string): Promise<OperationResult<boolean>>;
    GetAllNetworkSelect(): Promise<OperationResult<INetworkDoc[]>>;
    GetAllNetworkPaging(items: FilterViewModel<GetAllNetworkFilter>): Promise<OperationResult<GetAllPagingModel<INetworkDoc>>>;
    GetByIdNetwork(id: string): Promise<OperationResult<GetNetworkInfoModel>>;
}