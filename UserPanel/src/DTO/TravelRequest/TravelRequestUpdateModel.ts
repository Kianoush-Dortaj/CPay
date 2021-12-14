import { Gender } from "../User/UpdateUserModel";

export interface TravelRequestUpdateModel {
    requestId: string;
    travelType: string;
    travelResidence: string;
    country: string;
    city: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    lookingfor: Gender;
    description: string;
}