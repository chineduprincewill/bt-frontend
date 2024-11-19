import { useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { RootState } from '../../state/store';
import { NavBar } from '../NavBar';
import ProfileDropdown from '../ProfileDropdown';
import SideBarMobile from '../SidebarMobile';
import { useGlobalMessaging } from './MessagingHook';
import { ROUTE_PATTERN_TITLES } from './NavigationContainerRoutes';

/**
 * Maps the current route pattern to the title to be used for the navigation container
 */
const useRouteNavigationTitle = () => {
    const { pathname } = useLocation();
    const params = useParams();

    const refinedPathname = Object.entries(params).reduce((path, [key, value]) => path.replace(`/${value}`, `/:${key}`), pathname);

    const title = refinedPathname in ROUTE_PATTERN_TITLES ? ROUTE_PATTERN_TITLES[refinedPathname as keyof typeof ROUTE_PATTERN_TITLES] : '';

    return title;
};

const NavigationContainer = () => {
    const { showProfileDropdown } = useSelector((state: RootState) => state.headerSidebar);
    const { user: loggedUser } = useSelector((state: RootState) => state.createAccount);
    const pageTitle = useRouteNavigationTitle();
    const { isFetching } = useGlobalMessaging();
    const { user } = useSelector((state: RootState) => state.createAccount);
    const isVisible = useSelector((state: RootState) => state.mainSidebar.isVisible);

    return (
        <>
            {/* @ts-ignore */}
            {showProfileDropdown && <ProfileDropdown user={loggedUser} />}
            <div className="w-screen">
                {/* @ts-ignore */}
                <NavBar user={user} pageTitle={pageTitle} />
                <div className="flex w-screen gap-0 ">
                    <SideBarMobile />
                    <div className="w-full">
                        <div className="w-full ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavigationContainer;
