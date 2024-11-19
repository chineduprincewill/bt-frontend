import { apiSlice } from './api';
import { SERVER_URL } from '../constants';
import { EventType, SingleEventResponseType } from '../types/event';

const EVENTS_URL = SERVER_URL + '/events';

export interface EventsResponseFromApi {
    id: string;
    createdAt: string;
    creator: string;
    creatorProfileId?: string;
    endTime: string;
    eventLogo: string;
    location: string;
    memo: string;
    price: string;
    startTime: string;
    title: string;
    updatedAt: string;
    affiliateLink: string;
    creatorLogo: string;
    name: string;
}

interface GetEventssResponse {
    status: string;
    message: string;
    data: EventsResponseFromApi[];
}

export const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        viewEvents: builder.query<GetEventssResponse, null>({
            query: () => ({
                url: EVENTS_URL + '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        viewSingleEvent: builder.query<SingleEventResponseType, string>({
            query: (id: string | undefined) => ({
                url: `${EVENTS_URL}/single?id=${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const {
    useViewEventsQuery,
    useViewSingleEventQuery,

    // Export other hooks...
} = eventApiSlice;
