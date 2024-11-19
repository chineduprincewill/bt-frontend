import React, { useState } from 'react';
import SettingsLayout from '../SettingsLayout';

export default function CloseAccount() {
    const [selectedOption, setSelectedOption] = useState('deactivate');
    const [showNextScreen, setShowNextScreen] = useState(false);

    const selectOption = (option: 'deactivate' | 'delete'): void => {
        setSelectedOption(option);
    };

    const handleShowNextScreen = () => {
        setShowNextScreen(!showNextScreen);
    };

    return (
        <SettingsLayout
            pageHeader="Close Account"
            subtitle="To start the process, select if you’d like to deactivate or permanently delete your account."
        >
            {!showNextScreen ? (
                <div className="space-y-7 w-[90%]">
                    <div className="relative border-solid border border-[#EFEFEF] rounded-md p-7" onClick={() => selectOption('deactivate')}>
                        <div className="space-y-3">
                            <p className="text-[#0D0D0D]">Deactivating an account</p>
                            <p className="text-[#5B5B5B] text-xs">
                                Deactivating your account is temporary, and it means your profile will be hidden until you reactivate it through My
                                Account under Settings.
                            </p>

                            <div className="absolute right-3 top-2 cursor-pointer">
                                <div className="bg-transparent border-solid border border-black rounded-full w-6 h-6 flex justify-center items-center">
                                    {selectedOption === 'deactivate' && <div className="bg-red-500 rounded-full w-4 h-4"></div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative border-solid border border-[#EFEFEF] rounded-md p-7" onClick={() => selectOption('delete')}>
                        <div className="space-y-3">
                            <p className="text-[#0D0D0D]">Delete account</p>
                            <p className="text-[#5B5B5B] text-xs">
                                Deleting your account is permanent. When you delete your account, your profile, feeds, likes, comments and connections
                                will be permanently removed.
                            </p>

                            <div className="absolute right-3 top-2 cursor-pointer">
                                <div className="bg-transparent border-solid border border-black rounded-full w-6 h-6 flex justify-center items-center">
                                    {selectedOption === 'delete' && <div className="bg-red-500 rounded-full w-4 h-4"></div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-[#E9E9E9] py-3 px-7 text-black text-xs rounded-3xl">Cancel</button>
                        <button onClick={handleShowNextScreen} className="bg-[#FF0000] text-white px-7 py-2 text-xs rounded-3xl">
                            Continue
                        </button>
                    </div>
                </div>
            ) : (
                <InputEmailToCloseAccount onShowNextScreen={handleShowNextScreen} />
            )}
        </SettingsLayout>
    );
}

interface Prop {
    onShowNextScreen: () => void;
}

export function InputEmailToCloseAccount({ onShowNextScreen }: Prop) {
    return (
        <>
            <div className="w-full md:w-[80%] space-y-5">
                <input type="password" className="bg-[#F2F2F2] p-3 rounded-xl w-full placeholder:text-[#B3B3B3] text-xs" placeholder="Password" />

                <p className="text-xs text-[#020202]">Forgot password?</p>

                <div className="flex gap-3">
                    <button onClick={onShowNextScreen} className="bg-[#E9E9E9] py-3 px-7 text-black text-xs rounded-3xl">
                        Cancel
                    </button>
                    <button className="bg-[#FF0000] text-white px-7 py-2 text-xs rounded-3xl">Continue</button>
                </div>
            </div>
        </>
    );
}
