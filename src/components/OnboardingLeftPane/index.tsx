import './style.scss';

import { ReactNode } from 'react';

import { FooterTerms } from '../FooterTerms';
import { LogoContainer } from '../LogoContainer';
import { RightHero } from '../RightHero';

export const OnboardingSplitView = ({
    children,
    heroImage,
}: {
    children: ReactNode;
    artistImage?: string;
    currentPage?: number;
    heroImage: string;
}) => {
    return (
        <>
            <div className="flex-row onboarding">
                <div className="container min-w-[100vw]">
                    <div className="pane _left">
                        <div className="_left-pane">
                            <div className="pane-container">
                                <LogoContainer />
                                <div className="pane-body flex-column">
                                    {children}
                                    <FooterTerms type="terms_only" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <RightHero heroImage={heroImage} />
                </div>
            </div>
        </>
    );
};
