import { FeedIconSVG, JobIcon, MyVillageIcon } from 'customicons/icons';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useGetConnectionsQuery } from '../../api/connectionApi';
import { useViewNotificationsQuery } from '../../api/notificationApi';
import Logo from '../../assets/blackat_icon.svg';
import Hamburger from '../../assets/hamburger.svg';
import MenuXIcon from '../../assets/menu-x.svg';
import Notification from '../../assets/notification.svg';
import ProfileIcon from '../../assets/profile-hd.png';
import ArrowDown from '../../assets/profile_dd_down.svg';
import Search from '../../assets/search-normal.png';
import { toggleProfileDropdown } from '../../state/slices/header';
import { toggleMobileSidebar } from '../../state/slices/newSidebarSlice';
import { setNotifications, setNotificationsCount } from '../../state/slices/notifications';
import { setNotificationModal } from '../../state/slices/notificationSlice';
import { toggleSearchModal } from '../../state/slices/searchSlice';
import { RootState, useAppSelector } from '../../state/store';
import SearchModal from '../SearchModal';

const NavItem = ({ path, icon: Icon, label, activePath }: { path: string; icon: any; label: string; activePath: string }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const isActive = activePath === path;
    const color = isActive || hover ? 'black' : '#9A9A9A';

    return (
        <div
            onClick={() => navigate(path)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="flex flex-col items-center cursor-pointer"
        >
            <Icon color={color} />
            <p className={`font-bold sm:text-[8px] leading-2 text-center text-[10px] mt-1 ${color === 'black' ? 'text-black' : 'text-[#9A9A9A]'}`}>
                {label}
            </p>
        </div>
    );
};

export const NavBar = ({
    user,
    pageTitle,
}: {
    user: RootState['createAccount']['user'] & Partial<RootState['auth']['loggedUser']>;
    pageTitle: string;
}) => {
    const toggleRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { showProfileDropdown } = useSelector((state: RootState) => state.headerSidebar);

    const { data: allNotifications, isLoading, isError, error } = useViewNotificationsQuery(null);

    useGetConnectionsQuery({ type: 'followers' });

    useEffect(() => {
        if (isError && (error as any)!.status === 401) {
            navigate('/login');
        }
    }, [isError, error, navigate]);

    const notificationsCount = allNotifications?.data.stats.total;
    const unreadNotificationsCount = allNotifications?.data.stats.unread;

    useEffect(() => {
        if (allNotifications) {
            dispatch(setNotifications(allNotifications.data.notifications));
            dispatch(setNotificationsCount(notificationsCount));
        }
    }, [allNotifications, notificationsCount, dispatch]);

    const isMobileVisible = useSelector((state: RootState) => state.mainSidebar.isMobileVisible);
    const noOfFollowersConnected = useAppSelector((state) => state.connections.followerCount);

    useEffect(() => {
        if (/^\/village/.test(location.pathname)) {
            document.body.classList.add('no-navbar-mobile');
        } else {
            document.body.classList.remove('no-navbar-mobile');
        }
    }, [location.pathname]);

    useEffect(() => {
        user && console.log(user);
    }, [])

    return (
        <>
            <div className="sticky top-0 z-10">
                {/* <------------Mobile Top Navigation------------/> */}
                <div className="grid items-center justify-between grid-cols-6 px-4 bg-white md:hidden navbar ">
                    <Link to="/feeds">
                        <img src={Logo} alt="image" className="object-cover" width="60px" />
                    </Link>
                    <div className="flex items-center col-span-4">
                        <div className="relative w-screen m-4 md:w-full">
                            <img
                                src={Search}
                                alt="search icon"
                                className="absolute w-4 transform -translate-y-1/2 pointer-events-none left-3 top-1/2 aspect-square"
                            />
                            <input
                                type="text"
                                className="border-[#B3B3B3] w-full py-3 pl-10 pr-3 placeholder:p-3 text-xs focus:border-none focus:ring-0"
                                placeholder="Search people"
                                style={{ outline: 'none' }}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    dispatch(
                                        toggleSearchModal({
                                            show: true,
                                            searchText: e.target.value,
                                        }),
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <div onClick={() => dispatch(toggleMobileSidebar())} className="flex justify-end col-span-1 md:hidden">
                        <img src={isMobileVisible ? MenuXIcon : Hamburger} alt="mobile menu icon" />
                    </div>
                </div>
                {/* <------------Mobile Top Navigation------------/> */}

                {/* <------------Desktop Top Navigation------------/> */}

                <div className="hidden md:flex justify-between items-center md:px-4 xl:px-20 w-screen border-solid border-b border-b-[#CACACA] bg-white h-16">
                    <div className="flex justify-between items-center sm:w-2/4 md:w-4/9 h-full">
                        <div className="flex justify-center items-center border-solid pr-7 border-r border-r-[#CACACA] h-full md:w-2/5">
                            <div className="">
                                <Link to="/feeds">
                                    <img src={Logo} alt="image" className="flex-shrink-0 w-[75px] h-[30px]" />
                                </Link>
                            </div>
                        </div>

                        <div className="items-center justify-between text-xs border-solid border-r border-r-[#CACACA] h-full sm:w-60 w-full grid gap- lg:gap-0 grid-cols-3 px-2 md:w-3/5">
                            <NavItem path="/feeds" icon={FeedIconSVG} label="FEED" activePath={location.pathname} />
                            <NavItem path="/village" icon={MyVillageIcon} label="MY VILLAGE" activePath={location.pathname} />
                            <NavItem path="/jobs" icon={JobIcon} label="JOBS" activePath={location.pathname} />
                        </div>
                    </div>

                    <div className="flex items-center sm:w-2/4 md:w-2/9 h-full md:flex">
                        <div className="relative w-screen h-full md:w-full">
                            <img src={Search} alt="search icon" className="absolute transform -translate-y-1/2 pointer-events-none left-3 top-1/2" />
                            <input
                                type="text"
                                className="border-[#B3B3B3] w-full py-3 pl-10 pr-3 placeholder:p-3 text-xs focus:border-none focus:ring-0 h-full"
                                placeholder="Search people"
                                style={{ outline: 'none' }}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    dispatch(
                                        toggleSearchModal({
                                            show: true,
                                            searchText: e.target.value,
                                        }),
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between md:w-3/9 h-full">
                        <div
                            onClick={() => dispatch(setNotificationModal({ show: true }))}
                            className="relative flex h-full justify-center items-center p-3 border-x border-solid border-[#CACACA] px-4"
                        >
                            <div className="bg-[#EDEDED] relative w-8 h-8 flex justify-center rounded-full p-1">
                                <div className="">
                                    {!!unreadNotificationsCount && unreadNotificationsCount > 0 && (
                                        <div className="absolute flex justify-center items-center top-0 right-0 w-3 h-3 bg-red-500 rounded-full overflow-hidden text-white text-[9px]"></div>
                                    )}
                                    <img src={Notification} alt="notification" className="cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <div
                            ref={toggleRef}
                            onClick={() => {
                                dispatch(toggleProfileDropdown(!showProfileDropdown));
                            }}
                            className="flex items-center justify-between h-full sm:px-1 px-5 cursor-pointer md:w-52 lg:w-60"
                        >
                            <div className="flex items-center justify-center pl-4">
                                <img
                                    src={user.displayImage || ProfileIcon}
                                    alt="display image"
                                    className="object-cover sm:w-8 sm:h-8 w-10 h-10 rounded-full"
                                />
                            </div>

                            <div className="">
                                <p className="text-sm sm:text-xs font-bold">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs text-[#7B7B7B] w-full">{noOfFollowersConnected} connections</p>
                            </div>

                            <div className="">
                                <img src={ArrowDown} alt="" className={`${!showProfileDropdown ? '' : 'rotate-180'} w-3 h-3 cursor-pointer`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <------------Desktop Top Navigation------------/> */}
            </div>
            <div className="absolute top-[75px] bg-white !z-[11000] left-0 !w-screen">
                <SearchModal inputValue={searchText} />
            </div>
        </>
    );
};
