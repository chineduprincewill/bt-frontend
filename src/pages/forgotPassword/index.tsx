import Logo from '../../assets/logo.png';
import EnterIcon from '../../assets/enter.png';
import EmailNotif from '../../assets/sms-notification.png';
import './style.scss';
import RightArrow from '../../assets/arrow-right.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EyeSlash from '../../assets/eye-slash.png';
import CircleCheck from '../../assets/circle-check.png';
import SecureLock from '../../assets/key-square.png';
import { useEffect, useState } from 'react';
import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
} from '../../api/authApi';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Spinner from '../../components/Spinner';
import { FooterTerms } from '../../components/FooterTerms';
const InputEmail = (props: {
    next: () => void;
    setInputedEmail: (email: string) => void;
}) => {
    const [email, setEmail] = useState<string>('');
    const [emailIsValidated, setEmailIsValidated] = useState<boolean>(false);

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    useEffect(() => {
        const validEmail = validateEmail(email);
        setEmailIsValidated(validEmail);
    }, [email]);

    const initiateForgotPassword = async () => {
        if (!emailIsValidated) return

        await forgotPassword({ email })
            .unwrap()
            .then((res) => {
                toast.success(res.message);
                setTimeout(() => props.next(), 2000);
            })
            .catch((error: FetchBaseQueryError) =>
                toast.error(
                    (error.data as any)?.message ||
                    (error.data as any).message,
                ),
            );
    }
    return (
        <>
            <div className="welcome">
                <div className="header">Forgot password ?</div>
                <p className="p">
                    Resetting your password is a piece of cake, just enter the
                    email you used to register
                </p>
            </div>
            <div className="form">
                <div className="overlap">
                    <input
                        type="text"
                        className="text-wrapper"
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            props.setInputedEmail(e.target.value);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && initiateForgotPassword()}
                    />
                </div>
                {
                    isLoading
                        ? (
                            <>
                                <div className="frame">
                                    <div className="text-wrapper-3">
                                        <Spinner width='20px' height='20px' />
                                    </div>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div
                                    className="frame"
                                    style={{
                                        backgroundColor: emailIsValidated ? '#f04950' : '#ccc',
                                        cursor: emailIsValidated ? 'pointer' : 'not-allowed',
                                    }}
                                    onClick={initiateForgotPassword}
                                >
                                    <div className="text-wrapper-3"> Reset password </div>
                                    <img alt="" src={RightArrow} />
                                </div>
                            </>
                        )
                }

                <div className="group">
                    <div className="text-wrapper-5">Press enter</div>
                    <img className="img" alt="Press Enter" src={EnterIcon} />
                </div>
            </div>
            <div className="group back-home">
                <Link to="/login">
                    <div className="text-wrapper-5">{'< Back to login'}</div>
                </Link>
            </div>
        </>
    );
};

const CheckEmail = ({ email }: { email: string }) => {
    return (
        <div className="check-mail">
            <div className="mail">
                <img src={EmailNotif} alt="Check your email" />
            </div>
            <div className="welcome">
                <div className="header">Check your email !</div>
                <p className="desc">
                    A password reset link has been sent to <span>{email}</span>,
                    if your email is correct you would receive it
                </p>
            </div>
        </div>
    );
};

const SetNewPassword = (props: {
    next: () => void;
    email: string;
    passwordResetToken: string;
}) => {
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordIsValidated, setPasswordIsValidated] =
        useState<boolean>(false);
    const [passwordValidation, setPasswordValidations] = useState([false, false, false, false, false]);
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    useEffect(() => {
        const validPassword =
            validatePassword(confirmPassword) &&
            validatePassword(password) &&
            confirmPassword === password;

        if (validPassword) {
            setPasswordIsValidated(true);
        }

        const passwordValidation = [
            password.length >= 6 && password.length <= 12,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password),
            password === confirmPassword && password.length > 0,
        ]
        setPasswordValidations(passwordValidation)
    }, [confirmPassword, password]);

    const initiateSetNewPassword = async () => {
        if (!passwordIsValidated) return

        await resetPassword({
            email: props.email,
            passwordToken: props.passwordResetToken,
            newPassword: password,
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message);
                setTimeout(() => props.next(), 2000);
            })
            .catch((error: FetchBaseQueryError) =>
                toast.error(
                    (error.data as any)?.message ||
                    (error.data as any).message,
                ),
            );
    }
    return (
        <>
            <div className="set-new-password">
                <div className="welcome">
                    <div className="header">Set new password</div>
                    <p className="p">Enter your new password</p>
                </div>
                <div className="form">
                    <div className="overlap">
                        <div className="overlap-group">
                            <input
                                className="text-wrapper"
                                placeholder="Enter password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && initiateSetNewPassword()}
                                type={`${showPassword1 ? 'text' : 'password'}`}
                            />
                            <img src={EyeSlash} className="vuesax-linear-eye" onClick={() => setShowPassword1(!showPassword1)} />
                        </div>

                        <div className="overlap-group">
                            <input
                                className="text-wrapper"
                                placeholder="Confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={`${showPassword2 ? 'text' : 'password'}`}
                                onKeyDown={(e) => e.key === 'Enter' && initiateSetNewPassword()}
                            />
                            <img src={EyeSlash} className="vuesax-linear-eye" onClick={() => setShowPassword2(!showPassword2)} />
                        </div>
                    </div>
                    <div className="validations">
                        <div className="rule">
                            <img src={CircleCheck} alt="" />
                            <p id='rule' style={{
                                color: passwordValidation[0] ? '#20CB00' : ''
                            }}> 6-12 characters</p>
                        </div>
                        <div className="rule">
                            <img src={CircleCheck} alt="" />
                            <p id='rule' style={{
                                color: passwordValidation[1] ? '#20CB00' : ''
                            }}> uppercase</p>
                        </div>
                        <div className="rule">
                            <img src={CircleCheck} alt="" />
                            <p id='rule' style={{
                                color: passwordValidation[2] ? '#20CB00' : ''
                            }}> lowercase</p>
                        </div>
                        <div className="rule">
                            <img src={CircleCheck} alt="" />
                            <p id='rule' style={{
                                color: passwordValidation[3] ? '#20CB00' : ''
                            }}> numeric character</p>
                        </div>
                        <div className="rule">
                            <img src={CircleCheck} alt="" />
                            <p id='rule' style={{
                                color: passwordValidation[4] ? '#20CB00' : ''
                            }}>
                                {' '}
                                special character @ # $ & *
                                - ^ !
                            </p>
                        </div>
                        <div className="rule">
                            <img src={CircleCheck} alt="" />
                            <p id='rule' style={{
                                color: passwordValidation[5] ? '#20CB00' : ''
                            }}>
                                Passwords Match
                            </p>
                        </div>
                    </div>
                    <div className="submit-area">
                        {
                            isLoading
                                ? (
                                    <>
                                        <div className="frame">
                                            <div className="text-wrapper-3">
                                                <Spinner width='20px' height='20px' />
                                            </div>
                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <div
                                            className="frame"
                                            onClick={initiateSetNewPassword}
                                            style={{
                                                backgroundColor: passwordIsValidated
                                                    ? '#f04950'
                                                    : '#ccc',
                                                cursor: passwordIsValidated
                                                    ? 'pointer'
                                                    : 'not-allowed',
                                            }}
                                        >
                                            <div className="text-wrapper-3">Continue</div>
                                            <img className="img" alt="Continue" src={RightArrow} />
                                        </div>
                                    </>
                                )
                        }

                        <div className="group">
                            <div className="text-wrapper-5">Press enter</div>
                            <img
                                className="img"
                                alt="Press Enter"
                                src={EnterIcon}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    return regex.test(password);
};

const SucessfulReset = () => {
    const navigate = useNavigate();
    return (
        <div className="check-mail">
            <div className="mail">
                <img src={SecureLock} alt="Succcessful reset" />
            </div>
            <div className="welcome">
                <div className="header">
                    Hooray! You secured your account once again
                </div>
                <p className="desc">
                    Your password has been successfully reset. Click below to
                    log in.
                </p>
            </div>
            <div className="submit-area">
                <div
                    className="frame"
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/login')}
                >
                    <div className="text-wrapper-3">Log in</div>
                    <img className="img" alt="Continue" src={RightArrow} />
                </div>
            </div>
        </div>
    );
};

type ForgotPasswordStage =
    | 'input-email'
    | 'check-email'
    | 'set-new-password'
    | 'successful-reset';

export const ForgotPassword = () => {
    const [stage, setNextStage] = useState<ForgotPasswordStage>('input-email');
    const [urlParams, setUrlParams] = useState<{
        email: string;
        passwordResetToken: string;
    } | null>(null);

    const [inputedEmail, setInputedEmail] = useState<string>('');

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('prst');
        const email = searchParams.get('e');

        if (token && email) {
            setNextStage('set-new-password');
            setUrlParams({ email, passwordResetToken: token });
        }
    }, [location.search]);

    return (
        <div className="forgot-password flex-row centralize-x">
            <div className="container">
                <div className="logo-container">
                    <img className="logo" alt="Union" src={Logo} />
                </div>
                <div className="content">
                    {urlParams?.email &&
                        urlParams?.passwordResetToken &&
                        stage === 'set-new-password' && (
                            <SetNewPassword
                                email={urlParams.email}
                                passwordResetToken={
                                    urlParams.passwordResetToken
                                }
                                next={() => setNextStage('successful-reset')}
                            />
                        )}
                    {stage === 'input-email' && (
                        <InputEmail
                            next={() => setNextStage('check-email')}
                            setInputedEmail={setInputedEmail}
                        />
                    )}
                    {stage === 'check-email' && (
                        <CheckEmail email={inputedEmail} />
                    )}
                    {stage === 'successful-reset' && <SucessfulReset />}
                </div>
                <FooterTerms type="terms_with_copyright" />
            </div>
        </div>
    );
};
