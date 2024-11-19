import { useEffect, useState } from 'react';
import { Circle } from '../../components/Circle';
import DefaultProfileIcon from '../../assets/feed_def_profile.svg';
import { useGetConnectionsQuery, useUnFollowProfileMutation, useUpdateConnectionMutation } from '../../api/connectionApi';
import Spinner from '../../components/Spinner';
import { FeedContainer } from '.';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../state/store';

const Connection = ({
    userInfo,
    status,
    updateConnectionState,
}: {
    userInfo: {
        userId: string;
        name: string;
        placeOfWork: string;
        profileImage: string;
        username: string;
    };
    status: 'connected' | 'requested' | 'requesting' | 'following';
    updateConnectionState: ({ action, username }: { action: string; username: string }) => void;
}) => {
    const navigate = useNavigate();
    const [updateConnection, { isLoading: updateConnectionIsLoading }] = useUpdateConnectionMutation();
    const [unfollowConnection, { isLoading: unfollowConnectionIsLoading }] = useUnFollowProfileMutation();
    unfollowConnection;
    const [updateAction, setUpdateAction] = useState<'accepted' | 'rejected' | ''>('');

    const initConnectionUpdate = (action: 'accepted' | 'rejected') => {
        updateConnection({ type: action, username: userInfo.username })
            .unwrap()
            .then(() => {
                updateConnectionState({ action, username: userInfo.username });
            });

        setUpdateAction(action);
    };

    return (
        <>
            <div className="connection flex-row centralize-y space_btw" >
                <div className="profile_info flex-row centralize-y"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate(`/userprofile/${userInfo.userId}/${userInfo.username}`)
                    }}
                >
                    <Circle bg="" width={45} height={45} pd={0} noMg img={''} style={{ position: 'relative', overflow: '' }}>
                        <Circle
                            bg=""
                            width={45}
                            height={45}
                            pd={2}
                            noMg
                            img={userInfo.profileImage ?? DefaultProfileIcon}
                            style={{ position: 'relative', overflow: 'hidden' }}
                        />
                    </Circle>
                    <div className="user_info">
                        <p className="name">{userInfo.name}</p>
                        <p className="placeOfWork">{userInfo.placeOfWork}</p>
                    </div>
                </div>

                <div className="cta flex-row centralize-y">
                    {status === 'connected' && (
                        <button
                            className="connected connection_btn_cta"
                            style={{ minWidth: '100px', whiteSpace: 'nowrap' }}
                            onClick={() => {
                                initConnectionUpdate('rejected');
                            }}
                        >
                            {unfollowConnectionIsLoading || updateConnectionIsLoading ? <Spinner width="15px" height="15px" /> : 'Remove'}
                        </button>
                    )}
                    {status === 'following' && (
                        <>
                            <div className="_requesting flex-row centralize-y">
                                {/* <button
                                    className="requesting ignore connection_btn_cta"
                                    onClick={() => initConnectionUpdate('rejected')}
                                    style={{ minWidth: '150px' }}
                                >
                                    {updateAction === 'rejected' && updateConnectionIsLoading ? <Spinner width="12px" height="12px" /> : 'Ignore'}
                                </button>
                                <button
                                    className="requesting connection_btn_cta"
                                    onClick={() => initConnectionUpdate('accepted')}
                                    style={{ minWidth: '150px' }}
                                >
                                    {updateAction === 'accepted' && updateConnectionIsLoading ? <Spinner width="12px" height="12px" /> : 'Accept'}
                                </button> */}
                            </div>
                        </>
                    )}
                    {status === 'requesting' && (
                        <>
                            <div className="_requesting flex-row centralize-y">
                                <button
                                    className="requesting ignore connection_btn_cta"
                                    onClick={() => initConnectionUpdate('rejected')}
                                    style={{ minWidth: '150px' }}
                                >
                                    {updateAction === 'rejected' && updateConnectionIsLoading ? <Spinner width="12px" height="12px" /> : 'Ignore'}
                                </button>
                                <button
                                    className="requesting connection_btn_cta"
                                    onClick={() => initConnectionUpdate('accepted')}
                                    style={{ minWidth: '150px' }}
                                >
                                    {updateAction === 'accepted' && updateConnectionIsLoading ? <Spinner width="12px" height="12px" /> : 'Accept'}
                                </button>
                            </div>
                        </>
                    )}
                    {status === 'requested' && (
                        <button
                            className="requested connection_btn_cta"
                            style={{ minWidth: '180px' }}
                            onClick={() => {
                                unfollowConnection({
                                    username: userInfo.username,
                                })
                                    .unwrap()
                                    .finally(() =>
                                        updateConnectionState({
                                            action: 'rejected',
                                            username: userInfo.username,
                                        }),
                                    );
                                // initConnectionUpdate('rejected')
                            }}
                        >
                            {updateAction === 'rejected' && updateConnectionIsLoading ? <Spinner width="12px" height="12px" /> : 'Cancel Request'}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
const CONNECTIONS = Array(20)
    .fill(0)
    .map((_, index) => ({
        name: 'John Doe',
        placeOfWork: 'Principal Product Designer @BlackAt',
        profileImage: DefaultProfileIcon,
        status: ['connected', 'requested', 'requesting'][index % 3] as 'connected' | 'requested' | 'requesting',
    }));
CONNECTIONS;

export const ConnnectionView = () => {
    const [selectedView, setSelectedView] = useState<'connections' | 'requests' | 'requested' | 'following'>('connections');
    const { data: userFollowersConnections } = useGetConnectionsQuery({
        type: 'followers',
    });
    const { data: userFollowingConnections } = useGetConnectionsQuery({
        type: 'following',
    });
    const { data: userIncommingConnections } = useGetConnectionsQuery({
        type: 'incoming',
    });
    const { data: userOutgoingConnections } = useGetConnectionsQuery({
        type: 'outgoing',
    });
    // const { loggedUser } = useSelector((state: RootState) => state.auth)
    // const { data: useRejectedConnections } = useGetConnectionsQuery({ type: 'rejected' })
    const [_connections, setConnections] = useState({
        connections:
            (userFollowersConnections?.data ?? []).filter((connections) => connections.status === 'accepted') ??
            [],
        requests: [...(userIncommingConnections?.data ?? [])],
        requested: [...(userOutgoingConnections?.data ?? [])],
        following: [
            ...(userFollowingConnections?.data ?? []).filter(
                (connections) => connections.status === 'accepted',
            ),
        ]
    });

    useEffect(() => {
        setConnections({
            following: [
                ...(userFollowingConnections?.data ?? []).filter(
                    (connections) => connections.status === 'accepted',
                ),
            ],
            connections:
                (userFollowersConnections?.data ?? []).filter((connections) => connections.status === 'accepted') ??
                [],
            requests: [...(userIncommingConnections?.data ?? [])],
            requested: [...(userOutgoingConnections?.data ?? [])],
        });
    }, [
        userFollowersConnections?.data,
        userFollowingConnections?.data,
        userIncommingConnections?.data,
        userOutgoingConnections?.data,
        //mark here
    ]);
    // console.log({
    //     userFollowersConnections,
    //     userFollowingConnections,
    //     userIncommingConnections,
    //     d: userOutgoingConnections?.data,
    // });

    console.log({ userFollowersConnections: userFollowersConnections?.data })

    const status = {
        connections: 'connected',
        requests: 'requesting',
        requested: 'requested',
        following: 'following'
    } as const;
    const connections: {
        userId: string;
        name: string;
        placeOfWork: string;
        profileImage: string;
        status: 'connected' | 'requested' | 'requesting' | 'following';
        username: string;
    }[] =
        _connections[selectedView].map((connection) =>
            selectedView === 'requested'
                ? {
                    userId: (connection.follower ?? connection.following)?.id as string,
                    name: (connection.following?.user.firstName + ' ' + connection.following?.user.lastName) as string,
                    placeOfWork: connection.bio,
                    profileImage: connection.following?.user.displayImage ?? DefaultProfileIcon,
                    status: status[selectedView],
                    username: connection.following?.user.username as string,
                }
                : selectedView === 'connections'
                    ? {
                        userId: (connection.follower ?? connection.following)?.id as string,
                        name: ((connection.follower ?? connection.following)?.user.firstName +
                            ' ' +
                            (connection.follower ?? connection.following)?.user.lastName) as string,
                        placeOfWork: connection.bio,
                        profileImage: (connection.follower ?? connection.following)?.user.displayImage ?? DefaultProfileIcon,
                        status: status[selectedView],
                        username: (connection.follower ?? connection.following)?.user.username as string,
                    }
                    : selectedView === 'following'
                        ?
                        {
                            userId: (connection.follower ?? connection.following)?.id as string,
                            name: (connection.following?.user.firstName + ' ' + connection.following?.user.lastName) as string,
                            placeOfWork: connection.bio,
                            profileImage: connection.following?.user.displayImage ?? DefaultProfileIcon,
                            status: status[selectedView],
                            username: connection.following?.user.username as string,
                        } :
                        {
                            userId: (connection.follower ?? connection.following)?.id as string,
                            name: (connection.follower?.user.firstName + ' ' + connection.follower?.user.lastName) as string,
                            placeOfWork: connection.bio,
                            profileImage: connection.follower?.user.displayImage ?? DefaultProfileIcon,
                            status: status[selectedView],
                            username: connection.follower?.user.username as string,
                        },
        ) ?? [];

    const updateConnectionState = ({
        action,
        username,
        group,
    }: {
        action: 'accept' | 'reject' | string;
        username: string;
        group: 'connections' | 'requested' | 'requests' | 'following';
    }) => {
        const updatedConnections = _connections[group].filter(
            (connection) => (connection.follower ?? connection.following)!.user.username !== username,
        );
        const currentConnection = _connections[group].find((connection) => (connection.follower ?? connection.following)!.user.username === username);

        if (action === 'accept' && currentConnection) {
            setConnections({
                ..._connections,
                connections: [..._connections.connections, { ...currentConnection, status: 'accepted' }],
                [group]: updatedConnections,
            });
            return;
        }

        setConnections({
            ..._connections,
            [group]: updatedConnections,
        });
    };


    const desc = {
        connections: (
            <div className="desc">
                <p>
                    These are the people you are connected with
                    {/* you have a
                    total of <span>{loggedUser?.profile ? loggedUser?.profile.profileStats?.followersCount : 0 } Connections</span> */}
                </p>
            </div>
        ),
        following: (
            <div className="desc">
                <p>
                    These are the people you are connecting with
                    {/* you have a
                    total of <span>{loggedUser?.profile ? loggedUser?.profile.profileStats?.followersCount : 0 } Connections</span> */}
                </p>
            </div>
        ),
        requests: (
            <div className="desc">
                <p>These are people who wants to connect with you</p>
            </div>
        ),
        requested: (
            <div className="desc">
                <p>These are the people you have requested to connect with</p>
            </div>
        ),
    };

    return (
        <>
            <div className="connections_view wide_pane" style={{ width: '100%hhh' }}>
                <div className="pane" style={{ width: '100%' }}>
                    <div className="event_header flex-row" style={{ marginBottom: '30px' }}>
                        <h4>My connections</h4>
                    </div>

                    <FeedContainer>
                        <div className={`__navs ${selectedView} flex-row centralize-y`}>
                            <button
                                className="tab"
                                onClick={() => setSelectedView('connections')}
                                style={{
                                    backgroundColor: selectedView === 'connections' ? '#e9e9e9' : '',
                                    width: '100%',
                                }}
                            >
                                Connections
                            </button>
                            <button
                                className="tab"
                                onClick={() => setSelectedView('following')}
                                style={{
                                    backgroundColor:
                                        selectedView === 'following'
                                            ? '#e9e9e9'
                                            : '',
                                    width: '100%',
                                }}
                            >
                                Connected
                            </button>
                            <button
                                className="tab"
                                onClick={() => setSelectedView('requests')}
                                style={{
                                    backgroundColor: selectedView === 'requests' ? '#e9e9e9' : '',
                                    width: '100%',
                                }}
                            >
                                Request
                            </button>
                            <button
                                className="tab"
                                onClick={() => setSelectedView('requested')}
                                style={{
                                    backgroundColor: selectedView === 'requested' ? '#e9e9e9' : '',
                                    width: '100%',
                                }}
                            >
                                Requested
                            </button>
                        </div>

                        {desc[selectedView]}

                        <div className="connections_section">
                            {connections.length === 0 && (
                                <div className="no_connection flex-row centralize-y centralize-x">
                                    <p>
                                        {' '}
                                        {selectedView === 'connections'
                                            ? 'You have no active connections'
                                            : selectedView === 'requests'
                                                ? 'You have no active requests'
                                                : 'You have no active requests'}
                                    </p>
                                </div>
                            )}
                            {selectedView === 'following' &&
                                connections.map((connection, index) => (
                                    <Connection
                                        key={index}
                                        userInfo={connection}
                                        status={'following'}
                                        updateConnectionState={({
                                            action,
                                            username,
                                        }) =>
                                            updateConnectionState({
                                                action,
                                                username,
                                                group: 'following',
                                            })
                                        }
                                    />
                                ))}
                            {selectedView === 'connections' &&
                                connections.map((connection, index) => (
                                    <Connection
                                        key={index}
                                        userInfo={connection}
                                        status={'connected'}
                                        updateConnectionState={({
                                            action,
                                            username,
                                        }) =>
                                            updateConnectionState({
                                                action,
                                                username,
                                                group: 'connections',
                                            })
                                        }
                                    />
                                ))}
                            {selectedView === 'requests' &&
                                connections.map((connection, index) => (
                                    <Connection
                                        key={index}
                                        userInfo={connection}
                                        status={'requesting'}
                                        updateConnectionState={({ action, username }) =>
                                            updateConnectionState({
                                                action,
                                                username,
                                                group: 'requests',
                                            })
                                        }
                                    />
                                ))}
                            {selectedView === 'requested' &&
                                connections.map((connection, index) => (
                                    <Connection
                                        key={index}
                                        userInfo={connection}
                                        status={'requested'}
                                        updateConnectionState={({ action, username }) =>
                                            updateConnectionState({
                                                action,
                                                username,
                                                group: 'requested',
                                            })
                                        }
                                    />
                                ))}
                        </div>
                    </FeedContainer>
                </div>
            </div>
        </>
    );
};
