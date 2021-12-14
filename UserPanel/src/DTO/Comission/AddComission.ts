import { UserActivityEnum } from "../UserActivity/UserActivityEnum";

export interface AddComissionModel {
    userLevelId: any;
    actionType: UserActivityEnum;
    comission: number;
}