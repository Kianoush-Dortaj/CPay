import OperationResult from "../../../core/Operation/OperationResult";
import { GetAllCoinSelect } from "../../../DTO/Coin/GetAllCoinSelect";
import { GetCoinBySymbol } from "../../../DTO/Coin/GetCoinBySymbol";

export interface ICoinRepository {
    GetAllCoinSelect(lang: string): Promise<OperationResult<GetAllCoinSelect[]>>;
    GetByIdCoin(symbol: string): Promise<OperationResult<any>>;
    GetBySymbolCoin(symbol: string, userId: string,langId:string): Promise<OperationResult<GetCoinBySymbol>>;

}