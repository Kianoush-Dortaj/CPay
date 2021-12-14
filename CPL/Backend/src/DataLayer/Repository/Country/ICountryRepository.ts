import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddCountryModel } from "../../../DTO/Country/AddCountry";
import { GetAllCountryFilter } from "../../../DTO/Country/GetAllCountryFilter";
import { GetCountryInfoModel } from "../../../DTO/Country/GetCountryInfo";
import { UpdateCountryModel } from "../../../DTO/Country/UpdateCountry";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { ICountryDoc } from "../../Context/Country/ICountryDoc";

export interface ICountryRepository {

    CreateCountry(item: AddCountryModel): Promise<OperationResult<boolean>>;
    UpdateCountry(item: UpdateCountryModel): Promise<OperationResult<boolean>>;
    DeleteCountry(id: string): Promise<OperationResult<boolean>>;
    GetAllCountrySelect(): Promise<OperationResult<ICountryDoc[]>>;
    GetAllCountryPaging(items: FilterViewModel<GetAllCountryFilter>): Promise<OperationResult<ICountryDoc[]>>;
    GetByIdCountry(id: string): Promise<OperationResult<GetCountryInfoModel>> ;
    GetDefulatCountry(): Promise<OperationResult<GetCountryInfoModel>>;
    FindCountryByUniSeoCode(code:string): Promise<OperationResult<GetCountryInfoModel>>;

}