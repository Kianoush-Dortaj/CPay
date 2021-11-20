import { UserActivityEnum } from "../UserActivity/UserActivityEnum";

export interface UpdateComissionModel {
    id: string;
    userLevelId: any;
    actionType: UserActivityEnum;
    comission: number;
}