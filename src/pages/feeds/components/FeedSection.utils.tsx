import { PostResponseFromApi } from '../../../api/postApi';
import { DisplayIconForProfile } from '../../profile';
import { formatDate } from '../formatDate';

export function ParsePostPayload(post: PostResponseFromApi): PostPayload | null {
    if (!post) return null;

    const response: PostPayload = {
        author: {
            profileId: post.profile?.id ?? '',
            firstName: post.profile?.user?.firstName ?? '',
            lastName: post.profile?.user?.lastName ?? '',
            username: post.profile?.user?.username ?? '',
            displayImage: DisplayIconForProfile(post.profile?.user?.displayImage ?? ''),
            placeOfWork: post.profile?.bio ?? '',
        },
        location: post.profile?.location ? ((post.profile.location as any)?.value as string) : post.profile?.location ?? '',
        createdAt: post.postDate?.toString() ?? '',
        likedBy: [],
        text: post.caption ?? '',
        images: post.contents?.filter((content) => content.contentType === 'image')?.map((content) => content.url) ?? [],
        id: post.id ?? '',
        actionRecord: {
            id: post.activities?.[0]?.id ?? '',
            liked: post.activities?.[0]?.liked ?? false,
            likeCount: post.activities?.reduce((acc, curr) => acc + (curr.liked ? 1 : 0), 0) ?? 0,
            bookmarked: post.activities?.[0]?.bookmarked ?? false,
            reportReason: post.activities?.[0]?.reportReason ?? '',
            updatedAt: post.activities?.[0]?.updatedAt ?? '',
            commentCount: post.stats?.commentsCount ?? 0,
            profile: post.activities?.[0]?.profile ?? {},
        },
        activities: post.activities ?? [],
        contents: post.contents ?? [],
        profile: post.profile ?? {},
        originalPostId: post.originalPostId,
        originalPost: post.originalPost
            ? {
                  author: {
                      profileId: post.originalPost.profile.id ?? '',
                      firstName: post.originalPost.profile.user.firstName ?? '',
                      lastName: post.originalPost.profile.user.lastName ?? '',
                      username: post.originalPost.profile.user.username ?? '',
                      displayImage: DisplayIconForProfile(post.originalPost.profile.user.displayImage ?? ''),
                      placeOfWork: post.originalPost.profile.bio ?? '',
                  },
                  location: post.originalPost.profile.location
                      ? ((post.originalPost.profile.location as any)?.value as string)
                      : post.originalPost.profile.location ?? '',
                  createdAt: formatDate(post.activities?.[0]?.updatedAt?.split('T')[0]) ?? '',
                  likedBy: [],
                  text: post.originalPost.caption ?? '',
                  images: post.originalPost.contents?.filter((content) => content.contentType === 'image')?.map((img) => img.url) ?? [],
                  id: post.originalPost.id ?? '',
                  activities: post.originalPost.activities ?? [],
                  contents: post.originalPost.contents ?? [],
              }
            : undefined,
    };

    return response;
}

export interface PostPayload {
    author: {
        profileId: string;
        firstName: string;
        lastName: string;
        username: string;
        displayImage: string;
        placeOfWork: string;
    };
    location: string | null;
    createdAt: string;
    likedBy: string[];
    text: string;
    images: string[];
    id: string;
    actionRecord: {
        id: string | undefined;
        liked: boolean | undefined;
        likeCount: number;
        bookmarked: boolean | undefined;
        reportReason: string | undefined;
        updatedAt: string | undefined;
        commentCount: number;
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
    };
    activities: Array<{
        id?: string;
        liked?: boolean;
        bookmarked?: boolean;
        reportReason?: string;
        updatedAt?: string;
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
    }>;
    contents: Array<{
        contentType: string;
        url: string;
    }>;
    profile: {
        id: string;
        user: {
            email: string;
            firstName: string;
            fullName: string;
            id: string;
            lastName: string;
            displayImage: string | null;
            username: string;
        };
        bio: string;
        location: string | null;
    };
    originalPostId: string | null;
    originalPost?: {
        author: {
            profileId: string;
            firstName: string;
            lastName: string;
            username: string;
            displayImage: string;
            placeOfWork: string;
        };
        location: string;
        createdAt: string;
        likedBy: string[];
        text: string | undefined;
        images: string[];
        id: string;
        activities: Array<{
            id?: string;
            liked?: boolean;
            bookmarked?: boolean;
            reportReason?: string;
            updatedAt?: string;
        }>;
        contents: Array<{
            contentType: string;
            url: string;
        }>;
    };
}
