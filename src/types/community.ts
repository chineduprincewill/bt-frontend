import { PostComment } from './post';

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

export interface SingleCommunity {
    id: string;
    name: string;
    reason: string;
    description: string;
    creatorProfileId: string;
    banner: string | null;
    updatedAt: string;
    createdAt: string;
    membersCount: number;
    networks: any[];
}

export interface CreateCommunityResponse {
    status: string;
    message: string;
    data: SingleCommunity;
}

export interface AllCommunitiesResponse {
    status: string;
    message: string;
    data: SingleCommunity[];
}

export interface SingleCommunityResponse {
    status: string;
    message: string;
    data: {
        community: SingleCommunity;
        isMember: boolean;
    };
}

interface CommunityUserDetail {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    displayImage: null | string;
}

interface SingleCommunityMember {
    id: string;
    bio: null | string;
    user: CommunityUserDetail;
}

export interface AllCommunityMembersResponse {
    status: string;
    message: string;
    data: [
        {
            id: string;
            villageId: string;
            communityId: null | string;
            memberId: string;
            status: string;
            villageBadge: string;
            communityBadge: string;
            createdAt: string;
            updatedAt: string;
            member: SingleCommunityMember;
        },
    ];
}

interface CommunityUserDetails {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    displayImage: string;
}

export interface CommunityMemberProfile {
    id: string;
    bio: string;
    user: CommunityUserDetails;
}

export interface Stats {
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

export interface CommunityPost {
    id: string;
    caption: string;
    location: string | null;
    isBlocked: boolean;
    shortUrl: string | null;
    profileId: string;
    originalPostId: string | null;
    villageId: string | null;
    communityId: string;
    postDate: string;
    updatedAt: string;
    activities: any[];
    originalPost: any | null;
    profile: Profile;
    comments: PostComment[];
    stats: Stats;
    contents: {
        contentType: 'image' | 'video';
        createdAt: string;
        id: string;
        postId: string;
        status: 'clean';
        updatedAt: string;
        url: string;
    }[];
}

export interface CommunityFeedResponse {
    status: string;
    message: string;
    data: CommunityPost[];
}

export interface SendInviteResponse {
    status: string;
    message: string;
    data: {
        id: string;
        type: 'community' | 'village';
        profileId: string;
        status: string;
        communityId: string | null;
        updatedAt: string;
        createdAt: string;
        villageId: null | string;
    } | null;
}
