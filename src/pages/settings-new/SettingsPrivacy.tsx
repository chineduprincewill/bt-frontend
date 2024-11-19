import React from 'react';

import AccountEditIcon from '../../assets/user-edit.svg';
import EditProfileIcon from '../../assets/user.svg';
import SettingsSidebar from './SettingsSidebar';

export default function SettingsPrivacy() {
    return (
        <div className="bg-white rounded-xl p-12 w-[388px] md:w-[850px] border-solid border border-[#E0E0E0]">
            <div className="border-solid border-[#EFEFEF] border-b pb-5">
                <div>
                    <h2 className="font-semibold text-2xl text-black">Privacy</h2>
                    <p className="text-[#787878] text-xs">Manage informations you see and share on your feeds.</p>
                </div>
            </div>

            <div className="space-y-7 pt-12">
                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={EditProfileIcon} alt="edit profile icon" />
                    <div className="space-y-2">
                        <p>Profile viewing</p>
                        <p className="text-[#787878] text-xs">Set preferences for who can send messages or connection requests.</p>
                    </div>
                </div>

                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={AccountEditIcon} alt="edit account icon" />
                    <div className="space-y-2">
                        <p>Data sharing</p>
                        <p className="text-[#787878] text-xs">Manage how group invitations are received and from whom.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
