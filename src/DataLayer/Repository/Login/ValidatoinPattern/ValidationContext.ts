export interface ValidationContext {
    Message: string;
    HaveError: boolean;
    Context: GenerateCode;
}

export interface GenerateCode {
    isTowfactor: boolean;
    hash: string;
    token: any;
}

export interface UserInformation{
    displayName?:string;
    userInfo:any;
    roles?:string[];

}