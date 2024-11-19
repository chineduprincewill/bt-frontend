import './style.scss';
import 'react-datepicker/dist/react-datepicker.css';

import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetChatConversationIdMutation, useLogoutMutation, UserInfoFromApi } from '../../api/authApi';
import { IComment, PostResponseFromApi, useViewProfilePostQuery } from '../../api/postApi';
import { useGetEducationQuery, useGetExperienceQuery, useGetProfileQueryQuery, UserProfile } from '../../api/profileApi';
import { useGetLoggedInUserInfoQuery, useGetUserDetailQuery, useUpdateUserMutation } from '../../api/userApi';
import ArrowRight from '../../assets/arrow-right_dark.png';
// import Export from '../../assets/export.png';
import Blackat from '../../assets/blackat.png';
import Job from '../../assets/briefcase.svg';
import MobileBg from  '../../assets/mobile-bg.png';
import CalendarSmall from '../../assets/calendar-small.png';
// import TeacherCircle from '../../assets/teacher-circle.png';
import ChatCircle from '../../assets/chat.png';
// import ShareProfileInDm from '../../assets/share_profile_in_dm.svg';
import CloseModalIcon from '../../assets/close.svg';
// import ShareProfileInDm from '../../assets/share_profile_in_dm.svg';
import ConnectionsSmall from '../../assets/connections.png';
// import MgtAvail from '../../assets/mgt-avail.png';
// import ArrowRightWhite from '../../assets/arrow-right_white.png';
import CreateEvent from '../../assets/create-event1.png';
import DaviosEvent from '../../assets/davios-event.png';
import DigiDynamo from '../../assets/digi-dyna.png';
// import Link from '../../assets/link-circle.svg';
// import Thread from '../../assets/thread.png';
// import BrownStar from '../../assets/brown-star.png'
import Disclaimer from '../../assets/disclaimer.png';
import EditProfile from '../../assets/edit_.svg';
// import FeedPostImage from '../../assets/feed_post_image.svg';
import DefaultProfileIcon from '../../assets/feed_def_profile.svg';
import FeedSendPostInMessage from '../../assets/feed_send_post_in_msg.svg';
// import FeedPostImage from '../../assets/feed_post_image.svg';
import FWAEvent from '../../assets/fwa-event.png';
import Feed from '../../assets/home.png';
import LocationImg from '../../assets/location-tick.svg';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from '../../assets/logo.png';
// import Medal from '../../assets/medal.png';
import Logout from '../../assets/logout.png';
import Mgt from '../../assets/Mgt.svg';
import MilestoneMentor from '../../assets/milestone-mentor.png';
import More from '../../assets/more.png';
import NewMasterClass from '../../assets/new-masterclass.png';
import Notification from '../../assets/notification.svg';
import People from '../../assets/people.png';
import ProfileIcon from '../../assets/profile-hd.png';
import ProfileHDIcon from '../../assets/profile-icon.png';
import ProfileIcon2 from '../../assets/profile2.png';
import ArrowDown from '../../assets/profile_dd_down.svg';
import ArrowUp from '../../assets/profile_dd_up.svg';
import Refer from '../../assets/refer.svg';
import ReportBug from '../../assets/report-bug.svg';
import Search from '../../assets/search-normal.png';
import Settings from '../../assets/settings_1.svg';
import ShareProfileVia from '../../assets/share_profile_via.svg';
import HelpCenter from '../../assets/support.svg';
import Teacher from '../../assets/Teacher.svg';
// import X from '../../assets/x.png';
// import Linkedin from '../../assets/linkedin.png';
import VendorProfilePic from '../../assets/vendor-profile.png';
import VerifyIcon from '../../assets/verify.svg';
import { Circle } from '../../components/Circle';
import { Collaborate } from '../../components/Collaborate';
import Notifications from '../../components/Notification';
import { ProfileBox } from '../../components/ProfileBox';
import Spinner from '../../components/Spinner';
import { SettingsPage } from '../../pages/settings';
import { logOutUser, setUser } from '../../state/slices/authSlice';
import CommingSoon, { toggleCommingSoonModal } from '../../state/slices/commingSoon';
import { setConversationId } from '../../state/slices/conversationIdSlice';
// import CloseIcon from '../../assets/main-close-dark.svg';
import { toggleProfileDropdown } from '../../state/slices/header';
import { setNotificationModal } from '../../state/slices/notificationSlice';
import { toggleProfileFormModal } from '../../state/slices/profileSlice';
import ReferFriends, { toggleReferFriendsModal } from '../../state/slices/referFriends';
import { toggleSearchModal } from '../../state/slices/searchSlice';
import { toggleSettingsModal } from '../../state/slices/settingsSlice';
import { selectSidebarMenu } from '../../state/slices/sideBarSlice';
import { toggleTalkToSupportModal } from '../../state/slices/supportSlice';
import { RootState } from '../../state/store';
import { Feeds } from '../feeds';
import { ParsePostPayload, PostPayload } from '../feeds/components/FeedSection.utils';
import { IPost, OriginalPostToDisplay, Post, ReportPostDialog, RepostDialog } from '../feeds/Post';
import { SupportPage } from '../support';
import { AbsoluteModal } from './AbsoluteModal';
import { CompleteProfileButton, ConnectToProfileButton } from './CompleteProfileButton';
import { CompleteProfileButtonForMobile, ConnectToProfileButtonForMobile } from './CompleteProfileButtonForMobile';
import BookMentorshipModal from './modals/BookMentorshipModal';
import MasterClassRequestModal from './modals/MasterClassRequestModal';
import SetAvailabilityModal from './modals/SetAvailabilityModal';
import { ProfileFormModal } from './ProfileFormModal';
import { SearchModal } from './SearchModal';
import { AboutMe } from './sections/AboutMe';
import { Achievements } from './sections/Achievements';
import { Activities } from './sections/Activities';
import { Education } from './sections/Education';
import { Experiences } from './sections/Experiences';
import { MasterClasses } from './sections/MasterClasses';
import { SuggestedConnections } from './sections/SuggestedConnections';

export const DisplayIconForProfile = (image: string | null) => {
    const DisplayIcon = image && image !== '' ? image : DefaultProfileIcon;
    return DisplayIcon;
};
export const NoRecord = () => {
    return (
        <>
            <div
                className="flex-row no-record centralize-x centralize-y"
                style={{
                    padding: '40px 60px',
                    borderRadius: '10px',
                    margin: '10px 0px',
                    backgroundColor: '#f4f4f4',
                }}
            >
                <p style={{ fontSize: '14px', fontWeight: 600 }}>No record found </p>
            </div>
        </>
    );
};
export const ProfileBrief = ({
    userType,
    verificationStatus,
    user: userData,
    jobTitle,
    style,
    demo,
    previewImage,
    showSmallEditProfileIcon,
    size,
    view,
    profileData
}: {
    user?: RootState['auth']['loggedUser'];
    userType: 'executive' | 'vendor' | 'creative';
    verificationStatus: 'verified' | 'unverified';
    jobTitle: string;
    profilePic?: string;
    style?: React.CSSProperties;
    demo?: string;
    previewImage?: string;
    showSmallEditProfileIcon?: boolean;
    size?: number;
    view: 'owner' | 'user';
    profileData?: UserInfoFromApi
}) => {
    const dispatch = useDispatch();
    const { user: _user } = useSelector((state: RootState) => state.createAccount);
    const user = userData || _user;
    jobTitle = demo ? jobTitle : (user as UserInfoFromApi).profile?.bio ?? jobTitle;
    let _userType = (user as UserInfoFromApi).role.name ?? userType;
    if (demo) {
        _userType = userType;
    }
    size;

    // jobTitle = 'Stay connected with friends and family across your devices.Stay connected with friends and family across your devices.Stay connected with friends and family across your devices.Stay connected with friends and family across your devices.Stay connected with friends and family across your devices.Stay connected with friends and family across your devices.'
    const [showBioModal, setShowBioModal] = useState(false);

    return (
        <>
            <div className="profile-header" style={style}>
                <div className="profile_img_sec"></div>
                <div className='flex justify-between items-center'>
                    <Circle bg="" width={size ?? 125} height={size ?? 125} pd={0} noMg img={''} style={{ position: 'relative', overflow: '' }}>
                    <Circle
                        bg=""
                        width={size ?? 125}
                        height={size ?? 125}
                        noMg
                        img={previewImage ?? DisplayIconForProfile((user as UserInfoFromApi).displayImage)}
                        style={{ position: 'relative', overflow: 'hidden' }}
                    />
                    {showSmallEditProfileIcon && (
                        <div
                            onClick={() =>
                                dispatch(
                                    toggleProfileFormModal({
                                        show: true,
                                        stageToStartFrom: 'profile-creation',
                                        showProfilePicUploadFlow: true,
                                    }),
                                )
                            }
                        >
                            <Circle
                                bg="black"
                                width={30}
                                height={30}
                                pd={3}
                                noMg
                                img={EditProfile}
                                noBorder
                                style={{
                                    position: 'absolute',
                                    bottom: '2px',
                                    right: '-2px',
                                    border: '2px solid white',
                                }}
                            />
                        </div>
                    )}
                    </Circle>
                    <div className='md:!hidden'>
                    {view === 'owner' ? <CompleteProfileButton header /> : <ConnectToProfileButton username={profileData?.username} />}
                    </div>
                </div>
                <div className="!ml-0 md:!ml-[20px] profile-details md:min-w-fit mt-4 md:!mt-0">
                    <div className="name-section">
                        <p className="text-2xl font-semibold capitalize">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="username">@{user?.username}</p>
                    </div>
                    {jobTitle.split(' ').length > 20 ? (
                        <p className="leading-6 text-sm md:text-[16px]">
                            {jobTitle.split(' ').slice(0, 20).join(' ')} ...
                            <span
                                className="__see-more"
                                onClick={() => {
                                    setShowBioModal(true);
                                }}
                            >
                                {' '}
                                See more
                            </span>
                        </p>
                    ) : (
                        <p className="leading-6 text-sm md:text-[16px]">{jobTitle}</p>
                    )}
                    <div className="!mt-6 stats min-w-fit">
                        <div className="flex-row _user-type tag minw-fit centralize-x centralize-y">{_userType}</div>
                        <div className="flex-row _verification-status tag minw-fit">
                            <>
                                <img src={VerifyIcon} alt="" />
                                <p>{verificationStatus}</p>
                            </>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="absolute md:hidden right-32 top-24">
                <CompleteProfileButtonForMobile header />
            </div> */}

            <AbsoluteModal setShow={setShowBioModal} show={showBioModal} heading="Bio" text={jobTitle} />
        </>
    );
};

const VendorProfile = ({
    user,
    view,
    demo,
    profileData,
    profilePosts,
    onAddPost,
}: {
    profileData?: UserInfoFromApi;
    demo?: string;
    user: UserInfoFromApi;
    profilePosts: (PostPayload | null)[];
    view: 'owner' | 'user';
    onAddPost: (e: PostForSpecificProfile) => void;
}) => {
    profilePosts;
    const { data: userExperiences } = useGetExperienceQuery();
    const [page, setPage] = useState(0);
    const { data: userEducation } = useGetEducationQuery();
    const dispatch = useDispatch();

    return (
        <>
            <div className="flex-column centralize-x bg-primary">
                <div className="flex-row profile-main">
                    <ProfileBrief
                        userType="vendor"
                        verificationStatus="unverified"
                        jobTitle="Global Artist"
                        user={user}
                        profilePic={VendorProfilePic}
                        demo={demo}
                        showSmallEditProfileIcon
                        view={view}
                        profileData={profileData}
                    />

                    <div>
                        {view === 'owner' ? <CompleteProfileButtonForMobile header /> : <ConnectToProfileButtonForMobile username={user.username} />}
                    </div>
                    <div className="flex-row edit centralize-x centralize-y">
                        {view === 'owner' ? <CompleteProfileButton header /> : <ConnectToProfileButton username={profileData?.username} />}

                        {/* <div className="flex-row more centralize-x centralize-y">
                            <img src={More} alt="" />
                        </div> */}
                    </div>
                </div>
                <div className="flex-row profile-nav">
                    <button
                        className="tab"
                        style={{
                            backgroundColor: page === 0 ? '#e9e9e9' : '',
                        }}
                        onClick={() => setPage(0)}
                    >
                        Profile Overview
                    </button>
                    <button
                        style={{
                            backgroundColor: page === 1 ? '#e9e9e9' : '',
                        }}
                        className="tab"
                        onClick={() => setPage(1)}
                    >
                        Activity Feeds
                    </button>
                    <button className="tab" onClick={() => dispatch(toggleCommingSoonModal({ show: true }))}>
                        Reviews
                    </button>
                    <button className="tab" onClick={() => dispatch(toggleCommingSoonModal({ show: true }))}>
                        My Events
                    </button>
                </div>

                <div className="flex-row _content centralize-x">
                    <div className="left">
                        <div className="post_area" style={{ position: 'relative', maxWidth: '100%' }}>
                            <div
                                className={`feed_main posts post_alt `}
                                style={{ position: 'relative' }}
                                // style={{ maxWidth: '90%', width: '90%' }}
                            >
                                {page == 0 && (
                                    <>
                                        {profilePosts.length === 0 && (
                                            <>
                                                <div
                                                    className="flex-row no_posts_found centralize-y centralize-x"
                                                    style={{ width: '100%', height: '100%', minHeight: '400px' }}
                                                >
                                                    <p className="" style={{ color: '#a1a1a1', fontSize: '20px', fontWeight: '600' }}>
                                                        Sorry no feed found
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {profilePosts.map((post, index) => (
                                            <Post
                                                key={index}
                                                // @ts-ignore
                                                post={post}
                                                // @ts-ignore
                                                comments={post.comments ?? ([] as IComment[])}
                                                // @ts-ignore
                                                actionRecord={post.actionRecord}
                                                onAddPost={onAddPost}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                            <RepostDialog />
                            <ReportPostDialog />
                        </div>

                        {page == 1 && (
                            <>
                                <AboutMe about={user.profile.about} />

                                <Experiences
                                    view={view}
                                    experiences={
                                        userExperiences?.data
                                            ? userExperiences?.data.map((experience) => ({
                                                  duration: `${experience.startDate} - ${experience.endDate}`,
                                                  jobType: experience.employmentType,
                                                  place: experience.company,
                                                  title: experience.role,
                                                  logo: Blackat,
                                              }))
                                            : undefined
                                    }
                                    demo={demo}
                                />

                                <Education
                                    schools={
                                        userEducation?.data
                                            ? userEducation?.data.map((education) => ({
                                                  icon: MilestoneMentor,
                                                  title: education.degree,
                                                  description: education.school,
                                                  date: `${education.startDate} - ${education.endDate}`,
                                              }))
                                            : undefined
                                    }
                                    view={view}
                                    demo={demo}
                                />
                            </>
                        )}
                    </div>
                    <div className="right">
                        <div className="quick-actions section">
                            {user.profile.created || demo ? (
                                view === 'owner' ? (
                                    <>
                                        <p className="section-header"> My Business </p>
                                        <div className="flex-row business-details centralize-x centralize-y">
                                            <div className="flex-row info centralize-y">
                                                <Circle bg="" height={60} width={60} key={1} img={ProfileIcon} pd={0} />
                                                <div className="details">
                                                    <p className="company">BlackAt Inc.</p>
                                                    <p className="company-type">Advertising Company</p>
                                                </div>
                                            </div>
                                            <button
                                                className="flex-row view-business centralize-x centralize-y"
                                                onClick={() =>
                                                    dispatch(
                                                        toggleCommingSoonModal({
                                                            show: true,
                                                        }),
                                                    )
                                                }
                                            >
                                                <p>View Business</p>
                                                <img src={EditProfile} alt="" />
                                            </button>
                                        </div>

                                        <ProfileBox
                                            onClick={() =>
                                                dispatch(
                                                    toggleCommingSoonModal({
                                                        show: true,
                                                    }),
                                                )
                                            }
                                            children={<img src={Mgt} height={50} width={50} />}
                                            title="Manage availability"
                                            subtitle="Seamlessly manage your availability with a few clicks."
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="quick-actions section">
                                            <p className="section-header"> My business </p>
                                            <div className="flex-row business-details centralize-x centralize-y">
                                                <div className="flex-row info centralize-y">
                                                    <img src={ProfileIcon2} alt="" style={{}} />
                                                    <div className="details">
                                                        <p className="company">BlackAt Inc.</p>
                                                        <p className="company-type">Advertising Company</p>
                                                    </div>
                                                </div>
                                                <button className="flex-row view-business centralize-x centralize-y">
                                                    <p>Edit Business</p>
                                                    <img src={EditProfile} alt="" />
                                                </button>
                                            </div>
                                            <ProfileBox
                                                onClick={() =>
                                                    dispatch(
                                                        toggleCommingSoonModal({
                                                            show: true,
                                                        }),
                                                    )
                                                }
                                                children={<img src={Teacher} height={50} width={50} />}
                                                title="Book Creative Session"
                                                //     subtitle="Book 1:1 sessions
                                                // from the options
                                                // based on your needs"
                                            />

                                            <Collaborate
                                                onClick={() =>
                                                    dispatch(
                                                        toggleCommingSoonModal({
                                                            show: true,
                                                        }),
                                                    )
                                                }
                                                title="Collaborate with me"
                                                subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                                            />

                                            <div className="flex-row bottom centralize-y">
                                                <div
                                                    className="create-event sect"
                                                    style={{
                                                        backgroundColor: '#000000',
                                                        color: 'white',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <div
                                                        className="pro-tag"
                                                        style={{
                                                            backgroundColor: '#FFD12D',
                                                            maxWidth: 'fit-content',
                                                            padding: '3px 8px',
                                                            borderRadius: '15px',
                                                            fontWeight: '600',
                                                            fontFamily: 'Plus Jakarta Sans',
                                                            fontSize: 10,
                                                            position: 'absolute',
                                                            top: 20,
                                                            right: 20,
                                                        }}
                                                    >
                                                        {' '}
                                                        PRO{' '}
                                                    </div>
                                                    <div className="flex-row illu centralize-y">
                                                        <img src={ChatCircle} alt="" className="arrow-right" />
                                                    </div>

                                                    <p
                                                        className="title"
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        Chat up
                                                    </p>
                                                    <p
                                                        className="description"
                                                        style={{
                                                            color: '#c1c1c1',
                                                        }}
                                                    >
                                                        Create your virtual event effortlessly. It's like throwing a party!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            ) : (
                                <>
                                    <p className="section-header"> Profile </p>
                                    {view === 'owner' ? <CompleteProfileButton /> : <NoRecord />}
                                </>
                            )}

                            <Collaborate
                                onClick={() =>
                                    dispatch(
                                        toggleCommingSoonModal({
                                            show: true,
                                        }),
                                    )
                                }
                                title="Become a collaborator"
                                subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                            />

                            <SuggestedConnections demo={demo} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const ExecutiveProfile = ({
    user,
    view,
    demo,
    profilePosts,
    onAddPost,
}: {
    onAddPost: (e: PostForSpecificProfile) => void;
    demo?: string;
    user: UserInfoFromApi;
    view: 'owner' | 'user';
    profilePosts: (PostPayload | null)[];
}) => {
    profilePosts;
    const { data: userExperiences } = useGetExperienceQuery();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    return (
        <>
            <div className="flex-column centralize-x bg-primary">
                <div className="flex-row profile-main">
                    <ProfileBrief
                        userType="executive"
                        verificationStatus="unverified"
                        jobTitle="Global Artist"
                        user={user}
                        profilePic={VendorProfilePic}
                        demo={demo}
                        showSmallEditProfileIcon
                        view={view}
                    />

                    <div className="flex-row edit centralize-x centralize-y">
                        {view === 'owner' ? <CompleteProfileButton header /> : <ConnectToProfileButton username={user.username} />}

                        {/* <div className="flex-row more centralize-x centralize-y">
                            <img src={More} alt="" />
                        </div> */}
                    </div>
                </div>

                <div className="flex-row profile-nav">
                    <button
                        onClick={() => setPage(1)}
                        className="tab"
                        style={{
                            backgroundColor: page === 1 ? '#e9e9e9' : '',
                        }}
                    >
                        Activity Feeds
                    </button>
                    <button
                        onClick={() => setPage(0)}
                        className="tab"
                        style={{
                            backgroundColor: page === 0 ? '#e9e9e9' : '',
                        }}
                    >
                        Profile Overview
                    </button>
                    <button onClick={() => dispatch(toggleCommingSoonModal({ show: true }))} className="tab">
                        My Events
                    </button>
                </div>

                <div className="flex-row pane _content centralize-x">
                    <div className="left">
                        <div className="post_area" style={{ position: 'relative', maxWidth: '100%' }}>
                            <div
                                className={`feed_main posts post_alt `}
                                style={{ position: 'relative' }}
                                // style={{ maxWidth: '90%', width: '90%' }}
                            >
                                {page == 0 && (
                                    <>
                                        {profilePosts.length === 0 && (
                                            <>
                                                <div
                                                    className="flex-row no_posts_found centralize-y centralize-x"
                                                    style={{ width: '100%', height: '100%', minHeight: '400px' }}
                                                >
                                                    <p className="" style={{ color: '#a1a1a1', fontSize: '20px', fontWeight: '600' }}>
                                                        Sorry no feed found
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {profilePosts.map((post, index) => (
                                            <Post
                                                key={index}
                                                // @ts-ignore
                                                post={post}
                                                // @ts-ignore
                                                comments={post.comments ?? ([] as IComment[])}
                                                // @ts-ignore
                                                actionRecord={post.actionRecord}
                                                // @ts-ignore
                                                onAddPostToFeed={onAddPost}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                            <RepostDialog />
                            <ReportPostDialog />
                        </div>

                        {page == 1 && (
                            <>
                                <AboutMe about={user.profile.about} />

                                {/* <Activities
                                    activities={[
                                        {
                                            icon: DaviosEvent,
                                            title: 'Attended DAVOS event',
                                            date: 'Yesterday',
                                        },
                                        {
                                            icon: NewMasterClass,
                                            title: 'Uploaded a new masterclass',
                                            date: 'Yesterday',
                                        },
                                        {
                                            icon: FWAEvent,
                                            title: "Created a new 'FWA' event",
                                            date: 'Yesterday',
                                        },
                                    ]}
                                    view={view}
                                    demo={demo}
                                /> */}

                                <Experiences
                                    view={view}
                                    experiences={
                                        userExperiences?.data
                                            ? userExperiences?.data.map((experience) => ({
                                                  duration: `${experience.startDate} - ${experience.endDate}`,
                                                  jobType: experience.employmentType,
                                                  place: experience.company,
                                                  title: experience.role,
                                                  logo: Blackat,
                                              }))
                                            : undefined
                                    }
                                    demo={demo}
                                />

                                {/* <Achievements
                                    achievements={[
                                        {
                                            icon: MilestoneMentor,
                                            title: 'Milestone mentor',
                                            description: '1000+ hours of virtual busines guidances',
                                            date: '02 Jan 2024',
                                        },
                                        {
                                            icon: DigiDynamo,
                                            title: 'Digital Dynamo',
                                            description: '500 successful Virtual Mentorship Sessions',
                                            date: '02 Jan 2024',
                                        },
                                    ]}
                                    view={view}
                                    demo={demo}
                                /> */}
                            </>
                        )}
                    </div>

                    <div className="right" style={{ maxWidth: 'fit-content' }}>
                        {view === 'owner' ? (
                            <>
                                <div className="quick-actions section">
                                    <p className="section-header"> Quick actions </p>

                                    <SetAvailabilityModal />

                                    <Collaborate
                                        onClick={() =>
                                            dispatch(
                                                toggleCommingSoonModal({
                                                    show: true,
                                                }),
                                            )
                                        }
                                        title="Collaborate with me"
                                        subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                                    />

                                    {/* <div className="flex-row bottom centralize-y">
                                        <div
                                            className="create-event sect"
                                            onClick={() =>
                                                dispatch(
                                                    toggleCommingSoonModal({
                                                        show: true,
                                                    }),
                                                )
                                            }
                                        >
                                            <div className="flex-row illu centralize-y">
                                                <Circle
                                                    bg="#000000"
                                                    height={40}
                                                    width={40}
                                                    noMg
                                                    noBorder
                                                    style={{ border: '0px' }}
                                                    key={1}
                                                    img={CreateEvent}
                                                    pd={0}
                                                />
                                                <img src={ArrowRight} alt="" className="arrow-right" />
                                            </div>

                                            <p className="title">Create an event</p>
                                            <p className="description">Create your virtual event effortlessly. It's like throwing a party!</p>
                                        </div>

                                        <div
                                            className="mgt-account"
                                            onClick={() =>
                                                dispatch(
                                                    toggleCommingSoonModal({
                                                        show: true,
                                                    }),
                                                )
                                            }
                                        >
                                            <p className="section-header">Manage your account executive</p>
                                            <div className="profile-summary">
                                                <Circle bg="transparent" height={50} width={50} pd={0} noMg noBorder key={1} img={ProfileHDIcon} />
                                                <p className="full-name">Philip Doe</p>
                                                <p className="position">ACCOUNT EXEC</p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="quick-actions section">
                                    <p className="section-header"> Quick actions </p>

                                    <ProfileBox
                                        onClick={() =>
                                            dispatch(
                                                toggleCommingSoonModal({
                                                    show: true,
                                                }),
                                            )
                                        }
                                        children={<img src={Teacher} height={50} width={50} />}
                                        title="Book Mentorship"
                                        // subtitle="Book 1:1 sessions from the
                                        //     options based on your needs"
                                    />

                                    <Collaborate
                                        onClick={() =>
                                            dispatch(
                                                toggleCommingSoonModal({
                                                    show: true,
                                                }),
                                            )
                                        }
                                        title="Collaborate with me"
                                        subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                                    />

                                    <div className="flex-row bottom centralize-y">
                                        <div
                                            onClick={() =>
                                                dispatch(
                                                    toggleCommingSoonModal({
                                                        show: true,
                                                    }),
                                                )
                                            }
                                            className="create-event sect"
                                            style={{
                                                backgroundColor: '#000000',
                                                color: 'white',
                                                position: 'relative',
                                            }}
                                        >
                                            <div
                                                className="pro-tag"
                                                style={{
                                                    backgroundColor: '#FFD12D',
                                                    maxWidth: 'fit-content',
                                                    padding: '3px 8px',
                                                    borderRadius: '15px',
                                                    fontWeight: '600',
                                                    fontFamily: 'Plus Jakarta Sans',
                                                    fontSize: 10,
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 20,
                                                }}
                                            >
                                                {' '}
                                                PRO{' '}
                                            </div>
                                            <div className="flex-row illu centralize-y">
                                                <img src={ChatCircle} alt="" className="arrow-right" />
                                            </div>

                                            <p
                                                className="title"
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                Chat up
                                            </p>
                                            <p
                                                className="description"
                                                style={{
                                                    color: '#c1c1c1',
                                                }}
                                            >
                                                Create your virtual event effortlessly. It's like throwing a party!
                                            </p>
                                        </div>

                                        {/* <div
                                            onClick={() =>
                                                dispatch(
                                                    toggleCommingSoonModal({
                                                        show: true,
                                                    }),
                                                )
                                            }
                                            className="socials-sect sect"
                                        >
                                            <p className="_header">
                                                Connect to my socials
                                            </p>
                                            <div className="flex-row socials">
                                                <div
                                                    className="flex-row _circle centralize-x"
                                                    style={{
                                                        marginRight: 10,
                                                    }}
                                                >
                                                    <img src={X} alt="" />
                                                </div>
                                                <div className="flex-row _circle centralize-x">
                                                    <img
                                                        src={Linkedin}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </>
                        )}
                        <MasterClasses
                            masterclassess={[
                                {
                                    title: 'Get to know me',
                                    description: 'Get to know me',
                                    duration: '< 30mins',
                                },
                                {
                                    title: 'Get to know me',
                                    description: 'Get to know me',
                                    duration: '< 30mins',
                                },
                                {
                                    title: 'Get to know me',
                                    description: 'Get to know me',
                                    duration: '< 30mins',
                                },
                            ]}
                            view={'owner'}
                        />
                        <SuggestedConnections />
                    </div>
                </div>
            </div>
        </>
    );
};

export const FeedContainer = ({ children, className, style }: { style?: Record<string, any>; children: ReactNode; className?: string }) => {
    return (
        <div className={className + ' feed_container bg-primary'} id="feed_container" style={style}>
            {children}
        </div>
    );
};

export const SmallIcon = ({ src, size }: { size?: number; src: string }) => {
    return <Circle img={src} height={size ?? 24} width={size ?? 24} pd={0} noMg bg="transparent" borderColor="transparent" noBorder />;
};

const CreativeProfile = ({
    user,
    view,
    demo,
    profileData,
    profilePosts,
    onAddPost,
}: {
    onAddPost: (e: PostForSpecificProfile) => void;
    profileData?: UserInfoFromApi;
    demo?: string;
    user: UserInfoFromApi;
    view: 'owner' | 'user';
    profilePosts: (PostPayload | null)[];
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: userExperiences } = useGetExperienceQuery();
    const { data: userEducation } = useGetEducationQuery();
    const [showUpgrade, setShowUpgrade] = useState<boolean>(user.settings.suggestUpgrade);
    const [page, setPage] = useState(0);
    const [updateUser] = useUpdateUserMutation();

    return (
        <div className="creative">
            <div className="flex-column centralize-x">
                <div className={`grid md:flex profile-main !bg-[url('../../assets/mobile-bg.png')] bg-cover`}>
                    <ProfileBrief
                        userType="creative"
                        verificationStatus="unverified"
                        jobTitle={user.profile?.bio ?? ''}
                        user={user}
                        profilePic={VendorProfilePic}
                        demo={demo}
                        showSmallEditProfileIcon
                        size={125}
                        view={view}
                        profileData={profileData}
                    />

                    <div className="w-full !bg-transparent !hidden md:!grid edit centralize-x centralize-y space-y-2 md:space-y-8">
                        {view === 'owner' ? <CompleteProfileButton header /> : <ConnectToProfileButton username={profileData?.username} />}
                        {/* {view === 'owner' && <ShareButton username={user.username} userId={user.id} />} */}
                        <div className="grid md:flex text-xs w-full">
                            <div>
                                {/* @ts-ignore */}
                                <span className="font-semibold">{user.profile?.profileStats?.followersCount ?? '0'} </span>connections
                            </div>

                            <div className="flex">
                                <img src={LocationImg} height={15} width={15} style={{ marginLeft: 10, marginRight: 3 }} />
                                {/* @ts-ignore */}
                                <p>{user.profile?.location || ''}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-row space-x-4 pr-8 profile-nav">
                    <button
                        className="tab"
                        style={{
                            backgroundColor: page == 0 ? '#e9e9e9' : '#fafafa',
                        }}
                        onClick={
                            () => setPage(0)
                            // dispatch(toggleCommingSoonModal({ show: true }))
                        }
                    >
                        <span className='text-[14px]'>Activities feed</span>
                    </button>
                    <button
                        className="tab"
                        style={{
                            backgroundColor: page == 1 ? '#e9e9e9' : '#fafafa',
                        }}
                        onClick={() => setPage(1)}
                    >
                        <span className='text-[14px]'>Profile Overview</span>
                    </button>
                </div>

                {showUpgrade && (
                    <div className="flex-row upg-acct centralize-x centralize-y">
                        <div className="flex-row upg-container centralize-x">
                            <div className="flex-row info centralize-x">
                                <Circle img={Disclaimer} width={60} height={60} noBorder pd={10} bg={'#DBC068'} />
                                <div className="text flex-column !space-y-2 centralize-x">
                                    <p>Not your user type?</p>
                                    <p>Upgrade your profile now!</p>
                                </div>
                            </div>
                            <div className="flex-row cta centralize-y">
                                <button onClick={() => navigate('/user-type')}> Upgrade Account</button>
                                <p
                                    className="dont-show"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setShowUpgrade(false);
                                        updateUser({
                                            suggestUpgrade: false,
                                        }).unwrap();
                                        dispatch(
                                            setUser({
                                                ...user,
                                                settings: {
                                                    ...user.settings,
                                                    suggestUpgrade: false,
                                                },
                                            }),
                                        );
                                    }}
                                >
                                    {"Don't show this again"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex-row pane _content centralize-x">
                    <div className="left">
                        <div className="post_area" style={{ position: 'relative', maxWidth: '100%' }}>
                            <div
                                className={`feed_main posts post_alt `}
                                style={{ position: 'relative' }}
                                // style={{ maxWidth: '90%', width: '90%' }}
                            >
                                {page == 0 && (
                                    <>
                                        {profilePosts.length === 0 && (
                                            <>
                                                <div
                                                    className="flex-row no_posts_found centralize-y centralize-x"
                                                    style={{ width: '100%', height: '100%', minHeight: '400px' }}
                                                >
                                                    <p className="" style={{ color: '#a1a1a1', fontSize: '20px', fontWeight: '600' }}>
                                                        Sorry no feed found
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {profilePosts.map((post, index) => (
                                            <Post
                                                key={index}
                                                post={post as any}
                                                // @ts-ignore
                                                comments={post.comments ?? ([] as IComment[])}
                                                // @ts-ignore
                                                actionRecord={post.actionRecord}
                                                // @ts-ignore
                                                onAddPostToFeed={onAddPost}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                            <RepostDialog />
                            <ReportPostDialog />
                        </div>

                        {page == 1 && (
                            <>
                                <AboutMe about={user.profile.about} />

                                <Experiences
                                    view={view}
                                    experiences={
                                        userExperiences?.data
                                            ? userExperiences?.data.map((experience) => ({
                                                  duration: `${experience.startDate} - ${experience.endDate}`,
                                                  jobType: experience.employmentType,
                                                  place: experience.company,
                                                  title: experience.role,
                                                  logo: Blackat,
                                              }))
                                            : undefined
                                    }
                                    demo={demo}
                                />
                                <Education
                                    schools={
                                        userEducation?.data
                                            ? userEducation?.data.map((education) => ({
                                                  icon: MilestoneMentor,
                                                  title: education.degree,
                                                  description: education.school,
                                                  date: `${education.startDate} - ${education.endDate}`,
                                              }))
                                            : undefined
                                    }
                                    view={view}
                                    demo={demo}
                                />
                            </>
                        )}
                    </div>

                    <div className="right" style={{ maxWidth: 'fit-content' }}>
                        {user.profile.created &&
                            (view === 'owner' ? (
                                <>
                                    {/* <div className="quick-actions section">
                                        <p className="section-header">
                                            Profile statistics
                                        </p>
                                        <div
                                            className="stats_ flex-column centralize-x centralize-y"
                                            style={{
                                                padding: '20px 40px',
                                                paddingTop: '30px',
                                                backgroundColor: 'white',
                                                borderRadius: 10,
                                                border: '1px solid #e9e9e9',
                                                maxWidth: 300,
                                            }}
                                        >
                                            <div className="stat-pane">
                                                <div
                                                    className="stats"
                                                    style={{
                                                        marginBottom: 20,
                                                        paddingBottom: 20,
                                                        borderBottom:
                                                            '1px solid #e9e9e9',
                                                    }}
                                                >
                                                    <p
                                                        className="stat-header"
                                                        style={{
                                                            color: '#c1c1c1',
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            marginBottom: 10,
                                                        }}
                                                    >
                                                        {' '}
                                                        SESSIONS COMPLETED{' '}
                                                    </p>
                                                    <p>5 SESSIONS</p>
                                                </div>
                                                <div className="flex-row profile-summary centralize-y">
                                                    <div
                                                        className="stats "
                                                        style={{
                                                            paddingBottom: 20,
                                                        }}
                                                    >
                                                        <p
                                                            className="stat-header"
                                                            style={{
                                                                color: '#c1c1c1',
                                                                fontSize: 12,
                                                                fontWeight: 700,
                                                                marginBottom: 10,
                                                            }}
                                                        >
                                                            {' '}
                                                            PERFORMANCE RATING{' '}
                                                        </p>
                                                        <div className="flex-row centralize-y">
                                                            <img
                                                                src={Rating}
                                                                alt=""
                                                            />
                                                            <div
                                                                className="details"
                                                                style={{
                                                                    marginLeft: 10,
                                                                }}
                                                            >
                                                                <p
                                                                    className="full-name"
                                                                    style={{
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    95/
                                                                    <span
                                                                        style={{
                                                                            fontWeight: 100,
                                                                        }}
                                                                    >
                                                                        100%
                                                                    </span>
                                                                </p>
                                                                <p className="position">
                                                                    Excellent
                                                                    rating
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="flex-row other centralize-x centralize-y"
                                            style={{
                                                maxWidth: 300,
                                                marginTop: 20,
                                                backgroundColor: 'black',
                                                color: 'white',
                                                borderRadius: 10,
                                                padding: '20px 30px',
                                            }}
                                        >
                                            <div
                                                className="pane"
                                                style={{
                                                    color: 'white',
                                                    padding: '0 20px',
                                                    borderRight:
                                                        '1px solid #ccc',
                                                    fontSize: 12,
                                                }}
                                            >
                                                {' '}
                                                Search for jobs & opportunities
                                            </div>
                                            <div
                                                className="flex-row pane centralize-y"
                                                style={{ padding: '0 20px' }}
                                            >
                                                <Circle
                                                    bg="red"
                                                    height={10}
                                                    width={10}
                                                    key={1}
                                                    noBorder
                                                    img={''}
                                                    pd={3}
                                                />
                                                <p
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    No
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                </>
                            ) : (
                                <>
                                    <div className="quick-actions section">
                                        <p className="section-header"> Quick Action </p>

                                        <ProfileBox
                                            onClick={() =>
                                                dispatch(
                                                    toggleCommingSoonModal({
                                                        show: true,
                                                    }),
                                                )
                                            }
                                            title="Send Me a message"
                                            // subtitle="Book 1:1 sessions from the
                                            // options based on your needs"
                                        />

                                        <Collaborate
                                            onClick={() =>
                                                dispatch(
                                                    toggleCommingSoonModal({
                                                        show: true,
                                                    }),
                                                )
                                            }
                                            title="Collaborate with me"
                                            subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                                        />
                                        {/* <div className="flex-row bottom centralize-y">
                                            <div className="_socials-sect creative-social-sect sect">
                                                <p className="_header">
                                                    Connect to socials
                                                </p>
                                                <div className="flex-row _socials">
                                                    <div
                                                        className="flex-row _circle centralize-x"
                                                        style={{
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        <img src={X} alt="" />
                                                    </div>
                                                    <div className="flex-row _circle centralize-x">
                                                        <img
                                                            src={Linkedin}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mgt-account">
                                                <p className="section-header">
                                                    User performance rating
                                                </p>
                                                <div className="flex-row profile-summary centralize-y">
                                                    <img src={Rating} alt="" />
                                                    <div
                                                        className="details"
                                                        style={{
                                                            marginLeft: 10,
                                                        }}
                                                    >
                                                        <p
                                                            className="full-name"
                                                            style={{
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            95/
                                                            <span
                                                                style={{
                                                                    fontWeight: 100,
                                                                }}
                                                            >
                                                                100%
                                                            </span>
                                                        </p>
                                                        <p className="position">
                                                            Excellent rating
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </>
                            ))}

                        <Collaborate
                            onClick={() =>
                                dispatch(
                                    toggleCommingSoonModal({
                                        show: true,
                                    }),
                                )
                            }
                            title="Become a collaborator"
                            subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                        />
                        <SuggestedConnections />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Header = ({ user }: { user: RootState['createAccount']['user'] & Partial<RootState['auth']['loggedUser']> }) => {
    console.log('userinfo', { user });
    const [searchText, setSearchText] = useState('');
    const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showProfileDropdown } = useSelector((state: RootState) => state.headerSidebar);

    return (
        <>
            <div className="flex-row main-header centralize-x" style={{ background: '#fafafa', position: 'relative' }}>
                <div className="flex-row header-container centralize-x centralize-y light-bd-outline">
                    <div
                        className="logo-container"
                        style={{
                            minWidth: 'fit-content',
                        }}
                    >
                        <img className="logo" alt="Union" src={Logo} />
                    </div>

                    <div className="flex-row nav-area">
                        <div className="flex-row nav-items centralize light-bd-outline">
                            <div
                                className="nav-item flex-column centralize"
                                onClick={() => {
                                    dispatch(
                                        toggleTalkToSupportModal({
                                            show: false,
                                            type: 'bug',
                                        }),
                                    );
                                    dispatch(
                                        toggleSettingsModal({
                                            show: false,
                                        }),
                                    );
                                    dispatch(
                                        selectSidebarMenu({
                                            paneToShow: 'feeds',
                                        }),
                                    );
                                    navigate('/feeds');
                                }}
                            >
                                <img className="nav-icon" src={Feed} alt="" />
                                <p className="nav-text">FEED</p>
                            </div>
                            <div
                                className="nav-item flex-column centralize"
                                onClick={() => {
                                    dispatch(toggleCommingSoonModal({ show: true }));
                                }}
                            >
                                <img className="nav-icon" src={People} alt="" />
                                <p className="nav-text">MY VILLAGE</p>
                            </div>
                            <div
                                className="nav-item flex-column centralize"
                                onClick={() => {
                                    dispatch(toggleCommingSoonModal({ show: true }));
                                }}
                            >
                                <img className="nav-icon" src={Job} alt="" />
                                <p className="nav-text">JOBS</p>
                            </div>
                        </div>
                        <div className="flex-row search-bar centralize-y">
                            <img src={Search} alt="" className="search" />
                            <input
                                id="main-search-field"
                                type="text"
                                placeholder="Search for people events"
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    dispatch(
                                        toggleSearchModal({
                                            show: true,
                                            searchText: e.target.value,
                                        }),
                                    );
                                }}
                                onMouseDown={() => {
                                    if (searchText.length > 0) {
                                        dispatch(
                                            toggleSearchModal({
                                                show: true,
                                                searchText,
                                            }),
                                        );
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="notification flex-column centralize light-bd-outline" style={{ position: 'relative' }}>
                        <div className="flex-row circle centralize" onClick={() => dispatch(setNotificationModal({ show: true }))}>
                            <img src={Notification} alt="" />
                        </div>
                    </div>

                    <div
                        className="flex-row profile-dropdown"
                        onClick={() => dispatch(toggleProfileDropdown(!showProfileDropdown))}
                        style={{ position: 'relative' }}
                    >
                        <Notifications />
                        <div className="flex-row profile-desc centralize-x centralize-y">
                            <Circle
                                width={40}
                                height={40}
                                pd={0}
                                bg="transparent"
                                noMg
                                normalImage
                                key={1}
                                img={DisplayIconForProfile(user.displayImage)}
                            />
                            <div className="profile-details centralize-y">
                                <p className="full-name">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="followers">
                                    {user.profile?.profileStats
                                        ? user.profile.profileStats.followersCount + user.profile.profileStats.followingCount
                                        : 0}{' '}
                                    connections
                                </p>
                            </div>
                        </div>
                        <button className="dropdown-button" onClick={() => dispatch(toggleProfileDropdown(!showProfileDropdown))}>
                            <img src={showProfileDropdown ? ArrowUp : ArrowDown} alt="" />
                        </button>
                        <div
                            className=""
                            style={{
                                display: showProfileDropdown ? 'flex' : 'none',
                                position: 'absolute',
                                top: '50px',
                                right: '10px',
                            }}
                        >
                            <div className="main-dropdown flex-column centralize-x centralize-y">
                                {/* <div style={{ position: 'absolute', top: '10px', right: '0px', zIndex: 2 }} onClick={() => dispatch(toggleProfileDropdown(false))}>
                                    <Circle width={15} height={15} pd={0} bg='transparent' noBorder normalImage key={1} img={CloseIcon} />
                                </div> */}

                                <div className="md-section top-sect" style={{ position: 'relative' }}>
                                    <div className="flex-row _top centralize-y">
                                        <Circle
                                            width={45}
                                            height={45}
                                            pd={0}
                                            bg="#e7e7e7"
                                            normalImage
                                            key={1}
                                            img={DisplayIconForProfile(user.displayImage)}
                                        />
                                        <div className="details">
                                            <p className="__head">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p
                                                className="__head_desc"
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
                                                {' '}
                                                View Profile{' '}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mid md-section flex-column centralize-y">
                                    <div
                                        className="flex-row mid-items __notification centralize-y"
                                        style={{ display: 'none' }}
                                        onClick={() => {
                                            dispatch(setNotificationModal({ show: true }));
                                            dispatch(toggleProfileDropdown(false));
                                        }}
                                    >
                                        <Circle width={52} height={52} pd={1} bg="#e7e7e7" key={1} noBorder noMg normalImage img={''}>
                                            <Circle
                                                width={52}
                                                height={52}
                                                pd={15}
                                                bg="#e7e7e7"
                                                key={1}
                                                noMg
                                                noBorder
                                                normalImage
                                                img={Notification}
                                            />
                                        </Circle>

                                        <div className="details">
                                            <p className="__head">Notifications</p>
                                            <p className="__head_desc">View and manage your notifications</p>
                                        </div>
                                    </div>

                                    <div className="flex-row mid-items centralize-y">
                                        <Circle width={52} height={52} pd={1} bg="#e7e7e7" key={1} noBorder noMg normalImage img={''}>
                                            <Circle
                                                width={52}
                                                height={52}
                                                pd={15}
                                                bg="#e7e7e7"
                                                key={1}
                                                noMg
                                                noBorder
                                                normalImage
                                                img={CalendarSmall}
                                            />
                                        </Circle>

                                        <div className="details">
                                            <p className="__head">Manage my bookings</p>
                                            <p className="__head_desc">View and manage all your bookings</p>
                                        </div>
                                    </div>
                                    <div className="flex-row mid-items centralize-y">
                                        <Circle width={52} height={52} pd={1} bg="#e7e7e7" key={1} noBorder noMg normalImage img={''}>
                                            <Circle width={52} height={52} pd={15} bg="#e7e7e7" key={1} noBorder noMg img={ConnectionsSmall} />
                                        </Circle>

                                        <div
                                            className="details"
                                            onClick={() => {
                                                dispatch(
                                                    selectSidebarMenu({
                                                        paneToShow: 'connections',
                                                    }),
                                                );
                                                navigate('/feeds');
                                                dispatch(toggleProfileDropdown(false));
                                            }}
                                        >
                                            <p className="__head">My Connections</p>
                                            <p className="__head_desc">View and manage your connections</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom md-section flex-column centralize-x">
                                    <div className="items flex-column">
                                        <div
                                            className="flex-row item centralize-y"
                                            onClick={() => {
                                                dispatch(
                                                    toggleSettingsModal({
                                                        show: true,
                                                    }),
                                                );
                                                dispatch(toggleProfileDropdown(false));
                                                dispatch(
                                                    toggleReferFriendsModal({
                                                        show: false,
                                                    }),
                                                );
                                            }}
                                        >
                                            <Circle
                                                img={Settings}
                                                pd={10}
                                                height={40}
                                                width={40}
                                                key={1}
                                                normalImage
                                                noBorder
                                                noMg
                                                bg="transparent"
                                            />
                                            <div className="__head">Settings</div>
                                            <button className="right">
                                                <img className="open-right" src={ArrowRight} alt="" />
                                            </button>
                                        </div>
                                        <div
                                            className="flex-row item centralize-y"
                                            onClick={() => {
                                                dispatch(toggleProfileDropdown(false));
                                                dispatch(
                                                    toggleTalkToSupportModal({
                                                        show: true,
                                                        type: 'contact',
                                                    }),
                                                );
                                                dispatch(
                                                    toggleReferFriendsModal({
                                                        show: false,
                                                    }),
                                                );
                                                dispatch(
                                                    toggleSettingsModal({
                                                        show: false,
                                                    }),
                                                );
                                            }}
                                        >
                                            <Circle
                                                img={HelpCenter}
                                                pd={10}
                                                height={40}
                                                width={40}
                                                normalImage
                                                key={1}
                                                noBorder
                                                noMg
                                                bg="transparent"
                                            />
                                            <div className="__head">Help & support</div>
                                            <button className="right">
                                                <img className="open-right" src={ArrowRight} alt="" />
                                            </button>
                                        </div>
                                        <div
                                            className="flex-row item centralize-y"
                                            onClick={() => {
                                                dispatch(toggleProfileDropdown(false));
                                                dispatch(
                                                    toggleTalkToSupportModal({
                                                        show: true,
                                                        type: 'bug',
                                                    }),
                                                );
                                                dispatch(
                                                    toggleSettingsModal({
                                                        show: false,
                                                    }),
                                                );
                                                dispatch(
                                                    toggleReferFriendsModal({
                                                        show: false,
                                                    }),
                                                );
                                            }}
                                        >
                                            <Circle
                                                img={ReportBug}
                                                pd={10}
                                                height={40}
                                                width={40}
                                                normalImage
                                                key={1}
                                                noMg
                                                noBorder
                                                bg="transparent"
                                            />
                                            <div className="__head">Report a bug</div>
                                            <button className="right">
                                                <img className="open-right" src={ArrowRight} alt="" />
                                            </button>
                                        </div>
                                        <div
                                            className="flex-row item centralize-y"
                                            onClick={() => {
                                                dispatch(toggleProfileDropdown(false));
                                                dispatch(
                                                    toggleReferFriendsModal({
                                                        show: true,
                                                    }),
                                                );
                                                dispatch(
                                                    toggleSettingsModal({
                                                        show: false,
                                                    }),
                                                );
                                                dispatch(
                                                    toggleTalkToSupportModal({
                                                        show: false,
                                                        type: 'bug',
                                                    }),
                                                );
                                            }}
                                        >
                                            <Circle img={Refer} pd={10} height={40} width={40} normalImage key={1} noMg noBorder bg="transparent" />
                                            <div className="__head">Refer A Friend</div>
                                            <button className="right">
                                                <img className="open-right" src={ArrowRight} alt="" />
                                            </button>
                                        </div>
                                        <button
                                            className="flex-row upg-acc centralize-x centralize-y"
                                            style={{
                                                marginTop: '20px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => navigate('/user-type')}
                                        >
                                            <SmallIcon src={FeedSendPostInMessage} size={26} />
                                            <p className="__head">Upgrade your account</p>
                                        </button>
                                    </div>

                                    {/* <div className="flex-row become-pro centralize-y">
                                        <Circle
                                            width={30}
                                            height={30}
                                            pd={1}
                                            bg="white"
                                            key={1}
                                            normalImage
                                            noBorder
                                            img={Medal}
                                        >
                                            <Circle
                                                width={30}
                                                height={30}
                                                pd={4}
                                                bg="white"
                                                key={1}
                                                normalImage
                                                noMg
                                                noBorder
                                                img={Medal}
                                            />
                                        </Circle>

                                        <p className="__head">
                                            Become a Pro Member
                                        </p>
                                        <button className="right">
                                            <img
                                                className="open-right"
                                                src={ArrowRight}
                                                alt=""
                                            />
                                        </button>
                                    </div> */}
                                </div>
                                <div
                                    className="flex-row logout centralize-x centralize-y"
                                    onClick={() => {
                                        logout()
                                            .unwrap()
                                            // .then(() => {
                                            // })
                                            // .catch(() => {
                                            //     toast.error('Logout successful')
                                            // })
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
                                        <>
                                            <Circle width={30} height={30} normalImage noBorder pd={3} bg="transparent" noMg key={1} img="">
                                                <Circle
                                                    width={30}
                                                    height={30}
                                                    normalImage
                                                    noBorder
                                                    pd={5}
                                                    bg="transparent"
                                                    noMg
                                                    key={1}
                                                    img={Logout}
                                                />
                                            </Circle>
                                            <p className="__head">Log out</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export type PostForSpecificProfile = IPost & {
    id: string;
    actionRecord: {
        id: string;
        liked: boolean;
        bookmarked: boolean;
        reportReason: string;
        updatedAt: string;
        likeCount: number;
    };
    images: string[];
    activities: PostResponseFromApi['activities'];
    originalPost?: OriginalPostToDisplay;
    originalPostId?: string;
};

export const Profile = ({ pageView }: { pageView?: 'feeds' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const { show: showProfileFormModal } = useSelector((state: RootState) => state.profile);
    const { show: showSearchResultModal, searchText } = useSelector((state: RootState) => state.searchResult);
    const { show: showSettingsPage } = useSelector((state: RootState) => state.settings);
    const { show: showSupportPage } = useSelector((state: RootState) => state.support);

    let { user } = useSelector((state: RootState) => state.createAccount);
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const { isError: getUserIsError, currentData } = useGetLoggedInUserInfoQuery(null);

    const profileType = loggedUser?.role.name;
    console.log({ profileType });

    const view = 'owner' as 'owner' | 'user';
    let demo: string | undefined = undefined;
    if (profileType) {
        demo = 'demo';
    }

    const [profilePosts, setProfilePosts] = useState<(PostPayload | null)[]>([]);

    const { data: getProfilePostData } = useViewProfilePostQuery(
        { profileId: loggedUser?.profile.id ?? '' },
        {
            refetchOnMountOrArgChange: true,
        },
    );
    useEffect(() => {
        if (getProfilePostData?.data?.posts) {
            console.log({ posts: getProfilePostData.data.posts });
            const profilePostsData = getProfilePostData.data.posts.slice(0, 20).map((post) => {
                return ParsePostPayload(post);
            });
            setProfilePosts(profilePostsData);
        }
    }, [dispatch, getProfilePostData?.data?.posts]);

    if (currentData && !loggedUser) {
        dispatch(setUser(currentData.data.user));
    }

    console.log({ postsi: getProfilePostData?.data?.posts });
    user = { ...user, ...loggedUser, type: profileType ?? 'creative' };

    const users = {
        executive: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            type: 'executive',
            ...loggedUser,
        },
        creative: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            type: 'creative',
            ...loggedUser,
        },
        vendor: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            type: 'vendor',
            ...loggedUser,
        },
    } as Record<'creative' | 'executive' | 'vendor', UserInfoFromApi>;

    function onAddPost(e: PostResponseFromApi) {
        if (view === 'owner') setProfilePosts((prev) => [ParsePostPayload(e), ...prev]);
    }

    if (!loggedUser && view === 'owner' && getUserIsError) navigate('/login');

    const userProfile = {
        executive: (
            <ExecutiveProfile
                user={(view === 'owner' ? loggedUser : users.executive) as UserInfoFromApi}
                view={view}
                profilePosts={profilePosts}
                demo={demo}
                // @ts-ignore
                onAddPost={onAddPost}
            />
        ),
        creative: (
            <CreativeProfile
                user={(view === 'owner' ? loggedUser : users.creative) as UserInfoFromApi}
                profilePosts={profilePosts}
                view={view}
                demo={demo}
                // @ts-ignore
                onAddPost={onAddPost}
            />
        ),
        vendor: (
            <VendorProfile
                user={(view === 'owner' ? loggedUser : users.vendor) as UserInfoFromApi}
                view={view}
                demo={demo}
                profilePosts={profilePosts}
                // @ts-ignore
                onAddPost={onAddPost}
            />
        ),
    };
    // const pages = {
    //     feeds: <Feeds postId={postId} />,
    // };

    return (
        <>
            <div className="profile">
                <div className="container mx-auto">
                    {/* <Header user={user} /> */}
                    <div
                        className="flex-row centralize-x main_board"
                        style={{
                            position: 'relative',
                            padding: '0',
                            width: '100%',
                        }}
                        onClick={() => {
                            console.log('clicked');
                            dispatch(toggleProfileDropdown(false));
                        }}
                    >
                        {showSearchResultModal ? (
                            <>
                                <div className="content centralize-x">
                                    <SearchModal inputValue={searchText} />
                                </div>
                            </>
                        ) : showSettingsPage ? (
                            <SettingsPage />
                        ) : showSupportPage ? (
                            <SupportPage />
                        ) : loggedUser && currentData?.data.user ? (
                            <>
                                {pageView ? (
                                    <div className="content">{pageView === 'feeds' && <Feeds postId={postId} />}</div>
                                ) : (
                                    <>
                                        <div className="content centralize-x">{userProfile[user.type]}</div>
                                        {showProfileFormModal && loggedUser && <ProfileFormModal userInfo={loggedUser} view='owner | user' />}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div
                                    className="flex-row max-width centralize"
                                    style={{
                                        width: '100%',
                                        height: '100vh',
                                        padding: 'auto',
                                        position: 'relative',
                                    }}
                                >
                                    <Spinner
                                        width="100px"
                                        height="100px"
                                        key={1}
                                        style={{
                                            maxHeight: 'fit-content',
                                            margin: 'auto 0',
                                        }}
                                    />
                                </div>
                            </>
                        )}

                        {/* <ReferFriends /> */}
                        {/* <CommingSoon /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

const SearchedVendorProfile = ({
    user,
    // userId,
    username,
    profilePosts,
}: {
    username: string;
    user: UserProfile;
    userId: string;
    profilePosts: PostForSpecificProfile[];
}) => {
    const [page, setPage] = useState(0);
    const userExperiences = user.experience;
    const userEducation = user.education;
    const dispatch = useDispatch();
    const view = 'user';

    return (
        <>
            <div className="flex-column centralize-x bg-primary">
                <div className="flex-row profile-main">
                    <ProfileBrief
                        userType="vendor"
                        verificationStatus="unverified"
                        jobTitle="Global Artist"
                        user={user as any}
                        profilePic={VendorProfilePic}
                        view={view}
                    />

                    <div className="flex-row edit centralize-x centralize-y">
                        <ConnectToProfileButton username={username} />

                        {/* <div className="flex-row more centralize-x centralize-y">
                            <img src={More} alt="" />
                        </div> */}
                    </div>
                </div>
                <div className="flex-row profile-nav">
                    <button
                        className="tab"
                        style={{
                            backgroundColor: page === 1 ? '#e9e9e9' : '',
                        }}
                        onClick={() => setPage(1)}
                    >
                        Activity Feed
                    </button>
                    <button
                        className="tab"
                        style={{
                            backgroundColor: page === 0 ? '#e9e9e9' : '',
                        }}
                        onClick={() => setPage(0)}
                    >
                        Profile Overview
                    </button>
                    {/* 
                    <button className="tab" onClick={() => dispatch(toggleCommingSoonModal({ show: true }))}>
                        Reviews
                    </button> */}
                    <button className="tab" onClick={() => dispatch(toggleCommingSoonModal({ show: true }))}>
                        Events
                    </button>
                </div>

                <div className="flex-row _content centralize-x">
                    <div className="left">
                        <div className="post_area" style={{ position: 'relative', maxWidth: '100%' }}>
                            <div
                                className={`feed_main posts post_alt `}
                                style={{ position: 'relative' }}
                                // style={{ maxWidth: '90%', width: '90%' }}
                            >
                                {page == 1 && (
                                    <>
                                        {profilePosts.length === 0 && (
                                            <>
                                                <div
                                                    className="flex-row no_posts_found centralize-y centralize-x"
                                                    style={{ width: '100%', height: '100%', minHeight: '400px' }}
                                                >
                                                    <p className="" style={{ color: '#a1a1a1', fontSize: '20px', fontWeight: '600' }}>
                                                        Sorry no feed found
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {profilePosts.map((post, index) => (
                                            <Post
                                                key={index}
                                                post={post}
                                                // @ts-ignore
                                                comments={post.comments ?? ([] as IComment[])}
                                                // @ts-ignore
                                                actionRecord={post.actionRecord}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                            <RepostDialog />
                            <ReportPostDialog />
                        </div>

                        {page === 0 && (
                            <>
                                <AboutMe about={user.about} />

                                <Experiences
                                    view={view}
                                    experiences={
                                        userExperiences
                                            ? userExperiences.map((experience) => ({
                                                  duration: `${experience.startDate} - ${experience.endDate}`,
                                                  jobType: experience.employmentType,
                                                  place: experience.company,
                                                  title: experience.role,
                                                  logo: Blackat,
                                              }))
                                            : undefined
                                    }
                                />

                                <Education
                                    schools={
                                        userEducation
                                            ? userEducation.map((education) => ({
                                                  icon: MilestoneMentor,
                                                  title: education.degree,
                                                  description: education.school,
                                                  date: `${education.startDate} - ${education.endDate}`,
                                              }))
                                            : undefined
                                    }
                                    view={view}
                                />
                            </>
                        )}
                    </div>

                    <div className="right">
                        <div className="quick-actions section">
                            <>
                                <div className="quick-actions section">
                                    <p className="section-header"> My business </p>
                                    <div className="flex-col business-details centralize-x centralize-y">
                                        <div className="flex-row info centralize-y">
                                            <img src={ProfileIcon2} alt="" style={{}} />
                                            <div className="details">
                                                <p className="company">BlackAt Inc.</p>
                                                <p className="company-type">Advertising Company</p>
                                            </div>
                                        </div>
                                        <button className="flex-row mt-10 view-business centralize-x centralize-y">
                                            <p>Edit</p>
                                            <img src={EditProfile} alt="" />
                                        </button>
                                    </div>

                                    <ProfileBox
                                        onClick={() =>
                                            dispatch(
                                                toggleCommingSoonModal({
                                                    show: true,
                                                }),
                                            )
                                        }
                                        children={<img src={Teacher} height={50} width={50} />}
                                        title="Book Creative Session"
                                        subtitle="Book 1:1 sessions from the
                                                    options based on your needs"
                                    />

                                    <Collaborate
                                        onClick={() =>
                                            dispatch(
                                                toggleCommingSoonModal({
                                                    show: true,
                                                }),
                                            )
                                        }
                                        title="Collaborate with me"
                                        subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                                    />

                                    <div className="flex-row bottom centralize-y">
                                        <div
                                            className="create-event sect"
                                            style={{
                                                backgroundColor: '#000000',
                                                color: 'white',
                                                position: 'relative',
                                            }}
                                        >
                                            <div
                                                className="pro-tag"
                                                style={{
                                                    backgroundColor: '#FFD12D',
                                                    maxWidth: 'fit-content',
                                                    padding: '3px 8px',
                                                    borderRadius: '15px',
                                                    fontWeight: '600',
                                                    fontFamily: 'Plus Jakarta Sans',
                                                    fontSize: 10,
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 20,
                                                }}
                                            >
                                                {' '}
                                                PRO{' '}
                                            </div>
                                            <div className="flex-row illu centralize-y">
                                                <img src={ChatCircle} alt="" className="arrow-right" />
                                            </div>

                                            <p
                                                className="title"
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                Chat up
                                            </p>
                                            <p
                                                className="description"
                                                style={{
                                                    color: '#c1c1c1',
                                                }}
                                            >
                                                Create your virtual event effortlessly. It's like throwing a party!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>

                            <SuggestedConnections />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const SearchedExecutiveProfile = ({
    user,
    userId,
    username,
    profilePosts,
}: {
    username: string;
    user: UserProfile;
    userId: string;
    profilePosts: PostForSpecificProfile[];
}) => {
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const userExperiences = user.experience;
    const view = 'user';
    const navigate = useNavigate();
    console.log({ userId, username });

    return (
        <>
            {/* <MasterClassRequestModal /> */}
            <div className="flex-column centralize-x bg-primary">
                <div className="flex-row profile-main">
                    <ProfileBrief
                        userType="executive"
                        verificationStatus="unverified"
                        jobTitle="Global Artist"
                        user={user as any}
                        profilePic={VendorProfilePic}
                        view={view}
                    />

                    <div className="flex-row edit centralize-x centralize-y">
                        <ConnectToProfileButton username={username} />

                        {/* <div className="flex-row more centralize-x centralize-y">
                            <img src={More} alt="" />
                        </div> */}
                    </div>
                </div>

                <div className="flex-row profile-nav">
                    <button
                        onClick={() => setPage(0)}
                        style={{
                            backgroundColor: page === 0 ? '#e9e9e9' : '',
                        }}
                        className="tab"
                    >
                        Profile Overview
                    </button>
                    <button
                        style={{
                            backgroundColor: page === 1 ? '#e9e9e9' : '',
                        }}
                        onClick={() => setPage(1)}
                        className="tab"
                    >
                        Activity Feed
                    </button>
                    <button onClick={() => dispatch(toggleCommingSoonModal({ show: true }))} className="tab">
                        Events
                    </button>
                    <button onClick={() => dispatch(toggleCommingSoonModal({ show: true }))} className="tab">
                        Masterclasses
                    </button>
                </div>

                <div className="flex-row _content centralize-x">
                    <div className="left">
                        <div className="post_area" style={{ position: 'relative', maxWidth: '100%' }}>
                            <div
                                className={`feed_main posts post_alt `}
                                style={{ position: 'relative' }}
                                // style={{ maxWidth: '90%', width: '90%' }}
                            >
                                {page == 1 && (
                                    <>
                                        {profilePosts.length === 0 && (
                                            <>
                                                <div
                                                    className="flex-row no_posts_found centralize-y centralize-x"
                                                    style={{ width: '100%', height: '100%', minHeight: '400px' }}
                                                >
                                                    <p className="" style={{ color: '#a1a1a1', fontSize: '20px', fontWeight: '600' }}>
                                                        Sorry no feed found
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {profilePosts.map((post, index) => (
                                            <Post
                                                key={index}
                                                post={post}
                                                // @ts-ignore
                                                comments={post.comments ?? ([] as IComment[])}
                                                // @ts-ignore
                                                actionRecord={post.actionRecord}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                            <RepostDialog />
                            <ReportPostDialog />
                        </div>

                        {page === 0 && (
                            <>
                                <AboutMe about={user.about} />

                                <Experiences
                                    view={view}
                                    experiences={
                                        userExperiences
                                            ? userExperiences.map((experience) => ({
                                                  duration: `${experience.startDate} - ${experience.endDate}`,
                                                  jobType: experience.employmentType,
                                                  place: experience.company,
                                                  title: experience.role,
                                                  logo: Blackat,
                                              }))
                                            : undefined
                                    }
                                />

                                {/* <Achievements
                                    achievements={[
                                        {
                                            icon: MilestoneMentor,
                                            title: 'Milestone mentor',
                                            description: '1000+ hours of virtual busines guidances',
                                            date: '02 Jan 2024',
                                        },
                                        {
                                            icon: DigiDynamo,
                                            title: 'Digital Dynamo',
                                            description: '500 successful Virtual Mentorship Sessions',
                                            date: '02 Jan 2024',
                                        },
                                    ]}
                                    view={view}
                                /> */}
                            </>
                        )}
                        {/* <AboutMe about={user.profile.about} /> */}
                    </div>

                    <div className="right" style={{ maxWidth: 'fit-content' }}>
                        <>
                            <div className="quick-actions section">
                                <p className="section-header"> Quick actions </p>

                                <ProfileBox
                                    onClick={() => navigate(`/mentorship?profileId=${userId}`)}
                                    children={<img src={Teacher} height={50} width={50} />}
                                    title="Book mentorship"
                                    // subtitle="Book 1:1 sessions from the
                                    //         options based on your needs"
                                />
                                <Collaborate
                                    onClick={() =>
                                        dispatch(
                                            toggleCommingSoonModal({
                                                show: true,
                                            }),
                                        )
                                    }
                                    title="Collaborate with me"
                                    subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                                />
                                <div className="flex-row bottom centralize-y">
                                    <div
                                        onClick={() =>
                                            dispatch(
                                                toggleCommingSoonModal({
                                                    show: true,
                                                }),
                                            )
                                        }
                                        className="create-event sect"
                                        style={{
                                            backgroundColor: '#000000',
                                            color: 'white',
                                            position: 'relative',
                                        }}
                                    >
                                        <div
                                            className="pro-tag"
                                            style={{
                                                backgroundColor: '#FFD12D',
                                                maxWidth: 'fit-content',
                                                padding: '3px 8px',
                                                borderRadius: '15px',
                                                fontWeight: '600',
                                                fontFamily: 'Plus Jakarta Sans',
                                                fontSize: 10,
                                                position: 'absolute',
                                                top: 20,
                                                right: 20,
                                            }}
                                        >
                                            {' '}
                                            PRO{' '}
                                        </div>
                                        <div className="flex-row illu centralize-y">
                                            <img src={ChatCircle} alt="" className="arrow-right" />
                                        </div>

                                        <p
                                            className="title"
                                            style={{
                                                color: 'white',
                                            }}
                                        >
                                            Chat up
                                        </p>
                                        <p
                                            className="description"
                                            style={{
                                                color: '#c1c1c1',
                                            }}
                                        >
                                            Create your virtual event effortlessly. It's like throwing a party!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                        <MasterClasses
                            masterclassess={[
                                {
                                    title: 'Get to know me',
                                    description: 'Get to know me',
                                    duration: '< 30mins',
                                },
                                {
                                    title: 'Get to know me',
                                    description: 'Get to know me',
                                    duration: '< 30mins',
                                },
                                {
                                    title: 'Get to know me',
                                    description: 'Get to know me',
                                    duration: '< 30mins',
                                },
                            ]}
                            view={'user'}
                        />
                        <SuggestedConnections />
                    </div>
                </div>
            </div>
        </>
    );
};

const ShareButton = ({ userId, username }: { userId: string; username: string }) => {
    const [showShareProfileModal, setShowShareProfileModal] = useState(false);
    userId;
    username;
    return (
        <div id="share-icon" className="">
            <div
                className="flex-row share centralize-y"
                onClick={() => setShowShareProfileModal(!showShareProfileModal)}
                style={{ zIndex: 0, marginLeft: '10px' }}
            >
                {showShareProfileModal ? (
                    <Circle bg="#f4f4f4" height={24} width={24} key={1} noMg style={{ marginLeft: '2px' }} img={CloseModalIcon} pd={5} />
                ) : (
                    <>
                        <Circle bg="black" height={5} width={5} key={1} noMg noBorder style={{ marginLeft: '2px' }} img={''} pd={1} />
                        <Circle bg="black" height={5} width={5} key={1} noMg noBorder style={{ marginLeft: '2px' }} img={''} pd={1} />
                        <Circle bg="black" height={5} width={5} key={1} noMg noBorder style={{ marginLeft: '2px' }} img={''} pd={1} />
                    </>
                )}
                {showShareProfileModal && (
                    <>
                        <div className="_dialog_container" style={{}}>
                            <div
                                className="dialog"
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 0,
                                    marginTop: '20px',
                                }}
                            >
                                <button className="flex-row dialog_btn centralize-y" key={2}>
                                    <SmallIcon src={ShareProfileVia} size={24} />
                                    <p>Send profile in a message </p>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const SearchedCreativeProfile = ({
    user,
    userId,
    username,
    profilePosts,
}: {
    username: string;
    user: UserProfile;
    userId: string;
    profilePosts: PostForSpecificProfile[];
}) => {
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userExperiences = user.experience;
    const userEducation = user.education;
    console.log({ userId, username });

    const view = 'user';

    const [getChatConversationId] = useGetChatConversationIdMutation();

    const handleSendMessageClick = async () => {
        try {
            const response = await getChatConversationId({ memberUid: user.id }).unwrap();
            const conversationId = Number(response.data.conversationId); // Convert conversationId to number
            console.log({ conversationId });
            // Navigate to the messages page with the conversationId
            dispatch(setConversationId(conversationId));
            navigate(`/messages`);
        } catch (error) {
            console.error('Failed to get conversation ID:', error);
        }
    };

    return (
        <div className="creative">
            <div className="flex-column centralize-x ">
                <div className="flex-row profile-main">
                    <ProfileBrief
                        userType="creative"
                        verificationStatus="unverified"
                        jobTitle={user.bio ?? ''}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        user={user as any}
                        profilePic={VendorProfilePic}
                        view={view}
                    />

                    <div className="flex-row edit centralize-x centralize-y">
                        <ConnectToProfileButton username={username} />
                        {/* <ShareButton username={username} userId={userId} /> */}
                    </div>
                </div>

                <div className="flex-row profile-nav">
                    <button
                        className="tab"
                        style={{
                            backgroundColor: page === 0 ? '#e9e9e9' : '',
                        }}
                        onClick={() => setPage(0)}
                    >
                        Profile Overview
                    </button>
                    <button
                        className="tab"
                        style={{
                            backgroundColor: page === 1 ? '#e9e9e9' : '',
                        }}
                        onClick={() => setPage(1)}
                    >
                        Activities
                    </button>
                    <button className="tab" onClick={() => dispatch(toggleCommingSoonModal({ show: true }))}>
                        Reviews
                    </button>
                    <button className="tab" onClick={() => dispatch(toggleCommingSoonModal({ show: true }))}>
                        My Events
                    </button>
                </div>

                <div className="flex-row pane _content centralize-x">
                    <div className="left">
                        <div className="post_area" style={{ position: 'relative', maxWidth: '100%' }}>
                            <div
                                className={`feed_main posts post_alt `}
                                style={{ position: 'relative' }}
                                // style={{ maxWidth: '90%', width: '90%' }}
                            >
                                {page == 1 && (
                                    <>
                                        {profilePosts.length === 0 && (
                                            <>
                                                <div
                                                    className="flex-row no_posts_found centralize-y centralize-x"
                                                    style={{ width: '100%', height: '100%', minHeight: '400px' }}
                                                >
                                                    <p className="" style={{ color: '#a1a1a1', fontSize: '20px', fontWeight: '600' }}>
                                                        Sorry no feed found
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {profilePosts.map((post, index) => (
                                            <Post
                                                key={index}
                                                post={post}
                                                // @ts-ignore
                                                comments={post.comments ?? ([] as IComment[])}
                                                // @ts-ignore
                                                actionRecord={post.actionRecord}
                                            />
                                        ))}
                                    </>
                                )}
                            </div>
                            <RepostDialog />
                            <ReportPostDialog />
                        </div>

                        {page === 0 && (
                            <>
                                <AboutMe about={user.about} />

                                <Experiences
                                    view={view}
                                    experiences={
                                        userExperiences
                                            ? userExperiences.map((experience) => ({
                                                  duration: `${experience.startDate} - ${experience.endDate}`,
                                                  jobType: experience.employmentType,
                                                  place: experience.company,
                                                  title: experience.role,
                                                  logo: Blackat,
                                              }))
                                            : undefined
                                    }
                                />
                                <Education
                                    schools={
                                        userEducation
                                            ? userEducation.map((education) => ({
                                                  icon: MilestoneMentor,
                                                  title: education.degree,
                                                  description: education.school,
                                                  date: `${education.startDate} - ${education.endDate}`,
                                              }))
                                            : undefined
                                    }
                                    view={view}
                                />
                            </>
                        )}
                    </div>

                    <div className="right" style={{ maxWidth: 'fit-content' }}>
                        <div className="quick-actions section">
                            <p className="section-header"> Quick Action </p>

                            <ProfileBox
                                onClick={handleSendMessageClick}
                                title="Send me a message"
                                // subtitle="Book 1:1 sessions from the
                                //             options based on your needs"
                            />

                            <Collaborate
                                onClick={() =>
                                    dispatch(
                                        toggleCommingSoonModal({
                                            show: true,
                                        }),
                                    )
                                }
                                title="Collaborate with me"
                                subtitle="Connect & share
                                                    ideas, make business
                                                    plans"
                            />
                            {/* <div className="flex-row bottom centralize-y">
                                <div className="_socials-sect creative-social-sect sect">
                                    <p className="_header">
                                        Connect to socials
                                    </p>
                                    <div className="flex-row _socials">
                                        <div
                                            className="flex-row _circle centralize-x"
                                            style={{
                                                marginRight: 10,
                                            }}
                                        >
                                            <img src={X} alt="" />
                                        </div>
                                        <div className="flex-row _circle centralize-x">
                                            <img src={Linkedin} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mgt-account">
                                    <p className="section-header">
                                        User performance rating
                                    </p>
                                    <div className="flex-row profile-summary centralize-y">
                                        <img src={Rating} alt="" />
                                        <div
                                            className="details"
                                            style={{
                                                marginLeft: 10,
                                            }}
                                        >
                                            <p
                                                className="full-name"
                                                style={{
                                                    fontWeight: 500,
                                                }}
                                            >
                                                95/
                                                <span
                                                    style={{
                                                        fontWeight: 100,
                                                    }}
                                                >
                                                    100%
                                                </span>
                                            </p>
                                            <p className="position">
                                                Excellent rating
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <SuggestedConnections />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SearchedProfile = () => {
    const { show: showSearchResultModal, searchText } = useSelector((state: RootState) => state.searchResult);
    const { id: userId, username } = useParams<{
        id: string;
        username: string;
    }>();
    const navigate = useNavigate();
    const { data: userProfileData, isError: userProfileDataIsError } = useGetProfileQueryQuery({ id: userId ?? '' });
    const [userProfile, setUserProfile] = useState<(UserProfile & UserInfoFromApi) | null>(null);
    const { data: userDetails, isError: userDataIsError, error } = useGetUserDetailQuery({ username: username ?? '' });
    const { show: showSettingsPage } = useSelector((state: RootState) => state.settings);
    const { show: showSupportPage } = useSelector((state: RootState) => state.support);
    const { data: getProfilePostData } = useViewProfilePostQuery(
        { profileId: userId ?? '' },
        {
            refetchOnMountOrArgChange: true,
        },
    );
    const [profilePosts, setProfilePosts] = useState([] as PostForSpecificProfile[]);

    useEffect(() => {
        if (getProfilePostData?.data?.posts) {
            const profilePostsData = getProfilePostData.data.posts.slice(0, 20).map((post) => {
                return {
                    author: {
                        profileId: post.profile.id,
                        firstName: post.profile.user.firstName,
                        lastName: post.profile.user.lastName,
                        username: post.profile.user.username,
                        displayImage: DisplayIconForProfile(post.profile.user.displayImage),
                        placeOfWork: post.profile.bio,
                        location: post.profile.location
                            ? ((post.profile.location as any)?.value as string) // in somecases the api might return location as an { value: string}
                            : post.profile.location,
                    },
                    location: post.location,
                    createdAt: post.updatedAt,
                    likedBy: [],
                    text: post.caption,
                    images: post.contents.filter((content) => content.contentType === 'image').map((content) => content.url),
                    id: post.id,
                    actionRecord: {
                        id: post.activities[0]?.id,
                        liked: post.activities[0]?.liked,
                        likeCount: post.activities.reduce((acc, curr) => acc + (curr.liked ? 1 : 0), 0),
                        bookmarked: post.activities[0]?.bookmarked,
                        reportReason: post.activities[0]?.reportReason,
                        updatedAt: post.activities[0]?.updatedAt,
                    },
                    activities: post.activities,
                    contents: post.contents,
                    originalPost: post.originalPost
                        ? {
                              author: {
                                  profileId: post.originalPost.profile.id,
                                  firstName: post.originalPost.profile.user.firstName,
                                  lastName: post.originalPost.profile.user.lastName,
                                  username: post.originalPost.profile.user.username,
                                  displayImage: DisplayIconForProfile(post.originalPost.profile.user.displayImage),
                                  placeOfWork: post.originalPost.profile.bio,
                                  location: post.originalPost.profile.location
                                      ? ((post.originalPost.profile.location as any)?.value as string) // in somecases the api might return location as an { value: string}
                                      : post.originalPost.profile.location,
                              },
                              location: post.originalPost.profile.location
                                  ? ((post.originalPost.profile.location as any)?.value as string)
                                  : post.originalPost.profile.location,
                              createdAt: post.activities[0]?.updatedAt,
                              likedBy: [],
                              text: post.originalPost.caption,
                              images: post.originalPost.contents.filter((content) => content.contentType === 'image').map((img) => img.url),
                              id: post.originalPost.id,
                              activities: post.originalPost.activities,
                              contents: post.originalPost.contents,
                          }
                        : undefined,
                };
            });
            setProfilePosts(profilePostsData);
        }
    }, [getProfilePostData?.data?.posts]);

    useEffect(() => {
        if (userDataIsError) {
            console.log({ error });
            toast.error('Oops! No matching profile found');
            // navigate('/profile')
        }

        if (userProfileData?.data && userDetails?.data) {
            setUserProfile({
                ...userProfileData.data,
                ...userDetails.data,
                profile: {
                    ...userDetails.data.profile,
                    created: true,
                    location: {
                        value: location,
                    },
                    address: location,
                    bio: userDetails.data.profile?.bio ?? '',
                    phone: userDetails.data.profile?.phone ?? '',
                    about: userDetails.data.profile?.about ?? '',
                },
                email: '',
                settings: {
                    suggestedUpgrade: false,
                },
                suggestedUpgrade: false,
                gender: '',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        }
    }, [userProfileDataIsError, error, userDataIsError, userProfileData?.data, userDetails?.data, userDetails, navigate]);

    const profiles = {
        executive: <SearchedExecutiveProfile user={userProfile!} profilePosts={profilePosts} username={username!} userId={userId!} />,
        creative: <SearchedCreativeProfile user={userProfile!} profilePosts={profilePosts} username={username!} userId={userId!} />,
        vendor: <SearchedVendorProfile user={userProfile!} profilePosts={profilePosts} username={username!} userId={userId!} />,
    };

    return (
        <>
            <div className="profile profile-container">
                <div className="container mx-auto">
                    {/* {loggedUser && (
                        // <Header
                        //     user={{
                        //         ...loggedUser,
                        //         type: loggedUser.role.name,
                        //         displayImage: DisplayIconForProfile(loggedUser.displayImage),
                        //     }}
                        // />
                    )} */}
                    <div
                        className="flex-row centralize-x"
                        style={{
                            position: 'relative',
                            padding: '10px',
                        }}
                    >
                        {showSettingsPage ? (
                            <SettingsPage />
                        ) : showSupportPage ? (
                            <SupportPage />
                        ) : userProfile ? (
                            <div className="content centralize-x">{profiles[userProfile.role.name]}</div>
                        ) : (
                            <>
                                <div
                                    className="flex-row max-width centralize"
                                    style={{
                                        width: '100%',
                                        height: '100vh',
                                        padding: 'auto',
                                        position: 'relative',
                                    }}
                                >
                                    <Spinner
                                        width="100px"
                                        height="100px"
                                        key={1}
                                        style={{
                                            maxHeight: 'fit-content',
                                            margin: 'auto 0',
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        {showSearchResultModal && <SearchModal inputValue={searchText} />}

                        {/* <SettingsPage /> */}
                        {/* <ReferFriends /> */}
                        {/* <CommingSoon /> */}
                    </div>
                </div>
            </div>
        </>
    );
};
