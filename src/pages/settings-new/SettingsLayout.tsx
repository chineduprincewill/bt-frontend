import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../assets/back-mobile.svg';
import { toggleSettingsMenuVisibility } from '../../state/slices/settingsSidebar';
import { useDispatch } from 'react-redux';

interface Props {
    children: ReactNode;
    pageHeader: string;
    subtitle: string;
}

export default function SettingsLayout({ children, pageHeader, subtitle }: Props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoBack = () => {
        if (location.pathname === '/settings-new/') {
            dispatch(toggleSettingsMenuVisibility());
        } else {
            navigate(-1);
        }
    };
    return (
        <div>
            <div className="bg-white md:rounded-xl px-5 md:px-12 pt-12 pb-20 w-screen min-h-screen md:min-h-full max-h-[100%] md:h-full md:w-[850px] border-solid border border-[#E0E0E0]">
                <div className="border-solid md:border-[#EFEFEF] md:border-b pb-5">
                    <div>
                        <div className="flex gap-12 border-solid md:border-none border-b  border-[#E0E0E0] py-2">
                            <img src={BackButton} onClick={handleGoBack} className="md:hidden " />
                            <h2 className="text-xl md:text-2xl font-semibold text-black">{pageHeader}</h2>
                        </div>
                        <p className="text-[#787878] text-xs pt-3">{subtitle} </p>
                    </div>
                </div>

                <div className="md:pt-5 space-y-2 md:space-y-5">{children}</div>
            </div>
            <div className="w-[388px] md:w-[850px]  flex justify-end">
                <button onClick={handleGoBack} className="bg-black hidden md:block text-white text-sm mt-5  px-7 py-2 rounded-3xl">
                    Back
                </button>
            </div>
        </div>
    );
}
