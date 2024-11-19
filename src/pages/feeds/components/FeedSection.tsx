import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostResponseFromApi, useViewSinglePostQuery } from '../../../api/postApi';
import ArrowBackBlack from '../../../assets/back-icon.svg';
import Spinner from '../../../components/Spinner';
import { PostComment } from '../../../types/post';
import { DisplayIconForProfile } from '../../profile';
import { Post } from '../Post';
import { ParsePostPayload } from './FeedSection.utils';

export const FeedsSection = () => {
    const { postId } = useParams();
    //   const [showmodal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const { data: postDataResponse, isLoading } = useViewSinglePostQuery({ postId: postId! }, { skip: !postId });
    const postData = ParsePostPayload(postDataResponse?.data as PostResponseFromApi);

    const goBack = () => {
        navigate(-1);
    };

    // useEffect(() => {
    // 	if (getPostData?.data) {
    // 		const postsData = getPostData.data.slice(0, 20).map((post) => {
    // 			return {
    // 				author: {
    // 					profileId: post.profile.id,
    // 					firstName: post.profile.user.firstName,
    // 					lastName: post.profile.user.lastName,
    // 					username: post.profile.user.username,
    // 					displayImage: DisplayIconForProfile(post.profile.user.displayImage),
    // 					placeOfWork: post.profile.bio,
    // 					location: post.profile.location
    // 						? ((post.profile.location as any)?.value as string) // in somecases the api might return location as an { value: string}
    // 						: post.profile.location,
    // 				},
    // 				location: post.profile.location ? ((post.profile.location as any)?.value as string) : post.profile.location,
    // 				createdAt: post.postDate.toString(),
    // 				likedBy: [],
    // 				text: post.caption,
    // 				images: post.contents.filter((content) => content.contentType === 'image').map((content) => content.url),
    // 				// images: [FeedPost, FeedPost, FeedPost],
    // 				id: post.id,
    // 				actionRecord: {
    // 					id: post.activities[0]?.id,
    // 					liked: post.activities[0]?.liked,
    // 					likeCount: post.activities.reduce((acc, curr) => acc + (curr.liked ? 1 : 0), 0),
    // 					bookmarked: post.activities[0]?.bookmarked,
    // 					reportReason: post.activities[0]?.reportReason,
    // 					updatedAt: post.activities[0]?.updatedAt,
    // 				},
    // 				activities: post.activities,
    // 				contents: post.contents,
    // 				originalPost: post.originalPost
    // 					? {
    // 						author: {
    // 							profileId: post.profile.id,
    // 							firstName: post.originalPost.profile.user.firstName,
    // 							lastName: post.originalPost.profile.user.lastName,
    // 							username: post.originalPost.profile.user.username,
    // 							displayImage: DisplayIconForProfile(post.originalPost.profile.user.displayImage),
    // 							placeOfWork: post.originalPost.profile.bio,
    // 							location: post.originalPost.profile.location
    // 								? ((post.originalPost.profile.location as any)?.value as string) // in somecases the api might return location as an { value: string}
    // 								: post.originalPost.profile.location,
    // 						},
    // 						location: post.originalPost.profile.location
    // 							? ((post.originalPost.profile.location as any)?.value as string)
    // 							: post.originalPost.profile.location,
    // 						createdAt: formatDate(post.activities[0]?.updatedAt.split('T')[0]),
    // 						likedBy: [],
    // 						text: post.originalPost.caption,
    // 						images: post.originalPost.contents.filter((content) => content.contentType === 'image').map((img) => img.url),
    // 						id: post.originalPost.id,
    // 						activities: post.originalPost.activities,
    // 						contents: post.originalPost.contents,
    // 					}
    // 					: undefined,
    // 			};
    // 		});
    // 		setPosts(postsData);
    // 		dispatch(setPostsData({ posts: getPostData.data }));
    // 	}
    // }, [dispatch, getPostData?.data]);

    return (
        <>
            <div className="wide_pane">
                <div className="flex-row centralize-x wide_pane" style={{ position: 'relative' }}>
                    <div className="pt-4 posts w-full">
                        {!isLoading && (
                            <div>
                                <div className="w-8 m-0 my-2 ml-5 bg-black border border-solid rounded-full cursor-pointer md:w-10 md:block md:ml-0">
                                    <img onClick={goBack} src={ArrowBackBlack} alt="arrow back" className="w-8 h-8 md:w-10 md:h-10" />
                                </div>
                                <div className="flex items-center justify-between w-full py-1 ml-5 md:ml-0">
                                    <div>
                                        <div className="flex items-start gap-2 cursor-pointer">
                                            <h2 className="text-2xl font-semibold">Post</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isLoading && <Spinner width="50px" height="50px" />}
                        {!isLoading && !postData && (
                            <div className="w-full">
                                <p>Not found</p>
                            </div>
                        )}
                        {postData && (
                            <Post
                                key={postData.id}
                                // @ts-ignore
                                post={postData}
                                // @ts-ignore
                                comments={postData.activities
                                    .filter((activity) => !!activity.commentText)
                                    .map((activity) => ({
                                        id: activity.id,
                                        comment: activity.commentText,
                                        user: {
                                            // @ts-ignore
                                            name: activity.profile?.user?.fullName,
                                            // @ts-ignore
                                            username: activity.profile?.user?.username,
                                            profileImage: DisplayIconForProfile(activity.profile?.user?.displayImage),
                                        },
                                        author: postData.author,
                                        profile: postData.profile,
                                        time: activity.updatedAt,
                                    }))}
                                // @ts-ignore
                                actionRecord={postData.actionRecord}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
