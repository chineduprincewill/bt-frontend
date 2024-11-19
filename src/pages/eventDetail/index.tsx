import { useParams } from 'react-router-dom';
import { useViewSingleEventQuery } from '../../api/eventsApi';
import placeholderImage from '../../assets/event-placeholder.png';
import { EventType } from '../../types/event';
import { Link } from 'react-router-dom';
import blackAtIcon from '../../assets/Favicon-blackat.svg';
import locationIcon from '../../assets/location-icon.svg';
import calendarIcon from '../../assets/calendar-icon.svg';
import { useNavigate } from 'react-router-dom';
// import ArrowBack from '../../assets/arrow-left.svg';
import ArrowBackBlack from '../../assets/back-icon.svg';
import addMessageIcon from '../../assets/message-add.svg';

export default function EventDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: eventResponse, error, isLoading } = useViewSingleEventQuery(id!);

    const event: EventType | undefined = eventResponse?.data;

    const goBack = () => {
        navigate(-1);
    };

    // Function to check if the event has expired
    const hasEventExpired = (endTime: string | number | Date) => {
        const now = new Date();
        const eventEndTime = new Date(endTime);
        return eventEndTime < now;
    };

    // Determine if the event has expired
    const eventExpired = event?.endTime ? hasEventExpired(event.endTime) : false;

    const formatDateTime = (isoString: string | undefined) => {
        if (isoString) {
            const date = new Date(isoString);

            const day = date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
            const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
            return { day, time };
        }
    };

    const startFormat = formatDateTime(event?.startTime);
    const endFormat = formatDateTime(event?.endTime);

    const displayString = `${startFormat?.day}; ${startFormat?.time}-${endFormat?.time}`;

    const sendFeedback = () => {
        navigate('/report-bug');
    };

    if (isLoading) return <div>Loading event details...</div>;
    if (error) return <div>An error occurred</div>;

    return (
        <div>
            <div className="bg-black ml-5 border-solid border rounded-full w-8 md:w-10 m-0 md:block md:ml-4 my-2 ">
                <img onClick={goBack} src={ArrowBackBlack} alt="arrow back" className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="flex items-center justify-between w-full px-5 py-1">
                <div>
                    <div className="flex items-start gap-2 cursor-pointer">
                        <h2 className="text-2xl font-semibold">Events</h2>
                        <p className="rounded-xl border border-solid border-black px-2 text-[10px]">Beta</p>
                    </div>
                </div>

                <div onClick={sendFeedback} className="bg-[#E9E9E9] rounded-2xl px-2 py-1 flex items-center gap-3">
                    <img src={addMessageIcon} alt="icon" />
                    <p className="text-xs">Send us feedback</p>
                </div>
            </div>

            <div className="flex justify-center md:w-full  border-solid border md:border-0 p-2 rounded-xl md:rounded-none shadow-xl md:shadow-none border-gray-300 m-4 md:p-4 md:m-1 ">
                <Link to={`/events/${id}`}>
                    <div>
                        <div className="w-full overflow-hidden">
                            <img src={event?.eventLogo || placeholderImage} alt="placeholder image" className="object-cover" />
                        </div>
                        <div className="space-y-5 text-[#5B5B5B] border-2 ">
                            <h2 className="text-xl font-semibold md:text-2xl">{event?.title}</h2>

                            <div className="flex space-x-1 items-center">
                                <img src={locationIcon} alt="location icon" />
                                <p className="text-[10px] md:text-sm text-[#5B5B5B]">{event?.location}</p>
                            </div>
                            <div className="flex space-x-1 text-xs">
                                <img src={calendarIcon} alt="Calendar icon" />
                                <p className="text-sm">{displayString}</p>
                                {/* <p className="">{endTime}</p> */}
                            </div>

                            <div className="flex space-x-2">
                                <img src={blackAtIcon} alt="icon" />
                                <p className="text-sm text-bkack">BlackAt Events</p>
                            </div>

                            <div className="md:w-[80%]">
                                <p className="leading-snug sm:leading-relaxed md:leading-[30px]">{event?.memo}</p>
                            </div>

                            <div className="flex justify-between px-2 items-center">
                                {/* Check if there is an affiliate link and the event has not expired */}
                                {event?.affiliateLink && !eventExpired ? (
                                    <a
                                        href={event.affiliateLink}
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
                                                `I'm interested in learning more about ${event?.title}. Please send me more information.`,
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
                                    <p className="font-bold text-4xl text-black">${event?.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
