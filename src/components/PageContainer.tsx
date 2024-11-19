import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackBlack from '../assets/arrow-left.svg';

interface IPageContainer {
    title?: string;
    children: React.ReactNode;
    back?: boolean;
    subTitle?: string;
    rightContent?: React.ReactNode;
}

export default function PageContainer({ title, children, back, subTitle, rightContent }: IPageContainer) {
    const navigate = useNavigate();

    const goBack = () => {
        back && navigate(-1);
    };

    return (
        // <div className="px-3 h-full min-h-screen pt-6 md:px-9 xl:px-2  md:py-[67px] w-full xl:max-w-[1020px]  2xl:max-w-[1280px] mx-auto relative">
        //     <div className="flex items-center justify-center bg-red-500 md:justify-between w-full mb-6">
        //         <div className="flex items-center justify-center gap-5 " onClick={goBack} role={back ? 'button' : 'group'}>
        //             {back && <img src={ArrowBackBlack} alt="arrow back" className="w-6 h-6" />}
        //             <div className="flex flex-col justify-center gap-3 ">
        //                 {title && (
        //                     <h2 className="text-xl md:text-2xl  text-center md:text-left font-semibold leading-6 text-textPrimary md:block">
        //                         {title}
        //                     </h2>
        //                 )}
        //                 {subTitle && <p className="font-medium text-lightGray-2">{subTitle}</p>}
        //             </div>
        //         </div>
        //         <div className="ml-auto bg-green-500">{rightContent}</div>
        //     </div>
        //     {children}
        // </div>

        <div className=" px-3 h-full min-h-screen pt-6 md:px-9 xl:px-2 md:py-[67px] w-full sm:max-w-[768px] md:max-w-[1020px] 2xl:max-w-[1280px] mx-auto ">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full mb-6">
                <div className="sticky flex items-center md:gap-7" onClick={goBack} role={back ? 'button' : 'group'}>
                    {back && <img src={ArrowBackBlack} alt="arrow back" className="w-6 h-6 absolute left-2 md:relative" />}
                    <div className="flex flex-col justify-center items-center md:items-start gap-3">
                        {title && <h2 className="text-xl md:text-2xl text-center md:text-left font-semibold leading-6 text-textPrimary">{title}</h2>}
                        {subTitle && <p className="font-medium text-lightGray-2 text-center md:text-left">{subTitle}</p>}
                    </div>
                </div>
                <div className="ml-auto mt-2 md:mt-0 absolute right-3 md:relative">{rightContent}</div>
            </div>
            {children}
        </div>
    );
}
