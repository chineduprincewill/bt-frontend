export interface EventType {
    affiliateLink: string;
    createdAt: string;
    creator: string;
    creatorLogo: string;
    creatorProfileId: null | string;
    endTime: string;
    eventLogo: string;
    id: string;
    location: string;
    memo: string;
    price: string;
    startTime: string;
    title: string;
    updatedAt: string;
}

export interface SingleEventResponseType {
    status: string;
    message: string;
    data: EventType;
}
