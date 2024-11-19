import { apiSlice } from './api';
import { SERVER_URL } from '../constants';
import { MasterclassResponse, SingleMasterClassResponse, UpdateMasterclassRequest } from '../types/masterclass';
import { ApiResponse } from '../types/common';

export const masterclassApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMasterclasses: builder.query<MasterclassResponse, { q?: string; profileId?: string }>({
            query: (params) => ({
                url: `${SERVER_URL}/masterclass`,
                method: 'GET',
                params,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getSingleMasterclass: builder.query<SingleMasterClassResponse, string>({
            query: (id: string) => ({
                url: `${SERVER_URL}/masterclass/single?masterclassId=${id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        updateMasterclassDetails: builder.mutation<SingleMasterClassResponse, UpdateMasterclassRequest>({
            query: (body) => ({
                url: `${SERVER_URL}/masterclass/upload-info`,
                method: 'PUT',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getMasterclassByCategory: builder.query<MasterclassResponse, string>({
            query: (category) => ({
                url: `${SERVER_URL}/masterclass?category=${category}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        requestMasterclass: builder.mutation({
            query: (credentials) => ({
                url: `${SERVER_URL}/masterclass/request`,
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const {
    useGetAllMasterclassesQuery,
    useGetSingleMasterclassQuery,
    useRequestMasterclassMutation,
    useUpdateMasterclassDetailsMutation,
    useGetMasterclassByCategoryQuery,
} = masterclassApiSlice;
