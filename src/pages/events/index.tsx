import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useViewEventsQuery } from '../../api/eventsApi';
import searchIcon from '../../assets/search-normal.svg';
import EventComponent from '../../components/Event';
import { setEventsData } from '../../state/slices/feedSlice';
import IconInput from '@components/IconInput';

function Events() {
    const dispatch = useDispatch();

    const { data: getEventsData, isLoading } = useViewEventsQuery(null);

    const [searchQuery, setSearchQuery] = useState('');

    console.log(getEventsData);

    const filteredEvents = getEventsData?.data.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()));

    console.log(getEventsData);
    useEffect(() => {
        if (getEventsData?.data) {
            dispatch(setEventsData({ events: getEventsData.data }));
        }
    }, [getEventsData?.data, dispatch]);

    if (isLoading) {
        return <div>Loading events...</div>;
    }

    return (
        <div className="w-full bg-[FAFAFA]">
            {/* <div className="flex w-full space-x-2 py-3">
                            <div className={activeStyle('all')} onClick={() => setActive('all')}>
                                <p>
                                    All <span className="bg-[#E16757] rounded-xl px-2 text-xs text-white">10</span>
                                </p>
                            </div>
                            <div className={activeStyle('forYou')} onClick={() => setActive('forYou')}>
                                <p>For you</p>
                            </div>
                            <div className={activeStyle('savedEvents')} onClick={() => setActive('savedEvents')}>
                                <p>Saved events</p>
                            </div>
                        </div> */}
            {/* <div className="w-full flex md:block ">
                <div className="relative m-4 w-full md:w-96">
                    <img src={searchIcon} alt="search icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        className="border border-[#B3B3B3]  bg-[#E7E7E7] rounded-3xl w-full py-3 pl-10 pr-3 placeholder:p-3"
                        placeholder="Search events here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div> */}

            <IconInput
                containerClassName=" flex flex-1 w-4/5 my-5"
                className="rounded-[32px] border border-lightGray-5 text-sm placeholder:text-accent-3 text-black font-medium"
                iconType="search"
                placeholder="Search for events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="md:w-4/5">
                <div className=" md:block lg:grid grid-cols-2 gap-[25px] md:w-[100%] mx-auto ">
                    {filteredEvents?.map((event, index) => (
                        <div key={index}>
                            <EventComponent
                                id={event.id}
                                title={event.title}
                                location={event.location}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                eventImage={event.eventLogo}
                                price={event.price}
                                affiliateLink={event.affiliateLink}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* {showProfileFormModal && loggedUser && <ProfileFormModal userInfo={loggedUser} />} */}
        </div>
    );
}

export default Events;
