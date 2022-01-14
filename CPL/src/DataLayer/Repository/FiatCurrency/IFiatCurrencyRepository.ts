import OperationResult from "../../../core/Operation/OperationResult";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { AddFiatCurrencyModel } from "../../../DTO/FiatCurrency/AddFiatCurrency";
import { GetAllFiatCurrencyFilter } from "../../../DTO/FiatCurrency/GetAllFiatCurrencyFilter";
import { GetFiatCurrencyInfoModel } from "../../../DTO/FiatCurrency/GetFiatCurrencyInfo";
import { UpdateFiatCurrencyModel } from "../../../DTO/FiatCurrency/UpdateFiatCurrency";
import { IFiatCurrencyDoc } from "../../Context/FiatCurrency/IFiatCurrencyDoc";

export interface IFiatCurrencyRepository {

    CreateFiatCurrency(item: AddFiatCurrencyModel): Promise<OperationResult<boolean>>;
    UpdateFiatCurrency(item: UpdateFiatCurrencyModel): Promise<OperationResult<boolean>>;
    DeleteFiatCurrency(id: string): Promise<OperationResult<boolean>>;
    GetAllFiatCurrencySelect(): Promise<OperationResult<IFiatCurrencyDoc[]>>;
    GetAllFiatCurrencyPaging(items: FilterViewModel<GetAllFiatCurrencyFilter>): Promise<OperationResult<IFiatCurrencyDoc[]>>;
    GetByIdFiatCurrency(id: string): Promise<OperationResult<GetFiatCurrencyInfoModel>> ;

}