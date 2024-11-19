import EnterIcon from '../../assets/enter.png';
import ArrowRight from '../../assets/arrow-right.png';
// import Check from '../../assets/check.png';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../../assets/hero4.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useSetPasswordMutation } from '../../api/authApi';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { setAuthCredentials } from '../../state/slices/authSlice';
import Spinner from '../../components/Spinner';
// import GreenCheck from '../../assets/green-check_.png';
import { OnboardingSplitView } from '../../components/OnboardingLeftPane';
import { Circle } from '../../components/Circle';
import NewCheck from '../../assets/new-check.svg';

const validatePassword = (passwordToValidate: string) => {
    const isLengthValid =
        passwordToValidate.length >= 6 && passwordToValidate.length <= 12;
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(
        passwordToValidate,
    );
    const hasUppercase = /[A-Z]/.test(passwordToValidate);
    const hasLowercase = /[a-z]/.test(passwordToValidate);
    const hasNumeric = /\d/.test(passwordToValidate);

    return (
        isLengthValid &&
        hasUppercase &&
        hasLowercase &&
        hasNumeric &&
        hasSpecialChar
    );
};

export const SetPassword = () => {
    const { passwordResetToken } = useSelector(
        (state: RootState) => state.auth,
    );
    const { user } = useSelector((state: RootState) => state.createAccount);
    const [updatePassword, { isLoading }] = useSetPasswordMutation();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const dispatch = useDispatch();

    useEffect(() => {
        const isValid =
            validatePassword(password) &&
            validatePassword(confirmPassword) &&
            password === confirmPassword;
        setIsPasswordValid(isValid);
    }, [password, confirmPassword]);

    const handleSubmit = async () => {
        if (!passwordResetToken) {
            toast.error('An error occured');
            return setTimeout(() => {
                navigate('/');
            }, 2000);
        }

        if (!isPasswordValid) return;

        await updatePassword({
            password: password,
            passwordToken: passwordResetToken,
            email: user.email,
        })
            .unwrap()
            .then((res) => {
                dispatch(
                    setAuthCredentials({
                        credentialType: 'basic',
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                    }),
                );
                toast.success(res.message);
                setTimeout(() => {
                    navigate('/personal-info');
                }, 2000);
            })
            .catch((error) => {
                toast.error(
                    error.data?.message ?? error.message ?? 'An error occured',
                );
            });
    };

    useEffect(() => {
        const passwordValidation = [
            password.length >= 6 && password.length <= 12,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password),
            password === confirmPassword && password.length > 0,
        ];
        console.log({ passwordValidation });
        setPasswordValidation(passwordValidation);
    }, [password, confirmPassword]);

    const currentPage = 5;

    // const CheckCircle = (
    //     <Circle width={20} height={20} img={NewCheck} bg="white" pd={0} />
    // );

    return (
        <div className="set-password">
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
                        <div className="header">Select your password</div>
                        <p className="p">Pick a unique password</p>
                    </div>
                    <div className="form">
                        <div className="overlap">
                            <div className="overlap-group">
                                <input
                                    className="text-wrapper"
                                    placeholder="Enter password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSubmit()
                                    }
                                />
                            </div>
                        </div>
                        <div className="overlap">
                            <div className="overlap-group">
                                <input
                                    className="text-wrapper"
                                    placeholder="Confirm password"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    type="password"
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSubmit()
                                    }
                                />
                            </div>
                        </div>
                        <div className="validation-rules">
                            <div className="rule">
                                <Circle
                                    width={15}
                                    height={15}
                                    img={NewCheck}
                                    bg={
                                        passwordValidation[0]
                                            ? '#0fba00'
                                            : '#A9A9A9'
                                    }
                                    noMg
                                    pd={4}
                                />
                                <p style={{ color: passwordValidation[0] ? 'black' : '#A9A9A9', marginLeft: '3px' }}> 6-12 characters</p>
                            </div>
                            <div className="rule">
                                <Circle
                                    width={15}
                                    height={15}
                                    img={NewCheck}
                                    bg={
                                        passwordValidation[1]
                                            ? '#0fba00'
                                            : '#A9A9A9'
                                    }
                                    noMg
                                    pd={4}
                                />
                                <p style={{ color: passwordValidation[1] ? 'black' : '#A9A9A9', marginLeft: '3px' }}> uppercase</p>
                            </div>
                            <div className="rule">
                                <Circle
                                    width={15}
                                    height={15}
                                    img={NewCheck}
                                    bg={
                                        passwordValidation[2]
                                            ? '#0fba00'
                                            : '#A9A9A9'
                                    }
                                    noMg
                                    pd={4}
                                />
                                <p style={{ color: passwordValidation[2] ? 'black' : '#A9A9A9', marginLeft: '3px' }}> lowercase</p>
                            </div>
                            <div className="rule">
                                <Circle
                                    width={15}
                                    height={15}
                                    img={NewCheck}
                                    bg={
                                        passwordValidation[3]
                                            ? '#0fba00'
                                            : '#A9A9A9'
                                    }
                                    noMg
                                    pd={4}
                                />
                                <p style={{ color: passwordValidation[3] ? 'black' : '#A9A9A9', marginLeft: '3px' }}> numeric character</p>
                            </div>
                            <div className="rule">
                                <Circle
                                    width={15}
                                    height={15}
                                    img={NewCheck}
                                    bg={
                                        passwordValidation[4]
                                            ? '#0fba00'
                                            : '#A9A9A9'
                                    }
                                    noMg
                                    pd={4}
                                />
                                <p style={{ color: passwordValidation[4] ? 'black' : '#A9A9A9', marginLeft: '3px' }}>
                                    {' '}
                                    special character @ # $ & * - ^ !
                                </p>
                            </div>
                            <div className="rule">
                                <Circle
                                    width={15}
                                    height={15}
                                    img={NewCheck}
                                    bg={
                                        passwordValidation[5]
                                            ? '#0fba00'
                                            : '#A9A9A9'
                                    }
                                    noMg
                                    pd={4}
                                />
                                <p style={{ color: passwordValidation[5] ? 'black' : '#A9A9A9', marginLeft: '3px' }}>Passwords Match</p>
                            </div>
                        </div>
                        <div className="submit-area">
                            {isLoading ? (
                                <>
                                    <div className="frame">
                                        <div className="text-wrapper-3">
                                            <Spinner
                                                width="20px"
                                                height="20px"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="frame"
                                        style={{
                                            backgroundColor: !isPasswordValid
                                                ? '#ccc'
                                                : '#f04950',
                                            cursor: !isPasswordValid
                                                ? 'not-allowed'
                                                : 'pointer',
                                        }}
                                        onClick={
                                            isPasswordValid
                                                ? handleSubmit
                                                : undefined
                                        }
                                    >
                                        <div className="text-wrapper-3">
                                            Proceed
                                        </div>
                                        <img
                                            className="img"
                                            alt="Press Enter"
                                            src={ArrowRight}
                                        />
                                    </div>
                                </>
                            )}

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
                </div>
            </OnboardingSplitView>
        </div>
    );
};
