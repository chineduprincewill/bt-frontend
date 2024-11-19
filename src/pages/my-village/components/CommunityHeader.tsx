import React, { useState } from 'react';
import HeaderImage from '../../../assets/village-default-header.jpeg';
import LeaveCommunityModal from './LeaveCommunityModal';
import useCommunity from '../Community/useCommunity';
import { toggleLeaveCommunityModal } from '@state/slices/modals';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@state/store';

export default function CommunityHeader() {
    const dispatch = useDispatch();

    const showLeaveCommunityModal = useSelector((state: RootState) => state.modals.showLeaveCommunityModal);
    const { community, isLoading, handleLeaveCommunity } = useCommunity();

    const handleShowModal = () => {
        dispatch(toggleLeaveCommunityModal());
    };
    return (
        <section className="rounded-xl p-2 bg-[#F2F2F2] w-full ">
            <div className="rounded-xl overflow-hidden h-52 p-2 w-full">
                <img src={HeaderImage} alt="header image" className="object-cover w-full h-full rounded-xl" />
            </div>
            <div className="flex justify-between items-center py-3">
                <div>
                    <h2 className="text-2xl font-semibold">{community?.community.name}</h2>

                    <div className="flex items-center text-xs">
                        <p className="text-[#5B5B5B]">{community?.community.membersCount}</p> . <p className="text-[#5B5B5B]">San Francisco , US</p>
                    </div>
                    <p className="text-[#959595] max-w-[615px] text-xs">{community?.community.description}</p>
                </div>

                <div>
                    <button onClick={handleShowModal} className="px-5 py-2 rounded-3xl bg-[#FF0000] text-white">
                        Leave Community
                    </button>
                </div>
            </div>

            {showLeaveCommunityModal && <LeaveCommunityModal name={community?.community.name} close={handleShowModal} />}
        </section>
    );
}
