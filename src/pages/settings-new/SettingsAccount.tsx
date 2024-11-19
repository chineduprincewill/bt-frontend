import { Link } from 'react-router-dom';

import CancelIcon from '../../assets/cancel.svg';
import ChangePasswordIcon from '../../assets/key.svg';
import AccountEditIcon from '../../assets/user-edit.svg';
import EditProfileIcon from '../../assets/user.svg';
import SettingsLayout from './SettingsLayout';

export default function SettingsAccount() {
    return (
        <SettingsLayout
            pageHeader="My Account"
            subtitle="See all editable information about your account or learn about account deactivation options."
        >
            <div className="space-y-3 md:space-y-7 md:pt-5">
                <Link to="/settings-new/edit-profile">
                    <div className="flex items-start gap-5 cursor-pointer">
                        <img src={EditProfileIcon} alt="edit profile icon" />
                        <div className="space-y-2">
                            <p className="text-sm md:text-lg">Edit Profile</p>
                            <p className="text-[#787878] text-xs">See your profile information like name, location and date of birth.</p>
                        </div>
                    </div>
                </Link>

                <div>
                    <Link to="/settings-new/account-information">
                        <div className="flex items-start gap-5 cursor-pointer">
                            <img src={AccountEditIcon} alt="edit account icon" />
                            <div className="space-y-2">
                                <p className="text-sm md:text-lg">Account Information</p>
                                <p className="text-[#787878] text-xs">See your account information like username, email, phone number, country</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/settings-new/change-password">
                        <div className="flex items-start gap-5 cursor-pointer">
                            <img src={ChangePasswordIcon} alt="edit account icon" />
                            <div className="space-y-2">
                                <p className="text-sm md:text-lg">Change Password</p>
                                <p className="text-[#787878] text-xs">Change your password</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* <div>
                    <Link to="/settings-new/close-account">
                        <div className="flex items-start gap-5 cursor-pointer">
                            <img src={CancelIcon} alt="edit account icon" />
                            <div className="space-y-2">
                                <p className="text-sm md:text-lg">Close Account</p>
                                <p className="text-[#787878] text-xs">Discover the options to deactivate or permanently delete your account.</p>
                            </div>
                        </div>
                    </Link>
                </div> */}

                {/* <div>
                    <p className="font-semibold text-red-500 text-xs">Deactivate account</p>
                </div> */}
            </div>
        </SettingsLayout>
    );
}
