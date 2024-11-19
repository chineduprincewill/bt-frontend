import React, { useState } from 'react';

import MasterClassReviews from '../../../../components/MasterClassReviews';
import MasterClassSimilarVideos from '../../../../components/MasterClassSimilarVideos';

export default function MasterClassTabs() {
    const [currentTab, setCurrentTab] = useState<'reviews' | 'similar-videos'>('reviews');

    return (
        <div>
            <div className="tabs pt-[25px] sticky top-0 bg-white">
                {/* <button className={`tab ${currentTab === 'reviews' && 'active'}`} onClick={() => setCurrentTab('reviews')}>
                    Reviews
                </button> */}
                <button className={`tab ${currentTab === 'similar-videos' && 'active'}`} onClick={() => setCurrentTab('similar-videos')}>
                    Similar Videos
                </button>
            </div>
            <div className="mt-7">
                {/* {currentTab === 'reviews' && <MasterClassReviews />} */}
                {currentTab === 'similar-videos' && <MasterClassSimilarVideos />}
            </div>
        </div>
    );
}
