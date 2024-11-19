import { useState } from 'react';

import { AbsoluteModal } from '../AbsoluteModal';

export const AboutMe = ({ about }: { about: string; }) => {
    const [showBioModal, setShowBioModal] = useState(false);

    if (!about) return null;

    return (
        <>
            <div className="about-me section">
                <p className="section-header"> About me</p>

                {about?.split(' ').length > 20 ? (
                    <p className="description leading-5">
                        {about?.split(' ').slice(0, 20).join(' ')} ...
                        <span
                            className="__see-more"
                            onClick={() => {
                                setShowBioModal(true);
                            }}
                        >
                            {' '}
                            See more
                        </span>
                    </p>
                ) : (
                    <p className="description leading-6">{about}</p>
                )}

                <div className="expertise">
                    <p className="mb-4 font-bold uppercase text-sm">Expertise</p>
                    <div className="flex-row areas centralize-y">
                        <p className="areas-of-expertise">Advertising</p>
                        <p className="areas-of-expertise">Creative Agency</p>
                        <p className="areas-of-expertise">Design</p>
                    </div>
                </div>
            </div>

            <AbsoluteModal show={showBioModal} setShow={setShowBioModal} heading="About Me" text={about} />
        </>
    );

};
