import { CompleteProfileButton } from '../CompleteProfileButton';
import { NoRecord } from '..';
import MilestoneMentor from '../../../assets/milestone-mentor.png'
import DateUtil from '../../../utils/date';

export const Achievements = ({ achievements, view, demo }: {
    achievements?: {
        icon: string; title: string; description: string; date: string;
    }[];
    view: 'owner' | 'user';
    demo?: string;
}) => {
    const demoAchievements = [
        {
            icon: MilestoneMentor,
            title: 'Milestone Mentor',
            description: 'Milestone Mentor',
            date: '2020 - 2021',
        },
        {
            icon: MilestoneMentor,
            title: 'Milestone Mentor',
            description: 'Milestone Mentor',
            date: '2020 - 2021',
        },
        {
            icon: MilestoneMentor,
            title: 'Milestone Mentor',
            description: 'Milestone Mentor',
            date: '2020 - 2021',
        },
    ]

    achievements = demo ? demoAchievements : achievements

    return (
        <div className="achievements section ">
            <div className="achievements-header flex-row centralize-y">
                <div className="header-with-count flex-row centralize-y">
                    <p className="section-header">Achievements</p>
                    {achievements && <p className="count">{achievements.length}</p>}
                </div>

                <p className="see-all whitespace-nowrap">{'See all >'}</p>
            </div>
            {achievements && achievements.length !== 0
                ? (
                    <>
                        {achievements.map((achievement, index) => (
                            <div className="achievement flex-row centralize-y" key={index}>
                                <img className="achievement-icon" src={achievement.icon} alt="" />
                                <div className="details">
                                    <p className="title">{achievement.title}</p>
                                    <p className="description">{achievement.description}</p>
                                </div>
                                <p className="date">{achievement.date.split(' - ').map((time) => {
                                    if (time === 'null' || time === 'undefined' || time === 'NaN' || time === 'Invalid Date') return 'Present'
                                    return DateUtil.getYearFromISOString(time)
                                }).join(' - ')}</p>
                            </div>
                        ))}
                    </>
                )
                : (
                    view === 'owner' ? <CompleteProfileButton /> : <NoRecord />
                )}

        </div>
    );
};
