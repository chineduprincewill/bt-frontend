import './style.scss';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { toggleCommingSoonModal } from '../../state/slices/commingSoon';
// import { useUpdateConnectionMutation } from '../../api/connectionApi';
import { toast } from 'react-toastify';

import { UserInfoFromApi } from '../../api/authApi';
import { useViewUnreadMessagesNotificationCountQuery } from '../../api/notificationApi'; // Adjust import based on your actual file structure
import { PostResponseFromApi, useCreatePostMutation, useGetPostContentUploadLinkMutation, useViewPostQuery } from '../../api/postApi';
import { useUploadImageToCloudMutation } from '../../api/profileApi';
import FeedConnection from '../../assets/feed_connection.svg';
import FeedEvent from '../../assets/feed_event.svg';
import FeedsFeeds from '../../assets/feed_feed.svg';
// import FeedMoreCommunity from '../../assets/feed_more_community.svg'
import FeedJob from '../../assets/feed_job_dark.svg';
import FeedMore from '../../assets/feed_more.svg';
// import FeedPostDropDown from '../../assets/feed_post_dropdown.svg';
// import FeedWide from '../../assets/feed_wide.svg';
import FeedMoreMentorship from '../../assets/feed_more_mentorship.svg';
import FeedMsg from '../../assets/feed_msg.svg';
import FeedVillage from '../../assets/feeds_village_dark.svg';
import { Circle } from '../../components/Circle';
// import FeedPostImage from '../../assets/feed_post_image.svg';
import Spinner from '../../components/Spinner';
import { setUnreadNotificationsCount } from '../../state/slices/notificationCount';
import { setPostsData } from '../../state/slices/postSlice';
import { selectSidebarMenu } from '../../state/slices/sideBarSlice';
import { RootState } from '../../state/store';
import { DisplayIconForProfile } from '../profile';
import { CommingSoon } from '../profile/CommingSoon';
import { SuggestedConnections } from '../profile/sections/SuggestedConnections';
import { FeedsSection } from './components/FeedSection';
import { ConnnectionView } from './ConnnectionView';
import { Event, EventsView } from './Event';
import { formatDate } from './formatDate';
import { ImageCarousel } from './ImageCarousel';
import { MessageView } from './MessageView';
import { IPost, Post, ReportPostDialog, RepostDialog } from './Post';

export const TabIcon = ({ src }: { src: string }) => {
    return (
        <Circle
            img={src}
            pd={0}
            height={20}
            width={20}
            noMg
            bg="transparent"
            borderColor="transparent"
            noBorder
            style={{
                marginRight: 12,
            }}
        />
    );
};
// export const LeftFeedColumn = ({
//     user,
//     setPaneToShow,
//     showCommingSoonModal,
// }: {
//     showCommingSoonModal: () => void;
//     user: UserInfoFromApi;
//     setPaneToShow: (paneToShow: Pane) => void;
// }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showMoreDialog, setShowMoreDialog] = useState(false);
//     const [showMoreDialogForce, setShowMoreDialogForce] = useState(false);
//     const { data: unreadCountsData, isLoading } = useViewUnreadMessagesNotificationCountQuery(null);

//     useEffect(() => {
//         if (!isLoading && unreadCountsData && unreadCountsData.status === 'success') {
//             // Assuming you want to track private conversations count
//             dispatch(setUnreadNotificationsCount(unreadCountsData.data.private));
//         }
//     }, [isLoading, unreadCountsData, dispatch]);

//     const unreadCount = useSelector((state: RootState) => state.notificationCount.unreadCount);

//     return (
//         <div className="left_feed_column pane">
//             <div className="left_cont">
//                 <div className="profile_section flex-column" onClick={() => navigate('/profile')}>
//                     <Circle
//                         img={DisplayIconForProfile(user.displayImage ?? '')}
//                         pd={1}
//                         height={35}
//                         width={35}
//                         noMg
//                         bg="transparent"
//                         borderColor="transparent"
//                         noBorder
//                     />

//                     <div className="profile_info">
//                         <p className="name rm_small_wdt">{user.firstName + ' ' + user.lastName}</p>
//                         <p className="view_profile" style={{ cursor: 'pointer' }}>
//                             View Profile
//                         </p>
//                     </div>
//                 </div>
//                 <div className="left_profile_tabs flex-column">
//                     <button
//                         className="profile_tab"
//                         onClick={() => {
//                             // setPaneToShow('feeds');
//                             dispatch(selectSidebarMenu({ paneToShow: 'feeds' }));
//                         }}
//                     >
//                         <TabIcon src={FeedsFeeds} />
//                         <p className="text rm_small_wdt">Feeds</p>
//                     </button>
//                     <button
//                         className="profile_tab"
//                         onClick={() => {
//                             setPaneToShow('messages');
//                             dispatch(selectSidebarMenu({ paneToShow: 'messages' }));
//                         }}
//                     >
//                         <TabIcon src={FeedMsg} />
//                         <p className="text rm_small_wdt">Messages</p>
//                         {unreadCount > 0 && (
//                             <div id="msg_count" className="rm_small_wdt">
//                                 {unreadCount > 9 ? '9+' : unreadCount}
//                             </div>
//                         )}
//                     </button>
//                     <button
//                         className="profile_tab"
//                         onClick={() => {
//                             setPaneToShow('events');
//                             dispatch(selectSidebarMenu({ paneToShow: 'events' }));
//                         }}
//                     >
//                         <TabIcon src={FeedEvent} />
//                         <p className="text rm_small_wdt">Events</p>
//                         {/* <div id="msg_count" className="rm_small_wdt" style={{ background: 'black' }}>
//                             New
//                         </div> */}
//                     </button>
//                     <button
//                         className="profile_tab"
//                         onClick={() => {
//                             setPaneToShow('connections');
//                             dispatch(
//                                 selectSidebarMenu({
//                                     paneToShow: 'connections',
//                                 }),
//                             );
//                         }}
//                     >
//                         <TabIcon src={FeedConnection} />
//                         <p className="text rm_small_wdt">My connections</p>
//                     </button>

//                     <button
//                         className="profile_tab more_tab"
//                         onClick={() => {
//                             setShowMoreDialog(!showMoreDialog);
//                         }}
//                         style={{ position: 'relative' }}
//                         onMouseLeave={() => setShowMoreDialog(false)}
//                     >
//                         <TabIcon src={FeedMore} />
//                         <p className="text rm_small_wdt">More</p>

//                         {(showMoreDialogForce || showMoreDialog) && (
//                             <div className="more dialog flex-column">
//                                 <div
//                                     className="dialog_btn flex-row centralize-y"
//                                     onClick={() => {
//                                         setShowMoreDialogForce(false);
//                                         setShowMoreDialog(false);
//                                         showCommingSoonModal();
//                                     }}
//                                 >
//                                     <div className="title flex-row centralize-y" style={{ justifyContent: 'left' }}>
//                                         <SmallIcon src={FeedMoreMentorship} />
//                                         <p className="title_text">Mentorship</p>
//                                     </div>
//                                     <p>Take mentorship, book sessions</p>
//                                 </div>
//                                 <div
//                                     className="dialog_btn flex-row centralize-y"
//                                     onClick={() => {
//                                         setShowMoreDialogForce(false);
//                                         setShowMoreDialog(false);
//                                         showCommingSoonModal();
//                                     }}
//                                 >
//                                     <div className="title flex-row centralize-y" style={{ justifyContent: 'left' }}>
//                                         <SmallIcon src={FeedVillage} />
//                                         <p className="title_text">My Village</p>
//                                     </div>
//                                     <p>Join community of likeminds, connect and create magic</p>
//                                 </div>
//                                 <div
//                                     className="dialog_btn flex-row centralize-y"
//                                     onClick={() => {
//                                         console.log('toggling');
//                                         setShowMoreDialog(false);
//                                         setShowMoreDialog(false);
//                                         showCommingSoonModal();
//                                     }}
//                                 >
//                                     <div className="title flex-row centralize-y" style={{ justifyContent: 'left' }}>
//                                         <SmallIcon src={FeedJob} />
//                                         <p className="title_text">Jobs</p>
//                                     </div>
//                                     <p>Manage your job activities</p>
//                                 </div>
//                             </div>
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

export const FeedContainer = ({ children, className, style }: { style?: Record<string, any>; children: ReactNode; className?: string }) => {
    return (
        <div className={className + ' feed_container bg-white'} id="feed_container" style={style}>
            {children}
        </div>
    );
};

export const SmallIcon = ({ src, size }: { size?: number; src: string }) => {
    return <Circle img={src} height={size ?? 24} width={size ?? 24} pd={0} noMg bg="transparent" borderColor="transparent" noBorder />;
};

type Pane = 'feeds' | 'messages' | 'events' | 'connections' | 'more';
export const Feeds = ({ postId }: { postId?: string }) => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const { paneToShow: _paneToShow } = useSelector((state: RootState) => state.sideBar);
    // const [paneToShow, setPaneToShow] = useState<Pane>(_paneToShow ?? 'feeds');
    const [showComingSoonModal, setShowComingSoonModal] = useState(false);

    if (!loggedUser) navigate(-1);

    // useEffect(() => {
    //     setPaneToShow(_paneToShow);
    // }, [_paneToShow]);

    // const pane = {
    //     feeds: (
    //         <FeedsSection
    //         // setPaneToShow={(paneToShow: 'feeds' | 'messages' | 'events' | 'connections' | 'more') => setPaneToShow(paneToShow)}
    //         />
    //     ),
    //     messages: <MessageView />,
    //     events: <EventsView />,
    //     connections: <ConnnectionView />,
    //     more: 'More',
    // }[paneToShow];

    return (
        <>
            <div className="main">
                {loggedUser && (
                    <div className="__feeds flex-row centralize-x">
                        {/* <LeftFeedColumn showCommingSoonModal={() => setShowComingSoonModal(true)} user={loggedUser} setPaneToShow={setPaneToShow} /> */}
                        <FeedContainer>
                            <FeedsSection />
                        </FeedContainer>
                    </div>
                )}
                <CommingSoon
                    externalControl={{
                        show: showComingSoonModal,
                        close: () => setShowComingSoonModal(false),
                    }}
                />
            </div>
        </>
    );
};
