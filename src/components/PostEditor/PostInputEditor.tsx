import { convertToRaw, EditorState } from 'draft-js';
import React, { forwardRef, ReactElement, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

//   @ts-ignore
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';

import { getMentionsList } from '../../utils/utils';
import { MentionEntry } from './MentionEntry';

// import editorStyles from './RemoteMentionEditor.module.css';

export interface IPostInputRefProps {
    editorValue: string;
}

interface IPostInput {
    onChangeText: (e: string) => void;
    value: string;
}

export const PostInputEditor = forwardRef<IPostInputRefProps, IPostInput>((_, postEditorRef) => {
    const ref = useRef<Editor>(null);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<{ display: string; id: string; name: string }[]>([]);
    const dispatch = useDispatch();

    console.log({ editorState });

    const { MentionSuggestions, plugins } = useMemo(() => {
        const mentionPlugin = createMentionPlugin({
            entityMutability: 'IMMUTABLE',
            mentionPrefix: '@',
            supportWhitespace: true,
            mentionComponent({ mention }) {
                return (
                    <span
                        // eslint-disable-next-line no-alert
                        onClick={() => alert('Clicked on the Mention!')}
                    >
                        {`@[${mention.name}](${mention.id})`}
                    </span>
                );
            },
        });
        // eslint-disable-next-line no-shadow
        const { MentionSuggestions } = mentionPlugin;
        // eslint-disable-next-line no-shadow
        const plugins = [mentionPlugin];
        return { plugins, MentionSuggestions };
    }, []);

    const onChange = useCallback((_editorState: EditorState) => {
        setEditorState(_editorState);
    }, []);

    const onOpenChange = useCallback((_open: boolean) => {
        setOpen(_open);
    }, []);
    const onSearchChange = useCallback(({ value }: { value: string }) => {
        getMentionsList(dispatch, value).then((data) => {
            console.log({ data });
            // setSuggestions(data);
        });
    }, []);

    useImperativeHandle(postEditorRef, () => ({
        editorValue: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    }));

    return (
        <div
            // className={editorStyles.editor}
            onClick={() => {
                ref.current!.focus();
            }}
        >
            <Editor editorKey={'editor'} editorState={editorState} onChange={onChange} plugins={plugins} ref={ref} />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChange}
                entryComponent={MentionEntry}
                popoverContainer={({ children }: { children: React.ReactNode }) => <div>{children}</div>}
                onAddMention={() => {
                    // get the mention object selected
                }}
            />
        </div>
    );
});
