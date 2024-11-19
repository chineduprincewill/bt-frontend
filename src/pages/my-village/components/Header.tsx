import React, { useState } from 'react';

import HeaderImage from '../../../assets/village-default-header.jpeg';
import LeaveVillageModal from './LeaveVillageModal';
import useVillage from '../Village/useVillage';
import { toggleLeaveVillageModal } from '@state/slices/modals';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@state/store';

export default function Header() {
    const showLeaveVillageModal = useSelector((state: RootState) => state.modals.showLeaveVillageModal);
    const { village, isLoading } = useVillage();
    const dispatch = useDispatch();

    const handleShowModal = () => {
        dispatch(toggleLeaveVillageModal());
    };

    if (isLoading) {
        return <div>Loading Village...</div>;
    }

    return (
        <section className="rounded-xl p-2 bg-[#F2F2F2] w-full py-6 px-4">
            <div className="rounded-xl overflow-hidden h-52 w-full">
                <img src={HeaderImage} alt="header image" className="object-cover w-full h-full rounded-xl" />
            </div>
            <div className="block md:flex justify-between items-center mt-6">
                <div className="">
                    <h2 className="text-2xl font-semibold">{village?.village.name}</h2>

                    <div className="flex items-center text-xs mt-2 gap-2 font-medium">
                        <p className="text-[#5B5B5B]">{village?.village.membersCount}</p> <span className="h-1 w-1 rounded-full bg-accent-6"></span>{' '}
                        <p className="text-[#5B5B5B]">
                            {village?.village.city} , {village?.village.country}
                        </p>
                    </div>
                    <p className="text-[#959595] w-full md:max-w-[615px] text-xs font-medium mt-6">{village?.village.description}</p>
                </div>

                <div className="flex justify-end md:block">
                    <button onClick={handleShowModal} className="px-5 py-2 text-sm md:text-base rounded-3xl bg-[#FF0000] text-white">
                        Leave Village
                    </button>
                </div>
            </div>

            {showLeaveVillageModal && <LeaveVillageModal name={village?.village.name} close={handleShowModal} />}
        </section>
    );
}
