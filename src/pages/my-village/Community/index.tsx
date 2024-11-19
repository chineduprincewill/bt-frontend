import React, { useState, useEffect } from 'react';
import PageContainer from '@components/PageContainer';
import CommunityHeader from '../components/CommunityHeader';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Members from '../components/CommunityMembers';
import CommunityRequests from '../components/CommunityRequests';
import useCommunity from './useCommunity';
import CommunityActivityFeed from '../components/CommunityActivityFeed';

export default function Community() {
    const [activeButton, setActiveButton] = useState('Activity Feed');

    const { id } = useParams();

    const navigate = useNavigate();

    const { pendingMembers, isLeader, loggedInUserId, } = useCommunity();

    console.log('IS THIS USER A LEADER', isLeader);
    console.log('LOGGED IN USER ID', loggedInUserId);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryParam = searchParams.get('q');
        if (queryParam) {
            setActiveButton(queryParam === 'feed' ? 'Activity Feed' : queryParam.charAt(0).toUpperCase() + queryParam.slice(1));
        }
    }, []);

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
        const query = buttonName === 'Activity Feed' ? 'feed' : buttonName.toLowerCase();
        navigate(`/community/${id}?q=${query}`);
    };

    const buttonClass = (buttonName: string) => (buttonName === activeButton ? 'px-7 py-3 rounded-full bg-[#E9E9E9]' : '');

    return (
        <PageContainer title="Community" back>
            <div className="space-y-4 ">
                <CommunityHeader />

                <section className="w-full ">
                    <section className="flex gap-5 py-5">
                        <button
                            className={`px-7 py-3 rounded-full ${buttonClass('Activity Feed')}`}
                            onClick={() => handleButtonClick('Activity Feed')}
                        >
                            Activity Feed
                        </button>
                        <button className={`px-7 py-3 rounded-full ${buttonClass('Members')}`} onClick={() => handleButtonClick('Members')}>
                            Members
                        </button>
                        {isLeader && (
                            <button
                                className={`px-7 flex gap-2 py-3 rounded-full ${buttonClass('Requests')}`}
                                onClick={() => handleButtonClick('Requests')}
                            >
                                <p>Requests</p>{' '}
                                {pendingMembers && pendingMembers?.length > 0 && (
                                    <div className="bg-[#ff0000] flex text-[9px] items-center justify-center w-5 h-5 text-white rounded-full">
                                        {pendingMembers?.length}
                                    </div>
                                )}
                            </button>
                        )}
                    </section>

                    <div className="flex justify-between gap-x-7 w-full relative">
                        {activeButton === 'Activity Feed' && <CommunityActivityFeed />}
                        {activeButton === 'Members' && <Members />}
                        {activeButton === 'Requests' && isLeader && <CommunityRequests />}
                    </div>
                </section>
            </div>
        </PageContainer>
    );
}
