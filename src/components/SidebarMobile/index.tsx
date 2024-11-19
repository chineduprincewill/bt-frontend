import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLogoutMutation } from '../../api/authApi';
import MoreCircle from '../../assets/arrow-circle-down.svg';
import Briefcase from '../../assets/briefcase2.svg';
import FeedConnection from '../../assets/feed_connection.svg';
import FeedCreateEvent from '../../assets/feed_create_event.svg';
import FeedEvent from '../../assets/feed_event.svg';
import FeedsFeeds from '../../assets/feed_feed.svg';
import FeedMsg from '../../assets/feed_msg.svg';
import Logout from '../../assets/logout.svg';
import People from '../../assets/people.svg';
import Settings from '../../assets/settings_1.svg';
import Mentorship from '../../assets/teacher2.svg';
import UserImage from '../../assets/user-image.png';
import Education from '../../assets/video-square.svg';
import { TabIcon } from '../../pages/feeds';
import { logOutUser } from '../../state/slices/authSlice';
import { toggleMobileSidebar } from '../../state/slices/newSidebarSlice';
import { RootState } from '../../state/store';

export default function SideBarMobile() {
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState<boolean>(false);
    const navigate = useNavigate();

    const { user: loggedUser } = useSelector((state: RootState) => state.createAccount);

    const isMobileVisible = useSelector((state: RootState) => state.mainSidebar.isMobileVisible);

    const [logout] = useLogoutMutation();

    return (
        <>
            {isMobileVisible && (
                <div className={`flex absolute w-screen h-[calc(100dvh-72px)] overflow-hidden text-3xl bg-white z-[4000000]`}>
                    <div className="w-full">
                        <div onClick={() => dispatch(toggleMobileSidebar())} className="flex space-x-3 md:block items-center pl-5 md:pl-32 md:pt-7">
                            <div className="w-12 h-12 rounded-full overflow-hidden my-3">
                                <img src={loggedUser.displayImage || UserImage} alt="user image" className="object-cover" />
                            </div>
                            <div>
                                <h2 className="text-sm md:text-xl font-medium">
                                    {loggedUser.firstName} {loggedUser.lastName}
                                </h2>
                                <p className="text-xs text-[#7B7B7B]">
                                    <Link to="/profile">View profile</Link>
                                </p>
                            </div>
                        </div>

                        <div className="p-5 md:pl-28 md:py-7 md:space-y-4">
                            <div onClick={() => dispatch(toggleMobileSidebar())}>
                                <Link to="/feeds">
                                    <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                        <TabIcon src={FeedsFeeds} />
                                        <h3 className="text-sm font-medium">Feeds</h3>
                                    </div>
                                </Link>
                            </div>

                            <div onClick={() => dispatch(toggleMobileSidebar())}>
                                <Link to="/messages">
                                    <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                        <TabIcon src={FeedMsg} />
                                        <h3 className="text-sm font-medium">Messages</h3>
                                    </div>
                                </Link>
                            </div>

                            <div onClick={() => dispatch(toggleMobileSidebar())}>
                                <Link to="/events">
                                    <div className="flex text-[#4E4E4E] items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                        <TabIcon src={FeedEvent} />
                                        <h3 className="text-sm font-medium">Events</h3>
                                    </div>
                                </Link>
                            </div>

                            <div onClick={() => dispatch(toggleMobileSidebar())}>
                                <Link to="/connections">
                                    <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                        <TabIcon src={FeedConnection} />
                                        <h3 className="text-sm font-medium">My connections</h3>
                                    </div>
                                </Link>
                            </div>

                            {/* <div
                                onClick={() => dispatch(toggleMobileSidebar())}
                                className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2"
                            >
                                <TabIcon src={FeedCreateEvent} />
                                <h3 className="text-sm font-medium">Notification</h3>
                            </div> */}

                            <div onClick={() => dispatch(toggleMobileSidebar())}>
                                <Link to="/settings-mobile/">
                                    <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                        <TabIcon src={Settings} />
                                        <h3 className="text-sm font-medium">Settings</h3>
                                    </div>
                                </Link>
                            </div>

                            <div
                                onClick={() => {
                                    setShowMore(!showMore);
                                    // dispatch(toggleMobileSidebar());
                                }}
                                className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2 "
                            >
                                <div className={`${!showMore ? 'rotate-180' : ''} w-5 mr-3`}>
                                    <TabIcon src={MoreCircle} />
                                </div>
                                <h3 className="text-sm">More</h3>
                            </div>

                            {showMore && (
                                <>
                                    <hr className="border-b border-solid border-[#D9D9D9]" />
                                    <div onClick={() => dispatch(toggleMobileSidebar())} className="text-[#959595]">
                                        <>
                                            <Link to="/mentorship">
                                                <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2 text-[#959595]">
                                                    <TabIcon src={Mentorship} />
                                                    <div className="text-[#959595]">
                                                        <h3 className="text-sm text-[#959595]">Mentorship</h3>
                                                        <p className="text-xs text-[#959595]">Take mentorship, book sessions</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>

                                        <></>
                                        <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                            <TabIcon src={People} />
                                            <div className="text-[#959595]">
                                                <h3 className="text-sm text-[#959595]">My Village</h3>
                                                <p className="text-xs text-[#959595]">Join community of likeminds, connect and create magic</p>
                                            </div>
                                        </div>

                                        <>
                                            <Link to="/jobs">
                                                <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                                    <TabIcon src={Briefcase} />
                                                    <div>
                                                        <h3 className="text-sm text-[#959595]">Jobs</h3>
                                                        <p className="text-xs text-[#959595]">Manage your job activities</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>

                                        <>
                                            <Link to="/masterclass">
                                                <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                                    <TabIcon src={Education} />
                                                    <div>
                                                        <h3 className="text-sm text-[#959595]">Masterclass</h3>
                                                        <p className="text-xs text-[#959595]">Select a Masterclass</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </>
                                    </div>
                                </>
                            )}
                            <div
                                className="bottom-2 absolute"
                                onClick={() => {
                                    // dispatch(toggleMobileSidebar());
                                    logout()
                                        .unwrap()
                                        .finally(() => {
                                            toast.success('Logout successful');
                                            dispatch(logOutUser());
                                            navigate('/login');
                                        });
                                }}
                            >
                                <div className="flex items-center w-3/4 hover:bg-[#EDEDED] rounded-md p-2">
                                    <TabIcon src={Logout} />
                                    <h3 className="text-sm font-medium">Logout</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
