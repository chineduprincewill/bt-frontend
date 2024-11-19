import './post.scss';

import { Popover } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

import ClickOutsideWrapper from '@components/ClickOutWrapper';

import {
    IComment,
    PostResponseFromApi,
    useAddCommentsUnderPostMutation,
    useCreatePostMutation,
    useDeleteCommentsUnderPostMutation,
    useDeletePostMutation,
    useEngageCommentWithLikeMutation,
    useEngagePostMutation,
    useLazyGetCommentsQuery,
    useLazyGetSubCommentsQuery,
    useReportPostMutation,
} from '../../api/postApi';
import DeletePost from '../../assets/delete.svg';
// import FeedCommentMore from '../../assets/feed_comment_more.svg';
import FeedCopyLinkToPost from '../../assets/feed_copy_link_to_post.svg';
import DefaultProfileIcon from '../../assets/feed_def_profile.svg';
import FeedLike from '../../assets/feed_like.svg';
import FeedLikedByIllu from '../../assets/feed_liked_by_illu.svg';
import FeedLocationCheck from '../../assets/feed_loc_check.svg';
import FeedMore from '../../assets/feed_more.svg';
import FeedPost from '../../assets/feed_post.svg';
import FeedPostQuoteRepost from '../../assets/feed_post_quote.svg';
import FeedSavedColor from '../../assets/feed_post_repost.svg';
import FeedUnlikeColor from '../../assets/feed_post_unlike.svg';
import FeedReportPost from '../../assets/feed_report_post.svg';
import FeedRepost from '../../assets/feed_repost.svg';
import FeedPostRepost from '../../assets/feed_repost_color_post.svg';
import FeedRepostWhite from '../../assets/feed_repost_white.svg';
import FeedSave from '../../assets/feed_save.svg';
import HeartFilledIcon from '../../assets/heart-filled.svg';
import HeartIcon from '../../assets/heart.svg';
import FeedPostRepostPost from '../../assets/repost_feed.svg';
// import FeedSendPostInMessage from '../../assets/feed_send_post_in_msg.svg';
import SuccessfulReportPost from '../../assets/successful_report_post.svg';
import { Circle } from '../../components/Circle';
import { GoToProfile } from '../../components/GoToProfile';
import { PostDisplay, PostText } from '../../components/PostEditor/PostText';
import Spinner from '../../components/Spinner';
import { setReportPostDialog, setRepostDialog } from '../../state/slices/postSlice';
import { RootState } from '../../state/store';
import { PostComment } from '../../types/post';
import { getTimeFrom } from '../../utils/utils';
import { DisplayIconForProfile, PostForSpecificProfile } from '../profile';
import { FeedContainer, SmallIcon } from './';
import { PostInput } from './components/PostInput';
import { formatDate } from './formatDate';
import { ImageCarousel } from './ImageCarousel';

const CommentWrapper = ({
    id,
    user,
    time,
    comment,
    deleteComment,
    userCanDeleteComment,
    focusOnInput,
    likesCount,
    postId,
    highlight,
    removeFocus,
    subComments,
    isLiked,
    postCreatorUsername,
    totalNumberOfSubComments,
}: {
    postCreatorUsername: string;
    subComments: PostComment[];
    removeFocus: () => void;
    highlight: boolean;
    likesCount: number;
    id: string;
    user: {
        name: string;
        profileImage: string;
    };
    userCanDeleteComment: boolean;
    postId: string;
    time: string;
    comment: string;
    deleteComment: () => void;
    isLiked: boolean;
    focusOnInput: () => void;
    totalNumberOfSubComments: number;
}) => {
    const [subCommentsToShow, setSubCommentsToShow] = useState(subComments);
    const [_totalNumberOfSubComments, _setTotalNumberOfSubComments] = useState(totalNumberOfSubComments);

    useEffect(() => {
        setSubCommentsToShow(subComments);
    }, [subComments]);

    useEffect(() => {
        _setTotalNumberOfSubComments(totalNumberOfSubComments);
    }, [totalNumberOfSubComments]);
    return (
        <>
            <Comment
                id={id}
                postId={postId}
                postCreatorUsername={postCreatorUsername}
                user={user}
                time={time}
                isLiked={isLiked}
                likesCount={likesCount}
                comment={comment}
                totalNumberOfSubComments={totalNumberOfSubComments}
                deleteComment={deleteComment}
                userCanDeleteComment={userCanDeleteComment}
                focusOnInput={focusOnInput}
                highlight={highlight}
                removeFocus={removeFocus}
                subComments={subCommentsToShow}
                removeSubComment={(subCommentId: string) => {
                    setSubCommentsToShow(subCommentsToShow.filter((subComment) => subComment.id != subCommentId));
                    _setTotalNumberOfSubComments((prev) => prev - 1);
                }}
            />
        </>
    );
};
const Comment = ({
    user,
    id,
    postId,
    time,
    comment,
    deleteComment,
    userCanDeleteComment,
    focusOnInput,
    highlight,
    removeFocus,
    subComments,
    postCreatorUsername,
    removeSubComment,
    totalNumberOfSubComments,
    isLiked,
    likesCount,
    isSubComment,
}: {
    postId: string;
    isSubComment?: boolean;
    removeSubComment: (subCommentId: string) => void;
    postCreatorUsername: string;
    totalNumberOfSubComments: number;
    subComments: PostComment[];
    isLiked: boolean;
    likesCount: number;
    removeFocus: () => void;
    highlight: boolean;
    id: string;
    user: {
        name: string;
        profileImage: string;
    };
    userCanDeleteComment: boolean;
    time: string;
    comment: string;
    deleteComment: () => void;
    focusOnInput: () => void;
}) => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const [toggleSubCommentsView, setToggleSubCommentsView] = useState(false);
    const [subCommentsToShow, setSubCommentsToShow] = useState<PostComment[]>(subComments);
    const [deleteCommentUnderPost] = useDeleteCommentsUnderPostMutation();
    // Get List of SubComments
    const [getSubComments, { isLoading: isGetSubCommentsLoading }] = useLazyGetSubCommentsQuery();
    const [engageCommentWithLike, { isLoading: isEngageCommentWithLikeLoading }] = useEngageCommentWithLikeMutation();
    const [_totalNumberOfSubComments, _setTotalNumberOfSubComments] = useState(totalNumberOfSubComments);
    const [isCommentLiked, setIsCommentLiked] = useState<boolean>(isLiked);

    useEffect(() => {
        _setTotalNumberOfSubComments(totalNumberOfSubComments);
    }, [totalNumberOfSubComments]);

    useEffect(() => {
        if (toggleSubCommentsView) {
            getSubComments({ postId, commentId: id })
                .unwrap()
                .then((subCommentsResponse) => {
                    setSubCommentsToShow(subCommentsResponse.data);
                    setToggleSubCommentsView(true);
                })
                .catch((error) => {
                    // TODO handle error message
                });
        }
    }, [subComments]);

    async function getListOfSubComments() {
        if (toggleSubCommentsView) {
            setToggleSubCommentsView(false);
            return;
        }

        try {
            const subCommentsResponse = await getSubComments({ postId, commentId: id }).unwrap();
            setSubCommentsToShow(subCommentsResponse.data);
            setToggleSubCommentsView(true);
        } catch (error) {
            // TODO handle error message
        }
    }

    async function likeComment() {
        const _isCommentLiked = isCommentLiked;
        try {
            setIsCommentLiked(!_isCommentLiked);
            await engageCommentWithLike(id).unwrap();
        } catch (e) {
            // TODO handle error message
            setIsCommentLiked(_isCommentLiked);
            console.log(e);
        }
    }

    return (
        <>
            <div
                className={`_comment ${highlight ? 'selected_comment' : ''}`}
                style={{
                    border: highlight ? '1px solid black' : '1px solid transparent',
                }}
            >
                <div className="flex-row top centralize-y space_btw">
                    <div className="flex-row left centralize-y">
                        <div className="flex-row user_info centralize-y">
                            <Circle
                                img={user.profileImage ?? DefaultProfileIcon}
                                pd={0}
                                height={20}
                                width={20}
                                noMg
                                bg="transparent"
                                borderColor="transparent"
                                noBorder
                            />

                            <p>{user.name}</p>
                        </div>
                        <p id="time">{getTimeFrom(time)}</p>
                    </div>
                    {userCanDeleteComment && (
                        <div
                            onClick={() => {
                                isSubComment ? removeSubComment(id) : deleteComment();
                            }}
                        >
                            <SmallIcon src={DeletePost} size={15} />
                        </div>
                    )}
                </div>

                <div className="comment_text">
                    <PostText text={comment} />
                </div>

                {!isSubComment && (
                    <div className="flex-row add_subcomment centralize-y" style={{ justifyContent: 'space-between' }}>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 mt-2.5" onClick={likeComment}>
                                <img src={isCommentLiked ? HeartFilledIcon : HeartIcon} alt="like" className="w-4 h-4" />
                                <span className="text-sm font-">{isCommentLiked ? 'Unlike' : 'Like'}</span>
                            </button>
                            <p
                                style={{ fontSize: '12px', marginTop: '10px', textDecoration: 'underline', cursor: 'pointer' }}
                                onClick={() => {
                                    highlight ? removeFocus() : focusOnInput();
                                }}
                            >
                                {highlight ? 'Cancel Reply' : 'Reply'}
                            </p>
                            {/* <p style={{ fontSize: '12px', marginTop: '10px', }}>
                                Liked by {likesCount} others
                            </p> */}
                        </div>
                        {_totalNumberOfSubComments > 0 && (
                            <>
                                <p
                                    style={{ fontSize: '12px', marginTop: '10px', textDecoration: 'underline', cursor: 'pointer' }}
                                    onClick={getListOfSubComments}
                                >
                                    {toggleSubCommentsView
                                        ? `Hide subcomments (${_totalNumberOfSubComments})`
                                        : `Show subcomments (${_totalNumberOfSubComments})`}
                                </p>
                            </>
                        )}
                    </div>
                )}

                {/* <div className="cta">
                    <button className='flex-row centralize-y' onClick={() => setActions({ ...actions, 'liked': !actions.liked })}>
                        <SmallIcon src={actions.liked ? FeedUnlikeColor : FeedLike} size={14} />
                        <p
                            style={{ color: actions.liked ? "#ff0000" : '' }}>
                            {actions.liked ? 'Unlike' : 'Like'}
                        </p>
                    </button>
                </div> */}
            </div>

            {toggleSubCommentsView && subCommentsToShow.length > 0 && (
                <>
                    <div
                        className="sub_comments"
                        style={{
                            backgroundColor: 'transparent',
                            marginLeft: '20px',
                            paddingLeft: '20px',
                            borderLeft: '1px solid #e0e0e0',
                        }}
                    >
                        {subCommentsToShow.map((subComment) => (
                            <>
                                <Comment
                                    isLiked={(subComment.commentActivities || []).some((x) => x.liked)}
                                    postId={subComment.postId}
                                    totalNumberOfSubComments={0}
                                    postCreatorUsername={postCreatorUsername}
                                    likesCount={subComment.likesCount}
                                    key={subComment.id}
                                    user={{
                                        name: subComment.profile.user.firstName + ' ' + subComment.profile.user.lastName,
                                        profileImage: subComment.profile.user.displayImage,
                                    }}
                                    time={subComment.commentDate}
                                    comment={subComment.commentText}
                                    removeSubComment={(subcommentId: string) => {
                                        deleteCommentUnderPost({ commentId: subcommentId })
                                            .unwrap()
                                            .then(() => {
                                                removeSubComment(subcommentId);
                                                _setTotalNumberOfSubComments((prev) => prev - 1);
                                                // deleteComment()
                                            });
                                    }}
                                    isSubComment
                                    deleteComment={() => {
                                        deleteCommentUnderPost({ commentId: id })
                                            .unwrap()
                                            .then(() => {});
                                    }}
                                    userCanDeleteComment={
                                        subComment.profile.user.username == loggedUser?.username || postCreatorUsername == loggedUser?.username
                                    }
                                    focusOnInput={() => {}}
                                    highlight={false}
                                    removeFocus={() => {}}
                                    subComments={[]}
                                    id={subComment.id}
                                />
                            </>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
export const COMMENTS = Array(10)
    .fill(0)
    .map(() => ({
        user: {
            name: 'John Doe',
            profileImage: DefaultProfileIcon,
        },
        time: '2h ago',
        id: uuid(),
        comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    }));
// const Comments = ({ comments }: {
//     comments: {
//         user: {
//             name: string,
//             profileImage: string,
//         },
//         time: string;
//         comment: string;
//     }[]
// }) => {
//     return (
//         <>
//             <div className="comments_view">
//                 {comments.map((comment, index) => (
//                     <Comment key={index} user={comment.user} time={comment.time} comment={comment.comment} />
//                 ))}
//                 <div className="load_more">
//                     <button> Load more comments </button>
//                 </div>
//                 <div className="bottom">
//                     <p>{"Hide comments(29)"}</p>
//                 </div>
//             </div>
//         </>
//     )
// }
export type IPost = TextOnlyPost | ImageAndTextPost;

interface IRepostDialog {
    onAddPost?: (e: any) => void;
}

export const RepostDialog = ({ onAddPost = () => {} }: IRepostDialog) => {
    const { postInfo: post, show } = useSelector((state: RootState) => state._post);
    const [newPostText, setNewPostText] = useState('');
    const dispatch = useDispatch();

    const [createPost, { isLoading: createPostIsLoading }] = useCreatePostMutation();

    // const postDate = new Date(post.createdAt);
    // const currentDate = new Date();
    // const timeDifference = currentDate.getTime() - postDate.getTime();
    // const oneMinute = 1000 * 60;
    // const oneHour = oneMinute * 60;
    // const oneDay = oneHour * 24;

    // let formattedDate: string | undefined;
    // if (timeDifference < oneMinute) {
    //     formattedDate = 'Just now';
    // } else if (timeDifference < oneHour) {
    //     const minutesAgo = Math.floor(timeDifference / oneMinute);
    //     formattedDate = `${minutesAgo}m ago`;
    // } else if (timeDifference < oneDay) {
    //     const hoursAgo = Math.floor(timeDifference / oneHour);
    //     formattedDate = `${hoursAgo}h ago`;
    // } else {
    //     // Format date as "11 Mar"
    //     const options = { day: 'numeric', month: 'short' };
    //     formattedDate = postDate.toLocaleDateString('en-US', options as any);
    // }
    const formattedDate = formatDate(post.createdAt);

    const initiateRepost = () => {
        createPost({
            postData: {
                caption: newPostText,
                location: '',
                originalPostId: post.id,
            },
            withContent: false,
        })
            .unwrap()
            .then((res) => {
                onAddPost(res.data);
                dispatch(setRepostDialog({ show: false, postInfo: post }));
                setNewPostText('');
            })
            .catch((e) => toast.error(e.message));
    };

    return (
        <>
            {show && (
                <div className="flex-row repost centralize-x">
                    <div className="post">
                        <p
                            id="close"
                            onClick={() =>
                                dispatch(
                                    setRepostDialog({
                                        show: false,
                                        postInfo: post,
                                    }),
                                )
                            }
                        >
                            Close
                        </p>
                        <div className="new_post">
                            <FeedContainer>
                                <PostInput
                                    onChangeText={(e) => setNewPostText(e)}
                                    value={newPostText}
                                    placeholder="Type a message for your quote"
                                    className="mb-8"
                                />
                                <button className="flex-row repost_btn centralize-y centralize-x" onClick={initiateRepost}>
                                    {createPostIsLoading ? (
                                        <>
                                            <Spinner width="18px" height="18px" />
                                        </>
                                    ) : (
                                        <>
                                            <SmallIcon src={FeedRepostWhite} />
                                            <p>Repost</p>
                                        </>
                                    )}
                                </button>
                            </FeedContainer>
                        </div>
                        <FeedContainer>
                            <div className="flex-row postHeader space_btw centralize-y">
                                <div className="flex-row author_info centralize-y">
                                    <Circle
                                        img={post.author.displayImage ?? DefaultProfileIcon}
                                        pd={0}
                                        height={45}
                                        width={45}
                                        noMg
                                        bg="transparent"
                                        borderColor="transparent"
                                        noBorder
                                    />
                                    <div className="author_bio">
                                        <p className="flex-row author_name centralize-y">
                                            <p className="name" style={{ whiteSpace: 'nowrap' }}>
                                                {post.author.firstName} {post.author.lastName}{' '}
                                            </p>
                                            <span className="author_username">@{post.author.username}</span>
                                        </p>
                                        <p className="placeOfWork" style={{ whiteSpace: 'nowrap' }}>
                                            {/* Only show max no of char of 20 */}
                                            {post.author.placeOfWork && post.author.placeOfWork.length > 0
                                                ? post.author.placeOfWork.length > 40
                                                    ? `${post.author.placeOfWork.slice(0, 40)}...`
                                                    : post.author.placeOfWork
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                                {/* <p className="createdAt">{formattedDate}</p> */}
                            </div>
                            <div className="postBody">
                                {'text' in post && post.text && (
                                    <p className="post_text">{post.text.length < 200 ? post.text : `${post.text.slice(0, 200)}...`}</p>
                                )}
                                {/* @ts-ignore */}
                                {'images' in post && <ImageCarousel contents={post.contents} />}
                            </div>
                        </FeedContainer>
                    </div>
                </div>
            )}
        </>
    );
};

const ReportTag = ({ text, selectTag, unSelectTag, id }: { id: number; text: string; selectTag: () => void; unSelectTag: () => void }) => {
    const [clicked, setClicked] = useState(false);
    id;

    return (
        <>
            <button
                style={{
                    borderRadius: '30px',
                    color: clicked ? 'black' : '',
                    border: clicked ? '1px solid black' : '',
                }}
                onClick={() => {
                    if (clicked) {
                        setClicked(false);
                        unSelectTag();
                    } else {
                        setClicked(true);
                        selectTag();
                    }
                }}
            >
                {text}
            </button>
        </>
    );
};

export const ReportPostDialog = () => {
    const dispatch = useDispatch();
    const { show, postId } = useSelector((state: RootState) => state.reportPost);
    const [selectedReasons, setSelectedReasons] = useState<number[]>([]);
    const REPORT_TAGS = ['Spam', 'Nudity', 'Scam', 'Illegal', 'Hate speech', 'Violence', 'False fact', 'Suicide or self injury', 'Others'];
    const [submitted, setSubmited] = useState(false);
    const [otherReason, setOtherReason] = useState('');
    const [reportPost, { isLoading: reportPostIsLoading }] = useReportPostMutation();

    return (
        <>
            {show && (
                <>
                    <div className="flex-row report_post_pane centralize-y centralize-x">
                        <div
                            className="report_post"
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                height: 'auto',
                                borderRadius: '30px',
                                padding: '30px',
                            }}
                        >
                            {submitted ? (
                                <>
                                    <div className="submitted flex-column centralize-y centralize-x">
                                        <img src={SuccessfulReportPost} alt="" />

                                        <h4 style={{ margin: '20px 0' }}>Thank you for submitting a report</h4>

                                        <p className="misc" style={{ textAlign: 'center', margin: '20px 0', maxWidth: '400px' }}>
                                            We take reports and after a thorough review, our support team will get back to you
                                        </p>

                                        <button
                                            onClick={() => {
                                                setSubmited(false);
                                                dispatch(setReportPostDialog({ show: false, postId }));
                                            }}
                                            style={{
                                                padding: '14px 37px',
                                                backgroundColor: 'red',
                                                color: 'white',
                                                borderRadius: '50px',
                                                marginTop: '20px',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="top" style={{ marginBottom: '30px' }}>
                                        <h3>Report</h3>
                                        <p className="desc">Why are you reporting this post?</p>
                                    </div>

                                    <p className="misc">
                                        Your report is anonymous, except if you’re reporting an intellectual property infringement,
                                    </p>

                                    <p className="misc">If someone is in immediate danger, call the local emergency services</p>

                                    <div className="tags">
                                        {REPORT_TAGS.map((tag, index) => (
                                            <>
                                                <ReportTag
                                                    id={index}
                                                    text={tag}
                                                    unSelectTag={() => setSelectedReasons(selectedReasons.filter((tagIndex) => tagIndex != index))}
                                                    selectTag={() => setSelectedReasons([...selectedReasons, index])}
                                                />
                                            </>
                                        ))}
                                    </div>

                                    <div className="reason_input">
                                        <h4>Reason</h4>
                                        <p className="misc">Help us understand better</p>

                                        <textarea
                                            placeholder="Write a message"
                                            value={otherReason}
                                            onChange={(e) => setOtherReason(e.target.value)}
                                            style={{ resize: 'none', padding: '15px', backgroundColor: '#e9e9e9', height: '150px', width: '100%' }}
                                        />

                                        <div
                                            className="flex-row button_area centralize-y "
                                            style={{
                                                width: '100%',
                                                justifyContent: 'left',
                                            }}
                                        >
                                            <button
                                                style={{
                                                    padding: '14px 37px',
                                                    border: '1px solid black',
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                }}
                                                onClick={() => dispatch(setReportPostDialog({ show: false, postId: postId }))}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                id="submit"
                                                style={{
                                                    padding: '14px 37px',
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                }}
                                                onClick={() => {
                                                    reportPost({
                                                        postId,
                                                        reason: selectedReasons
                                                            .map((index) => REPORT_TAGS[index])
                                                            .concat([otherReason])
                                                            .join(', '),
                                                    })
                                                        .unwrap()
                                                        .then(() => {
                                                            setSubmited(true);
                                                        });
                                                }}
                                            >
                                                {reportPostIsLoading ? <Spinner width="20px" height="20px" /> : 'Submit report'}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export type OriginalPostToDisplay = TextOnlyPost | ImageAndTextPost;
export const Post = ({
    post: _post,
    comments,
    actionRecord: _actionRecord,
    onAddPostToFeed = () => {},
    onDeletePost = () => {},
}: {
    onAddPostToFeed: (
        post:
            | (OriginalPostToDisplay & {
                  originalPostId?: string;
                  originalPost?: OriginalPostToDisplay;
              })
            | PostResponseFromApi
            | PostForSpecificProfile,
    ) => void;
    onDeletePost: (e: string) => void;
    post: (TextOnlyPost | ImageAndTextPost) & {
        originalPostId?: string;
        originalPost?: OriginalPostToDisplay;
    };
    comments: PostResponseFromApi['comments'];
    actionRecord: {
        liked: boolean;
        bookmarked: boolean;
        id: string;
        reportReason?: string;
        updatedAt: string;
        likeCount: number;
        commentCount: number;
    };
}) => {
    const navigate = useNavigate();
    const [isRepost, setIsRepost] = useState(false);
    const [post, setPost] = useState<typeof _post>(_post);
    const { posts } = useSelector((state: RootState) => state._post);
    const [actionRecord, setActionRecord] = useState<typeof _actionRecord>(_actionRecord);
    const dispatch = useDispatch();
    const postRef = useRef<HTMLDivElement>(null);
    const [showMore, setShowMore] = useState(false);
    const [stats, setStats] = useState({
        likeCount: actionRecord.likeCount,
        commentCount: actionRecord.commentCount,
    });
    const [actions, setActions] = useState({
        liked: actionRecord.liked,
        saved: actionRecord.bookmarked,
        reposted: false,
        showComments: false,
        showPostAuthorModal: false,
        showRepostDialog: false,
        showMoreDialog: false,
    });
    const [expandCommentSection, setExpandCommentSection] = useState(false);
    const [engagePost, { isLoading: postEngagementIsLoading }] = useEngagePostMutation();
    const [createPost, { isLoading: createPostIsLoading }] = useCreatePostMutation();
    const [deletePost, { isLoading: deletePostIsLoading }] = useDeletePostMutation();
    const [deleteCommentUnderPost] = useDeleteCommentsUnderPostMutation();
    const [commentIdToAddSubComment, setCommentIdToAddSubComment] = useState('');
    const commentTextAreaRef = useRef(null);
    createPostIsLoading;
    postEngagementIsLoading;
    // const [getPostInfo, { isLoading: postInfoIsLoading }] = useViewSinglePostMutation();
    const [comment, setComment] = useState('');
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const [commentsUnderPost, setCommentsUnderPost] = useState(comments);
    const [addCommentUnderPost, { isLoading: postCommentIsLoading }] = useAddCommentsUnderPostMutation();
    const [location, setLocation] = useState<{
        latitude?: number;
        longitude?: number;
    } | null>(null);

    // TODO show loader when getting comments
    const [getComments, { isLoading: isGetCommentsLoading }] = useLazyGetCommentsQuery();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        }
    }, []);
    useEffect(() => {
        const readMore = document.querySelectorAll('.read_more');
        readMore.forEach((readMore) => {
            readMore.addEventListener('click', () => {
                setShowMore(!showMore);
            });
        });
    }, [showMore]);

    const closeOtherDialog = useCallback(() => {
        setExpandCommentSection(false);
        setActions({
            ...actions,
            showMoreDialog: false,
            showRepostDialog: false,
            showPostAuthorModal: false,
            liked: actions.liked,
            saved: actions.saved,
            reposted: actions.reposted,
            showComments: actions.showComments,
        });
    }, [actions]);

    const copyLinkToPost = () => {
        const currentHost = window.location.host;
        navigator.clipboard.writeText(currentHost + '/feeds/' + post.id);
        toast.success('Link copied to clipboard');
    };

    const updateAction = ({ key, value }: { key: keyof typeof actions; value: boolean }) => {
        if (key === 'showMoreDialog') closeOtherDialog();
        else if (key === 'liked') {
            value
                ? engagePost({
                      postId: post.id,
                      engagement: { liked: true },
                      action: 'liked',
                  })
                      .unwrap()
                      .catch(() => {
                          setActions({ ...actions, [key]: !value });
                          setStats((prev) => ({ ...prev, likeCount: stats.likeCount - 1 }));
                      })
                : engagePost({
                      postId: post.id,
                      engagement: { liked: false },
                      action: 'unlike',
                  })
                      .unwrap()
                      .catch(() => {
                          setActions({ ...actions, [key]: !value });
                          setStats((prev) => ({ ...prev, likeCount: stats.likeCount + 1 }));
                      });

            setStats((prev) => ({ ...prev, likeCount: value ? stats.likeCount + 1 : stats.likeCount - 1 }));
        } else if (key === 'saved') {
            value
                ? engagePost({
                      postId: post.id,
                      engagement: { bookmarked: true },
                      action: 'bookmark',
                  })
                      .unwrap()
                      .catch(() => setActions({ ...actions, [key]: !value }))
                : engagePost({
                      postId: post.id,
                      engagement: { bookmarked: false },
                      action: 'unbookmark',
                  })
                      .unwrap()
                      .catch(() => setActions({ ...actions, [key]: !value }));
        }
        setActions({ ...actions, [key]: value });
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (postRef.current && !postRef.current.contains(event.target as Node)) {
                closeOtherDialog();
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [closeOtherDialog]);

    useEffect(() => {
        const isNormalRepost = 'text' in _post && _post.text?.length === 0;
        if (isNormalRepost && _post.originalPost) {
            setPost({
                author: _post.author,
                location: _post.originalPost?.location ? ((_post.originalPost?.location as any)?.value as string) : _post.originalPost?.location,
                likedBy: [],
                text: 'text' in _post.originalPost ? _post.originalPost.text : undefined,
                images: 'images' in _post.originalPost ? _post.originalPost.images : [],
                // images: [FeedPost, FeedPost, FeedPost],
                id: _post.id,
                activities: _post.originalPost.activities,
                // @ts-ignore
                contents: _post.originalPost.contents,
                createdAt: _post.createdAt,
                originalPost: {
                    ..._post.originalPost,
                    createdAt: _post.originalPost.createdAt,
                },
            });

            setIsRepost(true);
        }

        setActionRecord(_actionRecord);
    }, [_post, _actionRecord]);

    const formattedDate = formatDate(post.createdAt);

    return (
        <div className="post">
            <div className="top">
                <FeedContainer>
                    {isRepost && (
                        <>
                            <div className="flex-row reposted_view centralize-y">
                                <div className="flex-row left centralize-y">
                                    <Circle width={17} height={17} pd={2} bg="grey" noBorder noMg img={''}>
                                        <SmallIcon src={FeedRepost} size={12} />
                                    </Circle>
                                    <p className="author_">{post.author.firstName + ' ' + post.author.lastName + ' '} reposted </p>
                                </div>
                                {/* <p className="createdAt">{formattedDate}</p> */}
                            </div>
                        </>
                    )}
                    <div className="flex-row postHeader space_btw centralize-y">
                        <GoToProfile userId={post.author.profileId} username={post.author.username}>
                            <div className="flex-row author_info centralize-y">
                                <div>
                                    <Circle
                                        img={
                                            isRepost
                                                ? post.originalPost?.author.displayImage ?? DefaultProfileIcon
                                                : post.author.displayImage ?? DefaultProfileIcon
                                        }
                                        pd={0}
                                        height={45}
                                        width={45}
                                        noMg
                                        bg="transparent"
                                        borderColor="#cccccc"
                                    />
                                </div>

                                <div className="w-full flex flex-row justify-between">
                                    <div className="author_bio">
                                        <p className="flex-row author_name centralize-y">
                                            <p className="name" style={{ whiteSpace: 'nowrap' }}>
                                                {isRepost ? post.originalPost?.author.firstName : post.author.firstName}{' '}
                                                {isRepost ? post.originalPost?.author.lastName : post.author.lastName}{' '}
                                            </p>
                                            <span style={{ whiteSpace: 'nowrap' }} className="author_username">
                                                @{isRepost ? post.originalPost?.author.username : post.author.username}
                                            </span>
                                        </p>
                                        <p className="placeOfWork" style={{ whiteSpace: 'nowrap' }}>
                                            {/* Only show max no of char of 20 */}
                                            {isRepost && post.originalPost?.author.placeOfWork && post.originalPost.author.placeOfWork.length > 0
                                                ? post.originalPost.author.placeOfWork.length > 35
                                                    ? `${post.originalPost.author.placeOfWork.slice(0, 35)}...`
                                                    : post.originalPost.author.placeOfWork
                                                : post.author.placeOfWork && post.author.placeOfWork.length > 0
                                                ? post.author.placeOfWork.length > 35
                                                    ? `${post.author.placeOfWork.slice(0, 35)}...`
                                                    : post.author.placeOfWork
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                                
                            </div>
                        </GoToProfile>
                        <p className="text-xs py-2">{formattedDate}</p>
                        
                        {/*COME BACK TO THISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS*/}
                    </div>
                    <div
                        className="postBody"
                        onClick={() => {
                            closeOtherDialog();
                            navigate(`/feeds/${post.id}`);
                        }}
                    >
                        {post && 'text' in post && <PostText text={post.text} />}
                        {/* @ts-ignore */}
                        {'images' in post && <ImageCarousel contents={post.contents} />}
                    </div>

                    <div className="flex-row space_btw">
                        {stats.likeCount > 0 && (
                            <div className="flex-row mb-10 left centralize-y">
                                <img src={FeedLikedByIllu} alt="" />
                                <p className="liked_by_people">Liked by {stats.likeCount} others</p>
                            </div>
                        )}
                        {post.location && (
                            <div className="flex-row right centralize-y" style={{ marginRight: 'auto', width: '100%' }}>
                                <SmallIcon src={FeedLocationCheck} />
                                <p className="post_location">{post.location}</p>
                            </div>
                        )}
                    </div>

                    {post.originalPost && post.originalPostId ? (
                        <div className="quoted-div">
                            <div className="quotedheader">
                                <img src={post.originalPost.author.displayImage ?? DefaultProfileIcon} className="quoted_img" title="Profile Image" />
                                <div style={{ marginLeft: 10 }}>
                                    <p className="quotedtitle">
                                        {post.originalPost.author.firstName} {post.originalPost.author.lastName}
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: '#787878',
                                            }}
                                        >
                                            {' '}
                                            @{post.originalPost.author.username}
                                        </span>
                                    </p>
                                    <p className="subtitle">
                                        {post.originalPost.author.placeOfWork && post.originalPost.author.placeOfWork.length > 0
                                            ? post.originalPost.author.placeOfWork.length > 40
                                                ? `${post.originalPost.author.placeOfWork.slice(0, 40)}...`
                                                : post.originalPost.author.placeOfWork
                                            : ''}
                                    </p>
                                </div>
                            </div>

                            {'text' in post.originalPost && (
                                <p className="post_text" style={{ marginTop: 20 }}>
                                    {post.originalPost.text?.length
                                        ? post.originalPost.text.length < 50
                                            ? post.originalPost.text || ''
                                            : showMore
                                            ? post.originalPost.text || ''
                                            : post.originalPost.text.slice(0, 50)
                                        : ''}
                                    {post.originalPost.text?.length > 50 && (
                                        <>
                                            <span>
                                                {showMore ? ' ' : ' ...'}
                                                <span className="read_more">{showMore ? 'Read less' : 'Read more'}</span>
                                            </span>
                                        </>
                                    )}
                                </p>
                            )}
                            {/* @ts-ignore */}
                            {'images' in post.originalPost && post.originalPost.contents.length > 0 && (
                                // @ts-ignore
                                <ImageCarousel contents={post.originalPost.contents} />
                            )}
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="flex-row postFooter centralize-y space_btw">
                        <div className="flex-row left centralize-y">
                            <button
                                className="flex-row post_interaction_btn centralize-y"
                                onClick={(e) => {
                                    updateAction({
                                        key: 'liked',
                                        value: !actions.liked,
                                    });
                                    e.stopPropagation();
                                }}
                            >
                                <Circle img={actions.liked ? FeedUnlikeColor : FeedLike} height={20} width={20} pd={1} noMg bg="transparent" />
                                <p
                                    style={{
                                        color: actions.liked ? '#ff0000' : '',
                                    }}
                                >
                                    <p id="like">{actions.liked ? 'Unlike' : 'Like'}</p>
                                </p>
                            </button>
                            <button
                                className="flex-row post_interaction_btn centralize-y "
                                onClick={(e) => {
                                    updateAction({
                                        key: 'saved',
                                        value: !actions.saved,
                                    });
                                    e.stopPropagation();
                                }}
                            >
                                <Circle
                                    img={actions.saved ? FeedSavedColor : FeedSave}
                                    height={20}
                                    width={20}
                                    pd={1.5}
                                    noMg
                                    bg="transparent"
                                    borderColor="transparent"
                                />
                                <p
                                    style={{
                                        color: actions.saved ? '#1A53E7' : '',
                                    }}
                                >
                                    <p id="saved">{actions.saved ? 'Saved' : 'Save'}</p>
                                </p>
                            </button>

                            <ClickOutsideWrapper
                                onClickOutside={() =>
                                    setActions((prev) => ({
                                        ...prev,
                                        showRepostDialog: false,
                                    }))
                                }
                            >
                                <Popover
                                    placement="topRight"
                                    trigger="click"
                                    // open={actions.reposted}
                                    content={
                                        <div className="flex flex-col" style={{ zIndex: 1 }}>
                                            {/* <p
                                            style={{
                                                marginLeft: 'auto',
                                                width: '100%',
                                                textAlign: 'right',
                                                fontWeight: '500',
                                                fontSize: '12px',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Close
                                        </p> */}
                                            <div
                                                className="flex-row dialog_btn centralize-y"
                                                onClick={(e) => {
                                                    setActions((prev) => ({
                                                        ...prev,
                                                        showRepostDialog: false,
                                                    }));

                                                    createPost({
                                                        postData: {
                                                            caption: '',
                                                            location: '',
                                                            originalPostId: post.id,
                                                        },
                                                        lat: location?.latitude,
                                                        lon: location?.longitude,
                                                        withContent: false,
                                                    })
                                                        .unwrap()
                                                        .then((res) => {
                                                            onAddPostToFeed({
                                                                id: res.data.id,
                                                                caption: '',
                                                                location: '',
                                                                isBlocked: false,
                                                                profileId: res.data.profile.id,
                                                                originalPostId: res.data.originalPost?.id,
                                                                originalPost: res.data.originalPost,
                                                                postDate: res.data.originalPost?.updatedAt ?? new Date().toDateString().split('T')[0],
                                                                updatedAt: res.data.updatedAt,
                                                                profile: res.data.profile,
                                                                stats: {
                                                                    id: '',
                                                                    postId: res.data.id,
                                                                    likesCount: 0,
                                                                    repostCount: 0,
                                                                    commentsCount: 0,
                                                                    bookmarksCount: 0,
                                                                    reportCount: 0,
                                                                    createdAt: res.data.updatedAt,
                                                                    updatedAt: res.data.updatedAt,
                                                                    lastActivityDate: res.data.updatedAt,
                                                                },
                                                                activities: [],
                                                                contents: [], // Adjust the type accordingly based on the actual content structure
                                                                shortUrl: res.data.shortUrl,
                                                                comments: [],
                                                            });

                                                            setActions((prev) => ({
                                                                ...prev,
                                                                reposted: false,
                                                                showRepostDialog: false,
                                                            }));
                                                            toast.success('Post created successfully');
                                                        });
                                                    e.stopPropagation();
                                                }}
                                            >
                                                {
                                                    <>
                                                        <SmallIcon src={FeedPostRepostPost} />
                                                        <p>Repost</p>
                                                    </>
                                                }
                                            </div>

                                            <div
                                                className="flex-row dialog_btn centralize-y"
                                                onClick={(e) => {
                                                    dispatch(
                                                        setRepostDialog({
                                                            show: true,
                                                            postInfo: post,
                                                        }),
                                                    );
                                                    setActions({
                                                        ...actions,
                                                        reposted: false,
                                                        showRepostDialog: false,
                                                    });
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <SmallIcon src={FeedPostQuoteRepost} />
                                                <p>Quote post</p>
                                            </div>
                                        </div>
                                    }
                                >
                                    <button
                                        className="flex-row post_interaction_btn centralize-y "
                                        onClick={(e) => {
                                            updateAction({
                                                key: 'reposted',
                                                value: !actions.reposted,
                                            });
                                            setActions((prev) => ({
                                                ...prev,
                                                showRepostDialog: true,
                                            }));
                                            e.stopPropagation();
                                        }}
                                        style={{ position: 'relative' }}
                                    >
                                        <Circle
                                            img={actions.reposted ? FeedPostRepost : FeedRepost}
                                            height={20}
                                            width={20}
                                            pd={1}
                                            noMg
                                            bg="transparent"
                                            borderColor="transparent"
                                        />
                                        <p id="repost">{actions.reposted ? 'Reposted' : 'Repost'}</p>
                                    </button>
                                </Popover>
                            </ClickOutsideWrapper>
                            <div className='flex flex-grow justify-end'>
                                <ClickOutsideWrapper onClickOutside={() => setActions({ ...actions, showMoreDialog: false })}>
                                    <Popover
                                        placement="topRight"
                                        open={actions.showMoreDialog}
                                        content={
                                            <div className="flex flex-col">
                                                <div
                                                    className="flex-row dialog_btn centralize-y"
                                                    onClick={(e) => {
                                                        copyLinkToPost();
                                                        setActions({
                                                            ...actions,
                                                            showMoreDialog: false,
                                                        });
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <SmallIcon src={FeedCopyLinkToPost} />
                                                    <p>Copy link to post</p>
                                                </div>

                                                <div
                                                    className="flex-row dialog_btn centralize-y"
                                                    onClick={(e) => {
                                                        setActions({
                                                            ...actions,
                                                            showMoreDialog: false,
                                                        });

                                                        dispatch(setReportPostDialog({ show: true, postId: post.id }));
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <SmallIcon src={FeedReportPost} />
                                                    <p>Report post</p>
                                                </div>

                                                {post.author.username === loggedUser?.username && (
                                                    <>
                                                        <div
                                                            className="flex-row dialog_btn centralize-y"
                                                            onClick={(e) => {
                                                                setActions({ ...actions, showMoreDialog: false });

                                                                if (post.author.username === loggedUser.username) {
                                                                    deletePost({ postId: post.id })
                                                                        .unwrap()
                                                                        .then(() => {
                                                                            onDeletePost(post.id);
                                                                        })
                                                                        .catch();
                                                                }
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            {deletePostIsLoading ? (
                                                                <Spinner width="15px" height="15px" />
                                                            ) : (
                                                                <>
                                                                    <SmallIcon src={DeletePost} />
                                                                    <p>Delete post</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        }
                                    >
                                        <button
                                            onClick={() =>
                                                setActions({
                                                    ...actions,
                                                    showMoreDialog: !actions.showMoreDialog,
                                                })
                                            }
                                        >
                                            <SmallIcon src={FeedMore} />
                                        </button>
                                    </Popover>
                                </ClickOutsideWrapper>
                            </div>
                        </div>
                    </div>
                </FeedContainer>
            </div>
            <div className="bottom">
                <FeedContainer>
                    <div className="comment">
                        <div className="add_comment " style={{ width: '100%' }}>
                            {!actions.showComments && stats.commentCount > 0 && (
                                <div className="toggle_comment">
                                    <p
                                        className="show_comments"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            // TODO make endpoint call to get comments
                                            getComments(post.id)
                                                .unwrap()
                                                .then((response) => {
                                                    setCommentsUnderPost(response?.data || []);
                                                })
                                                .then(() => {
                                                    setActions({
                                                        ...actions,
                                                        showComments: true,
                                                    });
                                                    e.stopPropagation();
                                                });
                                        }}
                                    >
                                        Show comments <span>{`(${stats.commentCount})`}</span>
                                    </p>
                                </div>
                            )}

                            {actions.showComments && (
                                <>
                                    <div className="comment_sec">
                                        {commentsUnderPost.map((comment) => (
                                            <CommentWrapper
                                                id={comment.id}
                                                isLiked={comment.commentActivities.some((activity) => activity.liked)}
                                                postId={comment.postId}
                                                likesCount={comment.likesCount}
                                                postCreatorUsername={post.author.username}
                                                highlight={commentIdToAddSubComment === comment.id}
                                                key={comment.id}
                                                // TODO handle subcomments
                                                // @ts-ignore
                                                subComments={comment.subComment ?? []}
                                                totalNumberOfSubComments={comment.subCommentCount}
                                                removeFocus={() => {
                                                    if (commentTextAreaRef.current) {
                                                        setCommentIdToAddSubComment('');
                                                        (commentTextAreaRef.current as any).blur();
                                                    }
                                                }}
                                                focusOnInput={() => {
                                                    if (commentTextAreaRef.current) {
                                                        setCommentIdToAddSubComment(comment.id);
                                                        (commentTextAreaRef.current as any).focus();
                                                    }
                                                }}
                                                user={{
                                                    ...comment.profile.user,
                                                    name: comment.profile.user.firstName + ' ' + comment.profile.user.lastName,
                                                    profileImage: comment.profile.user.displayImage,
                                                }}
                                                time={comment.commentDate}
                                                comment={comment.commentText}
                                                userCanDeleteComment={
                                                    comment.profile.user.username === loggedUser?.username ||
                                                    post.author.username === loggedUser?.username
                                                }
                                                deleteComment={() => {
                                                    if (comment)
                                                        deleteCommentUnderPost({
                                                            commentId: comment.id,
                                                        })
                                                            .unwrap()
                                                            .then(() => {
                                                                setCommentsUnderPost(commentsUnderPost.filter((c) => c.id != comment.id));
                                                                setStats((prev) => ({ ...prev, commentCount: prev.commentCount - 1 }));
                                                                setCommentIdToAddSubComment('');
                                                            })
                                                            .catch((e) => {
                                                                toast;
                                                            })
                                                            .finally(() => {});
                                                }}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {actions.showComments && commentsUnderPost.length > 0 && (
                                <div className="hide_comment toggle_comment">
                                    <p
                                        className="show_comments"
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            setActions({
                                                ...actions,
                                                showComments: false,
                                            });
                                            e.stopPropagation();
                                        }}
                                    >
                                        Hide comments <span>{`(${commentsUnderPost.length})`}</span>
                                    </p>
                                </div>
                            )}

                            <div className="comment_sect">
                                <div className={`comment_nav flex-row centralize-y ${expandCommentSection ? 'expanded_comment' : ''}`}>
                                    <Circle
                                        img={DisplayIconForProfile(loggedUser?.displayImage ?? DefaultProfileIcon)}
                                        pd={0}
                                        height={45}
                                        width={45}
                                        noMg
                                        bg="transparent"
                                        borderColor="#cccccc"
                                    />
                                    <PostInput
                                        className={`resize-none text-sm pl-2 min-h-8 ml-1 text-ellipsis ${
                                            expandCommentSection ? 'expand_textarea' : 'unexpanded_textarea'
                                        }`}
                                        ref={commentTextAreaRef}
                                        onFocus={() => setExpandCommentSection(true)}
                                        onBlur={() => setExpandCommentSection(false)}
                                        placeholder="Type in your comment"
                                        value={comment}
                                        onChangeText={(e) => {
                                            setComment(e);
                                            // !expandCommentSection && setExpandCommentSection(true);
                                        }}
                                    />
                                </div>
                                <button
                                    className={`submit_comment flex-row centralize-y centralize-x expanded_comment`}
                                    style={{
                                        minWidth: '100px',
                                        minHeight: '30px',
                                        background: comment === '' ? '#e9e9e9' : '',
                                    }}
                                    disabled={comment.length < 1}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!comment || comment.length == 0) {
                                            return;
                                        }
                                        addCommentUnderPost({
                                            commentText: comment,
                                            postId: post.id,
                                            parentCommentId: commentIdToAddSubComment ? commentIdToAddSubComment : undefined,
                                        })
                                            .unwrap()
                                            .then((res) => {
                                                setCommentIdToAddSubComment('');

                                                if (commentIdToAddSubComment) {
                                                    const newCommentData = commentsUnderPost.map((comment) => {
                                                        if (comment.id === commentIdToAddSubComment) {
                                                            return {
                                                                ...comment,
                                                                subComment: [
                                                                    // TODO handle subcomments
                                                                    // @ts-ignore
                                                                    ...(comment.subComment ?? []),
                                                                    {
                                                                        id: res.data.id,
                                                                        commentDate: res.data.commentDate,
                                                                        commentText: res.data.commentText,
                                                                        profile: {
                                                                            ...(loggedUser?.profile ?? {}),
                                                                            user: {
                                                                                ...loggedUser,
                                                                                name: loggedUser?.firstName + ' ' + loggedUser?.lastName,
                                                                                profileImage: loggedUser?.displayImage,
                                                                            },
                                                                        } as IComment['profile'],
                                                                        postId: res.data.postId,
                                                                        profileId: res.data.profileId,
                                                                    },
                                                                ],
                                                                subCommentCount: comment.subCommentCount + 1,
                                                            };
                                                        }
                                                        return comment;
                                                    });
                                                    setCommentsUnderPost(newCommentData);
                                                } else {
                                                    // TODO uncomment
                                                    setCommentsUnderPost((prev) => [
                                                        {
                                                            id: res.data.id,
                                                            commentDate: res.data.commentDate,
                                                            commentText: res.data.commentText,
                                                            profile: {
                                                                ...(loggedUser?.profile ?? {}),
                                                                user: {
                                                                    ...loggedUser,
                                                                    name: loggedUser?.firstName + ' ' + loggedUser?.lastName,
                                                                    profileImage: loggedUser?.displayImage,
                                                                },
                                                            } as IComment['profile'],
                                                            postId: res.data.postId,
                                                            profileId: res.data.profileId,
                                                            likesCount: 0,
                                                            subCommentCount: 0,
                                                            updatedAt: res.data.updatedAt,
                                                            parentCommentId: res.data.parentCommentId,
                                                            commentActivities: [],
                                                        },
                                                        ...prev,
                                                    ]);
                                                    setStats((prev) => ({ ...prev, commentCount: prev.commentCount + 1 }));
                                                }

                                                setComment('');
                                            });
                                    }}
                                >
                                    {postCommentIsLoading ? (
                                        <Spinner width="15px" height="15px" />
                                    ) : (
                                        <>
                                            <SmallIcon src={FeedPost} size={20} />
                                            <p>Post</p>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </FeedContainer>
            </div>
        </div>
    );
};

export interface _IPost {
    id: string;
    author: {
        firstName: string;
        lastName: string;
        username: string;
        displayImage: string;
        placeOfWork: string;
    };
    createdAt: string;
    likedBy: {
        firstName: string;
        lastName: string;
        username: string;
        id: string;
    }[];
    location: string | null;
    activities: PostResponseFromApi['activities'];
    comments?: PostResponseFromApi['comments'];
}

export interface ImageAndTextPost extends _IPost {
    images: string[];
    author: _IPost['author'] & { profileId: string };
}

export interface TextOnlyPost extends _IPost {
    text: string;
    author: _IPost['author'] & { profileId: string };
}
