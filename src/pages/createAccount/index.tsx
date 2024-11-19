import EnterIcon from '../../assets/enter.png';
import ArrowRight from '../../assets/arrow-right.png';
import './style.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroImage from '../../assets/hero11.png';
import { useDispatch } from 'react-redux';
import { setCreateAccountDetails } from '../../state/slices/createAccount';
import { OnboardingSplitView } from '../../components/OnboardingLeftPane';

const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const CreateAccount = () => {
    const currentPage = 1;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [validated, setValidated] = useState(false);

    const proceedToSelectName = () => {
        if (validated) {
            dispatch(setCreateAccountDetails({ email: email }));
            navigate('/name');
        }
    };

    useEffect(() => {
        validateEmail(email) ? setValidated(true) : setValidated(false);
    }, [email]);

    return (
        <div className="create-account">
            <OnboardingSplitView heroImage={HeroImage} key={1}>
                <div className="content">
                    <div className="label">
                        <p className="step">
                            <span className="text-wrapper">
                                Step {currentPage}
                            </span>
                            <span className="span"> / 5</span>
                        </p>
                    </div>
                    <div className="welcome">
                        <div className="header">Create new account</div>
                        <p className="p">Get started with your email</p>
                    </div>
                    <div className="form">
                        <div className="overlap">
                            <div className="overlap-group">
                                <input
                                    className="text-wrapper"
                                    placeholder="Enter your email"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            proceedToSelectName();
                                        }
                                    }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="submit-area flex-row centralize-y centralize-x">
                            <div
                                className="frame flex-row centralize-x centralize-y"
                                style={{
                                    backgroundColor: !validated
                                        ? '#ccc'
                                        : '#f04950',
                                    cursor: !validated
                                        ? 'not-allowed'
                                        : 'pointer',
                                }}
                                onClick={proceedToSelectName}
                            >
                                <div className="text-wrapper-3">
                                    Get started
                                </div>
                                <img
                                    className="img"
                                    alt="Press Enter"
                                    src={ArrowRight}
                                />
                            </div>

                            <div className="group">
                                <div className="text-wrapper-5">
                                    Press enter
                                </div>
                                <img
                                    className="img"
                                    alt="Press Enter"
                                    src={EnterIcon}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="have-acc">
                        <span className="span">Have an account ? </span>
                        <Link
                            to="/login"
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <span
                                className="text-wrapper-4"
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                Sign in
                            </span>
                        </Link>
                    </p>
                </div>
            </OnboardingSplitView>
        </div>
    );
};
