import React from 'react';
import DefaultImage from '../../../assets/village-default-image.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { Village } from '@type/village';
import useVillage from '../Village/useVillage';
import useSingleVillage from './useSingleVillage';
import { useDispatch } from 'react-redux';
import { toggleJoinRequestModal } from '@state/slices/modals';

interface VillageProps {
    village: Village;
}

export default function SingleVillage({ village }: VillageProps) {
    const { id, banner, name, description, city, country, membersCount } = village;
    const { handleRequestMembership, village: singleVillage } = useSingleVillage(id);

    const navigate = useNavigate();

    const handleRouteToVillage = () => {
        if (singleVillage) {
            if (singleVillage.isMember === false) {
                handleRequestMembership();
            } else {
                navigate(`/village/${id}`);
            }
        }
    };

    return (
        <div onClick={handleRouteToVillage} className="bg-[#F2F2F2] flex-shrink-0 w-80 h-full rounded-[10px] p-2 space-y-5">
            <div className="rounded-xl overflow-hidden h-28">
                <img src={banner || DefaultImage} alt={`${name} image`} className="object-cover w-full" />
            </div>

            <p className="text-xl font-semibold">{name}</p>

            <div>
                <div className="text-xs flex gap-2">
                    <p>{membersCount} members</p> .{' '}
                    <p>
                        {city}, {country}
                    </p>
                </div>

                <div>
                    <p className="text-[#959595] text-xs">{description}</p>
                </div>
            </div>

            <div>
                <button onClick={handleRequestMembership} className="bg-black rounded-3xl w-full  px-5 py-3 text-white">
                    Join Village
                </button>
            </div>
        </div>
    );
}
