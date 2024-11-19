import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useViewUnreadMessagesNotificationCountQuery } from '../../api/notificationApi';
import MoreCircle from '../../assets/arrow-circle-down.svg';
import Briefcase from '../../assets/briefcase2.svg';
import FeedConnection from '../../assets/feed_connection.svg';
import FeedCreateEvent from '../../assets/feed_create_event.svg';
import FeedEvent from '../../assets/feed_event.svg';
import FeedsFeeds from '../../assets/feed_feed.svg';
import FeedMsg from '../../assets/feed_msg.svg';
import MessagesShadedIcon from '../../assets/messages-shaded.svg';
import EventsShadedIcon from '../../assets/media-shaded.svg';
import ConnectionsShaded from '../../assets/connections-shaded.svg';
import Mentorship from '../../assets/teacher2.svg';
import UserImage from '../../assets/user-image.png';
import Education from '../../assets/video-square.svg';
import { TabIcon } from '../../pages/feeds';
import { setUnreadNotificationsCount } from '../../state/slices/notificationCount';
import { RootState } from '../../state/store';
import ClickOutsideWrapper from '../ClickOutWrapper';
import Settings from '../../assets/settings.svg';
import MorePopup from './MorePopup';
import MoreIcon from '../../assets/more-circle.svg';

export default function SideBar() {
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState<boolean>(false);

    const { user: loggedUser } = useSelector((state: RootState) => state.createAccount);

    const { data: unreadCountsData, isLoading } = useViewUnreadMessagesNotificationCountQuery(null);
    console.log(unreadCountsData);

    useEffect(() => {
        if (!isLoading && unreadCountsData && unreadCountsData.status === 'success') {
            // Assuming you want to track private conversations count
            dispatch(setUnreadNotificationsCount(unreadCountsData.data.private));
        }
    }, [isLoading, unreadCountsData, dispatch]);

    const unreadCount = useSelector((state: RootState) => state.notificationCount.unreadCount);
    console.log(unreadCount);
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>(''); // Initial value is empty string

    const handleMenuItemClick = (menuItem: string) => {
        setSelectedMenuItem(menuItem); // Update selected item on click
    };

    const handleHideMore = () => {
        setShowMore(false);
    };

    return (
        <>
            {/* {isVisible && ( */}
            <div className={`w-full max-w-[650px] text-3xl z-10 md:pl-5 lg:pl-12 bg-gray-100 h-full`}>
                <div>
                    <div className="flex items-center md:block md:pt-7">
                        <div className="w-10 h-10 my-3 ml-5 overflow-hidden rounded-full">
                            <img src={loggedUser.displayImage || UserImage} alt="user image" className="object-cover w-full h-full rounded-full" />
                        </div>

                        <div>
                            <h2 className="text-sm font-medium md:text-xl">
                                {loggedUser.firstName} {loggedUser.lastName}
                            </h2>
                            <p className="text-xs text-[#7B7B7B]">
                                <Link to="/profile">View profile</Link>
                            </p>
                        </div>
                    </div>

                    <div className="md:py-7 md:space-y-4">
                        <div className="">
                            <Link to="/feeds">
                                <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                    <TabIcon src={FeedsFeeds ?? MessagesShadedIcon} />
                                    <h3 className="text-sm font-medium">Feeds</h3>
                                </div>
                            </Link>
                        </div>

                        <div onClick={() => handleMenuItemClick('/messages')} className="">
                            <Link to="/messages">
                                <div 
                                    className={`flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2 ${selectedMenuItem === '/messages' && 'bg-[#EDEDED]'}`}
                                >
                                    <TabIcon src={selectedMenuItem === '/messages' ? MessagesShadedIcon : FeedMsg} />

                                    <div className="flex items-center ">
                                        <h3 className="text-sm font-medium">Messages</h3>
                                        {unreadCount > 0 && (
                                            <p className="ml-2 bg-red-500 text-white rounded-2xl text-[10px] text-center px-2 py-1 leading-none">
                                                {unreadCount > 9 ? '9+' : unreadCount}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div onClick={() => handleMenuItemClick('/events')} className="">
                            <Link to="/events">
                                <div 
                                    className={`flex text-[#4E4E4E] hover:bg-[#EDEDED] items-center w-3/4 rounded-md p-2 ${selectedMenuItem === '/events' && 'bg-[#EDEDED]'}`}
                                >
                                    <TabIcon src={selectedMenuItem === '/events' ? EventsShadedIcon : FeedEvent} />
                                    <h3 className="text-sm font-medium">Events</h3>
                                </div>
                            </Link>
                        </div>

                        <div onClick={() => handleMenuItemClick('/connections')} className="">
                            <Link to="/connections">
                                <div 
                                    className={`flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2 ${selectedMenuItem === '/connections' && 'bg-[#EDEDED]'}`}
                                >
                                    <TabIcon src={selectedMenuItem === '/connections' ? ConnectionsShaded : FeedConnection} />
                                    <h3 className="text-sm font-medium">My connections</h3>
                                </div>
                            </Link>
                        </div>

                        <div className="hidden items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                            <TabIcon src={FeedCreateEvent} />
                            <h3 className="text-sm font-medium">Notification</h3>
                        </div>

                        <div className=" hidden">
                            <Link to="/settings">
                                <div className="flex hover:bg-[#EDEDED] items-center w-3/4 p-2 rounded-md">
                                    <TabIcon src={Settings} />
                                    <h3 className="text-sm font-medium">Settings</h3>
                                </div>
                            </Link>
                        </div>

                        <div
                            onClick={() => {
                                setShowMore((prev) => !prev);
                                // dispatch(toggleMainSidebar());
                            }}
                            className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2 cursor-pointer"
                        >
                            <div className={`${!showMore ? '' : ''} w-5 mr-3`}>
                                <TabIcon src={MoreIcon} />
                            </div>
                            <h3 className="text-sm">More</h3>
                        </div>

                        <div className="relative ">{showMore && <MorePopup close={handleHideMore} />}</div>
                    </div>
                </div>
            </div>
            {/* )} */}
        </>
    );
}
