import { useEffect, useState } from 'react';
// import FeedBlackatEvent from '../../assets/feed_blackat_event.svg';
import FeedLikedByIllu from '../../assets/feed_liked_by_illu.svg';
import FeedEventLocation from '../../assets/feed_event_location.svg';
// import FeedMsgSearch from '../../assets/feed_msg_search.svg';
import FeedEventCalendar from '../../assets/feed_event_calendar.svg';
// import FeedEventBannerSmall from '../../assets/feed_event_banner_small.svg';
// import FeedEventBannerBig from '../../assets/wide banner_CHICAGO.png';
import DefaultProfileIcon from '../../assets/feed_def_profile.svg';
import FeedSendFeedBack from '../../assets/feed_send_feedback.svg';
import { SmallIcon, FeedContainer } from '.';
import { Circle } from '../../components/Circle';
import /* EventsResponseFromApi, */ '../../api/postApi';
import { useViewEventsQuery } from '../../api/eventsApi';
import { useDispatch } from 'react-redux';
import { toggleProfileDropdown } from '../../state/slices/header';
import { toggleTalkToSupportModal } from '../../state/slices/supportSlice';
import { setEventsData } from '../../state/slices/feedSlice';
// import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Back from '../../assets/back-icon.svg';

export interface IEvent {
    title: string;
    location: string;
    date: string;
    time: string;
    host: {
        name: string;
        logo: string;
    };
    price: number;
    discountedPrice: number;
    description: string;
    banner: {
        thumb: string;
        cover: string;
    };
    id: string;
}

export const Event = ({
    title,
    hostName,
    profileImg,
    date,
    location,
}: {
    title: string;
    hostName: string;
    profileImg: string;
    date: string;
    location: string;
}) => {
    return (
        <div className="event">
            <p className="title underline" style={{ color: '#5B5B5B' }}>
                {title}
            </p>

            <div className="details">
                <div className="host flex-row centralize-y">
                    <Circle
                        img={profileImg ?? DefaultProfileIcon}
                        pd={0}
                        height={16}
                        width={16}
                        noMg
                        bg="transparent"
                        borderColor="transparent"
                        noBorder
                    />
                    <p className="host_name">{hostName}</p>
                </div>

                <div className="event_info flex-row centralize-y">
                    <div className="flex-row centralize-y">
                        <SmallIcon src={FeedEventCalendar} size={12} />
                        <p className="date">{date}</p>
                    </div>
                    <div className="flex-row centralize-y">
                        <SmallIcon src={FeedEventLocation} size={12} />
                        <p className="location lowercase">{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EventsView = () => {
    // const currentEvent = events.find((event) => event.id === selectedEvent);
    const [selectedNav, setSelectedNav] = useState<'all' | 'for_you' | 'saved_events'>('all');
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { data: getPostData, isLoading } = useViewEventsQuery(null);
    const [eventdata, seteventdata] = useState([
        {
            id: '',
            createdAt: '',
            creator: '',
            creatorLogo: '',
            creatorProfileId: '',
            endTime: '',
            eventLogo: '',
            location: '',
            memo: '',
            price: '',
            startTime: '',
            title: '',
            affiliateLink: '',
            updatedAt: '',
        },
        // ...events
    ]);
    const [selectedEvent, setSelectedEvent] = useState({
        id: '',
        createdAt: '',
        creator: '',
        creatorLogo: '',
        creatorProfileId: '',
        endTime: '',
        eventLogo: '',
        location: '',
        memo: '',
        price: '',
        startTime: '',
        title: '',
        updatedAt: '',
        affiliateLink: '',
    });

    useEffect(() => {
        if (getPostData?.data) {
            console.log('event data', getPostData.data);
            seteventdata(
                getPostData.data.map((event) => ({
                    id: event.id,
                    createdAt: event.createdAt,
                    creatorLogo: event.creatorLogo,
                    creator: event.creator,
                    creatorProfileId: event.creatorProfileId!,
                    endTime: event.endTime,
                    eventLogo: event.eventLogo,
                    location: event.location,
                    memo: event.memo,
                    price: event.price,
                    startTime: event.startTime,
                    title: event.title,
                    updatedAt: event.updatedAt,
                    affiliateLink: event.affiliateLink,
                })),
            );
            dispatch(setEventsData({ events: getPostData.data }));
        }
    }, [dispatch, getPostData?.data]);

    const start = selectedEvent.startTime ? new Date(selectedEvent.startTime) : new Date();
    const startTime = start.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const end = selectedEvent.endTime ? new Date(selectedEvent.endTime) : new Date();
    const endTime = end.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // console.log("selected ==",selectedEvent)

    return (
        <>
            <div className="events_view wide_pane">
                <div className="pane">
                    <div className="head flex-row centralize-y">
                        <div className="event_header flex-row">
                            <h4>Events</h4>
                            <div className="tag">
                                <div>Beta</div>
                            </div>
                        </div>
                        <button
                            className="flex-row centralize-y centralize-x"
                            onClick={() => {
                                dispatch(toggleProfileDropdown(false));
                                dispatch(
                                    toggleTalkToSupportModal({
                                        show: true,
                                        type: 'bug',
                                    }),
                                );
                            }}
                        >
                            <SmallIcon src={FeedSendFeedBack} size={18} />
                            <p>Send us Feedback</p>
                        </button>
                    </div>

                    {selectedEvent.eventLogo ? (
                        <>
                            <div className="event_detail_view">
                                <div
                                    className="close flex-row centralize-y"
                                    style={{
                                        cursor: 'pointer',
                                        background: 'black',
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() => {
                                        //@ts-ignore
                                        setSelectedEvent({});
                                    }}
                                >
                                    <img src={Back} height={20} width={20} alt="Close" />
                                </div>
                                <div className="banner flex-row centralize-x centralize-y">
                                    <img
                                        src={selectedEvent.eventLogo}
                                        style={{
                                            width: '100%',
                                            height: '90%',
                                            alignSelf: 'center',
                                        }}
                                        alt="Event banner"
                                    />
                                </div>

                                <div className="event_details">
                                    <div className="event_info">
                                        <div className="header flex-row centralize-y space_btw">
                                            <p className="title" style={{ color: 'red' }}>
                                                {selectedEvent.title}
                                            </p>
                                            <div className="host flex-row centralize-y" style={{ width: 'auto' }}>
                                                <SmallIcon src={selectedEvent.creatorLogo} size={35} />
                                                <p
                                                    style={{
                                                        fontWeight: '600',
                                                        marginLeft: '4px',
                                                    }}
                                                >
                                                    {selectedEvent.creator}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="event_location_time_details">
                                            <div className="location flex-row centralize-y">
                                                <SmallIcon src={FeedEventLocation} />
                                                <p>{selectedEvent.location}</p>
                                            </div>
                                            <div className="date_time flex-row centralize-y">
                                                <div className="date_in_month flex-row centralize-y">
                                                    <SmallIcon src={FeedEventCalendar} />

                                                    <p>{startTime}</p>

                                                    <p
                                                        style={{
                                                            paddingLeft: 5,
                                                            paddingRight: 5,
                                                        }}
                                                    >
                                                        -
                                                    </p>
                                                </div>
                                                <p className="date_in_time">{endTime}</p>
                                            </div>
                                        </div>

                                        <div className="attendees flex-row centralize-y">
                                            <img src={FeedLikedByIllu} alt="" />
                                            <p>
                                                Temidayo Folajin <span> and 12 others are attending</span>
                                            </p>
                                        </div>

                                        <div className="description" style={{ paddingBottom: 200 }}>
                                            <p>{selectedEvent.memo}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="hover_cta flex-row centralize-y space_btw">
                                    <div className="event_date_location">
                                        <div className="dt flex-row centralize-y">
                                            <div className="date_in_month flex-row centralize-y">
                                                <SmallIcon src={FeedEventCalendar} />
                                                <p>{startTime}</p>
                                            </div>
                                            <p
                                                className="date_in_time"
                                                // style={{
                                                //     wordWrap: 'unset',
                                                //     width: 'auto',
                                                // }}
                                            >
                                                {endTime}
                                            </p>
                                        </div>
                                        <div id="hover_location" className="location flex-row centralize-y">
                                            <SmallIcon src={FeedEventLocation} />
                                            <p>{selectedEvent.location}</p>
                                        </div>
                                    </div>

                                    <div className="cta flex-row centralize-y">
                                        <div className="pricing flex-row centralize-y">
                                            <span>$</span>
                                            <p className="discounted_price"> {selectedEvent.price}</p>
                                        </div>
                                        {selectedEvent.affiliateLink ? (
                                            <a href={selectedEvent.affiliateLink} target="_blank">
                                                <button className="buy_ticket">Buy ticket</button>
                                            </a>
                                        ) : (
                                            <a href="mailto:rsvp@blkat.io">
                                                <button className="buy_ticket">RSVP</button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navs flex-row centralize-y">
                                <button
                                    className="tab flex-row centralize-y centralize-x"
                                    onClick={() => setSelectedNav('all')}
                                    style={{
                                        maxWidth: 'auto',
                                        backgroundColor: selectedNav === 'all' ? '#e9e9e9' : 'transparent',
                                    }}
                                >
                                    <p
                                        style={{
                                            color: selectedNav === 'all' ? 'black' : '',
                                        }}
                                    >
                                        All
                                    </p>
                                    <div id="msg_count">10+</div>
                                </button>
                                <button
                                    className="tab flex-row centralize-y centralize-x"
                                    onClick={() => setSelectedNav('for_you')}
                                    style={{
                                        maxWidth: 'auto',
                                        backgroundColor: selectedNav === 'for_you' ? '#e9e9e9' : 'transparent',
                                    }}
                                >
                                    <p
                                        style={{
                                            color: selectedNav === 'for_you' ? 'black' : '',
                                        }}
                                    >
                                        For you
                                    </p>
                                </button>
                                <button
                                    className="tab flex-row centralize-y centralize-x"
                                    onClick={() => setSelectedNav('saved_events')}
                                    style={{
                                        maxWidth: 'auto',
                                        backgroundColor: selectedNav === 'saved_events' ? '#e9e9e9' : 'transparent',
                                    }}
                                >
                                    <p
                                        style={{
                                            color: selectedNav === 'saved_events' ? 'black' : '',
                                        }}
                                    >
                                        Saved events
                                    </p>
                                </button>
                            </div>

                            <div className="events">
                                {isLoading ? (
                                    <Spinner width="50px" height="50px" />
                                ) : (
                                    eventdata.map((event) => {
                                        const start = new Date(event.startTime);
                                        const startTime = start.toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        });

                                        const end = new Date(event.endTime);
                                        const endTime = end.toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        });

                                        return (
                                            <div
                                                className="feed_event"
                                                key={event.id}
                                                onClick={() =>
                                                    setSelectedEvent({
                                                        id: event.id,
                                                        createdAt: event.createdAt,
                                                        creator: event.creator,
                                                        creatorLogo: event.creatorLogo,
                                                        creatorProfileId: event.creatorProfileId,
                                                        endTime: event.endTime,
                                                        eventLogo: event.eventLogo,
                                                        location: event.location,
                                                        memo: event.memo,
                                                        price: event.price,
                                                        startTime: event.startTime,
                                                        title: event.title,
                                                        updatedAt: event.updatedAt,
                                                        affiliateLink: event.affiliateLink,
                                                    })
                                                }
                                            >
                                                <FeedContainer className="flex-row">
                                                    <div className="event_image">
                                                        <img
                                                            id="event_small_image"
                                                            src={event.eventLogo}
                                                            alt=""
                                                            style={{
                                                                height: 100,
                                                                width: 100,
                                                                borderRadius: 20,
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="flex-row centralize-y event_info">
                                                        <div className="event_details">
                                                            <div className="header flex-row centralize-y">
                                                                <h4
                                                                    id="event-title-main"
                                                                    className="title"
                                                                    style={{
                                                                        color: 'black',
                                                                        whiteSpace: 'normal',
                                                                        wordWrap: 'break-word',
                                                                    }}
                                                                >
                                                                    {event.title}
                                                                </h4>
                                                                <div className="location flex-row centralize-y blsvg">
                                                                    <SmallIcon src={FeedEventLocation} size={14} />
                                                                    <p>{event.location}</p>
                                                                </div>
                                                            </div>
                                                            <div className="dates flex-row centralize-y">
                                                                <div className="date_in_month flex-row centralize-y blsvg">
                                                                    <SmallIcon src={FeedEventCalendar} size={14} />
                                                                    <p>{startTime}</p>
                                                                    <p
                                                                        style={{
                                                                            marginLeft: 10,
                                                                        }}
                                                                    >
                                                                        -
                                                                    </p>
                                                                </div>
                                                                <p className="date_in_time">{endTime}</p>
                                                            </div>

                                                            {/* <div className="attendees flex-row centralize-y">
                                                                <img src={FeedLikedByIllu} alt="" />
                                                                <p>
                                                                    Temidayo Folajin and <span>12 others are attending</span>
                                                                </p>
                                                            </div> */}

                                                            <div className="host flex-row centralize-y">
                                                                <SmallIcon src={event.creatorLogo} size={35} />
                                                                <p>{event.creator}</p>
                                                            </div>
                                                        </div>

                                                        <div className="event_cta flex-column">
                                                            <button className="rsvp">RSVP Event</button>

                                                            <div className="pricing flex-row centralize-y">
                                                                <span>$</span>
                                                                <p className="discounted_price"> {event.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </FeedContainer>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
