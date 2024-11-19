import React, { useRef, useState } from 'react';
import { usePostOnCommunityFeedMutation } from 'api/communityApi';
import { IPostInputRef, PostInput } from '@pages/feeds/components/PostInput';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreatePostForCommunityMutation } from 'api/communityApi';

export default function usePost() {
    const { id } = useParams();
    const [postText, setPostText] = useState('');

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
    return { handleCreatePost };
}
