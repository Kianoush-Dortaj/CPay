import { UserActivityEnum } from "../UserActivity/UserActivityEnum";

export interface GetComissionInfoModel {
    id:string;
    userLevelId: any;
    actionType: UserActivityEnum;
    comission: number;
}