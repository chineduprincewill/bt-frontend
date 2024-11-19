import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { Mention, MentionsInput, MentionsInputProps } from 'react-mentions';
// @ts-ignore
import processString from 'react-process-string';
import { Link, useLocation } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { getMentionsList, PostTextConfig, replaceMentions } from '../../../utils/utils';

interface IPostInput extends Partial<MentionsInputProps> {
    onChangeText: (val: string) => void;
    className?: string;
    placeholder?: string;
    ref?: any;
    style?: React.CSSProperties;
}

export interface IPostInputRef {
    resetMentions: () => void;
    getValue: () => string;
    focus: () => void;
    blur: () => void;
}

export const PostInput = forwardRef<IPostInputRef, IPostInput>(({ onChangeText, value, className, placeholder, style, ...props }, ref) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<any>(null);
    const [addedMentions, setAddedMentions] = useState<Record<string, string>>({});

    function getMentionsAsync(query: string, callback: any) {
        if (!query) return;
        getMentionsList(dispatch, query).then(callback);
    }

    useImperativeHandle(ref, () => ({
        resetMentions: () => {
            setAddedMentions({});
        },
        getValue: () => {
            return replaceMentions(value || '', addedMentions);
        },
        focus: () => {
            inputRef?.current?.focus();
        },
        blur: () => {
            inputRef?.current?.blur();
        },
    }));

    return (
        <MentionsInput
            className={twMerge('w-full text-sm text-black min-h-20', className)}
            ref={inputRef}
            placeholder={placeholder}
            onChange={(e) => {
                onChangeText(e.target.value);
            }}
            value={value}
            style={style}
            customSuggestionsContainer={(children) => <div className="w-full overflow-auto rounded-md max-h-60">{children}</div>}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    const content = value || '';
                    if (!content.trim()) {
                        toast.error('Post content cannot be empty.');
                        e.preventDefault();
                        return;
                    }
                    console.log({ content });
                    // @ts-ignore
                    const selectionStart = e.target.selectionStart;
                    // @ts-ignore
                    const selectionEnd = e.target.selectionEnd;

                    const newContent = content.slice(0, selectionStart) + '\n' + content.slice(selectionEnd);
                    console.log({ newContent });
                    onChangeText(newContent);
                    e.preventDefault();
                }
            }}
            {...props}
        >
            <Mention
                trigger="@"
                displayTransform={(_, display) => `@${display}  `}
                renderSuggestion={({ display }) => <button className="px-4 py-3 space-y-2 hover:bg-[#F9F9F9] w-full text-left">{display}</button>}
                markup="@[__display__]"
                data={getMentionsAsync}
                onAdd={(id, display) => {
                    console.log({ id, display });
                    setAddedMentions((prev) => ({ ...prev, [`@[${display}]`]: `@[${display}](${id})` }));
                }}
            />
        </MentionsInput>
    );
});
