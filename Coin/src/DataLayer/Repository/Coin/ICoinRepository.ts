import OperationResult from "../../../core/Operation/OperationResult";


export interface ICoinRepository {

    transfer(to:string,amount:number) : Promise<OperationResult<boolean>>;

}