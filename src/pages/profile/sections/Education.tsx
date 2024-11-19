import DateUtil from '../../../utils/date';
import { CompleteProfileButton } from '../CompleteProfileButton';
import { NoRecord } from '..';
import MilestoneMentor from '../../../assets/milestone-mentor.png'
import { useState } from 'react';
import './style.scss'
import SchoolIcon from '../../../assets/school_icon.svg'
import { Circle } from '../../../components/Circle';

export const Education = ({ schools, view, demo }: {
    schools?: {
        icon: string; title: string; description: string; date: `${string} - ${string}`;
    }[];
    demo?: string;
    view: 'owner' | 'user';
}) => {
    const [showAll, setShowAll] = useState(false)

    const demoSchools = [
        {
            icon: MilestoneMentor,
            title: 'Milestone Mentor',
            description: 'Milestone Mentor',
            date: '2020 - 2021' as const,
        },
        {
            icon: MilestoneMentor,
            title: 'Milestone Mentor',
            description: 'Milestone Mentor',
            date: '2020 - 2021' as const,
        },
        {
            icon: MilestoneMentor,
            title: 'Milestone Mentor',
            description: 'Milestone Mentor',
            date: '2020 - 2021' as const,
        },
    ]

    schools = demo ? demoSchools : schools

    return (
        <div className="education section " >
            <div className="schools-header flex-row centralize-y">
                <div className="header-with-count flex-row centralize-y">
                    <p className="section-header">Education</p>
                    {schools && <p className="count">{schools.length}</p>}
                </div>

                <div className='flex-row' style={{ justifyContent: 'right', cursor: 'pointer' }}>
                    {schools && schools?.length > 3 && !showAll && <p className="see-all see-all-section-header" onClick={() => setShowAll(true)}>{'See all >'}</p>}
                    {showAll && <p className="see-all see-all-section-header" onClick={() => setShowAll(false)}>{'See less >'}</p>}
                </div>
            </div>
            <div className={`${showAll ? '__see_all_scroll' : ''}`}>
                {schools && schools.length !== 0
                    ? (
                        <>
                            {schools.slice(0, showAll ? schools.length : 3).map((school, index) => (
                                <div className="school flex-row centralize-y" key={index}>
                                    <div className="">
                                        <Circle width={50} height={50} pd={3} img={SchoolIcon} bg='#ffd12d' noBorder noMg style={{ marginRight: '10px' }} />
                                    </div>
                                    <div className="details">
                                        <p className="title">{school.title}</p>
                                        <p className="description">{school.description}</p>
                                    </div>
                                    <p className="date">{school.date.split(' - ').map((time) => {
                                        if (time === 'null' || time === 'undefined' || time === 'NaN' || time === 'Invalid Date') return 'Present'
                                        return DateUtil.getYearFromISOString(time)
                                    }).join(' - ')}</p>
                                </div>
                            ))}
                        </>
                    )
                    : (
                        view === 'owner' ? <CompleteProfileButton stageToStartFrom='education' /> : <NoRecord />
                    )}

            </div>
        </div >
    );
};
