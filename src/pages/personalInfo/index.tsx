import Logo from '../../assets/logo.png';
import RightArrow from '../../assets/arrow-right.png';
import './style.scss';
import { Link } from 'react-router-dom';
import WhiteCheckIcon from '../../assets/thick-check-white.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { FooterTerms } from '../../components/FooterTerms';

interface InfoStageProps {
    status: 'completed' | 'uncompleted';
    title: string;
}
const InfoStage = (props: InfoStageProps) => {
    return (
        <>
            <div className="stage-container">
                {props.status == 'completed' ? (
                    <div className="circle completed flex-row">
                        <img src={WhiteCheckIcon} alt="Check" />
                    </div>
                ) : (
                    <div className="circle uncompleted flex-row">
                        <img src={WhiteCheckIcon} alt="Check" />
                    </div>
                )}
                <p className="title" id="title" style={{ color: 'black' }}>
                    {props.title}
                </p>
            </div>
        </>
    );
};

export const PersonalInfo = () => {
    const { user } = useSelector((state: RootState) => state.createAccount);
    return (
        <div className="personal-info">
            <div className="max-width">
                <div className='flex-row centralize-x' style={{ paddingTop: '20px' }}>
                    <img className="logo" alt="Union" src={Logo} />
                </div>
                <div className="container">
                    <div className="content">
                        <div className="form flex-row">
                            <div className="_circle">
                                <img
                                    className="welcome-check"
                                    src={WhiteCheckIcon}
                                    alt=""
                                />
                            </div>
                            <div className="header">
                                <p className="_welcome">Welcome to BlackAt</p>
                                <p className="name">
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>
                            <div className="line"></div>
                            <p className="steps">
                                In three steps we plan to evolve your business
                                acumen to a whole new level
                            </p>
                            <div className="info-section flex-column">
                                <InfoStage
                                    status="completed"
                                    title="Your personal Information"
                                />
                                <InfoStage
                                    status="uncompleted"
                                    title="Determine your user type"
                                />
                                <InfoStage
                                    status="uncompleted"
                                    title="Personalizing experience from your user type"
                                />
                            </div>
                        </div>
                        <div className="form2 flex-row centralize-x">
                            <Link
                                to="/profile"
                                onClick={() => {
                                    console.log({
                                        accessToken: localStorage.getItem('accessToken'),
                                        refreshToken: localStorage.getItem('refreshToken'),
                                    })
                                }}
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <div className="frame">
                                    <div className="text-wrapper-3">
                                        Lets get started
                                    </div>
                                    <img src={RightArrow} alt="" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    style={{ marginTop: 'auto', padding: '0 20px' }}
                >
                    <FooterTerms type="terms_with_copyright" />
                </div>
            </div>
        </div>
    );
};
