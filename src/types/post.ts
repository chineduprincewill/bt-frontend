export interface PostComment {
    id: string;
    profileId: string;
    postId: string;
    commentText: string;
    likesCount: number;
    subCommentCount: number;
    updatedAt: string;
    parentCommentId: string | null;
    commentDate: string;
    commentActivities: PostCommentActivity[];
    profile: {
        id: string;
        bio: string;
        user: {
            username: string;
            id: string;
            firstName: string;
            lastName: string;
            displayImage: string;
        };
    };
}

export interface PostCommentActivity {
    id: string;
    profileId: string;
    commentId: string;
    liked: boolean;
    activityDate: string | Date;
    updatedAt: string | Date;
}
