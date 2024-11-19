import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FeedSuggestedIllu from '../../../assets/feed_suggested_illu.svg';
import { SuggestedConnections } from '../../profile/sections/SuggestedConnections';
import { Event } from '../Event';
import { Link } from 'react-router-dom';
import { setEventsData } from '../../../state/slices/feedSlice';
import { useViewEventsQuery } from '../../../api/eventsApi';
import Spinner from '../../../components/Spinner';
import EventsForYou from '@components/EventsForYou';

export const RightFeedColumn = ({ showEvents }: { showEvents: () => void }) => {
    // const { events } = useSelector((state: RootState) => state.feed);

    const dispatch = useDispatch();

    const { data: getEventsData, isLoading } = useViewEventsQuery(null);

    const events = getEventsData?.data;
    useEffect(() => {
        if (getEventsData?.data) {
            dispatch(setEventsData({ events: getEventsData.data }));
        }
    }, [getEventsData?.data, dispatch]);

    // if (isLoading) {
    //     return <div>Loading events...</div>;
    // }
    return (
        <div className="right_feed_column pane">
            <SuggestedConnections />
            <EventsForYou />

            {/* <div className="premium_connections">
                <div className="head">
                    <img src={FeedSuggestedIllu} alt="" className="illustration" />
                    <h4 className="right_sect_header">200+ of your connections are premium members</h4>
                </div>

                <button className="flex-row subscribe-now centralize-x centralize-y">Subscribe now!</button>
            </div> */}
        </div>
    );
};
