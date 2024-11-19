import React from 'react';
import DefaultImage from '../../assets/village-default-image.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { SingleCommunity as ISingleCommunity } from '@type/community';
import useCommunity from './Community/useCommunity';
import { toggleJoinRequestModal } from '@state/slices/modals';
import { useDispatch } from 'react-redux';
import { useGetSingleCommunityQuery } from 'api/communityApi';

interface CommunityProp {
    community: ISingleCommunity;
}

export default function SingleCommunity({ community }: CommunityProp) {
    const { reason, description, name, id, membersCount } = community;
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { handleRequestCommunityMembership, community: singleCommunity } = useCommunity(community.id);

    const handleRouteToCommunity = () => {
        if (!singleCommunity?.isMember) {
            handleRequestCommunityMembership(id);
        } else {
            navigate(`/community/${id}`);
        }
    };

    return (
        <div onClick={handleRouteToCommunity} className="bg-[#F2F2F2] flex-shrink-0 w-80 h-full rounded-[10px] p-2 space-y-5">
            <div className="rounded-xl overflow-hidden h-28">
                <img src={DefaultImage} alt="village image" className="object-cover w-full" />
            </div>

            <p className="text-xl font-semibold">{name}</p>

            <div>
                <div className="text-xs flex gap-2">
                    <p>{membersCount} Member</p> . <p>Pennsville NJ, US</p>
                </div>

                <div>
                    <p className="text-[#959595] text-xs">{description}</p>
                </div>
            </div>

            <div>
                <button onClick={() => handleRequestCommunityMembership(id)} className="bg-black rounded-3xl w-full  px-5 py-3 text-white">
                    Join Community
                </button>
            </div>
        </div>
    );
}
