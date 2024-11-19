import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './style.scss'
import ExecutiveIcon from '../../assets/executive-star.png'
// import CreativeIcon from '../../assets/medal-star.png'
import VendorIcon from '../../assets/briefcase.png'
import RightArrow from '../../assets/arrow-right.png'

import { useState } from 'react';
import { IUserType } from '../../interfaces';
import { FooterTerms } from '../../components/FooterTerms';

interface UserTypeProps {
    description: string
    title: string
    icon: string
    setSelectedUserType: () => void
    selected: boolean
}

const UserType = (props: UserTypeProps) => {
    return (
        <>
            <div className="usertype"
                onClick={props.setSelectedUserType}
            >
                <div className="icon">
                    <img src={props.icon} alt={props.title} />
                </div>
                <div className="details">
                    <p id='title'>{props.title}</p>
                    <p className="description">
                        {props.description}
                    </p>
                </div>
                <div className="button-area">
                    <input
                        type='radio'
                        className="select"
                        checked={props.selected} />
                </div>
            </div >
        </>
    )
}

export const SelectUserType = () => {
    const [userType, setUserType] = useState<IUserType | undefined>()
    const navigate = useNavigate()

    return (
        <div className="user-type flex-column">
            <div className="_container">
                <div className="logo-container">
                    <img className="logo" alt="Union" src={Logo} />
                </div>
                <div className="content">
                    <div className="welcome">
                        <p className="header">Select your user type</p>
                        <p className="description"> Choose the user group you belong to</p>
                    </div>
                    <div className="form flex">
                        <div className="_info-section">
                            <UserType
                                title='Executive'
                                description='Top tier member, can mentor, can create events, can create masterclasses'
                                icon={ExecutiveIcon}
                                setSelectedUserType={() => setUserType('executive')}
                                selected={userType === 'executive'} />
                            <UserType
                                title='Vendor'
                                description='Top tier member, can mentor, can create events, can create masterclasses'
                                icon={VendorIcon}
                                setSelectedUserType={() => setUserType('vendor')}
                                selected={userType === 'vendor'} />
                        </div>
                    </div>

                    <div className="submit-area" >
                        <div className="frame"
                            style={{
                                backgroundColor: userType ? '#f04950' : '#E5E5E5'
                            }}
                            onClickCapture={() => {
                                if (userType) {
                                    navigate('/user-info/' + userType)
                                }
                            }}>
                            <div className="text-wrapper-3">Proceed</div>
                            <img className="img" alt="Continue" src={RightArrow} />
                        </div>
                        <div className='flex-row centralize-y' onClick={() => navigate(-1)}>
                            <p className="" style={{ textDecoration: 'underline', fontSize: '0.9rem', color: 'grey', cursor: 'pointer' }}> {"Cancel"}</p>
                        </div>
                    </div>
                </div>
                <div className='flex-row' style={{ maxWidth: '1200px', padding: '0 20px' }}>
                    <FooterTerms type='terms_with_copyright' />
                </div>
            </div>
        </div>
    );
};
