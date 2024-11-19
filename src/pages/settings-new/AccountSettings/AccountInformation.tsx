import { useState } from 'react';
import SettingsLayout from '../SettingsLayout';
import { useGetLoggedInUserInfoQuery } from '../../../api/userApi';
import SecurityAlert from '../../../components/SecurityAlert';
import Modal from '../../../components/Modal';
import InfoCircle from '../../../assets/info-circle.svg';

export default function AccountInformation() {
    const { data: loggedInUser } = useGetLoggedInUserInfoQuery(null);
    const user = loggedInUser?.data.user;
    const [showSecurityAlert, setShowSecurityAlert] = useState(false);
    // const [isOpen, setIsOpen] = useState<boolean>(true);

    const handleClose = (): void => setShowSecurityAlert(false);

    return (
        <>
            <SettingsLayout pageHeader="Account Information" subtitle="See all editable information about your account">
                <div className="md:w-[80%] space-y-5">
                    <div className="flex justify-between w-full">
                        <div>
                            <p className="text-sm text-[#0D0D0D]">Username</p>
                            <p className="text-[#8D9091] text-xs">{user?.username}</p>
                        </div>

                        <div>
                            <button onClick={() => setShowSecurityAlert(true)} className="settings-button-style">
                                Change
                            </button>
                        </div>
                    </div>

                    {showSecurityAlert && (
                        <Modal isOpen={showSecurityAlert} onClose={handleClose}>
                            <div className="space-y-7 p-7">
                                <div className="flex gap-3 p-5 text-xl font-semibold">
                                    <img src={InfoCircle} alt="Info icon" />
                                    Security Alert
                                </div>
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
                    )}

                    <div className="flex justify-between w-full">
                        <div>
                            <p className="text-sm text-[#0D0D0D]">Email address</p>
                            <p className="text-[#8D9091] text-xs">{user?.email}</p>
                        </div>

                        <div>
                            <button onClick={() => setShowSecurityAlert(true)} className="settings-button-style">
                                Change
                            </button>
                        </div>
                    </div>

                    {/* <div className="flex justify-between w-full">
                        <div>
                            <p className="text-sm text-[#0D0D0D]">Phone number</p>
                            <p className="text-[#8D9091] text-xs">{user.n}</p>
                        </div>

                        <div>
                            <button className="settings-button-style">Change</button>
                        </div>
                    </div> */}

                    {/* <div className="flex justify-between w-full items-center">
                        <div>
                            <p className="text-sm">Country</p>
                            <p className="text-xs text-[#8D9091]">This is your primary location</p>
                        </div>

                        <div>
                            <p className="font-medium text-sm">{user.lo}</p>
                        </div>
                    </div> */}
                </div>
            </SettingsLayout>
        </>
    );
}
