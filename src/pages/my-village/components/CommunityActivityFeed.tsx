import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import RecentUpdates from './RecentUpdates';
import EventsForYou from '@components/EventsForYou';
import CommunityConnections from './CommunityConnections';
import SingleCommunityPost from './SingleCommunityPost';
import useCommunity from '../Community/useCommunity';
import { PostInput } from '@pages/feeds/components/PostInput';
import Feed from './FeedSection';

const CommunityActivityFeed = () => {
    const { communityPosts, communityId } = useCommunity();

    console.log('COMMUNITY POSTS', communityPosts);

    const [postText, setPostText] = useState('Apple');

    return (
        <div className="flex justify-between gap-x-7 w-full relative">
            <section className="w-full md:w-[70%] space-y-5 sticky">
                {/* <CreatePost />

                <section className="space-y-5 max-h-[70%] overflow-y-auto">
                    {communityPosts?.map((post) => <SingleCommunityPost key={post.id} post={post} />)}
                </section> */}
                <Feed platformPosts={communityPosts} communityId={communityId} />
            </section>
            <aside className="space-y-5 hidden md:block md:w-[30%] flex-shrink-0">
                {/* <RecentUpdates /> */}
                <CommunityConnections />
                <EventsForYou />
            </aside>
        </div>
    );
};

export default CommunityActivityFeed;
