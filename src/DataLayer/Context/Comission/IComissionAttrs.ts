import { UserActivityEnum } from "../../../DTO/UserActivity/UserActivityEnum";

export interface IComissionAttrs {
    userLevelId: any;
    actionType: UserActivityEnum;
    comission: number;
}