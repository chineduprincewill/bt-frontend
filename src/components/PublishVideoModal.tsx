import React, { ReactNode } from 'react';
import Modal from './Modal';
import VideoPlayer from './VideoPlayer';
import ClickOutsideWrapper from './ClickOutWrapper';
import { MasterClass } from '../types/masterclass';
import { usePublishVideoMutation } from '../api/mentorship';

interface PublishVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    masterclass: MasterClass;
}

export default function PublishVideoModal({ isOpen, onClose, masterclass }: PublishVideoModalProps) {
    const [publishVideo, { isLoading, isSuccess }] = usePublishVideoMutation();

    const handlePublish = async () => {
        try {
            await publishVideo(masterclass.id);

            if (isSuccess) {
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ClickOutsideWrapper onClickOutside={onClose}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="text-[#333333] px-5 py-5">
                    <div className="w-full flex justify-center items-center">
                        <h2 className="text-center text-2xl pb-3">Publish your masterclass video</h2>
                    </div>
                    <div>
                        <VideoPlayer url={masterclass.url} className="" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-center gap-4 w-full">
                            <div className="w-full">
                                <label>Title</label>
                                <input value={masterclass.title} type="text" className="bg-[#F2F2F2] px-3 h-10 mt-2 rounded-md w-full" />
                            </div>

                            <div className="w-full">
                                <label>Executive</label>
                                <input
                                    value={`${masterclass.instructor.user.firstName} ${masterclass.instructor.user.lastName}`}
                                    type="text"
                                    readOnly
                                    className="bg-[#F2F2F2] text-sm px-3 h-10 mt-2 rounded-md w-full text-[#A9A9A9]"
                                />
                            </div>
                        </div>

                        <div>
                            <label>Brief description</label>
                            <textarea value={masterclass.description} className="w-full p-3 mt-2 h-20 rounded-md bg-[#F2F2F2]" />
                        </div>

                        <div className="w-full flex flex-col">
                            <label>Category</label>
                            <select value={masterclass.category} className="px-3 mt-2 h-10 bg-[#F2F2F2] w-64 rounded-md text-[#A9A9A9]">
                                <option className="text-sm">{masterclass.category}</option>
                            </select>
                            {/* <input value={masterclass.category} className="p-3 mt-2 h-10 bg-[#F2F2F2] w-64 rounded-md" /> */}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button onClick={onClose}>Cancel</button>
                        <button onClick={handlePublish} className="text-white bg-[#FF0000] rounded-3xl px-5 py-2">
                            {isLoading ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>
            </Modal>
        </ClickOutsideWrapper>
    );
}
