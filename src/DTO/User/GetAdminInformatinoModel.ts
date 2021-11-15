import { Gender } from "./UpdateUserModel";

export interface GetAdminInformationModel {
    firstName: string;
    id: string;
    gender: Gender;
    lastName: string;
    hasAvatar:boolean;
}