import React, { useState } from 'react';
import ModalContainer from '@components/ModalContainer';
import CloseIcon from '../../../assets/close-circle-transparent.svg';
import { useDispatch } from 'react-redux';
import useCommunity from '../Community/useCommunity';
import { toggleShowInviteMembersModal, setShowInviteMembersModal } from '@state/slices/modals';
import { setPlatformId } from '@state/slices/platform';
import { toast } from 'react-toastify';

export default function CreateCommunity({ onClose }: { onClose: () => void }) {
    const { handleCreateCommunity } = useCommunity();
    const [title, setTitle] = useState('');
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    // const handleProceed = () => {
    //     handleCreateCommunity(title, description, reason)
    //         .then(() => {
    //             onClose();
    //             dispatch(toggleShowInviteMembersModal());
    //         })
    //         .catch((error: any) => {
    //             console.error('Failed to create community:', error);
    //             toast.error('Failed to create community:', error);
    //         });
    // };

    const handleProceed = async () => {
        try {
            await handleCreateCommunity(title, description, reason);
            onClose();
            // dispatch(toggleShowInviteMembersModal());
            // dispatch(toggleShowInviteMembersModal());
            // dispatch(setShowInviteMembersModal(true));
        } catch (error: any) {
            console.error('Failed to create community:', error);
            toast.error('Failed to create community:', error);
        }
    };

    return (
        <ModalContainer onClose={onClose}>
            <div className="max-w-[518px] min-h-[540px] p-5 bg-white rounded-xl space-y-10">
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">Create Community</p>
                    <img onClick={onClose} src={CloseIcon} alt="close icon" />
                </div>
                <div className="space-y-10 ">
                    <div className="space-y-2">
                        <label>Community title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter community title here"
                            className="rounded-md bg-[#F2F2F2] p-5 border-[#E9E9E9] border border-solid placeholder:text-[#B3B3B3] placeholder:text-sm w-full h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <label>Reason for creation</label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Ex. For Videographers"
                            className="rounded-md bg-[#F2F2F2] p-5 border-[#E9E9E9] border border-solid placeholder:text-[#B3B3B3] placeholder:text-sm w-full h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <label>Community description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write a little about the community"
                            className="w-full border-solid border border-[#E9E9E9] h-20 p-5 rounded-md  bg-[#f2f2f2] no-resize resize-none placeholder:text-[#B3B3B3] placeholder:text-sm"
                        />
                    </div>
                </div>

                <div className="mt-24">
                    <button onClick={handleProceed} className="bg-[#ff0000] text-xs px-5 py-4 text-white rounded-3xl w-full placeholder:text-xs">
                        Proceed - Add members
                    </button>
                </div>
            </div>
            {/* {showInviteModal && <SendInvite onClose={() => onClose()} />} */}
        </ModalContainer>
    );
}
