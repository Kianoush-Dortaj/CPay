import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddLanguageModel } from "../../../DTO/Language/AddLanguage";
import { GetAllLanguageFilter } from "../../../DTO/Language/GetAllLangaugeFilter";
import { GetLanguageInfoModel } from "../../../DTO/Language/GetLanguageInfo";
import { UpdateLanguageModel } from "../../../DTO/Language/UpdateLanguage";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { ILanguageDoc } from "../../Context/Language/ILanguageDoc";

export interface ILanguageRepository {

    CreateLanguage(item: AddLanguageModel): Promise<OperationResult<boolean>>;
    UpdateLanguage(item: UpdateLanguageModel): Promise<OperationResult<boolean>>;
    DeleteLanguage(id: string): Promise<OperationResult<boolean>>;
    GetAllLanguageSelect(): Promise<OperationResult<ILanguageDoc[]>>;
    GetAllLangaugePaging(items: FilterViewModel<GetAllLanguageFilter>): Promise<OperationResult<ILanguageDoc[]>>;
    GetByIdLanguage(id: string): Promise<OperationResult<GetLanguageInfoModel>> ;
}