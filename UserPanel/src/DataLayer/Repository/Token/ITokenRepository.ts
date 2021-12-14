import OperationResult from "../../../core/Operation/OperationResult";

export interface ITokenRepository {

    transfer(to:string,amount:number) : Promise<OperationResult<any>>;

}