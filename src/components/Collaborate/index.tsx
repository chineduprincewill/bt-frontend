import './style.scss';

import { ReactNode } from 'react';

import ArrowRight from '../../assets/arrow-right-dark.svg';
import Collab from '../../assets/link-circle.svg';

interface Props {
    title: string;
    subtitle: string;
    children?: ReactNode;
    onClick: () => void;
}

export const Collaborate: React.FC<Props> = ({ title, subtitle, onClick, children = <img src={Collab} height={50} width={50} /> }) => {
    return (
        <div className="collab" onClick={onClick}>
            <div className="row">
                {children}

                <div>
                    <p className="title2">{title}</p>
                    <p className="subtitle">{subtitle}</p>
                </div>
            </div>

            <img src={ArrowRight} />
        </div>
    );
};
