import React, { useState } from 'react';
import CloseIcon from '../../../../assets/close-icon.svg';
import ModalContainer from '../../../../components/ModalContainer';
import { useRequestMasterclassMutation } from '../../../../api/masterclass';
import { toast } from 'react-toastify';
import ClickOutsideWrapper from '../../../../components/ClickOutWrapper';

interface MasterClassRequestModalProps {
    onClose: () => void;
}

export default function MasterClassRequestModal({ onClose }: MasterClassRequestModalProps) {
    const [masterClassTitle, setMasterClassTitle] = useState('');
    const [reasonForCreation, setReasonForCreation] = useState('');
    const [requestMasterclass, { isLoading }] = useRequestMasterclassMutation();

    const isSubmitButtonDisabled = !masterClassTitle || !reasonForCreation;

    const handleRequestMasterclass = async () => {
        if (!masterClassTitle.trim() || !reasonForCreation.trim()) {
            toast.error('Please provide both masterclass title and reason for creation.');
            return;
        }

        const payload = {
            title: masterClassTitle.trim(),
            description: reasonForCreation.trim(),
        };

        try {
            await requestMasterclass(payload);
            toast.success('Masterclass requested successfully.');
            onClose();
        } catch (error) {
            toast.error('Error requesting masterclass');
        }
    };

    return (
        <ModalContainer>
            <div className="bg-white h-max my-auto rounded-[10px] px-4 md:px-8 py-[54px] max-w-[436px] min-w-72 w-full">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-medium text-black">Request Masterclass</h3>
                    <img onClick={onClose} src={CloseIcon} className="w-6 h-6" role="button" alt="Close" />
                </div>
                <div>
                    <div className="flex flex-col gap-4 mt-16">
                        <section className="flex flex-col gap-4">
                            <label htmlFor="title" className="text-base font-medium text-black">
                                Masterclass title
                            </label>
                            <input
                                id="title"
                                onChange={(e) => setMasterClassTitle(e.target.value)}
                                placeholder="Ex. How I created X to achieve Y"
                                className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black"
                            />
                        </section>
                        <section className="flex flex-col gap-4">
                            <label htmlFor="description" className="text-base font-medium text-black">
                                Reason for creation
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                onChange={(e) => setReasonForCreation(e.target.value)}
                                placeholder="Enter a brief description about the session"
                                className="w-full p-4 placeholder:text-accent-3 text-sm font-medium border rounded-[10px] border-solid border-lightGray-6 text-black"
                            />
                        </section>
                    </div>
                    <button
                        className="w-full mt-16 btn-rounded bg-primary-red"
                        disabled={isSubmitButtonDisabled || isLoading}
                        onClick={handleRequestMasterclass}
                    >
                        {isLoading ? 'Submitting...' : 'Proceed'}
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
}
