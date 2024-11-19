import React from 'react';
import Logout from '../../../assets/logout-village.svg';
import ModalContainer from '@components/ModalContainer';
import useCommunity from '../Community/useCommunity';
import Spinner from '@components/Spinner';

interface CommunityProps {
    name?: string;
    close: () => void;
}

export default function LeaveCommunityModal({ name, close }: CommunityProps) {
    const { handleLeaveCommunity, leaveLoading } = useCommunity();

    return (
        <ModalContainer onClose={close}>
            <div className="bg-white rounded-xl h-72 p-5 space-y-12">
                <div className="flex flex-col justify-center items-center">
                    <img src={Logout} alt="" className="w-20 h-20" />
                    <p className="text-center text-xl font-semibold py-3 max-w-[324px]">
                        Are you sure you want to <span className="text-[#FF0000]">leave </span>
                        <span>{name ? `${name} Village` : 'San Francisco Village'}?</span>
                    </p>
                </div>

                <div className="flex justify-center gap-5">
                    <button onClick={handleLeaveCommunity} className="text-white flex gap-4 bg-black px-12 py-3 rounded-3xl">
                        {leaveLoading && <Spinner width="20px" height="20px" />} Yes, Leave
                    </button>
                    <button onClick={close} className="text-black px-12 py-3 border border-solid border-black rounded-3xl">
                        No, Cancel
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
}
