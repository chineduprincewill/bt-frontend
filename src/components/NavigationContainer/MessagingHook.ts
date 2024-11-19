import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChatTokenQuery } from '../../api/authApi';
import { setUnreadNotificationsCount } from '../../state/slices/notificationCount';
import { useWeavy } from '@weavy/uikit-react';
import { RootState } from '../../state/store';


const WEAVY_URL = 'https://ae4c4581d51e436499bff1eaccc5d9d1.weavy.io';

async function countUnreadConversations(token: string) {
    const response = await fetch(`${WEAVY_URL}/api/conversations/badge`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        console.log('Failed to list notifications');
        return null;
    }

    return response.json();
}

export const useGlobalMessaging = () => {
    const { data: chatTokenData, isFetching, refetch } = useGetChatTokenQuery(null);
    const lastEvent = useSelector((state: RootState) => state.messageEvents.lastEvent);
    const loggedUser = useSelector((state: RootState) => state.createAccount.user);
    const dispatch = useDispatch();
    const tokenRef = useRef('');

    useEffect(() => {
        if (chatTokenData?.data?.chatToken && tokenRef.current !== chatTokenData.data.chatToken) {
            tokenRef.current = chatTokenData.data.chatToken;
        }
    }, [chatTokenData]);

    const shouldRefreshToken = useCallback(() => !tokenRef.current, []);

    useEffect(() => {
        if (shouldRefreshToken()) {
            refetch();
        }
    }, [refetch, shouldRefreshToken]);

    const tokenFactory = useCallback(async () => {
        if (shouldRefreshToken()) {
            await refetch();
        }
        return tokenRef.current;
    }, [refetch, shouldRefreshToken]);

    useEffect(() => {
        if (lastEvent) {
            handleWyEventsTriggered(lastEvent.payload)
        }
    }, [lastEvent]);

    const handleWyEventsTriggered = useCallback(
        async (e: string) => {
            const ParseJSON = JSON.parse(e)
            const unreadCount = await countUnreadConversations(tokenRef.current);
            console.log('Unread Conversations:', unreadCount);
            if ((loggedUser?.id !== ParseJSON?.detail.actor.uid) && ParseJSON.type === 'wy:message_created') {
                alert('You have a new message!');
            }
            if (unreadCount && typeof unreadCount.private === 'number') {
                dispatch(setUnreadNotificationsCount(unreadCount.private));
            }
        },
        [loggedUser?.id, dispatch],
    );

    const weavyConfig = useMemo(
        () => ({
            url: WEAVY_URL,
            tokenFactory,
            reactions: ['😍', '😎', '😉', '👍', '🤣', '😢', '😮', '❤️', '🔥', '🎉', '🙏', '👏'],
            scrollToBottom: true,
            scrollBehaviour: false,
        }),
        [tokenFactory],
    );

    useWeavy(weavyConfig);

    return { isFetching, handleWyEventsTriggered };
};
