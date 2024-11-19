import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useGetLoggedInUserInfoQuery } from '../../api/userApi';
import DefaultProfileImage from '../../assets/default-user-image.jpeg';
import HelpSupportIcon from '../../assets/help-support.svg';
import NotificationsIcon from '../../assets/notification.svg';
import SecurityIcon from '../../assets/security.svg';
import EditProfileIcon from '../../assets/user.svg';
import { Circle } from '../../components/Circle';
import { setSettingsMenuVisibility, toggleSettingsMenuVisibility } from '../../state/slices/settingsSidebar';
import { RootState } from '../../state/store';

export default function SettingsSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [selectedMenu, setSelectedMenu] = useState(location.pathname);
    const isMenuVisible = useSelector((state: RootState) => state.settingsSidebar.isSettingsMenuVisible);
    const { data: loggedInUser } = useGetLoggedInUserInfoQuery(null);
    console.log(loggedInUser);
    const navigate = useNavigate();

    useEffect(() => {
        // setSelectedMenu(location.pathname);

        // Check if the screen width is less than or equal to 768px and redirect to the mobile settings page
        if (window.innerWidth <= 768 && !location.pathname.startsWith('/settings-mobile')) {
            navigate('/settings-mobile');
        }
    }, [location, navigate]);

    const handleClick = (menuItem: string) => {
        setSelectedMenu(menuItem);
        if (window.innerWidth <= 768) {
            dispatch(toggleSettingsMenuVisibility());
        }
    };

    return (
        <div className={`relative md:block md:w-1/5 min-h-screen h-full space-y-5  pt-32 md:pt-12 px-12 ${isMenuVisible ? '' : 'hidden'}`}>
            <div className="md:hidden w-full ">
                {loggedInUser?.data?.user?.displayImage && loggedInUser?.data?.user?.displayImage !== '' ? (
                    <img src={loggedInUser.data.user.displayImage} alt="Profile image" className="object-cover w-12 h-12" />
                ) : (
                    <div className="w-full flex justify-center">
                        <div className="flex justify-center rounded-full overflow-hidden h-12 w-12">
                            <img src={DefaultProfileImage} alt="Profile image" className="object-cover w-full" />
                        </div>
                    </div>
                )}
            </div>
            <h3 className="font-bold text-black text-xl text-center md:text-left border-solid md:border-none border-b border-[#E0E0E0] pb-4">
                Settings
            </h3>

            <div className="space-y-7 md:space-y-3 pl-0 md:pl-5 text-sm">
                {[
                    { path: '/settings-new/my-account', label: 'My Account', icon: EditProfileIcon },
                    // { path: '/settings-new/notifications', label: 'Notifications', icon: NotificationsIcon },
                    // { path: '/settings-new/security', label: 'Security', icon: SecurityIcon },
                    // { path: '/settings-new/privacy', label: 'Privacy', icon: PrivacyIcon },
                    { path: '/settings-new/help', label: 'Help & Support', icon: HelpSupportIcon },
                ].map((menu) => (
                    <div key={menu.path} className="cursor-pointer font-sm text-sm">
                        <Link
                            to={menu.path}
                            className={`flex gap-2 items-center ${selectedMenu === menu.path ? 'text-[#0D0D0D] font-semibold' : 'text-[#959595]'}`}
                            onClick={() => handleClick(menu.path)}
                        >
                            <Circle img={menu.icon} pd={2} height={20} width={20} normalImage key={1} noMg noBorder bg="transparent" />

                            {menu.label}
                        </Link>
                    </div>
                ))}
                <button className="md:hidden bg-[#FF0000] text-xs rounded-3xl px-6 py-2 text-white">Sign out</button>
            </div>
        </div>
    );
}
