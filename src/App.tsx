import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource-variable/plus-jakarta-sans';
import 'react-dropzone-uploader/dist/styles.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import NavigationContainer from './components/NavigationContainer';
import NavigationContainerWithSidebar from './components/NavigationContainerWithSidebar';
import NotificationsNew from './components/NotificationNew';
import Bugs from './pages/bugs';
import Connections from './pages/connections';
import { CreateAccount } from './pages/createAccount';
import { EnterName } from './pages/enterName';
import EventDetail from './pages/eventDetail';
import Events from './pages/events';
import { FeedsSection } from './pages/feeds/components/FeedSection';
import { FeedRouteContainer } from './pages/feeds/FeedRouteContainer';
import { Feeds } from './pages/feeds/Feeds';
import { MessageView } from './pages/feeds/MessageView';
import { ForgotPassword } from './pages/forgotPassword';
import { LandingPage } from './pages/landingPage';
import MasterClass from './pages/masterClass';
import MasterClassView from './pages/masterClass/subPages/MasterClassView';
import { PersonalInfo } from './pages/personalInfo';
import { Profile, SearchedProfile } from './pages/profile';
import { CommingSoon } from './pages/profile/CommingSoon';
import { Questionnaire } from './pages/questionaire';
import Sample from './pages/sample';
import { SelectUserType } from './pages/selectUserType';
import { SetPassword } from './pages/setPassword';
import AccountInformation from './pages/settings-new/AccountSettings/AccountInformation';
import ChangePassword from './pages/settings-new/AccountSettings/ChangePassword';
import CloseAccount from './pages/settings-new/AccountSettings/CloseAccount';
import EditProfile from './pages/settings-new/AccountSettings/EditProfile';
import SettingsPageLayout from './pages/settings-new/layout/SettingsPageLayout';
import SettingsAccount from './pages/settings-new/SettingsAccount';
import SettingsHelpSupport from './pages/settings-new/SettingsHelpSupport';
import ContactSupport from './pages/settings-new/SettingsHelpSupport/ContactSupport';
import Faqs from './pages/settings-new/SettingsHelpSupport/Faqs';
import SettingsNotifications from './pages/settings-new/SettingsNotifications';
import SettingsPrivacy from './pages/settings-new/SettingsPrivacy';
import SettingsSecurity from './pages/settings-new/SettingsSecurity';
import BlockedPeople from './pages/settings-new/SettingsSecurity/BlockedPeople';
import { SettingsPageReal } from './pages/settings-real';
import { SetUserName } from './pages/setUserName';
import { SupportPage } from './pages/support';
import { Survey } from './pages/survey';
import { Terms } from './pages/Terms';
import UserInfo from './pages/userInfo';
import { VerifyAccount } from './pages/verifyAccount';
import { WelcomeBack } from './pages/welcomeBack';
import ScrollToTop from './ScrollToTop';
import MasterClassUpload from './pages/masterClass/subPages/MasterClassUpload';
import MentorshipBooking from './pages/Mentorship/subPages/MentorshipBooking';
import MentorshipBookingDetails from './pages/Mentorship/subPages/MentorshipBookingDetails';
import Mentorship from './pages/Mentorship';
import MentorshipTopics from './pages/Mentorship/subPages/MentorshipTopics';
import Jobs from './pages/jobs';
import ViewJob from '@pages/jobs/subPages/ViewJob';
import SettingsMobile from '@pages/settings-new/SettingsMobile';
import MyVillage from '@pages/my-village/MyVillage';
import Village from '@pages/my-village/Village';
import Community from '@pages/my-village/Community';
import './pages/my-village/Villages/villagesstyle.scss';
import TestCommunity from '@pages/my-village/Community/TestCommunity';

function App() {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop />
                <ToastContainer position="top-center" limit={2} />

                <CommingSoon />

                <NotificationsNew />

                <Routes>
                    <Route path="/sample" element={<Sample />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/:page" element={<LandingPage />} />
                    <Route path="/login" element={<WelcomeBack />} />
                    <Route path="/create-acc" element={<CreateAccount />} />
                    <Route path="/name" element={<EnterName />} />
                    <Route path="/username" element={<SetUserName />} />
                    <Route path="/verify" element={<VerifyAccount />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ForgotPassword />} />
                    <Route path="/password" element={<SetPassword />} />
                    <Route path="/personal-info" element={<PersonalInfo />} />
                    <Route path="/user-type" element={<SelectUserType />} />
                    <Route path="/user-info/:userType" element={<UserInfo />} />
                    <Route path="/questionaire/:userType" element={<Questionnaire />} />
                    <Route path="/survey" element={<Survey />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/masterclass-upload/:id" element={<MasterClassUpload />} />

                    {/* Routes with Sidebar and Header */}

                    <Route path="/" element={<NavigationContainer />}>
                        <Route path="/settings" element={<SettingsPageReal />} />
                        <Route path="/report-bug" element={<Bugs />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/profile" element={<AuthenticatedRoute component={<Profile />} />} />
                        <Route path="/userprofile/:id/:username" element={<AuthenticatedRoute component={<SearchedProfile />} />} />

                        <Route path="/settings-mobile" element={<SettingsMobile />} />
                        {/* SETTINGS */}
                        <Route path="/settings-new" element={<SettingsPageLayout />}>
                            <Route index element={<SettingsAccount />} />
                            <Route path="/settings-new/my-account" element={<SettingsAccount />} />
                            <Route path="/settings-new/edit-profile" element={<EditProfile />} />
                            <Route path="/settings-new/notifications" element={<SettingsNotifications />} />
                            <Route path="/settings-new/account-information" element={<AccountInformation />} />
                            <Route path="/settings-new/change-password" element={<ChangePassword />} />
                            <Route path="/settings-new/close-account" element={<CloseAccount />} />
                            <Route path="/settings-new/blocked-users" element={<BlockedPeople />} />
                            <Route path="/settings-new/security" element={<SettingsSecurity />} />
                            <Route path="/settings-new/privacy" element={<SettingsPrivacy />} />
                            <Route path="/settings-new/help" element={<SettingsHelpSupport />} />
                            <Route path="/settings-new/contact-support" element={<ContactSupport />} />
                            <Route path="/settings-new/help/faqs" element={<Faqs />} />
                        </Route>

                        <Route path="/" element={<NavigationContainerWithSidebar />}>
                            {/* FEEDS */}
                            <Route path="/feeds" element={<AuthenticatedRoute component={<FeedRouteContainer />} />}>
                                <Route index element={<AuthenticatedRoute component={<Feeds />} />} />
                                <Route path="/feeds/:postId" element={<AuthenticatedRoute component={<FeedsSection />} />} />
                            </Route>

                            {/* JOBS */}
                            <Route path="/jobs" element={<Jobs />} />
                            <Route path="/jobs/:id" element={<ViewJob />} />

                            {/* MENTORSHIP */}
                            <Route path="/mentorship" element={<MentorshipTopics />} />
                            <Route path="/mentorship/booking" element={<MentorshipBooking />} />
                            <Route path="/mentorship/booking/:id" element={<MentorshipBookingDetails />} />

                            {/* MASTERCLASS */}
                            <Route path="/masterclass" element={<MasterClass />} />
                            <Route path="/masterclass/:id" element={<MasterClassView />} />

                            {/* MY VILLAGE */}
                            <Route path="/village" element={<MyVillage />} />
                            <Route path="/village/:id" element={<Village />} />

                            {/* COMMUNITY */}
                            <Route path="/community/:id" element={<Community />} />
                            {/* <Route path="/community/:id" element={<CommunityView />} /> */}

                            {/* MESSAGES */}
                            <Route path="/messages" element={<AuthenticatedRoute component={<MessageView />} />} />

                            {/* CONNECTIONS */}
                            <Route path="/connections" element={<AuthenticatedRoute component={<Connections />} />} />

                            {/* EVENTS */}
                            <Route path="/events" element={<Events />} />
                            <Route path="/events/:id" element={<EventDetail />} />

                            <Route path="/test-community" element={<TestCommunity />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
