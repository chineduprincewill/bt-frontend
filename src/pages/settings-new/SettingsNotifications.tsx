import ChangePasswordIcon from '../../assets/key.svg';
import AccountEditIcon from '../../assets/user-edit.svg';
import EditProfileIcon from '../../assets/user.svg';

export default function SettingsNotifications() {
    return (
        <div className="bg-white rounded-xl p-12 w-[388px] md:w-[850px] border-solid border border-[#E0E0E0]">
            <div className="border-solid border-[#EFEFEF] border-b pb-5">
                <div>
                    <h2 className="font-semibold text-2xl text-black">Notification</h2>
                    <p className="text-[#787878] text-xs">Set the type of notifications you get about jobs, connections and recommendations.</p>
                </div>
            </div>

            <div className="space-y-7 pt-12">
                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={EditProfileIcon} alt="edit profile icon" />
                    <div className="space-y-2">
                        <p>Push Notification</p>
                        <p className="text-[#787878] text-xs">Manage mobile push notification preferences.</p>
                    </div>
                </div>

                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={AccountEditIcon} alt="edit account icon" />
                    <div className="space-y-2">
                        <p>Email notifications</p>
                        <p className="text-[#787878] text-xs">Customize email notifications for messages, invitations, and other alerts.</p>
                    </div>
                </div>

                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={ChangePasswordIcon} alt="edit account icon" />
                    <div className="space-y-2">
                        <p>SMS notifications</p>
                        <p className="text-[#787878] text-xs">Configure SMS alerts for important updates.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
