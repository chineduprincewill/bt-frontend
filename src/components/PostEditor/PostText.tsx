import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
// @ts-ignore
import processString from 'react-process-string';
import { useLocation } from 'react-router-dom';

// @ts-ignore
import Editor from '@draft-js-plugins/editor';

import { useAppSelector } from '../../state/store';
import { PostTextConfig } from '../../utils/utils';
import { twMerge } from 'tailwind-merge';

export function PostDisplay({ text }: { text: string }) {
    const postMessage = getPostContent(text);

    if (typeof postMessage === 'string') return <PostText text={postMessage} />;

    const content = EditorState.createWithContent(convertFromRaw(postMessage));

    return <Editor readOnly editorState={content} />;
}

export function PostText({ text, showMore, className = "" }: { text: string; showMore?: boolean, className?: string }) {
    const { username: loggedInUsername } = useAppSelector((state) => state.createAccount.user);

    const redirectLink = (username: string, userId: string) => (username === loggedInUsername ? '/profile' : `/userprofile/${userId}/${username}`);
    const currentPath = useLocation().pathname;

    const shouldReplace = (destination: string) => destination === currentPath;

    const processedString = processString(PostTextConfig(redirectLink, shouldReplace))(text);

    return <p className={twMerge("post_text", className)}>{processedString}</p>;
}

function getPostContent(text: string): RawDraftContentState | string {
    try {
        const post = JSON.parse(text);
        return post as RawDraftContentState;
    } catch (error) {
        return text;
    }
}
