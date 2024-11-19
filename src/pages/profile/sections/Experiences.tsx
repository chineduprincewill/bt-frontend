import './style.scss';

import { useState } from 'react';

import { NoRecord } from '../';
import ProfileIcon2 from '../../../assets/profile2.png';
import { Circle } from '../../../components/Circle';
import DateUtil from '../../../utils/date';
import { CompleteProfileButton } from '../CompleteProfileButton';

export const Experiences = ({
    experiences,
    view,
    demo,
}: {
    view: 'owner' | 'user';
    experiences?: {
        title: string;
        jobType: string;
        duration: `${string} - ${string}`;
        place: string;
        logo?: string;
    }[];
    demo?: string;
}) => {
    const [showAll, setShowAll] = useState(false);

    const demoExperiences = [
        {
            title: 'Software Developer',
            jobType: 'Full-time',
            duration: '2020 - 2021' as const,
            place: 'Facebook',
            logo: ProfileIcon2,
        },
        {
            title: 'Software Developer',
            jobType: 'Full-time',
            duration: '2020 - 2021' as const,
            place: 'Facebook',
            logo: ProfileIcon2,
        },
        {
            title: 'Software Developer',
            jobType: 'Full-time',
            duration: '2020 - 2021' as const,
            place: 'Facebook',
            logo: ProfileIcon2,
        },
    ];

    experiences = demo ? demoExperiences : experiences;

    return (
        <div className="experiences section">
            <div className="flex-row experiences-header centralize-y">
                <div className="flex-row header-with-count centralize-y">
                    <p className="section-header">Experience</p>
                    {experiences && <p className="count">{experiences.length}</p>}
                </div>
                <div className="flex-row" style={{ justifyContent: 'right', cursor: 'pointer' }}>
                    {experiences && experiences?.length > 3 && !showAll && (
                        <p className="see-all see-all-section-header" onClick={() => setShowAll(true)}>
                            {'See all >'}
                        </p>
                    )}
                    {showAll && (
                        <p className="see-all see-all-section-header" onClick={() => setShowAll(false)}>
                            {'See less >'}
                        </p>
                    )}
                </div>
            </div>
            <div className={`${showAll ? '__see_all_scroll' : ''}`}>
                {experiences && experiences.length !== 0 ? (
                    <>
                        {experiences.slice(0, showAll ? experiences.length : 3).map((experience, index) => (
                            <div className="flex-row experience centralize-y" key={index}>
                                <div className="flex-row logo centralize-x centralize-y" style={{}}>
                                    {/* <img className="school-icon" src={ProfileIcon2} alt="" /> */}
                                    <Circle bg="white" height={50} width={50} key={1} img={ProfileIcon2} pd={0} />
                                </div>
                                <div className="details">
                                    <p className="!mt-0 title">
                                        {experience.title} - <span>{experience.jobType}</span>
                                    </p>
                                    <p className="place">{experience.place}</p>
                                    <p
                                        className="date"
                                        style={{
                                            color: 'grey',
                                        }}
                                    >
                                        {experience.duration
                                            .split(' - ')
                                            .map((time) => {
                                                if (time === 'null' || time === 'undefined' || time === 'NaN' || time === 'Invalid Date')
                                                    return 'Present';
                                                return DateUtil.getYearFromISOString(time);
                                            })
                                            .join(' - ')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                ) : view === 'owner' ? (
                    <CompleteProfileButton stageToStartFrom="experience" />
                ) : (
                    <NoRecord />
                )}
            </div>
        </div>
    );
};
