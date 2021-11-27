import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddGetwayModel } from "../../../DTO/Getway/AddGetway";
import { GetAllGetwayFilter } from "../../../DTO/Getway/GetAllGetwayFilter";
import { GetGetwayInfoModel } from "../../../DTO/Getway/GetGetwayInfo";
import { UpdateGetwayModel } from "../../../DTO/Getway/UpdateGetway";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { GetAllUserFilter } from "../../../DTO/User/GetAllUserFilter";
import { IGetwayDoc } from "../../Context/Getway/IGetwayDoc";
import { IGetwayLocalItem } from "../../Context/Getway/IGetwayLocalItems";
import { MultiLanguageSelect } from "../../../DTO/Common/MultiSelectLang";
import { GetAllGetwaySelect } from "../../../DTO/Getway/GetAllGetwaySelect";

export interface IGetwayRepository {

    CreateGetway(item: AddGetwayModel): Promise<OperationResult<boolean>>;
    UpdateGetway(item: UpdateGetwayModel): Promise<OperationResult<boolean>>;
    DeleteGetway(id: string): Promise<OperationResult<boolean>>;
    GetAllGetwaySelect(lang: string): Promise<OperationResult<GetAllGetwaySelect[]>>;
    GetAllGetwayPaging(items: FilterViewModel<GetAllGetwayFilter>): Promise<OperationResult<GetAllPagingModel<IGetwayDoc>>>;
    GetByIdGetway(id: string): Promise<OperationResult<GetGetwayInfoModel>>;
}