import { SERVER_URL } from '../constants';
import { ApiResponse } from '../types/common';
import { PostComment } from '../types/post';
import { apiSlice } from './api';

const POST_URL = SERVER_URL + '/posts';
const FEEDS_URL = SERVER_URL + '/feeds';
// const EVENTS_URL = SERVER_URL + '/events';

// interface SuccessResponse {
//     status: 'success';
//     message: 'Connection followed successfully';
//     data: null;
// }

interface Profile {
    id: string;
    bio: string;
    location: string;
    address: string | null;
    about: string;
    phone: string | null;
    user: {
        email: string;
        firstName: string;
        fullName: string;
        id: string;
        lastName: string;
        displayImage: string | null;
        username: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface Stats {
    id: string;
    postId: string;
    likesCount: number;
    repostCount: number;
    commentsCount: number;
    bookmarksCount: number;
    reportCount: number;
    lastActivityDate: string | null;
    createdAt: string;
    updatedAt: string;
}

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

export interface PostActivities {
    bookmarked: boolean;
    liked: boolean;
    id: string;
    profileId: string;
    postId: string;
    reportReason: string;
    updatedAt: string;
    commentText?: string;
    profile: {
        id: string;
        bio: string;
        location: string;
        address: string | null;
        about: string;
        phone: string | null;
        user: {
            email: string;
            firstName: string;
            fullName: string;
            id: string;
            lastName: string;
            displayImage: string | null;
            username: string;
        };
        createdAt: string;
        updatedAt: string;
    };
}

export interface PostResponseFromApi {
    id: string;
    caption: string;
    location: string | null;
    isBlocked: boolean;
    shortUrl: string | null;
    profileId: string;
    originalPostId: string | null;
    postDate: string;
    updatedAt: string;
    profile: Profile;
    stats: Stats;
    comments: PostComment[];
    activities: PostActivities[];
    contents: {
        contentType: 'image' | 'video';
        createdAt: string;
        id: string;
        postId: string;
        status: 'clean';
        updatedAt: string;
        url: string;
    }[]; // Adjust the type accordingly based on the actual content structure
    originalPost: {
        id: string;
        location: string;
        contents: {
            contentType: 'image' | 'video';
            createdAt: string;
            id: string;
            postId: string;
            status: 'clean';
            updatedAt: string;
            url: string;
        }[];
        caption: string | null;
        profile: {
            id: string;
            bio: string;
            location: string;
            address: string | null;
            about: string;
            phone: string | null;
            user: {
                email: string;
                firstName: string;
                fullName: string;
                id: string;
                lastName: string;
                displayImage: string | null;
                username: string;
            };
            createdAt: string;
            updatedAt: string;
        };
        activities: PostActivities[];
        updatedAt?: string;
    };
}

interface AddCommentResponse {
    status: 'success';
    message: 'Post engagement updated successfully';
    data: {
        id: '931bb420-ca3d-4491-9cc3-eed2df716883';
        profileId: 'f1bb5cdd-e460-46d1-b74c-dc73bcc66236';
        postId: 'dba173ed-6c2d-4821-8e22-1a31b5bb2d8d';
        commentText: 'this is an interesting post';
        updatedAt: '2024-03-23T14:40:00.324Z';
        commentDate: '2024-03-23T14:40:00.324Z';
        parentCommentId: null;
    };
}

interface GetPostContentUploadLinkResponse {
    status: 'success';
    message: 'Pre-signed URL generated successfully';
    data: {
        preSignedUrlData: [
            {
                mimeType: 'video/mp4';
                fileName: 'account.mp4';
                fileSizeInBytes: '5242880';
                durationInSeconds: '273';
                extension: '.mp4';
                identifier: 'ced66c95-dbcf-4226-a2e9-c21456e65da8';
                uploadClass: 'posts';
                preSignedUrl: 'https://profile-picture-upload-blkat.s3.us-east-1.amazonaws.com/Posts/ced66c95-dbcf-4226-a2e9-c21456e65da8_V2H4UPAH.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45TYFEBIUP6ISPAK%2F20240305%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240305T175934Z&X-Amz-Expires=600&X-Amz-Signature=6cd6e743c8c8ba266053e8c8dfa3f0007d5d1eaf0c91f908ff473eb821958911&X-Amz-SignedHeaders=host&x-amz-meta-content-type=video%2Fmp4&x-amz-meta-original-name=account.mp4&x-id=PutObject';
                uploadKey: 'V2H4UPAH.mp4';
            },
            {
                mimeType: 'image/png';
                fileName: 'account.png';
                fileSizeInBytes: '5242880';
                extension: '.png';
                identifier: 'ced66c95-dbcf-4226-a2e9-c21456e65da8';
                uploadClass: 'posts';
                preSignedUrl: 'https://profile-picture-upload-blkat.s3.us-east-1.amazonaws.com/Posts/ced66c95-dbcf-4226-a2e9-c21456e65da8_zhepLO8k.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45TYFEBIUP6ISPAK%2F20240305%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240305T175934Z&X-Amz-Expires=600&X-Amz-Signature=032587895ba5ecb4144881f963be6e2249644a51d49f07d86d59b36c0b0a802d&X-Amz-SignedHeaders=host&x-amz-meta-content-type=image%2Fpng&x-amz-meta-original-name=account.png&x-id=PutObject';
                uploadKey: 'zhepLO8k.png';
            },
            {
                mimeType: 'image/png';
                fileName: 'account.png';
                fileSizeInBytes: '5242880';
                extension: '.png';
                identifier: 'ced66c95-dbcf-4226-a2e9-c21456e65da8';
                uploadClass: 'posts';
                preSignedUrl: 'https://profile-picture-upload-blkat.s3.us-east-1.amazonaws.com/Posts/ced66c95-dbcf-4226-a2e9-c21456e65da8_x1v9LhLh.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA45TYFEBIUP6ISPAK%2F20240305%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240305T175935Z&X-Amz-Expires=600&X-Amz-Signature=f58d4f53c8d2d68a42bd7e72d89df75427ffa9a82b8b7ae445d09d6394c79d4c&X-Amz-SignedHeaders=host&x-amz-meta-content-type=image%2Fpng&x-amz-meta-original-name=account.png&x-id=PutObject';
                uploadKey: 'x1v9LhLh.png';
            },
        ];
    };
}

interface PostContentRequestParams {
    contents: (
        | {
              mimeType: string;
              fileName: string;
              fileSizeInBytes: string; //50mb
              durationInSeconds: string | number;
          }
        | {
              mimeType: string;
              fileName: string;
              fileSizeInBytes: string; //50mb
          }
    )[];
}

// interface GetEventssResponse {
//     status: string;
//     message: string;
//     data: EventsResponseFromApi[];
// }

interface GetPostsResponse {
    status: string;
    message: string;
    data: {
        posts: PostResponseFromApi[];
    };
}

interface GetSinglePostResponse {
    status: string;
    message: string;
    data: PostResponseFromApi;
}

export interface CreatePostResponse {
    status: string;
    message: string;
    data: PostResponseFromApi;
}

export interface IComment {
    commentDate: string;
    commentText: string;
    id: string;
    parentCommentId?: string | null;
    postId: string;
    profile: {
        id: string;
        bio: string;
        about: string;
        user: {
            id: string;
            firstName: string;
            displayImage: string;
            lastName: string;
            username: string;
        };
    };
    profileId: string;
    subComment?: IComment[];
}
type LikePostEngagement = { engagement: { liked: true }; action: 'liked' };
type UnlikePostEngagement = { engagement: { liked: false }; action: 'unlike' };
type CommentPostEngagement = {
    engagement: { commentText: string };
    action: 'comment';
};
type BookmarkPostEngagement = {
    engagement: { bookmarked: true };
    action: 'bookmark';
};
type UnbookmarkPostEngagement = {
    engagement: { bookmarked: false };
    action: 'unbookmark';
};
type DeleetPostCommentEngagement = {
    engagement: { commentText: false };
    action: 'delete';
};
type PostEngagements = {
    postId: string;
} & (
    | LikePostEngagement
    | UnlikePostEngagement
    | CommentPostEngagement
    | UnbookmarkPostEngagement
    | BookmarkPostEngagement
    | DeleetPostCommentEngagement
);

interface PostEngagementResponse {
    status: 'success';
    message: string;
    data: {
        id: 'd8dffc9d-42e6-4a2f-9f29-1a4d4f936ae5';
        profileId: '411ec0a3-92bd-4456-b78e-f573ef9bc6a5';
        postId: 'ebbd7074-d3dc-4e0f-beaf-1935d2f4d71c';
        liked: true;
        bookmarked: false;
        commentText: 'this is an interesting post 000';
        reportReason: null;
        createdAt: '2024-03-06T02:36:54.849Z';
        updatedAt: '2024-03-06T02:54:40.634Z';
    };
}

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // viewEvents: builder.query<GetEventssResponse, null>({
        //     query: () => ({
        //         url: EVENTS_URL + '/',
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        //         },
        //     }),
        // }),
        viewPost: builder.query<GetPostsResponse, { profileId?: string } | null>({
            query: (data) => ({
                url: FEEDS_URL + '/',
                method: 'GET',
                params: {
                    profileId: data?.profileId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        viewProfilePost: builder.query<GetPostsResponse, { profileId: string }>({
            query: (data) => ({
                url: '/posts/profile',
                method: 'GET',
                params: {
                    profileId: data.profileId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        engageCommentWithLike: builder.mutation<ApiResponse<null>, string>({
            query: (commentId) => ({
                url: '/posts/comment/like',
                method: 'GET',
                params: {
                    commentId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getSubComments: builder.query<ApiResponse<PostComment[]>, { postId: string; commentId: string }>({
            query: ({ postId, commentId }) => ({
                url: '/posts/comment/subcomments',
                method: 'GET',
                params: {
                    postId,
                    commentId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getComments: builder.query<ApiResponse<PostComment[]>, string>({
            query: (postId) => ({
                url: POST_URL + '/view-comments',
                method: 'GET',
                params: { postId },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
                providesTags: (result: PostComment[], _: Error, id: string) => {
                    return result ? [{ type: 'Comment', id }] : [];
                },
            }),
            keepUnusedDataFor: 30,
        }),
        viewActivities: builder.query<GetPostsResponse, null>({
            query: () => ({
                url: POST_URL + '/profile',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        deleteCommentsUnderPost: builder.mutation<GetSinglePostResponse, { commentId: string }>({
            query: ({ commentId }) => ({
                url: POST_URL + '/comment',
                method: 'DELETE',
                params: {
                    commentId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        viewCommentsUnderPost: builder.mutation<GetSinglePostResponse, { postId: string }>({
            query: ({ postId }) => ({
                url: POST_URL + '/',
                method: 'POST',
                params: {
                    postId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        addCommentsUnderPost: builder.mutation<AddCommentResponse, { postId: string; parentCommentId?: string; commentText: string }>({
            query: ({ postId, commentText, parentCommentId }) => {
                console.log({ postId, commentText, parentCommentId });
                return {
                    url: POST_URL + '/comment',
                    method: 'POST',
                    body: {
                        postId,
                        engagementData: {
                            commentText,
                            parentCommentId,
                        },
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                };
            },
        }),
        viewSinglePost: builder.query<GetSinglePostResponse, { postId: string }>({
            query: ({ postId }) => ({
                url: POST_URL,
                method: 'GET',
                params: {
                    postId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        getPostContentUploadLink: builder.mutation<GetPostContentUploadLinkResponse, PostContentRequestParams>({
            query: ({ contents }) => {
                return {
                    url: POST_URL + `/upload/content`,
                    method: 'POST',
                    body: { contents },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                };
            },
        }),
        uploadPostImageToCloud: builder.mutation<any, { url: string; file: File; contentType: string }>({
            query: ({ url, file, contentType }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: url,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Content-Type': contentType,
                    },
                };
            },
        }),
        engagePost: builder.mutation<PostEngagementResponse, PostEngagements & { postId: string }>({
            query: ({ engagement, postId }) => ({
                url: POST_URL + `/engage`,
                method: 'POST',
                body: {
                    postId: postId,
                    engagementData: engagement,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        deletePost: builder.mutation<CreatePostResponse, { postId: string }>({
            query: ({ postId }) => ({
                url: POST_URL,
                method: 'DELETE',
                params: { postId },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
        reportPost: builder.mutation<CreatePostResponse, { postId: string; reason: string }>({
            query: ({ postId, reason }) => {
                console.log({ postId, reason });
                return {
                    url: POST_URL + '/report',
                    method: 'POST',
                    body: { postId, reason },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                };
            },
        }),
        createPost: builder.mutation<
            CreatePostResponse,
            {
                postData: {
                    caption: string;
                    location: string;
                    originalPostId?: string;
                };
                lat?: number;
                lon?: number;
                withContent: boolean;
            }
        >({
            query: ({ postData, withContent, lat, lon }) => ({
                url: POST_URL + `/new`,
                method: 'POST',
                body: { postData: { ...postData, location: undefined }, withContent, lat, lon },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                },
            }),
        }),
    }),
});

export const {
    useEngagePostMutation,
    useViewSinglePostQuery,
    useViewPostQuery,
    useGetPostContentUploadLinkMutation,
    useUploadPostImageToCloudMutation,
    useCreatePostMutation,
    useViewActivitiesQuery,
    // useViewEventsQuery,
    useDeletePostMutation,
    useReportPostMutation,
    useViewProfilePostQuery,
    useAddCommentsUnderPostMutation,
    useViewCommentsUnderPostMutation,
    useDeleteCommentsUnderPostMutation,
    useLazyGetSubCommentsQuery,
    useEngageCommentWithLikeMutation,
    useLazyGetCommentsQuery,
    // Export other hooks...
} = postApiSlice;
