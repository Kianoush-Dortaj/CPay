import { UserActivityEnum } from "../UserActivity/UserActivityEnum";

export interface GetAllComissionFilter {
    userLevelId: any;
    actionType: UserActivityEnum;
    comission: number;
}