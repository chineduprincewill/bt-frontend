import { SERVER_URL } from '../constants';
import { apiSlice } from './api';

const AUTH_URL = SERVER_URL + '/auth';

interface SurveyData {
    surveyClass: string;
    userResponse: {
        Q1: string;
        Q2: string;
        Q3: string;
        Q4: string;
        Q5: string;
        Q6: string;
        Q7: string;
        Q8: string;
        Q9: string;
        Q10: string;
    };
    roleType: string;
}

interface SurveyResponse {
    status: 'success';
    message: 'Email verification code sent successfully';
    data: {
        user: {
            id: 'bbb0d94e-d2fb-4c8d-b6cf-e8b8f0595d83';
            email: string;
            firstName: string;
            lastName: string;
            username: string;
            status: { activated: false; emailVerified: false };
            updatedAt: Date;
            createdAt: Date;
            roleId: null | string;
        };
    };
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        submitSurvey: builder.mutation<SurveyResponse, SurveyData>({
            query: (credentials: unknown) => ({
                url: AUTH_URL + '/signup',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        submitExternalSurvey: builder.mutation<SurveyResponse, SurveyData & { email: string }>({
            query: (credentials: SurveyData & { email: string }) => ({
                url: AUTH_URL + '/submit-survey/feedback',
                params: {
                    email: credentials.email,
                },
                method: 'POST',
                body: credentials
            })
        })
    }),
});

export type { };
export const { useSubmitSurveyMutation, useSubmitExternalSurveyMutation } = authApiSlice;
