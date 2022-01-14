export interface GetAllDirect {
    directId: string;
    displayName: string;
    youSend: boolean;
    userId: string;
    ownerId:string;
    unreadMessagesCount: number;
    istyping: boolean;
    sendDateLastMesage: Date,
    lastMessage: string;
}
