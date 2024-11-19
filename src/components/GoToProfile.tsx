import React, { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../state/store';

interface GoToProfileProps {
    username?: string;
    userId?: string;
    children: React.ReactNode;
}

export const GoToProfile = ({ children, username, userId }: GoToProfileProps) => {
    const { username: loggedInUsername } = useAppSelector((state) => state.createAccount.user);

    const redirectLink = username === loggedInUsername ? '/profile' : `/userprofile/${userId}/${username}`;

    return (
        <Link to={redirectLink} className="cursor-pointer">
            {children}
        </Link>
    );
};
