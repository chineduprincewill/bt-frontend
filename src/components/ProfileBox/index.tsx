import { ReactNode } from 'react';
import './style.scss';

import ArrowRight from '../../assets/arrow-right.svg';
import Message from '../../assets/MessageIcon.svg';

interface Props {
    title: string;
    subtitle?: string;
    children?: ReactNode;
    onClick: () => void
}

export const ProfileBox: React.FC<Props> = ({
    title,
    subtitle,
    onClick,
    children = <img src={Message} height={50} width={50} />,
}) => {
    return (
        <div className="container2" onClick={onClick}>
            <div className="row">
                {children}

                <div>
                    <p className="title">{title}</p>
                    <p className="subtitle">{subtitle}</p>
                </div>
            </div>

            <img src={ArrowRight} />
        </div>
    );
};
