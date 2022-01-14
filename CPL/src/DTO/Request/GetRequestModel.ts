
export interface GetRequestModel {
    id?:string;
    senderUserId: string;
    reciverUserId: string;
    requestId: string;
    targetRequestId: string;
    // status: RequestStatus;
    createDate: Date;
}