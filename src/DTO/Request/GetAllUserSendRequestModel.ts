import { Gender } from "../../DataLayer/Context/User/Gender";

export interface GetAllUserSendRequestModel {
    hasAvatar: boolean;
    userId: string;
    startDate: Date;
    endDate: Date;
    country: string;
    lookingfor: Gender;
    description: string;
    city: string;
    id: string;
    requestId: string;
    firstName: string;
    lastName: string;
    travelTypeName: string;
    travelTypeIcon: string;
    travelResidentName: string;
    travelResidentIcon: string;
    budget: number;
}