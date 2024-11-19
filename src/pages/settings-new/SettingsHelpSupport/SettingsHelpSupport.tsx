import { Link } from 'react-router-dom';
import FAQIcon from '../../../assets/faq-icon.svg';
import SupportIcon from '../../../assets/24-support.svg';
import DataSharingIcon from '../../../assets/data-sharing.svg';
import SettingsLayout from '../SettingsLayout';

export default function SettingsHelpSupport() {
    return (
        <SettingsLayout pageHeader="Help and Support" subtitle="What can we help you with?">
            <div className="md:pt-2 space-y-5 md:space-y-7">
                <Link className="flex items-start gap-5 cursor-pointer" to="/settings-new/help/faqs">
                    <img src={FAQIcon} alt="edit profile icon" />
                    <div className="space-y-2">
                        <p>FAQs</p>
                        <p className="text-[#787878] text-xs">Quick access to frequently asked questions.</p>
                    </div>
                </Link>

                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={SupportIcon} alt="edit account icon" />
                    <div className="space-y-2">
                        <p>Contact Support</p>
                        <p className="text-[#787878] text-xs">Direct contact form for support issues.</p>
                    </div>
                </div>

                <div className="flex items-start gap-5 cursor-pointer">
                    <img src={DataSharingIcon} alt="edit account icon" />
                    <div className="space-y-2">
                        <p>Data sharing</p>
                        <p className="text-[#787878] text-xs">Provide feedback on the platform's features or services.</p>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
