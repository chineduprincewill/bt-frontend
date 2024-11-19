import React from 'react';
import ModalContainer from '@components/ModalContainer';
import SuccessTick from '../../../assets/tick-circle-green.svg';

export default function JoinRequestModal({ onClose }: { onClose: () => void }) {
    return (
        <ModalContainer onClose={onClose}>
            <div className="flex bg-white p-12 rounded-xl space-y-5 flex-col justify-center items-center">
                <img src={SuccessTick} />
                <p className="font-semibold text-2xl">Request sent</p>
                <p className="text-[#5B5B5B]">Your request to join has been sent to the admin</p>
                <button onClick={onClose} className="bg-black text-white px-4 py-3 rounded-3xl">
                    Cancel
                </button>
            </div>
        </ModalContainer>
    );
}
