import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import EditProfile from '../../assets/edit_.svg';
import { UpdateProfileFlowStages, toggleProfileFormModal } from '../../state/slices/profileSlice';
// import Star from '../../assets/star.png';
// import { Circle } from '../../components/Circle';
// import { useGetProfileMutation } from '../../api/profileApi';
import { useEffect, useState } from 'react';
import { useFollowProfileMutation, useGetConnectionsQuery, useUnFollowProfileMutation, useUpdateConnectionMutation } from '../../api/connectionApi';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

export const CompleteProfileButtonForMobile = ({ stageToStartFrom, header }: { header?: boolean; stageToStartFrom?: UpdateProfileFlowStages }) => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            {!loggedUser?.profile.created ? (
                header ? (
                    <EditProfileButton
                        style={{ backgroundColor: 'red' }}
                        header
                        text="Complete Profile"
                        onClick={() =>
                            dispatch(
                                toggleProfileFormModal({
                                    show: true,
                                    stageToStartFrom,
                                }),
                            )
                        }
                    />
                ) : (
                    <EditProfileButton
                        text="Complete Profile"
                        noIcon
                        onClick={() =>
                            dispatch(
                                toggleProfileFormModal({
                                    show: true,
                                    stageToStartFrom,
                                }),
                            )
                        }
                    />
                )
            ) : header ? (
                <EditProfileButton
                    style={{ backgroundColor: 'black' }}
                    header
                    text="Edit Profile"
                    onClick={() =>
                        dispatch(
                            toggleProfileFormModal({
                                show: true,
                                stageToStartFrom,
                            }),
                        )
                    }
                />
            ) : (
                <EditProfileButton
                    text="Edit Profile"
                    noIcon
                    onClick={() =>
                        dispatch(
                            toggleProfileFormModal({
                                show: true,
                                stageToStartFrom,
                            }),
                        )
                    }
                />
            )}
        </>
    );
};

export const EditProfileButton = ({
    text,
    style,
    onClick,
    noIcon,
    header,
}: {
    header?: boolean;
    noIcon?: boolean;
    onClick?: () => void;
    text?: string;
    style?: React.CSSProperties;
    unverified?: boolean;
}) => {
    const { user } = useSelector((state: RootState) => state.createAccount);

    return (
        <>
            {header ? (
                <div>
                    <button
                        className="edit-button-mobile flex-row centralize-y centralize-x !w-32 p-2"
                        onClick={onClick}
                        style={{
                            ...style,
                            cursor: 'pointer',
                            maxWidth: 'fit-content',
                            border: 0,
                        }}
                    >
                        <p className="text-white text-[11px] w-20 ">{text ?? 'Edit Profile'}</p>
                        {!noIcon && <img src={EditProfile} alt="" />}
                    </button>
                </div>
            ) : (
                <div>
                    <div
                        className="flex-row centralize-y centralize-x"
                        style={{
                            width: '100%',
                            padding: '40px',
                            height: '100%',
                        }}
                    >
                        <button
                            className="flex-row centralize-y centralize-x"
                            onClick={onClick}
                            style={{
                                ...style,
                                cursor: 'pointer',
                                maxWidth: 'fit-content',
                                border: 0,
                                backgroundColor: 'black',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '30px',
                                marginRight: '10px',
                            }}
                        >
                            <p style={{ color: 'white' }}>{text ?? 'Edit Profile'}</p>
                            {!noIcon && <img src={EditProfile} alt="" />}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export const ConnectToProfileButtonForMobile = ({ username }: { username?: string }) => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const [connectToProfile, { isLoading: followIsLoading }] = useFollowProfileMutation();
    const [unFollowProfile, { isLoading: unfollowIsLoading }] = useUnFollowProfileMutation();
    const { data: getConnectionData } = useGetConnectionsQuery({
        type: 'following',
        username: username,
    });
    const [updateConnection, { isLoading: updateConnectionIsLoading }] = useUpdateConnectionMutation();
    const [unfollowConnection, { isLoading: unfollowConnectionIsLoading }] = useUnFollowProfileMutation();
    unfollowConnection;
    const [connectionStatus, setConnectionStatus] = useState<'followed' | 'following' | 'pending_follower' | 'pending_following' | 'connect'>();
    const { data: getFollowersData } = useGetConnectionsQuery({
        type: 'followers',
        username: username,
    });
    const { data: getIncommingConnections } = useGetConnectionsQuery({
        type: 'incoming',
        username: username,
    });
    const { data: getOutgoingConnections } = useGetConnectionsQuery({
        type: 'outgoing',
        username: username,
    });

    useEffect(() => {
        const following = getConnectionData?.data?.find((profile) => profile.following?.user?.username === loggedUser?.username);
        console.log({ following: getConnectionData?.data });
        setConnectionStatus(following ? 'following' : connectionStatus);
    }, [connectionStatus, getConnectionData, loggedUser?.username, username]);
    useEffect(() => {
        console.log({ followers: getFollowersData?.data });
        const followed = getFollowersData?.data?.find((profile) => profile.follower?.user?.username === loggedUser?.username);
        setConnectionStatus(followed ? 'followed' : connectionStatus);
    }, [connectionStatus, getFollowersData, loggedUser?.username, username]);

    useEffect(() => {
        const incommingFollower = getIncommingConnections?.data?.find((profile) => profile.follower?.user?.username === loggedUser?.username);
        console.log({ pending_follower: getIncommingConnections?.data, incommingFollower });
        if (incommingFollower) {
            console.log('updating');
            setConnectionStatus('pending_follower');
        }
    }, [connectionStatus, getIncommingConnections, loggedUser?.username, username]);

    useEffect(() => {
        console.log({ pending_following: getOutgoingConnections?.data });
        const incommingFollowing = getOutgoingConnections?.data?.find((profile) => profile.following?.user?.username === loggedUser?.username);
        if (incommingFollowing) {
            setConnectionStatus('pending_following');
        }
    }, [getOutgoingConnections, loggedUser?.username, username]);

    // console.log({ connectionStatus })
    const action = {
        followed: () =>
            unFollowProfile({ username: username || '' })
                .unwrap()
                .then(() => setConnectionStatus('connect'))
                .catch((e) => toast.error(e.data?.message ?? e.message)), // Do nothing
        following: () =>
            updateConnection({ type: 'rejected', username: username ?? '' })
                .unwrap()
                .then(() => setConnectionStatus('connect'))
                .catch((e) => toast.error(e.data?.message ?? e.message)), // Unfollow
        pending_follower: () =>
            unFollowProfile({ username: username || '' })
                .unwrap()
                .then(() => setConnectionStatus('connect'))
                .catch((e) => toast.error(e.data?.message ?? e.message)), // Cnacel pending follow request
        pending_following: () =>
            updateConnection({ type: 'rejected', username: username ?? '' })
                .unwrap()
                .then(() => setConnectionStatus('connect'))
                .catch((e) => toast.error(e.data?.message ?? e.message)),
        connect: () =>
            connectToProfile({ username: username || '' })
                .unwrap()
                .then(() => setConnectionStatus('pending_follower'))
                .catch((e) => toast.error(e.data?.message ?? e.message)),
    };

    return (
        <>
            {/* <Circle
                width={30}
                height={30}
                pd={7}
                img={Star}
                bg="black"
                noMg
                style={{ cursor: 'pointer' }}
            /> */}
            <div
                className=" flex-row centralize-y centralize-x"
                style={{
                    maxWidth: 'fit-content',
                    minWidth: '80px',
                    border: 0,
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '10px 25px',
                    borderRadius: '30px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                }}
                onClick={() => {
                    action[connectionStatus ?? 'connect']();
                }}
            >
                {followIsLoading || unfollowIsLoading || updateConnectionIsLoading || unfollowConnectionIsLoading ? (
                    <Spinner width="10px" height="10px" />
                ) : (
                    <p style={{ color: 'white', fontSize: '10px' }}>
                        {
                            {
                                followed: 'Followed', // they are following you
                                following: 'Following', // You are following them
                                pending_follower: 'Cancel Pending Request', // you sent a pending follow request
                                pending_following: 'Accept Connection', // they sent a pending follow request
                                connect: 'Connect',
                            }[connectionStatus ?? 'connect']
                        }
                    </p>
                )}
            </div>
        </>
    );
};
