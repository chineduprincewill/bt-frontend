import React, { useState, useEffect } from 'react';
import PageContainer from '@components/PageContainer';
import TopVillages from './Villages/TopVillages';
import TopCommunities from './Communities/TopCommunities';
import PlusIcon from '../../assets/plus-circle-icon.svg';
import './Villages/villagesstyle.scss';
import CreateCommunity from './components/CreateCommunity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@state/store';
import { togglePublishCommunityModal } from '@state/slices/modals';
import SendInvite from './components/SendInvite';
import { toggleShowInviteMembersModal, toggleJoinRequestModal } from '@state/slices/modals';
import JoinRequestModal from './components/JoinRequestModal';

export default function MyVillage() {
    const dispatch = useDispatch();

    const showCreateModal = useSelector((state: RootState) => state.modals.showCreateCommunityModal);
    const showSendInviteModal = useSelector((state: RootState) => state.modals.showInviteMembersModal);
    const showJoinRequestModal = useSelector((state: RootState) => state.modals.showRequestJoinPlatformModal);

    const handleModal = () => {
        dispatch(togglePublishCommunityModal());
    };

    return (
        <div className="bg-[#FAFAFA]">
            <PageContainer
                title="My Village"
                rightContent={
                    <>
                        <div className="hidden md:block">
                            <div onClick={handleModal} className="bg-[#FF0000] text-white px-5 py-3 rounded-3xl">
                                <button>Create a community</button>
                            </div>
                        </div>
                        <div onClick={handleModal} className="md:hidden">
                            <img src={PlusIcon} alt="add village icon" />
                        </div>
                    </>
                }
            >
                <div className="space-y-80">
                    <TopVillages />

                    <TopCommunities />
                </div>
            </PageContainer>

            {showCreateModal && <CreateCommunity onClose={handleModal} />}
            {showSendInviteModal && <SendInvite onClose={() => dispatch(toggleShowInviteMembersModal())} />}
            {showJoinRequestModal && <JoinRequestModal onClose={() => dispatch(toggleJoinRequestModal())} />}
        </div>
    );
}
