import { apiSlice } from './api';
import { SERVER_URL } from '../constants';
const NOTIFICATION_URL = SERVER_URL + '/notifications';
import { ViewNotificationsResponse } from '../types/notifications';
import { ViewUnreadNotificationCountResponse } from '../types/notifications';

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        viewNotifications: builder.query<ViewNotificationsResponse, null>({
            query: () => ({
                url: NOTIFICATION_URL + '/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        markNotificationAsRead: builder.mutation({
            query: (ID) => ({
                url: NOTIFICATION_URL + `/read?notificationId=${ID}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getUnreadNotifications: builder.query({
            query: () => ({
                url: NOTIFICATION_URL + '?read=false',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        viewUnreadMessagesNotificationCount: builder.query<ViewUnreadNotificationCountResponse, null>({
            query: () => ({
                url: NOTIFICATION_URL + '/unread-conversation/count',
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
    useViewNotificationsQuery,
    useViewUnreadMessagesNotificationCountQuery,
    useMarkNotificationAsReadMutation,
    useGetUnreadNotificationsQuery,
} = notificationApiSlice;
