import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddGetwayTypeModel } from "../../../DTO/GetwayType/AddGetwayType";
import { GetAllGetwayTypeFilter } from "../../../DTO/GetwayType/GetAllGetwayTypeFilter";
import { GetGetwayTypeInfoModel } from "../../../DTO/GetwayType/GetGetwayTypeInfo";
import { UpdateGetwayTypeModel } from "../../../DTO/GetwayType/UpdateGetwayType";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllGetwayTypeSelect } from "../../../DTO/GetwayType/GetAllGetwayTypeSelect";
import { IGetwayTypeDoc } from "../../Context/GetwayType/IGetwayTypeDoc";

export interface IGetwayTypeRepository {

    CreateGetwayType(item: AddGetwayTypeModel): Promise<OperationResult<boolean>>;
    UpdateGetwayType(item: UpdateGetwayTypeModel): Promise<OperationResult<boolean>>;
    DeleteGetwayType(id: string): Promise<OperationResult<boolean>>;
    GetAllGetwayTypeSelect(lang: string): Promise<OperationResult<GetAllGetwayTypeSelect[]>>;
    GetAllGetwayTypePaging(items: FilterViewModel<GetAllGetwayTypeFilter>): Promise<OperationResult<GetAllPagingModel<IGetwayTypeDoc>>>;
    GetByIdGetwayType(id: string): Promise<OperationResult<GetGetwayTypeInfoModel>>;
}