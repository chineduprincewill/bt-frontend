import { SmallIcon } from '../../pages/profile';
import CloseIcon from '../../assets/close.svg';
import { Circle } from '../Circle';
import DefaultProfileIcon from '../../assets/feed_def_profile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setNotificationModal } from '../../state/slices/notificationSlice';
import { useEffect, useState } from 'react';
import { useViewNotificationsQuery } from '../../api/notificationApi';
import Spinner from '../Spinner';
import SingleNotification from './SingleNotification';
// import { useGetUnreadNotificationsCountQuery } from '../../api/notificationApi';
import ClickOutsideWrapper from '../ClickOutWrapper';

const NotificationsNew = () => {
    const { show } = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch();

    // const notifications = useSelector((state: RootState) => state.notifications.notifications);
    const notificationsCount = useSelector((state: RootState) => state.notifications.count);
    console.log('All notifications from notifications dropdown');
    // console.log(notifications);

    const {
        data: getNotifications,
        isLoading: getNotificationsLoading,
        refetch,
        isSuccess: getNotificationsSuccess,
    } = useViewNotificationsQuery(null, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    console.log('Notifications data');
    console.log(getNotifications);
    const notifications = getNotifications?.data.notifications;
    console.log('THE NOTIFICATIONS', notifications);
    // const notificationsCount = getNotifications?.data.stats.unread;

    useEffect(() => {
        if (show) {
            refetch();
        }
    }, [show, refetch]);

    return (
        <>
            <ClickOutsideWrapper onClickOutside={() => dispatch(setNotificationModal({ show: false }))}>
                {show && (
                    <div className="absolute right-7 top-20 z-50 rounded-xl  shadow-md w-[452px] bg-white p-5">
                        {notifications && notifications.length > 0 ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl">Notifications</h3>
                                    <button
                                        className="border border-solid flex justify-center items-center h-5 w-5 rounded-full"
                                        onClick={() => dispatch(setNotificationModal({ show: false }))}
                                    >
                                        <SmallIcon size={10} src={CloseIcon} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-12 pt-5 border-b border-solid border-[#BEBEBE] pb-3">
                                    <div className="bg-[#E9E9E9] flex items-center py-1 px-2 rounded-full">
                                        <p className="text-[#A2A2A2]">All</p>

                                        {notificationsCount && notificationsCount > 0 ? (
                                            <div
                                                className={`bg-red-500 text-white rounded-full ml-1 p-1 text-[9px] ${
                                                    notificationsCount > 10 ? '' : 'text-center'
                                                }`}
                                            >
                                                {/* {notificationsCount > 100 ? '100+' : notificationsCount} */}
                                                {notificationsCount}
                                            </div>
                                        ) : (
                                            <p>No notifications</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full mt-7 h-[70vh] overflow-y-scroll">
                                    {getNotificationsLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <Spinner />
                                        </div>
                                    ) : (
                                        notifications.map((notification) => (
                                            <SingleNotification
                                                link={notification.resource}
                                                title={notification.title}
                                                id={notification.id}
                                                message={notification.message}
                                                read={notification.read}
                                                time={notification.createdAt}
                                                key={notification.id}
                                                icon={notification.icon}
                                                count={notification.count}
                                            />
                                        ))
                                    )}
                                </div>
                            </>
                        ) : (
                            <div>No Notifications right now</div>
                        )}
                    </div>
                )}
            </ClickOutsideWrapper>
        </>
    );
};

export default NotificationsNew;
