import React from 'react';
import { Event } from '@pages/feeds/Event';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import { useViewEventsQuery } from 'api/eventsApi';

export default function EventsForYou() {
    const { data: getEventsData, isLoading } = useViewEventsQuery(null);

    const events = getEventsData?.data;
    return (
        <div>
            <div className="events_for_you border-solid border border-[#E9E9E9] max-w-[366px] rounded-xl p-5">
                <div className="flex-row head centralize-y space_btw">
                    <h4 className="right_sect_header">Events for you</h4>
                    <p
                        className="see_all"
                        // onClick={showEvents
                        // }
                    >
                        <Link to="/events">See all</Link>
                    </p>
                </div>
                <div className="events">
                    {isLoading ? (
                        <Spinner width="20px" height="20px" />
                    ) : (
                        events?.slice(0, 2).map((event) => {
                            const start = new Date(event.startTime);
                            const startDate = start.toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            });

                            return (
                                <div
                                    //  onClick={showEvents}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Link to="/events">
                                        <Event
                                            title={event.title}
                                            date={startDate}
                                            hostName={event.creator}
                                            location={event.location.length > 12 ? event.location.slice(0, 12) + '...' : event.location}
                                            profileImg={event.creatorLogo}
                                            key={event.id}
                                        />
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
