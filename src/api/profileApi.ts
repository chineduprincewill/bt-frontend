import { apiSlice } from './api';
import { SERVER_URL } from '../constants';
const PROFILE_URL = SERVER_URL + '/profile';

// Define the types here
export type UserProfile = {
    id: string;
    bio: string;
    location: {
        city: string;
        state: string;
        value: string;
        country: string;
        countryCode: string;
    };
    address: {
        city: string;
        state: string;
        street: string;
        country: string;
        countryCode: string;
    };
    about: string;
    phone: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    education: Education[]; // You can replace 'any[]' with a more specific type for education
    experience: Experience[]; // You can replace 'any[]' with a more specific type for experience
    skillset?: SkillSet; // You can replace 'any[]' with a more specific type for skillset
    isFollowing?: boolean;
};

export type Experience = {
    role: string;
    company: string;
    employmentType: string;
    // location: string;
    startDate: Date; //yyyy-mm-dd
    endDate: Date;
    isCurrentWorkplace: boolean;
    id: string;
};

type IEducation = {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
};

export type Education = {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
    id: string;
};
type SkillSet = {
    interests: string[];
    skillSet: string[];
    industry: string[];
};

type CreateProfilePayload = {
    bio: string;
    location: {
        value: string;
        city?: string;
        state?: string;
        country?: string;
        countryCode?: string;
    };
    about: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        country: string;
        countryCode: string;
    };
};

type UpdateProfilePayload = {
    bio?: string;
    location?: {
        value?: string;
        city?: string;
        state?: string;
        country?: string;
        countryCode?: string;
    };
    about?: string;
    phone?: string;
};

type ProfileResponse = {
    status: string;
    message: string;
    data: UserProfile;
};

type ExperienceResponse = {
    status: string;
    message: string;
    data: Experience[];
};

type UpdateExperienceResposne = {
    status: string;
    message: string;
    data: Experience;
};

type EducationResponse = {
    status: string;
    message: string;
    data: Education[];
};

type UpdateEducationResponse = {
    status: string;
    message: string;
    data: Education;
};

type SkillSetResponse = {
    status: string;
    message: string;
    data: SkillSet[];
};

type SimpleResponse = {
    status: string;
    message: string;
};

type UpdateEducationPayload = {
    id: string;
    data: Partial<IEducation>; // Replace 'any' with specific update fields
};

export type ISkillSet = {
    interests: string[];
    skillSet: string[];
    industry: string[];
};

interface GetProfileUploadLinkResponse {
    status: 'success';
    message: 'Pre-signed URL generated successfully';
    data: {
        preSignedUrl: string;
        instructions: string;
    };
}
type UpdateSkillSetPayload = {
    id: string;
    data: Partial<SkillSet>; // Replace 'any' with specific update fields
};

type DeleteItemResponse = {
    status: string;
    message: string;
};

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProfile: builder.mutation<ProfileResponse, CreateProfilePayload>({
            query: (profileData) => ({
                url: PROFILE_URL + '/create',
                method: 'POST',
                body: profileData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getProfile: builder.mutation<
            ProfileResponse,
            { id?: string; userId?: string } | undefined
        >({
            query: (props) => ({
                url: PROFILE_URL + '/detail',
                method: 'GET',
                params: props
                    ? { id: props.id, userId: props.userId }
                    : undefined,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getProfileQuery: builder.query<
            ProfileResponse,
            { id?: string; userId?: string } | undefined
        >({
            query: (props) => ({
                url: PROFILE_URL + '/detail',
                method: 'GET',
                params: props
                    ? { id: props.id, userId: props.userId }
                    : undefined,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
            transformErrorResponse: () => undefined,
        }),
        getProfileUploadLink: builder.mutation<GetProfileUploadLinkResponse, { mimeType: string; fileName: string }>({
            query: ({ mimeType, fileName }) => ({
                url: PROFILE_URL + '/upload',
                method: 'POST',
                body: { mimeType, fileName },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                }
            }),
        }),
        uploadImageToCloud: builder.mutation<
            ProfileResponse,
            { url: string; file: File }
        >({
            query: ({ url, file }) => {
                // const formData = new FormData();
                // formData.append('file', file);
                console.log('file type ', file)
                return {
                    url: url,
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type
                    },
                };
            },
        }),
        updateProfile: builder.mutation<ProfileResponse, UpdateProfilePayload>({
            query: (updateData) => ({
                url: PROFILE_URL + '/update',
                method: 'PATCH',
                body: updateData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        // Experience endpoints
        addExperiences: builder.mutation<
            ExperienceResponse,
            Omit<Experience, 'id'>[]
        >({
            query: (experiences) => ({
                url: PROFILE_URL + '/experience',
                method: 'POST',
                body: { experiences },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        updateExperience: builder.mutation<
            UpdateExperienceResposne,
            { id: string; data: Partial<Experience> }
        >({
            query: ({ id, data }) => {
                console.log({ data, id });
                return {
                    url: PROFILE_URL + '/experience/update',
                    method: 'PATCH',
                    params: { id },
                    body: data,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('accessToken'),
                    },
                };
            },
        }),
        deleteExperience: builder.mutation<SimpleResponse, { id: string }>({
            query: ({ id }) => ({
                url: PROFILE_URL + `/experience/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getExperience: builder.query<ExperienceResponse, void>({
            query: () => ({
                url: PROFILE_URL + '/experience',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
            transformErrorResponse: () => undefined,
        }),
        // IEducation endpoints
        addEducation: builder.mutation<EducationResponse, IEducation[]>({
            query: (education) => ({
                url: PROFILE_URL + '/education',
                method: 'POST',
                body: { education },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        updateEducation: builder.mutation<
            UpdateEducationResponse,
            UpdateEducationPayload
        >({
            query: ({ id, data }) => ({
                url: PROFILE_URL + '/education/update',
                method: 'PATCH',
                params: { id },
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        deleteEducation: builder.mutation<DeleteItemResponse, { id: string }>({
            query: ({ id }) => ({
                url: PROFILE_URL + `/education/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getEducation: builder.query<EducationResponse, void>({
            query: () => ({
                url: PROFILE_URL + '/education',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
            transformErrorResponse: () => undefined,
        }),
        // Skillset endpoints
        addSkillSet: builder.mutation<SkillSetResponse, ISkillSet>({
            query: (skillsets) => ({
                url: PROFILE_URL + '/skillset',
                method: 'POST',
                body: { skillsets },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        updateSkillSet: builder.mutation<
            SkillSetResponse,
            UpdateSkillSetPayload
        >({
            query: ({ id, data }) => ({
                url: PROFILE_URL + '/skillset/update',
                method: 'PATCH',
                params: { id },
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        deleteSkillSet: builder.mutation<DeleteItemResponse, { id: string }>({
            query: ({ id }) => ({
                url: PROFILE_URL + `/skillset/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getSkillSet: builder.query<SkillSetResponse, void>({
            query: () => ({
                url: PROFILE_URL + '/skillset',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export type { IEducation };
export const {
    useCreateProfileMutation,
    useGetProfileMutation,
    useUpdateProfileMutation,
    useAddExperiencesMutation,
    useUpdateExperienceMutation,
    useDeleteExperienceMutation,
    useGetExperienceQuery,
    useAddEducationMutation,
    useAddSkillSetMutation,
    useUploadImageToCloudMutation,
    useGetEducationQuery,
    useUpdateEducationMutation,
    useGetProfileUploadLinkMutation,
    useGetProfileQueryQuery,
    // Export other hooks...
} = profileApiSlice;
