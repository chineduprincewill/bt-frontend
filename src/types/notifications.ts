export interface Profile {
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
    activities: PostActivities[];
    contents: {
        contentType: 'image';
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
            contentType: 'image';
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

export interface ViewNotificationsResponse {
    status: 'success';
    message: 'Notifications retrieved successfully';
    data: {
        notifications: NotificationType[];
        stats: {
            read: number;
            total: number;
            unread: number;
        };
    };
}

export interface NotificationType {
    id: string;
    title: string;
    message: string;
    heading: string;
    read: boolean;
    resource: string;
    profileId: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    count: number | string;
}

export interface ViewUnreadNotificationCountResponse {
    status: 'success';
    message: 'conversations count retrieved successfully';
    data: {
        private: number;
        rooms: number;
        chat: number;
    };
}
