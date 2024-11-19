import { Circle } from '@components/Circle';
import React, { useState, useRef } from 'react';
import DefaultImage from '../../../assets/default-user-image.jpeg';
import GlobeIcon from '../../../assets/global.svg';
import MediaAdd from '../../../assets/media-add.svg';
import PostIcon from '../../../assets/post-icon.svg';
import ArrowDown from '../../../assets/arrow-down-white.svg';
import { PostInput } from '@pages/feeds/components/PostInput';
import { IPostInputRef } from '@pages/feeds/components/PostInput';
import { usePostOnCommunityFeedMutation } from 'api/communityApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function CreatePost() {
    const [postText, setPostText] = useState('');

    const { id } = useParams();

    const postInputRef = useRef<IPostInputRef>();

    const [createPost] = usePostOnCommunityFeedMutation();

    const handleCreatePost = async () => {
        if (postText) {
            try {
                await createPost({ caption: postText, communityId: id! }).unwrap();
                setPostText('');
                postInputRef.current?.resetMentions();
                toast.success('Post created successfully!');
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="w-full md:min-w-[592px] border border-solid border-[#E9E9E9] rounded-xl p-5 min-h-[139px] flex flex-col justify-between">
            <div className="flex gap-2 w-full">
                <div className="h-12">
                    <Circle img={DefaultImage} pd={0} height={26} width={26} noMg bg="transparent" borderColor="transparent" noBorder />
                </div>
                <div className="flex flex-col w-full">
                    {/* <textarea className="flex-grow outline-none p-1  resize-none w-full text-xs" placeholder="Create a post" /> */}
                    {/* @ts-ignore */}
                    <PostInput ref={postInputRef} value={postText} onChangeText={setPostText} placeholder="Create a post" />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-6 text-xs text-[#797979]">
                    <div className="flex items-center gap-1">
                        <img src={GlobeIcon} alt="globe icon" />
                        <p>Public</p>
                    </div>

                    <div className="flex gap-1 text-xs text-[#797979]">
                        <img src={MediaAdd} alt="media add" />
                        <p>Add media</p>
                    </div>

                    <p>Create an event</p>
                </div>

                <button onClick={handleCreatePost} className=" text-xs bg-[#FF0000] py-2 px-5 rounded-3xl flex gap-2 items-center">
                    <img src={PostIcon} /> <span className="text-white">Post</span> <img src={ArrowDown} alt="arrow down" />
                </button>
            </div>
        </div>
    );
}
