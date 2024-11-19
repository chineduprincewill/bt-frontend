import LinkIcon from '../../assets/link.svg';
import SecurityIcon from '../../assets/security.svg';
import { Link } from 'react-router-dom';
import SettingsLayout from './SettingsLayout';

export default function SettingsSecurity() {
    return (
        <SettingsLayout
            pageHeader="Security and Account access"
            subtitle="Manage your account’s security and keep track of your account’s usage including apps that you have connected to your account."
        >
            <div className="md:pt-5 space-y-7">
                <div>
                    <Link to="/settings-new/blocked-users">
                        <div className="flex items-start gap-5 cursor-pointer">
                            <img src={SecurityIcon} alt="edit profile icon" />
                            <div className="space-y-2">
                                <p>Security</p>
                                <p className="text-[#787878] text-xs">Manage your account’s security</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={LinkIcon} alt="edit account icon" />
                    <div className="space-y-2">
                        <p>Connected accounts</p>
                        <p className="text-[#787878] text-xs">Manage accounts connected to Blkat</p>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
