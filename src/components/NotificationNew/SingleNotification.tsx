import { useState, useEffect } from 'react';
import Dot from '../../assets/dot.svg';
import CommentIcon from '../../assets/comment-icon.png';
import { useMarkNotificationAsReadMutation } from '../../api/notificationApi';
import { format, isToday, isYesterday } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotificationModal } from '../../state/slices/notificationSlice';
import NewPost from '../../assets/new-post-icon.png';
import DefaultImage from '../../assets/default-image.svg';

interface NotificationProps {
    id: string;
    message: string;
    read: boolean;
    time: string;
    title: string;
    link: string;
    icon: string;
    count: string | number;
}

export default function SingleNotification({ icon, message, read, time, id, title, link, count }: NotificationProps) {
    const [markNotificationAsRead, { isLoading: markingNotificationLoading, isSuccess: markingNotificationSuccess }] =
        useMarkNotificationAsReadMutation();
    const [isRead, setIsRead] = useState(read);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (markingNotificationSuccess) {
            setIsRead(true);
        }
    }, [markingNotificationSuccess, setIsRead, markingNotificationLoading, read]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        let formattedDate = format(date, 'PPPP');

        if (isToday(date)) {
            formattedDate = `Today at ${format(date, 'p')}`;
        } else if (isYesterday(date)) {
            formattedDate = `Yesterday at ${format(date, 'p')}`;
        }

        return formattedDate;
    };

    const routeToPost = async (id: string, link: string) => {
        try {
            await markNotificationAsRead(id).unwrap();
            console.log('Notification read');
            navigate(`/feeds/${link}`);
            // dispatch(setNotificationModal({ show: false }));
        } catch (error) {
            console.error('Error in handling notification action', error);
        }
    };

    const routeToMentorship = async (id: string, link: string) => {
        try {
            // setIsRead(true);
            await markNotificationAsRead(id).unwrap();
            console.log('Notification read');
            navigate(`/mentorship/booking/${link}`);
            // dispatch(setNotificationModal({ show: false }));
        } catch (error) {
            console.error('Error in handling notification action', error);
        }
    };

    const routeToMentorshipRequest = async (id: string, link: string) => {
        try {
            // setIsRead(true);
            await markNotificationAsRead(id).unwrap();
            console.log('Notification read');
            navigate(`/mentorship/booking/${link}`);
            // dispatch(setNotificationModal({ show: false }));
        } catch (error) {
            console.error('Error in handling notification action', error);
        }
    };

    const handleNotificationClick = () => {
        if (title === 'NEW-MENTORSHIP-ACCEPTED') {
            routeToMentorship(id, link);
        } else if (title === 'NEW-MENTORSHIP-REQUEST') {
            routeToMentorshipRequest(id, link);
        } else if (title === 'NEW-POST' || title === 'NEW-REACTION' || title === 'NEW-COMMENT') {
            routeToPost(id, link);
        } else {
            console.log('Title not handled yet');
        }
    };

    const countNumber = Number(count);
    const modifiedMessage = countNumber > 5 ? `${message} with ${countNumber} others` : message;

    return (
        <div onClick={handleNotificationClick} className="hover:bg-gray-200 hover:rounded-lg cursor-pointer flex gap-3 items-start p-2 z-[111110] ">
            <div className="flex gap-4 justify-center items-center relative ">
                {!isRead && <img src={Dot} alt="dot" className="absolute left-0" />}
                <div className="rounded-full overflow-hidden w-10 ml-3">
                    <img src={icon === null || icon === '' ? DefaultImage : icon} alt="icon" className=" object-cover w-full h-full" />
                </div>
            </div>
            <div className="w-full h-full space-y-3">
                <p>{modifiedMessage}</p>
                <p className="text-[#878787] text-xs">{formatDate(time)}</p>
                {(title === 'NEW-MENTORSHIP-ACCEPTED' || title === 'NEW-MENTORSHIP-REQUEST') && (
                    <div onClick={handleNotificationClick}>
                        <button className="border-black border-solid border rounded-3xl px-7 py-2 text-xs">View Detail</button>
                    </div>
                )}
            </div>
        </div>
    );
}
