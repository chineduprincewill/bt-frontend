import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetConnectionsQuery, UserProfileFull, useUpdateConnectionMutation } from '../../api/connectionApi';
import RedCloseCircle from '../../assets/red-close-circle.svg';
import { Circle } from '../../components/Circle';
import { GoToProfile } from '../../components/GoToProfile';
import Spinner from '../../components/Spinner';
import { RootState } from '../../state/store';
import { ConnectionType } from '../../types/connection';
import ConnectionModal from './modals/ConnectionModal';
import { toast } from 'react-toastify';

interface ConnectionItemProps {
    connectionIndex: string;
    removeUserFromList: (id: string) => void;
    connection: UserProfileFull;
    type: ConnectionType;
    onSetAction: (e: 'cancel-request' | 'rejected' | 'unfollow', user: string) => void;
}

export const ConnectionItem = ({ type, connection, onSetAction, removeUserFromList, connectionIndex }: ConnectionItemProps) => {
    const userField = type === 'requests' || type === 'connections' ? connection.follower : connection.following;

    const [updateConnection, { isLoading }] = useUpdateConnectionMutation();

    async function onUpdateRequest(acceptance: 'accepted' | 'rejected') {
        try {
            await updateConnection({ username: userField?.user.username as string, type: acceptance }).unwrap();
            if (acceptance === 'accepted') {
                toast.success('Connection request accepted');
            } else {
                toast.success('Connection request rejected');
            }
            removeUserFromList(connectionIndex);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-[18px]">
                <div className="h-8 w-8 md:h-[43px] md:w-[43px]">
                    {/* @ts-ignore */}
                    <Circle bg="" className="h-8 w-8 md:h-[43px] md:w-[43px]" noMg pd={0} img={userField?.user.displayImage} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <GoToProfile userId={userField?.id} username={userField?.user.username}>
                        <h4 className="text-xs font-medium md:text-base text-textPrimary">
                            {userField?.user.firstName} {userField?.user.lastName}
                        </h4>
                    </GoToProfile>
                    {/* <p className="font-medium text-[8px] md:text-textAccent lg:text-xs">{user.following?.user.}</p> */}
                </div>
            </div>
            {type === 'connections' && (
                <button
                    className="rounded-3xl text-[10px] md:text-xs bg-black text-white px-4 py-2.5"
                    onClick={() => onSetAction('unfollow', userField?.user.username as string)}
                >
                    {/* <span className="flex gap-2 px-4 py-2 text-sm bg-lightGray-3 text-primary-red">
                        <img src={RedCloseCircle} className="h-[18px] w-[18px]" alt="cancel icon" />
                        Unfollow
                    </span> */}
                    Connected
                </button>
            )}
            {type === 'requests' && (
                <div className="flex gap-3">
                    <button onClick={() => onUpdateRequest('accepted')} className={`btn-rounded bg-textPrimary`}>
                        {isLoading ? <Spinner width="10px" height="10px" /> : 'Accept'}
                    </button>
                    <button onClick={() => onSetAction('rejected', userField?.user.username as string)} className={`btn-rounded bg-primary-red`}>
                        Reject
                    </button>
                </div>
            )}
            {type === 'requested' && (
                <button onClick={() => onSetAction('cancel-request', userField?.user.username as string)} className={`btn-rounded bg-primary-red`}>
                    Cancel Request
                </button>
            )}
        </div>
    );
};

const ConnectionSection = ({ type }: { type: ConnectionType }) => {
    let connectionQueryType: 'following' | 'followers' | 'incoming' | 'outgoing' | 'rejected' = 'following';

    /**
     * Get the query type for {@link useGetConnectionsQuery}, based on the {@link type}
     */
    switch (type) {
        case 'connected':
            connectionQueryType = 'following';
            break;
        case 'connections':
            connectionQueryType = 'followers';
            break;
        case 'requests':
            connectionQueryType = 'incoming';
            break;
        case 'requested':
            connectionQueryType = 'outgoing';
            break;
        default:
            connectionQueryType = 'following';
    }

    const { username } = useSelector((state: RootState) => state.createAccount.user);

    // TODO: Fix type
    const {
        currentData: connectionsResponse,
        isLoading,
        fulfilledTimeStamp,
    } = useGetConnectionsQuery({ type: connectionQueryType, username }, { refetchOnMountOrArgChange: true });

    // List of Connections
    const [connections, setConnections] = useState<UserProfileFull[]>([]);

    const [action, setAction] = useState<{ username: string; actionType: 'cancel-request' | 'rejected' | 'unfollow'; connectionId: string } | null>(
        null,
    );

    // Called after successfully unfollowing a user
    // Removes the connection from the current tab
    function removeUserFromList(connectionId: string) {
        setConnections((prev) => prev.filter((_, index) => index.toString() !== connectionId));
    }

    // Shows empty list on tab change
    useEffect(() => {
        setConnections([]);
    }, [type]);

    // Updates connection list from api request
    useEffect(() => {
        setConnections(connectionsResponse?.data || []);
    }, [fulfilledTimeStamp]);

    return (
        <div>
            {action?.actionType && (
                <ConnectionModal
                    type={type}
                    connectionId={action?.connectionId}
                    actionType={action?.actionType}
                    onSuccess={removeUserFromList}
                    username={action?.username}
                    onCloseModal={() => {
                        setAction(null);
                    }}
                />
            )}
            <p className="mt-4 text-lightGray-2 font-medium text-[8px] md:text-sm">These are people who connected with you</p>
            <div className="mt-[30px] md:mt-[65.6px] flex flex-col gap-4">
                {/* List of Connections if not loading and has connections */}
                {!isLoading &&
                    connections.length > 0 &&
                    connections.map((connection, index) => (
                        <>
                            <ConnectionItem
                                connectionIndex={index.toString()}
                                key={connection.createdAt.toString()}
                                removeUserFromList={removeUserFromList}
                                connection={connection}
                                type={type}
                                onSetAction={(actionType, username) => {
                                    setAction({
                                        username,
                                        actionType,
                                        connectionId: index.toString(),
                                    });
                                }}
                            />
                        </>
                    ))}
                {/* List of Connections if not loading and has no connections */}
                {!isLoading && connections.length === 0 && (
                    <div className="mt-32">
                        <div className="text-xs font-medium text-center md:text-sm text-lightGray-2">You have no active requests</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConnectionSection;
