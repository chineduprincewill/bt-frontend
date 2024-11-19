import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserInfoFromApi } from '../../api/authApi';
import { UserProfile } from '../../api/profileApi';

interface SearchBarState {
    show?: boolean;
    searchText?: string;
}

const initialState: SearchBarState = {
    show: false,
    searchText: '',
};

export const searchBarSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        toggleSearchModal: (state, action: PayloadAction<SearchBarState>) => {
            state.show = action.payload.show;
            state.searchText = action.payload.searchText;
        },
        clearSearchData: (state) => {
            state.show = false;
            state.searchText = '';
        },
    },
});

type SearchedProfileState = {
    userProfile: (UserProfile & UserInfoFromApi) | null;
};
const searchResultState: SearchedProfileState = {
    userProfile: null,
};

export const searchResultSlice = createSlice({
    name: 'searchResult',
    initialState: searchResultState,
    reducers: {
        setSearchResult: (state, action: PayloadAction<(UserProfile & UserInfoFromApi) | null>) => {
            state.userProfile = action.payload;
        },
        clearSearchResult: (state) => {
            state.userProfile = null;
        },
    },
});

export const searchedProfileSlice = createSlice({
    name: 'searchedProfile',
    initialState: searchResultState,
    reducers: {
        openSearchedProfile: (state, action: PayloadAction<{ userProfile: NonNullable<SearchedProfileState['userProfile']> }>) => {
            state.userProfile = action.payload.userProfile;
        },
    },
});

export const { openSearchedProfile } = searchedProfileSlice.actions;

export const { toggleSearchModal, clearSearchData } = searchBarSlice.actions;
export type { SearchBarState };
export default searchBarSlice.reducer;
