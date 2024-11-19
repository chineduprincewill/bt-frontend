import React, { useState } from 'react';
import { Circle } from '@components/Circle';
import IconInput from '@components/IconInput';
import DefaultImage from '../../../assets/default-user-image.jpeg';
import ModalContainer from '@components/ModalContainer';
import CloseIcon from '../../../assets/close-circle-transparent.svg';
import { useGetConnectionsQuery } from 'api/connectionApi';
import { useSendCommunityInviteMutation } from 'api/communityApi';
import { useLocation } from 'react-router-dom';
import useCommunity from '../Community/useCommunity';
// import useVillage from '../Village/useVillage';
import { useSelector } from 'react-redux';
import { RootState } from '@state/store';
import { toast } from 'react-toastify';

export default function SendInvite({ onClose }: { onClose: () => void }) {
    const { data: connectionsData, isLoading, isError } = useGetConnectionsQuery({ type: 'followers' });
    const [sendInvite] = useSendCommunityInviteMutation();
    const location = useLocation();
    const platformId = localStorage.getItem('platformId');
    console.log('platformID', platformId);
    const [searchValue, setSearchValue] = useState('');

    const onChangeSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleInviteConnection = async (followerId: string) => {
        console.log('Checking', platformId);
        if (!platformId) return;

        try {
            await sendInvite({ inviteeId: followerId, communityId: platformId }).unwrap();
            toast.success('Invitation sent successfully');
            onClose();
        } catch (error) {
            console.log('An error occurred', error);
        }
    };

    return (
        <ModalContainer onClose={onClose}>
            <div className="bg-white rounded-xl min-w-[475px] h-[567px] p-5">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Send Invite to:</p>
                    <img onClick={onClose} src={CloseIcon} alt="close" />
                </div>

                <IconInput
                    containerClassName="flex flex-1 mt-4"
                    className="rounded-[32px] bg-[#F1F1F1] border border-lightGray-5 text-sm placeholder:text-accent-3 text-black font-medium h-10"
                    iconType="search"
                    placeholder="Search for connections"
                    value={searchValue}
                    onChange={(e) => onChangeSearch(e.target.value)}
                />

                <p className="text-[#5B5B5B] py-4 text-sm">Connections</p>

                <div className="space-y-7">
                    {isLoading && <p>Loading connections...</p>}
                    {isError && <p>Error loading connections.</p>}
                    {connectionsData?.data?.map(({ follower }) => (
                        <div key={follower?.id} className="flex justify-between">
                            <div className="flex gap-3 items-center">
                                <Circle
                                    img={follower?.user.displayImage || DefaultImage}
                                    pd={0}
                                    height={39}
                                    width={39}
                                    noMg
                                    bg="transparent"
                                    borderColor="transparent"
                                    noBorder
                                />
                                <div>
                                    <p className="text-sm">
                                        {follower?.user.firstName} {follower?.user.lastName}
                                    </p>
                                    <div className="truncate text-ellipsis w-64">
                                        {/* // TODO do proper typing */}
                                        {/* @ts-ignore */}
                                        <p className="text-xs text-[#878787] text-ellipsis">{follower?.bio}</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (follower?.user) {
                                        handleInviteConnection(follower.id);
                                    }
                                }}
                                className={`px-7 py-2 rounded-3xl text-white text-xs bg-[#FF0000] bg-black`}
                            >
                                Invite
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </ModalContainer>
    );
}
