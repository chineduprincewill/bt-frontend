import { Outlet } from 'react-router-dom';

import SettingsSidebar from '../SettingsSidebar';

export default function SettingsPageLayout() {
    return (
        <div className="flex items-start bg-[#EFEFEF] h-full pb-5">
            <SettingsSidebar />
            <div className="w-full min-h-screen h-full bg-[#EFEFEF] md:pt-12 md:pl-12">
                <Outlet />
            </div>
        </div>
    );
}
