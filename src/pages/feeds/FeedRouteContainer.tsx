import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { CommingSoon } from '../profile/CommingSoon';
import { RightFeedColumn } from './components/RightFeedColumn';

export const FeedRouteContainer = () => {
    const [pane, setShowPane] = useState('');
    const [showComingSoonModal, setShowComingSoonModal] = useState(false);

    return (
        <div className="main bg-gray-100">
            <div className="flex-row __feeds centralize-x">
                <div className="w-full grid md:flex md:justify-between" style={{ position: 'relative' }}>
                    <div className="w-full md:w-2/3 px-2 md:px-0">
                        <Outlet />
                    </div>
                    <div className="w-full md:w-1/3">
                        <RightFeedColumn showEvents={() => setShowPane('events')} />
                    </div>
                </div>
            </div>
            <CommingSoon
                externalControl={{
                    show: showComingSoonModal,
                    close: () => setShowComingSoonModal(false),
                }}
            />
        </div>
    );
};
