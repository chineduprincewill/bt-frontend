import { useState, useEffect } from 'react';
import placeholderImage from '../../assets/event-placeholder.png';
import blackAtIcon from '../../assets/Favicon-blackat.svg';
import locationIcon from '../../assets/location-icon.svg';
import calendarIcon from '../../assets/calendar-icon.svg';
import { useViewEventsQuery } from '../../api/eventsApi';
import { useDispatch } from 'react-redux';
import { setEventsData } from '../../state/slices/feedSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface EventsProps {
    id: string;
    title: string;
    location: string;
    eventImage: string;
    startTime: string;
    endTime: string;
    affiliateLink: string;
    price: string;
}
function EventComponent({ id, title, location, eventImage, startTime, endTime, price, affiliateLink }: EventsProps) {
    const navigate = useNavigate();
    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        // Format: "27 March, 2024; 11:30PM-12:30PM"
        const day = date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
        const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
        return { day, time };
    };
    const hasEventExpired = (endTime: string | number | Date) => {
        const now = new Date();
        const eventEndTime = new Date(endTime);
        return eventEndTime < now;
    };

    // Determine if the event has expired
    const eventExpired = endTime ? hasEventExpired(endTime) : false;

    const startFormat = formatDateTime(startTime);
    const endFormat = formatDateTime(endTime);

    // Since the date is the same for both start and end, use one for the date part
    const displayString = `${startFormat.day}; ${startFormat.time}-${endFormat.time}`;

    return (
        <div className="flex justify-center max-w-full overflow-visible border-solid border p-2 rounded-xl  border-gray-300 mb-2 mx-2 sm:mx-2 l sm:max-w-full">
            <Link to={`/events/${id}`}>
                <div className="w-full overflow-hidden p-4 sm:p-4 ">
                    <img src={eventImage || placeholderImage} alt="Event image" className="w-full h-auto object-cover" />
                    <div className="space-y-5 text-[#5B5B5B] border-2 w-full  overflow-hidden">
                        <h2 className="text-xl md:text-2xl font-semibold overflow-visible whitespace-normal">{title}</h2>

                        <div className="flex space-x-1 items-center">
                            <img src={locationIcon} alt="location icon" />
                            <p className="text-[10px] text-[#5B5B5B] truncate">{location}</p>
                        </div>
                        <div className="flex space-x-1 text-xs">
                            <img src={calendarIcon} alt="Calendar icon" />
                            <p className="">{displayString}</p>
                            {/* <p className="">{endTime}</p> */}
                        </div>
                        {/* <div>
                        <p className="text-[#5B5B5B] text-xs">
                            Liked by <span className="text-black ">Temidayo Folajin</span> and 12 others
                        </p>
                    </div> */}

                        <div className="flex space-x-2">
                            <img src={blackAtIcon} alt="icon" />
                            <p className="text-sm text-bkack">BlackAt Events</p>
                        </div>

                        <div className="flex justify-between px-2 items-center">
                            {/* Check if there is an affiliate link and the event has not expired */}
                            {affiliateLink && !eventExpired ? (
                                <a
                                    href={affiliateLink}
                                    target="_blank"
                                    className="inline-block bg-red-600 text-white px-6 py-4 rounded-3xl text-center"
                                >
                                    RSVP Event
                                </a>
                            ) : !eventExpired ? (
                                // If there is no affiliate link but the event has not expired, handle RSVP through email
                                // Note: Implement the onClick handler as shown previously to handle opening the email client
                                <button
                                    onClick={() => {
                                        const email = 'rsvp@blkat.io';
                                        const subject = encodeURIComponent('Interest in Event');
                                        const body = encodeURIComponent(
                                            `I'm interested in learning more about ${title}. Please send me more information.`,
                                        );
                                        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                                    }}
                                    className="inline-block bg-red-600 text-white px-6 py-4 rounded-3xl text-center"
                                >
                                    Inquire via Email
                                </button>
                            ) : (
                                // If the event has expired (regardless of the presence of an affiliate link)
                                <div className="inline-block bg-gray-400 text-white px-6 py-4 rounded-3xl text-center cursor-not-allowed">
                                    Event Expired
                                </div>
                            )}

                            <div className="flex space-x-7 items-center">
                                <p className="font-bold text-4xl text-black">${price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default EventComponent;
