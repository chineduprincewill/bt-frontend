/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from '../../assets/logo.png';
// import './style.scss';
// import BlackatLogo from '../../assets/blackat.png'
import { useNavigate, useParams } from 'react-router-dom';
import Map from '../../assets/map.png';
import LongRight from '../../assets/long-right-arrow.png';
import BlackatLogoLight from '../../assets/blackat-light.png';
import BrownMoon from '../../assets/brown-moon.png';
import BlueMoon from '../../assets/blue-moon.png';
import DashMoreWhiteIcon from '../../assets/dash0more-white.svg';
import DashMoreDarkIcon from '../../assets/dashmore-dark.svg';
import MainCloseWhite from '../../assets/main-close.svg';
import MainCloseDark from '../../assets/main-close-dark.svg';
import { useCallback, useEffect, useState } from 'react';
import { Circle } from '../../components/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { toggleHeaderSidebarModal } from '../../state/slices/header';
import EmailUs from '../../assets/email-us.svg';
// import InterCom from '../../assets/intercom.svg'
import { useContactSupportMutation } from '../../api/authApi';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

type BrightnessMode = 'light' | 'dark';

const HeaderCenter = ({
    mode,
    setMode,
    pageToShow,
}: {
    pageToShow: 'home' | 'about';
    mode: BrightnessMode;
    setMode: (mode: BrightnessMode) => void;
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { show, page } = useSelector((state: RootState) => state.headerSidebar);
    show;
    page;
    return (
        <div className="header flex-row centralize-x">
            <div className="logo-container">
                <img alt="Union" src={mode === 'dark' ? BlackatLogoLight : Logo} />
            </div>
            <div className="right-align flex-row centralize-y">
                <div
                    className="wide-toggle flex-row centralize-y"
                    style={{
                        maxWidth: 'fit-content',
                        marginRight: 20,
                        justifyContent: 'flex-end',
                    }}
                >
                    <div className="navs _pane-sect">
                        <div
                            className="_nav"
                            style={{
                                color: mode === 'dark' ? 'white' : '',
                                cursor: 'pointer',
                            }}
                            onClick={() => (pageToShow === 'home' ? navigate('/about') : navigate('/'))}
                        >
                            {pageToShow === 'home' ? 'About Us' : 'Home'}
                        </div>
                    </div>
                    <button
                        className="mode-toggle flex-row centralize-y centralize-x"
                        onClick={() => {
                            if (mode === 'dark') {
                                setMode('light');
                            } else {
                                setMode('dark');
                            }
                        }}
                        style={{
                            color: mode === 'light' ? 'black' : 'white',
                            backgroundColor: mode === 'light' ? '#fff2d1' : '#171717',
                        }}
                    >
                        <Circle
                            width={20}
                            height={20}
                            pd={0}
                            img={mode === 'light' ? BrownMoon : BlueMoon}
                            bg="transparent"
                            noMg
                            noBorder
                            style={{ marginRight: 10 }}
                        />
                        {mode === 'dark' ? <p style={{ color: 'white' }}>Turn on the Light</p> : <p style={{ color: 'black' }}>Turn off the Light</p>}
                    </button>
                </div>
                <button
                    className={`header-more`}
                    onClick={() => {
                        dispatch(
                            toggleHeaderSidebarModal({
                                page: pageToShow ?? page,
                                show: true,
                            }),
                        );
                    }}
                >
                    <img src={mode === 'dark' ? DashMoreWhiteIcon : DashMoreDarkIcon} alt="" />
                </button>
            </div>
        </div>
    );
};

const Landing = ({ mode, setMode }: { mode: BrightnessMode; setMode: (mode: BrightnessMode) => void }) => {
    const navigate = useNavigate();

    return (
        <div
            className="landing"
            style={{
                backgroundColor: mode === 'light' ? '#fcfcfc' : '#000',
            }}
        >
            <div className="container">
                <div className="max-width ceontent flex-column centralize-x centralize-y">
                    <HeaderCenter mode={mode} setMode={setMode} pageToShow="home" />
                </div>
                <div className="max-width content flex-column centralize-x centralize-y">
                    <div className="map max-width flex-row centralize-x centralize-y">
                        <img src={Map} alt="" />
                    </div>
                    <div className="main max-width flex-row centralize-x">
                        <div className="top flex-column">
                            <div className="desc flex-row centralize-y">
                                <div className="_we-are">
                                    <div
                                        className={`rot flex-row ${mode === 'dark' ? 'dark' : 'light'}`}
                                        style={{
                                            borderColor: mode === 'dark' ? '#f5f5f5' : '#00000',
                                            color: mode === 'dark' ? '#f5f5f5' : '#00000',
                                        }}
                                    >
                                        WE ARE
                                    </div>
                                </div>
                                <div className="text-desc">
                                    <h3
                                        style={{
                                            color: mode === 'dark' ? 'white' : 'black',
                                        }}
                                    >
                                        UNLIMITED
                                    </h3>
                                    <h3
                                        style={{
                                            color: mode === 'dark' ? 'white' : 'black',
                                        }}
                                    >
                                        POSSIBILITIES
                                    </h3>
                                    <div className="flex-row centralize-y">
                                        <h3
                                            style={{
                                                color: mode === 'dark' ? 'white' : 'black',
                                            }}
                                        >
                                            <span className="black">BLACK</span>
                                            {' EVERYWHERE'}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dive-area">
                            <p className="dive">
                                Are you ready to expand your professional universe? Dive into{' '}
                                <span
                                    style={{
                                        color: mode === 'dark' ? '#898989' : '',
                                    }}
                                >
                                    BlackAt
                                </span>
                                , the dynamic platform that bridges the gap between diverse business minds.
                            </p>

                            <div className="continue">
                                <button className="login-btn flex-row centralize-x centralize-y" onClick={() => navigate('/login')}>
                                    <p>Log in</p>
                                    <img src={LongRight} alt="" />
                                </button>
                                <button
                                    className="started-btn"
                                    onClick={() => navigate('/create-acc')}
                                    style={{
                                        color: mode === 'dark' ? 'white' : '',
                                        borderColor: mode === 'dark' ? 'white' : '',
                                    }}
                                >
                                    Create Account
                                </button>
                                <p
                                    className="started_text"
                                    onClick={() => navigate('/create-acc')}
                                    style={{
                                        color: mode === 'dark' ? 'white' : '',
                                        borderColor: mode === 'dark' ? 'white' : '',
                                        display: 'none',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Create Account
                                </p>
                            </div>
                        </div>
                        <Sidebar mode={mode} setMode={setMode} pageInitiatedFrom="home" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const SubAbout = ({ mode }: { mode: BrightnessMode }) => {
    return (
        <>
            <div className="__section">
                <h3 className="darkdo-heading red-to-white">Our Mission</h3>
                <p className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>
                    Welcome to <span className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>BlackAt</span> Platform, where our mission is to
                    revolutionize the way black executives and agencies connect, grow, and succeed in today's dynamic business world.
                </p>
            </div>
            <div className="__section">
                <h3 className="darkdo-heading red-to-white">Our Vision</h3>
                <p className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>
                    At <span className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>BlackAt</span> we believe in unlocking the potential of
                    every black executive and vendor. We are dedicated to creating a vibrant ecosystem where C-suite executives, who are at the heart
                    of our community, can thrive beyond traditional roles. Our platform is not just about business transactions; it's about fostering
                    relationships, sharing knowledge, and achieving personal growth.
                </p>
            </div>
            <div className="__section">
                <h3 className={`darkdo-heading black-to-white ${mode === 'dark' ? '_white-text' : '_dark-text'}`}>Join us in redefining access</h3>
                <p className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>
                    We've long talked about access and opportunity. Now, we're making it a reality.
                    <span className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>BlackAt</span> Platform is not just a platform; it's a
                    movement. Join us in creating a world where every black executive and agency can reach unparalleled heights of success.Together,
                    we grow, succeed, and lead. Welcome to BlackAt Platform – where opportunities are endless, and growth is a constant journey.
                </p>
            </div>
        </>
    );
};

const UserType = ({ mode }: { mode: BrightnessMode }) => {
    return (
        <>
            <div className="__section">
                <h3 className="red-to-white">Executives</h3>
                <p className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>
                    BlackAt is uniquely tailored for executives who are SVPs, CMOs, CEOs, but are pivotal to their organizations. We provide a
                    structured pathway for personal and professional development, including the assignment of personal assistants, masterclasses led
                    by experienced leaders, and opportunities for global mentorship. Our tiered system recognizes and nurtures talent at local,
                    regional, and global levels.
                </p>
            </div>
            <div className="__section">
                <h3 className="red-to-white">Vendors</h3>
                <p className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>
                    Vendors have the unique opportunity to showcase their capabilities and attract new business. By creating a business page on
                    BlackAt, vendors can interact with top executives, engage with brands, and leverage these relationships for mutual success.
                </p>
            </div>
            <div className="__section">
                <h3 className={`black-to-white ${mode === 'dark' ? '_white-text' : '_dark-text'}`}>Creatives</h3>
                <p className={`${mode === 'dark' ? '_white-text' : '_dark-text'}`}>
                    Our platform serves as a launchpad for creatives seeking growth. Whether you're an established professional or an emerging talent,
                    BlackAt is your stage to connect with like-minded individuals and access exclusive events and opportunities.
                </p>
            </div>
        </>
    );
};

const Contact = ({ mode }: { mode: BrightnessMode }) => {
    const { messageType } = useSelector((state: RootState) => state.contactSupport);
    const [formIsValid, setFormIsValid] = useState(false);
    const { user } = useSelector((state: RootState) => state.createAccount);
    const [form, updateForm] = useState({
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        message: '',
        subject: '',
    });
    const navigator = useNavigate();
    const validateForm = useCallback((formData: typeof form) => {
        const { name, email, message, subject } = formData;
        // All fields should be greater than 3 characters
        return name.length > 3 && email.length > 3 && message.length > 3 && subject.length > 3;
    }, []);

    const [submitForm, { isLoading }] = useContactSupportMutation();

    const updateFormHandler = (key: string, value: string) => {
        updateForm({ ...form, [key]: value });
    };

    useEffect(() => {
        setFormIsValid(validateForm(form));
    }, [form, validateForm]);

    return (
        <>
            <div className={`flex-row contact-us ${mode}`}>
                <div className="left contact_main_section flex-column centralize-x">
                    <div className="email-us contact_section">
                        <div className="header flex-row">
                            <img src={EmailUs} alt="" />
                            <h3
                                style={{
                                    color: mode === 'dark' ? 'white' : '',
                                }}
                                className="__section-header"
                            >
                                Email Us
                            </h3>
                        </div>
                        <a style={{ color: mode === 'dark' ? 'white' : '' }} className="hello" href="mailto:hello@blkat.io">
                            hello@blkat.io
                        </a>
                    </div>
                    {/* <div className="chat-us contact_section">
                        <div className="header flex-row">
                            <img src={ChatUs} alt="" />
                            <h3 style={{ color: mode === 'dark' ? 'white' : '' }} className='__section-header'>Chat Us</h3>
                        </div>
                        <button className="intercom flex-row centralize-y" onClick={() => {
                            console.log('sdfasdf')
                            if (user && window.Intercom) {
                                console.log('Main')
                                generateHmacSHA256(user.toString(), import.meta.env.VITE_INTERCOM_SECRET_KEY).then(
                                    (item) => {
                                        window.Intercom("boot", { email: user.email, user_hash: item, });
                                    }
                                );
                            }
                        }}>
                            <div className="details">
                                <img src={Logo} alt="" style={{ width: '50px' }} />
                            </div>
                            <img src={RightIcon} alt="" />
                        </button>
                    </div> */}
                </div>

                <div className="right contact_main_section flex-column">
                    <div className="contact_section">
                        <div className="header">
                            <h3
                                style={{
                                    color: mode === 'dark' ? 'white' : '',
                                }}
                                className="__section-header"
                            >
                                {messageType === 'bug' ? 'Report a bug' : 'Send us a message'}
                            </h3>
                        </div>
                        <div className="send_msg_form">
                            <div className="form">
                                <div className="form_input">
                                    <label
                                        style={{
                                            color: mode === 'dark' ? 'white' : '',
                                        }}
                                        htmlFor="name"
                                    >
                                        Your name
                                    </label>
                                    <input type="text" value={form.name} onChange={(e) => updateFormHandler('name', e.target.value)} />
                                </div>
                                <div className="form_input">
                                    <label
                                        style={{
                                            color: mode === 'dark' ? 'white' : '',
                                        }}
                                        htmlFor="name"
                                    >
                                        Subject
                                    </label>
                                    <input type="text" value={form.subject} onChange={(e) => updateFormHandler('subject', e.target.value)} />
                                </div>
                                <div className="form_input">
                                    <label
                                        style={{
                                            color: mode === 'dark' ? 'white' : '',
                                        }}
                                        htmlFor="name"
                                    >
                                        Your email
                                    </label>
                                    <input type="text" value={form.email} onChange={(e) => updateFormHandler('email', e.target.value)} />
                                </div>
                                <div className="form_input">
                                    <label
                                        style={{
                                            color: mode === 'dark' ? 'white' : '',
                                        }}
                                        htmlFor="name"
                                    >
                                        Your message
                                    </label>
                                    <textarea
                                        style={{ resize: 'none' }}
                                        value={form.message}
                                        onChange={(e) => updateFormHandler('message', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="button-area flex-row centralize-y">
                                <p
                                    style={{
                                        color: mode === 'dark' ? 'white' : '',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                        fontSize: '14px',
                                    }}
                                    onClick={() => navigator('/profile')}
                                >
                                    {' '}
                                    {'< Back to profile'}
                                </p>
                                <button
                                    className="submit"
                                    style={{
                                        minWidth: '150px',
                                        color: mode === 'dark' ? 'white' : '',
                                        borderColor: mode === 'dark' ? '1px solid white' : '1px solid black',
                                    }}
                                    disabled={!formIsValid}
                                    onClick={() => {
                                        if (formIsValid) {
                                            submitForm({
                                                ...form,
                                                type: messageType,
                                            })
                                                .unwrap()
                                                .then((res) => {
                                                    toast.success(res.message);
                                                    updateForm({
                                                        ...form,
                                                        message: '',
                                                        subject: '',
                                                    });
                                                })
                                                .catch((err) => toast.error(err.data?.message ?? err.message));
                                        }
                                    }}
                                >
                                    {' '}
                                    {isLoading ? <Spinner width="10px" height="10px" /> : 'Send message'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const About = ({ mode, setMode }: { mode: BrightnessMode; setMode: (mode: BrightnessMode) => void }) => {
    const { paneToShow } = useSelector((state: RootState) => state.about);
    const [selectedTab, setSelectedTab] = useState<'about' | 'user-type' | 'contact'>(paneToShow);

    const tab = {
        about: <SubAbout mode={mode} />,
        'user-type': <UserType mode={mode} />,
        contact: <Contact mode={mode} />,
    };

    return (
        <div
            className="landing __about"
            style={{
                backgroundColor: mode === 'light' ? '#fcfcfc' : '#000',
            }}
        >
            <div className="container">
                <div className="max-width content flex-column centralize-x centralize-y">
                    <HeaderCenter mode={mode} setMode={setMode} pageToShow="about" />
                    <div className="navs flex-row centralize-y">
                        <button
                            className={`nav about-landing-tab ${selectedTab === 'about' ? 'selected-nav' : ''} ${mode === 'dark' ? 'dark' : 'light'}`}
                            onClick={() => setSelectedTab('about')}
                            style={{
                                color: mode === 'light' ? 'black' : 'white',
                            }}
                        >
                            About Blackat
                        </button>
                        <button
                            onClick={() => setSelectedTab('user-type')}
                            className={`nav about-landing-tab ${selectedTab === 'user-type' ? 'selected-nav' : ''} ${
                                mode === 'dark' ? 'dark' : 'light'
                            }`}
                            style={{
                                color: mode === 'light' ? 'black' : 'white',
                            }}
                        >
                            About Our User Types
                        </button>
                        <button
                            onClick={() => setSelectedTab('contact')}
                            className={`nav about-landing-tab ${selectedTab === 'contact' ? 'selected-nav' : ''} ${
                                mode === 'dark' ? 'dark' : 'light'
                            }`}
                            style={{
                                color: mode === 'light' ? 'black' : 'white',
                            }}
                        >
                            Contact Us
                        </button>
                    </div>

                    {tab[selectedTab]}

                    <Sidebar mode={mode} setMode={setMode} pageInitiatedFrom="about" />
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({
    mode,
    setMode,
    pageInitiatedFrom,
}: {
    mode: BrightnessMode;
    setMode: (mode: BrightnessMode) => void;
    pageInitiatedFrom: 'home' | 'about';
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { show, page } = useSelector((state: RootState) => state.headerSidebar);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        setShowSidebar(show);
    }, [show]);

    return (
        <div
            className={`sidebar ${mode}`}
            style={{
                display: showSidebar && page === pageInitiatedFrom ? '' : 'none',
            }}
        >
            <div className="sidebar-header flex-row centralize-y">
                <button
                    style={{
                        background: 'transparent',
                        border: 0,
                    }}
                    onClick={() => dispatch(toggleHeaderSidebarModal({ show: false, page }))}
                >
                    <img src={mode === 'light' ? MainCloseDark : MainCloseWhite} alt="" />
                </button>
            </div>

            <div className="sidebar-content">
                <div className="navs _pane-sect">
                    <div
                        className="_nav"
                        style={{
                            color: mode === 'dark' ? 'white' : '',
                            cursor: 'pointer',
                        }}
                        onClick={() => (page === 'home' ? navigate('/about') : navigate('/'))}
                    >
                        {page === 'home' ? 'About Us' : 'Home'}
                    </div>
                </div>
                <button
                    className={`_mode-toggle ${mode} flex-row centralize-y centralize-x`}
                    onClick={() => {
                        if (mode === 'dark') {
                            setMode('light');
                        } else {
                            setMode('dark');
                        }
                    }}
                    style={{
                        color: mode === 'light' ? 'black' : 'white',
                        backgroundColor: mode === 'light' ? '#fff2d1' : '#171717',
                    }}
                >
                    <Circle
                        width={20}
                        height={20}
                        pd={0}
                        img={mode === 'light' ? BrownMoon : BlueMoon}
                        bg="transparent"
                        noMg
                        noBorder
                        style={{ marginRight: 10 }}
                    />
                    {mode === 'dark' ? <p style={{ color: 'white' }}>Turn on the Light</p> : <p style={{ color: 'black' }}>Turn off the Light</p>}
                </button>
            </div>
        </div>
    );
};

export const LandingPageTest = () => {
    const [mode, setMode] = useState('dark' as BrightnessMode);
    const { page } = useParams<{ page?: 'about' }>();

    return <h1>Hello</h1>;
};
