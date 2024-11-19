import React, { useState } from 'react';
import Modal from './Modal';

export default function SecurityAlert() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClose = (): void => setIsOpen(false);

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="space-y-5 p-12 bg-red-500">
                <div className="text-xl font-semibold text-red-500">Security Alert</div>
                <div>
                    <p>Sorry, you are able to take this action right now.</p>
                </div>

                <div>
                    <button onClick={handleClose} className="bg-black text-white rounded-3xl py-3 px-7">
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}
