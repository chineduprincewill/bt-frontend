import ArrowRight from '../../../assets/arrow-right_dark.png';
import { CompleteProfileButton } from '../CompleteProfileButton';
import { NoRecord } from '..';
import { useDispatch } from 'react-redux';
import { toggleCommingSoonModal } from '../../../state/slices/commingSoon';

const Activity = ({ icon, title, date }: { icon: string; title: string; date: string; }) => {
    const dispatch = useDispatch()

    return (
        <div className="activity flex-row centralize-y" onClick={() => dispatch(toggleCommingSoonModal({ show: true }))}>
            <img src={icon} className="activity-icon" alt="" />
            <div className="title">{title}</div>
            <p className="date">{date}</p>
            <div className="open flex-row centralize-x centrlize-y">
                <img src={ArrowRight} alt="" className="open" />
            </div>
        </div>
    );
};
export const Activities = ({ activities, view, demo }: {
    activities?: {
        icon: string; title: string; date: string;
    }[];
    view: 'owner' | 'user';
    demo?: string
}) => {
    demo
    const dispatch = useDispatch()

    return (
        <div className="activities section">
            <div className="activities-header flex-row centralize-y">
                <div className="header-with-count flex-row centralize-y">
                    <p className="section-header">Activities</p>
                    {activities && <div className="count flex-row centralize-x">{activities.length}</div>}
                </div>
                <p onClick={() => dispatch(toggleCommingSoonModal({ show: true }))} className="see-all">{'See all >'}</p>
            </div>
            {activities && activities.length !== 0
                ? (
                    <>
                        {activities.map((activity, index) => (
                            <Activity
                                key={index}
                                icon={activity.icon}
                                title={activity.title}
                                date={activity.date} />
                        ))}
                    </>
                )
                : (
                    view === 'owner' ? <CompleteProfileButton /> : <NoRecord />
                )}
        </div>
    );
};
