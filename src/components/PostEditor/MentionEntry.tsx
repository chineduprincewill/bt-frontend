import { EntryComponentProps } from '@draft-js-plugins/mention/lib/MentionSuggestions/Entry/Entry';

export function MentionEntry(props: EntryComponentProps) {
    const {
        mention,
        searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
        isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
        ...parentProps
    } = props;

    // console.log(mention);

    return (
        <div {...parentProps}>
            <div>
                <div>
                    {/* <img
              src={mention.avatar}
              className={theme?.mentionSuggestionsEntryAvatar}
              role="presentation"
            /> */}
                </div>

                <div>
                    <div>{mention.display}</div>

                    {/* <div>{mention.title}</div> */}
                </div>
            </div>
        </div>
    );
}
