
export interface GetCountryInfoModel {
    id: string;
    name: string;
    flag?:any;
    iso3Code: string;
    iso2Code: string;
    callCode: string;
    currency:string;
    isDefault: boolean;
    displayOrder:number;
    languageId:any;
    isPublish:boolean;

}