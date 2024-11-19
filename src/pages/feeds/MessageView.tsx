import { WyMessenger } from '@weavy/uikit-react';
import { useDispatch } from 'react-redux';
import { eventReceived } from '../../state/slices/messageEventsSlice';
import { useEffect } from 'react';
import { useAppSelector } from '../../state/store';

export const MessageView = () => {
    const dispatch = useDispatch();
    const conversationId = useAppSelector((state) => state.conversationId.conversationId);

    useEffect(() => {
        if (conversationId !== null) {
            console.log(`Fetching messages for conversation ${conversationId}`);
        }
    }, [conversationId]);
    const handleWyEventsTriggered = (e: any) => {
        console.log({selectedEvent: e})
        const eventInfo = {
            type: e.type,
            isTrusted: e?.isTrusted,
            detail: e?.detail,
        };
        dispatch(
            eventReceived({
                type: eventInfo.type,
                payload: JSON.stringify(eventInfo),
            }),
        );
    };
 

    // if (isFetching) {
    //     return (
    //         <div className="wide_pane flex-row centralize-y centralize-x" style={{ width: '100%', height: '100%' }}>
    //             <Spinner width="100px" height="100px" />
    //         </div>
    //     );
    // }

    return (
        <div className="wide_pane" style={{ width: '100%', height: '100%', padding: '0 15px' }}>
            <WyMessenger
                unselectable="off"
                // clearConversation={() => console.log('clearConversation')}
                disconnectedCallback={() => console.log('disconnectedCallback')}
                contentEditable={true}
                onSelect={handleWyEventsTriggered}
                // onSelect={handleSelectConversation(e, conversationId)}
                conversationId={conversationId}
                autoCorrect="on"
                spellCheck
                style={{
                    height: '100%',
                    width: '100%',
                    maxHeight: '85vh',
                    // display: 'none',
                }}
            ></WyMessenger>
        </div>
    );
};
