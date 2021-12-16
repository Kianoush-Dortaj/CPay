import OperationResult from "../../../core/Operation/OperationResult";


export interface IJWTRepository {

    GenerateToken(info: any): Promise<OperationResult<string>>;
    GenerateTokenWithExTime(info: any , time:number): Promise<OperationResult<string>>;
    DecodeToken(req: any, res: any, next: any): Promise<OperationResult<any>> ;
    DecodeWebsocketToken(token?:string): Promise<OperationResult<any>>;

}