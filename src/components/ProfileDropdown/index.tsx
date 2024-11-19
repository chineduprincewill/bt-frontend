import './styleX.scss';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLogoutMutation } from '../../api/authApi';
import ArrowRight from '../../assets/arrow-right_dark.png';
import CalendarSmall from '../../assets/calendar-small.png';
import ConnectionsSmall from '../../assets/connections.png';
import FeedSendPostInMessage from '../../assets/feed_send_post_in_msg.svg';
import Logout from '../../assets/logout.png';
import Refer from '../../assets/refer.svg';
import ReportBug from '../../assets/report-bug.svg';
import Settings from '../../assets/settings_1.svg';
import HelpCenter from '../../assets/support.svg';
import { DisplayIconForProfile, SmallIcon } from '../../pages/profile';
import { logOutUser } from '../../state/slices/authSlice';
import { toggleProfileDropdown } from '../../state/slices/header';
import { toggleReferFriendsModal } from '../../state/slices/referFriends';
import { toggleSearchModal } from '../../state/slices/searchSlice';
import { toggleSettingsModal } from '../../state/slices/settingsSlice';
import { RootState } from '../../state/store';
import { Circle } from '../Circle';
import Spinner from '../Spinner';

export default function ProfileDropdown({ user }: { user: RootState['createAccount']['user'] & Partial<RootState['auth']['loggedUser']> }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();

    const modalRef = useRef<HTMLInputElement>(null);
    const { showProfileDropdown } = useSelector((state: RootState) => state.headerSidebar);

    console.log(showProfileDropdown);

    return (
        <div onClick={() => dispatch(toggleProfileDropdown(false))} className="fixed inset-0 bg-white bg-opacity-25 z-[10000]">
            <div ref={modalRef} className="absolute right-12 top-12 bg-white rounded-2xl  border border-solid border-[#CACACA] shadow-md p-4 w-80">
                <div className="flex flex-col space-y-7">
                    <div className="relative ">
                        <div className="border-solid border-b border-[#CACACA] py-3 flex items-center">
                            <Circle width={45} height={45} pd={0} bg="#e7e7e7" normalImage key={1} img={DisplayIconForProfile(user.displayImage)} />
                            <div className="">
                                <p className="text-sm font-semibold">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p
                                    className="text-xs"
                                    onClick={() => {
                                        dispatch(toggleProfileDropdown(false));
                                        dispatch(
                                            toggleSearchModal({
                                                show: false,
                                                searchText: '',
                                            }),
                                        );
                                        dispatch(
                                            toggleSettingsModal({
                                                show: false,
                                            }),
                                        );
                                        navigate('/profile');
                                    }}
                                >
                                    View Profile
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <button className="flex items-center w-full space-x-3 text-left">
                            <Circle width={52} height={52} pd={1} bg="#e7e7e7" key={1} noBorder noMg normalImage img={''}>
                                <Circle width={52} height={52} pd={15} bg="#e7e7e7" key={1} noMg noBorder normalImage img={CalendarSmall} />
                            </Circle>

                            <div className="">
                                <Link to="/mentorship/booking?q=pending">
                                    <p className="text-sm font-semibold">Manage my bookings</p>
                                    <p className="text-xs text-[#A2A2A2]">View and manage all your bookings</p>
                                </Link>
                            </div>
                        </button>
                        <button className="flex items-center w-full space-x-3 text-left ">
                            <Circle width={52} height={52} pd={1} bg="#e7e7e7" key={1} noBorder noMg normalImage img={''}>
                                <Circle width={52} height={52} pd={15} bg="#e7e7e7" key={1} noBorder noMg img={ConnectionsSmall} />
                            </Circle>

                            <div
                                className=""
                                onClick={() => {
                                    navigate('/connections');
                                    dispatch(toggleProfileDropdown(false));
                                }}
                            >
                                <p className="text-sm font-semibold __head">My Connections</p>
                                <p className="__head_desc text-xs text-[#A2A2A2]">View and manage your connections</p>
                            </div>
                        </button>
                    </div>

                    <div className="border-t border-solid border-[#CACACA] py-4 ">
                        <div className="">
                            <Link to="/settings-new">
                                <div
                                    className="flex items-center justify-between"
                                    onClick={() => {
                                        dispatch(toggleProfileDropdown(false));
                                    }}
                                >
                                    <div className="flex items-center hover:translate-x-3">
                                        <Circle img={Settings} pd={10} height={40} width={40} key={1} normalImage noBorder noMg bg="transparent" />
                                        <div className="__head">Settings</div>
                                    </div>
                                    <button className="right">
                                        <img className="open-right" src={ArrowRight} alt="" />
                                    </button>
                                </div>
                            </Link>

                            <div
                                className="flex items-center justify-between"
                                onClick={() => {
                                    dispatch(toggleProfileDropdown(false));
                                }}
                            >
                                <Link to="/support">
                                    <div className="flex items-center hover:translate-x-3">
                                        <Circle img={HelpCenter} pd={10} height={40} width={40} normalImage key={1} noBorder noMg bg="transparent" />
                                        <div className="">Help & support</div>
                                    </div>
                                </Link>
                                <button className="">
                                    <img className="" src={ArrowRight} alt="" />
                                </button>
                            </div>
                            <Link to="/report-bug">
                                <div
                                    className="flex items-center justify-between "
                                    onClick={() => {
                                        dispatch(toggleProfileDropdown(false));
                                    }}
                                >
                                    <div className="flex items-center hover:translate-x-3">
                                        <Circle img={ReportBug} pd={10} height={40} width={40} normalImage key={1} noMg noBorder bg="transparent" />
                                        <div className="__head">Report a bug</div>
                                    </div>
                                    <button className="right">
                                        <img className="open-right" src={ArrowRight} alt="" />
                                    </button>
                                </div>
                            </Link>

                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => {
                                    dispatch(toggleProfileDropdown(false));
                                    dispatch(
                                        toggleReferFriendsModal({
                                            show: true,
                                        }),
                                    );
                                }}
                            >
                                <div className="flex items-center hover:translate-x-3">
                                    <Circle img={Refer} pd={10} height={40} width={40} normalImage key={1} noMg noBorder bg="transparent" />
                                    <div className="">Refer A Friend</div>
                                </div>
                                <button className="">
                                    <img className="" src={ArrowRight} alt="" />
                                </button>
                            </div>

                            <div className="flex justify-center w-full cursor-pointer">
                                <button
                                    className="flex items-center justify-center px-6 py-2 space-x-3 bg-gray-300 rounded-3xl"
                                    style={{
                                        marginTop: '20px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => navigate('/user-type')}
                                >
                                    <SmallIcon src={FeedSendPostInMessage} size={26} />
                                    <p className="font-medium">Upgrade your account</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className=""
                        onClick={() => {
                            logout()
                                .unwrap()

                                .finally(() => {
                                    dispatch(logOutUser());
                                    navigate('/login');
                                    window.location.reload();
                                    toast.success('Logout successful');
                                });
                        }}
                    >
                        {logoutIsLoading ? (
                            <Spinner width="20px" height="20px" />
                        ) : (
                            <button className="flex items-center justify-center w-full">
                                <Circle width={30} height={30} normalImage noBorder pd={3} bg="transparent" noMg key={1} img="">
                                    <Circle width={30} height={30} normalImage noBorder pd={5} bg="transparent" noMg key={1} img={Logout} />
                                </Circle>
                                Log out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
