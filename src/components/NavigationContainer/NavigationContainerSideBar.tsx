import { useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { RootState } from '../../state/store';
import { NavBar } from '../NavBar';
import ProfileDropdown from '../ProfileDropdown';
import SideBarMobile from '../SidebarMobile';
import SideBar from '../SideNavigation';
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

const NavigationContainerWithoutSideBar = () => {
    const { showProfileDropdown } = useSelector((state: RootState) => state.headerSidebar);
    const { user: loggedUser } = useSelector((state: RootState) => state.createAccount);
    const pageTitle = useRouteNavigationTitle();
    // const [active, setActive] = useState('');
    const { user } = useSelector((state: RootState) => state.createAccount);
    const isVisible = useSelector((state: RootState) => state.mainSidebar.isVisible);
    console.log(isVisible);

    // Function to dynamically apply Tailwind classes based on active state
    // const activeStyle = (itemName: string) => {
    //     return `cursor-pointer px-4 py-2 rounded-full ${active === itemName ? 'bg-gray-200' : 'bg-transparent'}`;
    // };

    return (
        <>
            {/* {showProfileDropdown && <ProfileDropdown user={loggedUser} />} */}
            <div className="w-screen ">
                {/* <NavBar user={user} pageTitle={pageTitle} /> */}
                <div className="flex-shrink-0 hidden md:flex md:w-1/5 lg:w-1/4 md:overflow-hidden">
                    <SideBar />
                </div>

                <div className="flex w-full gap-0 ">
                    {/* <div className="w-full"> */}
                    <div className="w-full ">
                        <Outlet />
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </>
    );
};

export default NavigationContainerWithoutSideBar;
