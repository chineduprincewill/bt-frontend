import React from 'react';
// import CreatePost from '../components/CreatePost';
// import SingleVillagePost from '../components/SingleVillagePost';
import RecentUpdates from './RecentUpdates';
import Villagers from './Villagers';
import EventsForYou from '@components/EventsForYou';
import Feed from './FeedSection';
import useVillage from '../Village/useVillage';

const ActivityFeed = () => {
    const { villagePosts, villageId } = useVillage();

    console.log('VILLAGE POSTS', villagePosts);

    return (
        <div className="flex justify-between gap-x-7 w-full relative">
            <section className="w-full md:w-[70%] space-y-5 sticky">
                {/* <CreatePost />
            <section className="space-y-5 max-h-[70%] overflow-y-auto">
                <SingleVillagePost />
                <SingleVillagePost />
                <SingleVillagePost />
                <SingleVillagePost />
                <SingleVillagePost />
            </section> */}
                <Feed platformPosts={villagePosts} villageId={villageId} />
            </section>
            <aside className="space-y-5 hidden md:block md:w-[30%] flex-shrink-0">
                {/* <RecentUpdates /> */}
                <Villagers />
                <EventsForYou />
            </aside>
        </div>
    );
};

export default ActivityFeed;
