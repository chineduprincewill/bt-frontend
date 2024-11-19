import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../api/api';
import { postApiSlice } from '../api/postApi';
import { aboutSlice } from './slices/aboutUs';
import { authSlice } from './slices/authSlice';
import { commingSoonSlice } from './slices/commingSoon';
import { createAccountSlice, CreateAccountState } from './slices/createAccount';
import feedSlice from './slices/feedSlice';
import { headerSidebarSlice } from './slices/header';
import { mainSidebarSlice } from './slices/newSidebarSlice';
import notificationSlice from './slices/notificationSlice';
import postSlice, { reportPostSliceReducer } from './slices/postSlice';
import { profileSlice } from './slices/profileSlice';
import { referFriendsSlice } from './slices/referFriends';
import { searchBarSlice, searchedProfileSlice } from './slices/searchSlice';
import settingsSlice, { deactivateAccountSlice } from './slices/settingsSlice';
import sideBarSlice from './slices/sideBarSlice';
import { supportMessageSlice } from './slices/supportMessage';
import supportSlice from './slices/supportSlice';
import { connectionSlice } from './slices/connectionsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { notificationsCountSlice } from './slices/notificationCount';
import { messageEventsSlice } from './slices/messageEventsSlice';
import { conversationIdSlice } from './slices/conversationIdSlice';
import { notificationsSlice } from './slices/notifications';
import settingsSidebarReducer from './slices/settingsSidebar';
import dateReducer from './slices/dateSelector';
import timeReducer from './slices/timeSlice';
import modalsReducer from './slices/modals';
import mentorshipReducer from './slices/mentorshipSlice';
import platformReducer from './slices/platform';

export interface RootState {
    createAccount: CreateAccountState;
    auth: ReturnType<typeof authSlice.reducer>;
    profile: ReturnType<typeof profileSlice.reducer>;
    searchResult: ReturnType<typeof searchBarSlice.reducer>;
    referFriends: ReturnType<typeof referFriendsSlice.reducer>;
    comingSoon: ReturnType<typeof commingSoonSlice.reducer>;
    headerSidebar: ReturnType<typeof headerSidebarSlice.reducer>;
    searchedProfile: ReturnType<typeof searchedProfileSlice.reducer>;
    settings: ReturnType<typeof settingsSlice>;
    deactivateAccount: ReturnType<typeof deactivateAccountSlice.reducer>;
    about: ReturnType<typeof aboutSlice.reducer>;
    contactSupport: ReturnType<typeof supportMessageSlice.reducer>;
    support: ReturnType<typeof supportSlice>;
    post: ReturnType<typeof postApiSlice.reducer>;
    sideBar: ReturnType<typeof sideBarSlice>;
    _post: ReturnType<typeof postSlice>;
    feed: ReturnType<typeof feedSlice>;
    reportPost: ReturnType<typeof reportPostSliceReducer>;
    notification: ReturnType<typeof notificationSlice>;
    notificationCount: ReturnType<typeof notificationsCountSlice.reducer>;
    notifications: ReturnType<typeof notificationsSlice.reducer>;
    mainSidebar: ReturnType<typeof mainSidebarSlice.reducer>;
    connections: ReturnType<typeof connectionSlice.reducer>;
    messageEvents: ReturnType<typeof messageEventsSlice.reducer>;
    conversationId: ReturnType<typeof conversationIdSlice.reducer>;
    settingsSidebar: ReturnType<typeof settingsSidebarReducer>;
    date: ReturnType<typeof dateReducer>;
    time: ReturnType<typeof timeReducer>;
    modals: ReturnType<typeof modalsReducer>;
    mentorship: ReturnType<typeof mentorshipReducer>;
    platform: ReturnType<typeof platformReducer>;
}

// App disptch type
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        createAccount: createAccountSlice.reducer,
        auth: authSlice.reducer,
        profile: profileSlice.reducer,
        searchResult: searchBarSlice.reducer,
        comingSoon: commingSoonSlice.reducer,
        searchedProfile: searchedProfileSlice.reducer,
        referFriends: referFriendsSlice.reducer,
        headerSidebar: headerSidebarSlice.reducer,
        settings: settingsSlice,
        deactivateAccount: deactivateAccountSlice.reducer,
        about: aboutSlice.reducer,
        contactSupport: supportMessageSlice.reducer,
        support: supportSlice,
        post: postApiSlice.reducer,
        sideBar: sideBarSlice,
        _post: postSlice,
        feed: feedSlice,
        reportPost: reportPostSliceReducer,
        notification: notificationSlice,
        notificationCount: notificationsCountSlice.reducer,
        mainSidebar: mainSidebarSlice.reducer,
        connections: connectionSlice.reducer,
        messageEvents: messageEventsSlice.reducer,
        conversationId: conversationIdSlice.reducer,
        notifications: notificationsSlice.reducer,
        settingsSidebar: settingsSidebarReducer,
        date: dateReducer,
        time: timeReducer,
        modals: modalsReducer,
        mentorship: mentorshipReducer,
        platform: platformReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
type AppDispatch = typeof store.dispatch;
export type { AppDispatch };

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
