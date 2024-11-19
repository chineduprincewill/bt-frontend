import React, { useState, useRef, useEffect } from 'react';
import { FeedContainer } from '@pages/feeds';
import { Circle } from '@components/Circle';
import { PostInput } from '@pages/feeds/components/PostInput';
import { IPostInputRef } from '@pages/feeds/components/PostInput';
import { usePostOnCommunityFeedMutation } from 'api/communityApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DisplayIconForProfile } from '@pages/profile';
import { SelectedContent } from '@pages/feeds/Feeds';
import { ImageCarousel } from '@pages/feeds/ImageCarousel';
import { SmallIcon } from '@pages/feeds';
import './styles-community.scss';
import usePost from './usePost';
import { useGetLoggedInUserInfoQuery } from 'api/userApi';
import { countWords } from '@utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@state/store';
import { PromiseResult } from '@pages/feeds/Feeds';
import { useGetPostContentUploadLinkMutation } from 'api/postApi';
import { useCreatePostMutation } from 'api/postApi';
import { useUploadImageToCloudMutation } from 'api/profileApi';
import { PostPayload } from '@pages/feeds/components/FeedSection.utils';
import { ParsePostPayload } from '@pages/feeds/components/FeedSection.utils';
import Spinner from '@components/Spinner';
import FeedPublic from '../../../assets/feed_public.svg';
import FeedAddMedia from '../../../assets/feed_add_media.svg';
import FeedPost from '../../../assets/feed_post.svg';
import FeedCreateEvent from '../../../assets/feed_create_event.svg';
import FeedOnlyFollower from '../../../assets/feed_only_follower.svg';
import { useViewPostQuery } from 'api/postApi';
import { Post } from '@pages/feeds/Post';
import { useAppSelector } from '@state/store';
import useCommunity from '../Community/useCommunity';
import { useCreatePostForCommunityMutation } from 'api/communityApi';
import { RepostDialog } from '@pages/feeds/Post';
import { ReportPostDialog } from '@pages/feeds/Post';
import { CommunityPost } from '@type/community';

interface Props {
    platformPosts: CommunityPost[] | undefined;
    communityId?: string;
    villageId?: string;
}

export default function Feed({ platformPosts, villageId, communityId }: Props) {
    // const { id: communityId } = useParams();
    const id = useAppSelector((state) => state.auth.loggedUser?.id);
    const [postText, setPostText] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [selectedContents, setSelectedContents] = useState<SelectedContent[]>([]);
    const [postAudience, setPostAudience] = useState<'public' | 'followers'>('public');
    const createPostRef = useRef<HTMLDivElement>(null);
    const { user: loggedUser } = useSelector((state: RootState) => state.createAccount);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [contentFileMap, setContentFileMap] = useState<Record<string, File>>({});
    const [getPostContentUploadLink, { isLoading: getPostContentUploadLinkIsLoading }] = useGetPostContentUploadLinkMutation();
    const [createPostForCommunity, { isLoading: CommunityPostIsLoading }] = useCreatePostForCommunityMutation();
    const postInputRef = useRef<IPostInputRef>();
    const [postContentUploadLinks, setPostContentUploadLinks] = useState<Record<string, string>>({});
    const [uploadPostContentToCloud, { isLoading: uploadPostContentToCloudIsLoading }] = useUploadImageToCloudMutation();
    const [posts, setPosts] = useState<(PostPayload | null)[]>([]);
    const [selectedImages, setSelectedImages] = useState([] as string[]);
    const isPostEmpty = !postText.trim() && selectedContents.length === 0;
    const [showmodal, setShowModal] = useState(false);
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const { communityFeedsLoading } = useCommunity();

    useEffect(() => {
        if (platformPosts) {
            setPosts(
                platformPosts?.slice(0, 20).map((post) =>
                    // @ ts-ignore
                    ParsePostPayload(
                        // @ ts-ignore
                        post,
                    ),
                ),
            );
        }
    }, [platformPosts]);

    const submitPost = async () => {
        if (!postText.trim() && selectedContents.length === 0) {
            toast.error('Post content cannot be empty.');
            return;
        }
        const contents = selectedContents.map((content) => {
            const basicInfo = {
                mimeType: contentFileMap[content.url].type,
                fileName: contentFileMap[content.url].name,
                fileSizeInBytes: contentFileMap[content.url].size.toString(),
            };

            // If it's a video, include durationInSeconds
            if (content.contentType === 'video' && content.duration) {
                return {
                    ...basicInfo,
                    durationInSeconds: Math.floor(content.duration), // Ensure it's an integer
                };
            }

            return basicInfo;
        });

        console.log({ contents });

        const uploadStatus = await getPostContentUploadLink({ contents })
            .unwrap()
            .then((res) => res.data)
            .catch((e) => {
                toast.error(e.data?.message ?? e.message);
                return e;
            });

        if (uploadStatus instanceof Error || uploadStatus.error) {
            return;
        }

        const newLinks: Record<string, string> = {};
        uploadStatus.preSignedUrlData.forEach((signedUrlData: any) => {
            newLinks[signedUrlData.fileName] = signedUrlData.preSignedUrl;
        });
        setPostContentUploadLinks({
            ...postContentUploadLinks,
            ...newLinks,
        });

        const fileNames = Object.keys(newLinks);
        for (let i = 0; i < fileNames.length; i++) {
            const fileName = fileNames[i];
            const uploadLink = newLinks[fileName];

            const uploadResult = await uploadPostContentToCloud({
                file: selectedFiles.find((file) => file.name === fileName)!,
                url: uploadLink,
                // contentType: 'image/png',
            });
            if ('error' in uploadResult) {
                toast.error((uploadResult.error as any).message ?? 'An error occured');
                return;
            }
        }

        await createPostForCommunity({
            postData: {
                caption: postInputRef.current?.getValue() ?? '',
                location: '',
            },
            communityId: communityId,
            villageId: villageId,
            lon: location?.longitude,
            lat: location?.latitude,
            withContent: selectedFiles.length !== 0,
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message);
                console.log({ newLocation: res.data });
                setPosts((prev) => [ParsePostPayload(res.data), ...prev]);

                setPostText('');
                setSelectedImages([]);
                setSelectedContents([]);
            })
            .catch((e) => toast.error(e.data.message));
    };

    const removeContent = (contentUrl: string) => {
        const newSelectedContents = selectedContents.filter((content) => content.url !== contentUrl);
        const newSelectedFiles = selectedFiles.filter((file) => URL.createObjectURL(file) !== contentUrl);

        setSelectedContents(newSelectedContents);
        setSelectedFiles(newSelectedFiles);

        // Additionally, reset input if needed
        if (newSelectedContents.length === 0 && newSelectedFiles.length === 0) {
            const input = document.getElementById('create_post_image_input') as HTMLInputElement;
            if (input) {
                input.value = '';
            }
        }
    };

    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const files = input.files;
        console.log({ files });
        if (!files) return;

        const newContentFileMap: Record<string, File> = { ...contentFileMap };
        const contentPromises: Promise<PromiseResult>[] = Array.from(files).map((file): Promise<PromiseResult> => {
            const url = URL.createObjectURL(file);
            const contentType = file.type.startsWith('image') ? 'image' : 'video';
            newContentFileMap[url] = file;

            if (contentType === 'video') {
                return new Promise((resolve) => {
                    const video = document.createElement('video');
                    video.src = url;
                    video.addEventListener('loadedmetadata', () => {
                        resolve({
                            content: { url, contentType, duration: video.duration },
                            file,
                        });
                    });
                });
            } else {
                return Promise.resolve({
                    content: { url, contentType },
                    file,
                });
            }
        });

        Promise.all(contentPromises).then((results: PromiseResult[]) => {
            const newSelectedContents = results.map((result) => result.content);
            const newSelectedFiles = results.map((result) => result.file);

            setSelectedContents((prevContents) => [...prevContents, ...newSelectedContents]);
            setSelectedFiles((prevFiles) => [...prevFiles, ...newSelectedFiles]);

            setContentFileMap(newContentFileMap);

            // Remove the event listener to prevent memory leaks
            input.removeEventListener('change', handleImageSelection as any);
        });
    };

    const pickImageFromDevice = () => {
        const input = document.getElementById('create_post_image_input') as HTMLInputElement;
        if (!input) return;

        // Reset the input to ensure new selection is not appended to the old one
        input.value = '';

        // Resetting states to ensure that we start fresh on every new selection
        setSelectedContents([]);
        setContentFileMap({});
        setSelectedFiles([]);

        // Listen for the change event which triggers when a user selects files
        input.addEventListener('change', handleImageSelection as any);

        // Open the file input dialog
        input.click();
    };

    // console.log('POSTS', posts);
    return (
        <div>
            <div className={`create_post ${isSticky ? 'sticky' : ''} `} ref={createPostRef}>
                <FeedContainer className="flex-column">
                    <div className="create_a_post_top space_btw">
                        <div className="flex-row create_post_">
                            <Circle
                                img={DisplayIconForProfile(loggedUser?.displayImage)}
                                pd={0}
                                height={26}
                                width={26}
                                noMg
                                bg="transparent"
                                borderColor="transparent"
                                noBorder
                            />
                            {/* @ts-ignore */}
                            <PostInput ref={postInputRef} value={postText} onChangeText={setPostText} placeholder="Create a post" />
                        </div>
                    </div>

                    <div className="mt-4 images_to_upload">
                        <ImageCarousel key={selectedContents.length} contents={selectedContents} removeContent={removeContent} />
                    </div>

                    <div
                        className="word_count "
                        style={{
                            display: postText.split(' ').length - 1 > 0 ? '' : 'none',
                        }}
                    >
                        <p>
                            Word Count <span>{countWords(postText)}</span>
                            /100
                        </p>
                    </div>

                    <div className="cta_section space_btw">
                        <div className="flex-row left centralize-y">
                            <button
                                className="flex-row create_post_cta centralize-y centralize-x first"
                                onClick={() => setPostAudience(postAudience === 'public' ? 'followers' : 'public')}
                            >
                                <SmallIcon src={postAudience === 'public' ? FeedPublic : FeedOnlyFollower} />
                                <p>{postAudience === 'public' ? 'Public' : 'Followers'} </p>
                            </button>
                            <button
                                className="flex-row create_post_cta centralize-y centralize-x"
                                onClick={() => {
                                    pickImageFromDevice();
                                }}
                            >
                                <SmallIcon src={FeedAddMedia} />
                                <p>Add media</p>
                            </button>
                            <button className="flex-row create_post_cta centralize-y centralize-x last" onClick={() => setShowModal(true)}>
                                <SmallIcon src={FeedCreateEvent} />
                                <p>Create an event</p>
                            </button>

                            {/* Pick image input to target add media button */}
                            <input id="create_post_image_input" multiple type="file" accept="image/*,video/*" style={{ display: 'none' }} />
                        </div>
                        <button
                            disabled={isPostEmpty}
                            id="submit_post_btn"
                            className="flex-row centralize-y"
                            style={{
                                backgroundColor: isPostEmpty ? '#ffe6e6' : '',
                                cursor: isPostEmpty ? 'not-allowed' : 'pointer',
                            }}
                            onClick={() => {
                                submitPost();
                            }}
                        >
                            <div className="flex-row border centralize-y centralize-x">
                                {CommunityPostIsLoading || uploadPostContentToCloudIsLoading || getPostContentUploadLinkIsLoading ? (
                                    <Spinner width="20px" height="20px" />
                                ) : (
                                    <>
                                        <SmallIcon src={FeedPost} />
                                        <p className="post_feed">Post</p>
                                    </>
                                )}
                            </div>
                            {/* <SmallIcon src={FeedPostDropDown} /> */}
                        </button>
                    </div>
                </FeedContainer>
            </div>

            <div className="posts">
                {communityFeedsLoading && <Spinner width="50px" height="50px" />}

                {/* TODO Add appropriate types */}
                {posts.map((post) => (
                    <Post
                        key={post?.id}
                        // @ts-ignore
                        onAddPostToFeed={(post) => setPosts((prev) => [ParsePostPayload(post), ...prev])}
                        onDeletePost={() => setPosts((prev) => prev.filter((p) => p?.id !== post?.id))}
                        // @ts-ignore
                        post={post}
                        // @ts-ignore
                        comments={post.activities
                            .filter((activity: any) => 'commentText' in activity)
                            .map((activity: any) => ({
                                id: activity.id,
                                comment: activity.commentText,
                                user: {
                                    name: activity.profile?.user?.fullName,
                                    username: activity.profile?.user?.username,
                                    profileImage: DisplayIconForProfile(activity.profile?.user?.displayImage),
                                },
                                // @ts-ignore
                                author: post.author,
                                profile: post?.profile,
                                time: activity.updatedAt,
                            }))}
                        // @ts-ignore
                        actionRecord={post.actionRecord}
                    />
                ))}
            </div>
            <RepostDialog onAddPost={(post) => setPosts((prev) => [ParsePostPayload(post), ...prev])} />
            <ReportPostDialog />
        </div>
    );
}
