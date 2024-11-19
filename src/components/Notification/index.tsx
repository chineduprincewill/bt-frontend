// NavigationComponent.js

// import PropTypes from 'prop-types';
import { SmallIcon } from '../../pages/profile';
import CloseIcon from '../../assets/close.svg';
import './style.scss';
import { Circle } from '../Circle';
import DefaultProfileIcon from '../../assets/feed_def_profile.svg';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
// import WhiteDownIcon from '../../assets/white_down.svg'
import { setNotificationModal } from '../../state/slices/notificationSlice';
import { useEffect, useState } from 'react';
// import { selectSidebarMenu } from '../../state/slices/sideBarSlice';
import { useViewNotificationsQuery } from '../../api/notificationApi';
import Spinner from '../Spinner';

function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${month} ${day}`;
}

const Notification = ({ userProfileImage, text, date, username }: { text: string; date: string; username: string; userProfileImage: string }) => {
    // const [showActioModal, setShowActionModal] = useState(false)
    // const dispatch = useDispatch()

    username;

    return (
        <>
            <div className="_notification flex-row centralize-y" style={{ width: '100%', maxWidth: '350px' }}>
                <div className="userIcon">
                    <div className="img">
                        <Circle img="" height={50} width={50} pd={1} noMg bg="transparent" borderColor="transparent">
                            <Circle img={userProfileImage} height={50} width={50} pd={1} noMg bg="transparent" borderColor="transparent" />
                        </Circle>
                    </div>
                </div>
                <div className="_details flex-column centralize-x" style={{ width: '100%' }}>
                    <div className="_notif_content flex-column">
                        <div className="written">
                            {/* <p><span>@{username}</span>{' '} {text}</p> */}
                            <p> {text}</p>
                        </div>
                        <p className="time">{date}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

const NOTIFICATIONS = [
    {
        userProfileImage: DefaultProfileIcon,
        id: uuid(),
        text: 'requested to collaborate with you',
        time: 'Today at 2:34pm',
        username: 'olalekan',
    },
    {
        userProfileImage: DefaultProfileIcon,
        id: uuid(),
        text: 'requested to collaborate with you',
        time: 'Today at 2:34pm',
        username: 'olalekan',
    },
    {
        userProfileImage: DefaultProfileIcon,
        id: uuid(),
        text: 'requested to collaborate with you',
        time: 'Today at 2:34pm',
        username: 'olalekan',
    },
    {
        userProfileImage: DefaultProfileIcon,
        id: uuid(),
        text: 'requested to collaborate with you',
        time: 'Today at 2:34pm',
        username: 'olalekan',
    },
];

const Notifications = () => {
    const { show } = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch();
    const [notificationsToShow, setNotificationsToShow] = useState([] as (typeof NOTIFICATIONS)[number][]);
    const { loggedUser } = useSelector((state: RootState) => state.auth);

    const { data: getNotifications, isLoading: getNotificationsLoading } = useViewNotificationsQuery(null, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    console.log({ notifications: getNotifications?.data });
    const notificationsCount = getNotifications?.data.notifications.length;

    useEffect(() => {
        if (getNotifications?.data) {
            setNotificationsToShow(
                getNotifications.data.notifications.map((notification) => ({
                    id: notification.id,
                    userProfileImage: loggedUser?.displayImage || DefaultProfileIcon,
                    text: notification.message,
                    time: formatDate(notification.createdAt),
                    username: 'donaldduke',
                })),
            );
        }
    }, [getNotifications?.data, loggedUser?.displayImage]);

    return (
        <>
            {show && (
                <div className="notifications">
                    <div className="top">
                        <div className="header flex-row centralize-y">
                            <h3>Notifications</h3>
                            <button className="close" onClick={() => dispatch(setNotificationModal({ show: false }))}>
                                <SmallIcon size={10} src={CloseIcon} />
                            </button>
                        </div>
                        <div className="tabs flex-row centralize-y">
                            <button className="tag">
                                <p>All</p>

                                {notificationsToShow.length > 0 && (
                                    <div className="count red">{notificationsToShow.length > 9 ? '9+' : notificationsCount}</div>
                                )}
                            </button>
                            {/* <button className="tag">
                                <p>Tags</p>
                                <div className="count">
                                    8
                                </div>
                            </button>
                            <button className="tag">Post activity</button> */}
                        </div>
                    </div>

                    {getNotificationsLoading && <Spinner width="100px" height="100px" />}

                    {notificationsToShow.length > 0 ? (
                        <>
                            <div className="__items">
                                {notificationsToShow.map((notification) => (
                                    <Notification
                                        date={notification.time}
                                        text={notification.text}
                                        userProfileImage={notification.userProfileImage}
                                        username={notification.username}
                                        key={notification.id}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="no_noti_found flex-row centralize-y centralize-x" style={{ width: '100%', minHeight: '250px' }}>
                                <h4
                                    style={{
                                        color: '#ababab',
                                    }}
                                >
                                    No notification currently
                                </h4>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

// NavigationComponent.propTypes = {
//   currentPage: PropTypes.number.isRequired,
// };

export default Notifications;
