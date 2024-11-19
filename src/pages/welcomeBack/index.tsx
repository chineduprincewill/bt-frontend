import './style.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import PasswordInput from '@components/PasswordInput';

import { useLoginMutation } from '../../api/authApi';
import { useGetLoggedInUserInfoQuery } from '../../api/userApi';
import EnterIcon from '../../assets/enter.png';
import Logo from '../../assets/logo.png';
import RedXIcon from '../../assets/red_x.svg';
import { Circle } from '../../components/Circle';
import { FooterTerms } from '../../components/FooterTerms';
import Spinner from '../../components/Spinner';
import { setAuthCredentials, setUser } from '../../state/slices/authSlice';
import { setCreateAccountDetails } from '../../state/slices/createAccount';
import { RootState } from '../../state/store';

// import { setChatToken } from '../../state/slices/chatToken';

// interface Form {
//     identifier: string;
//     password: string;
// }

// const validateEmailOrUsername = (input: string) => {
//     const emailRegex = /\S+@\S+\.\S+/;
//     const isEmail = emailRegex.test(input);
//     const isUsername = input.trim().length > 0;
//     return isEmail || isUsername;
// };

// const validatePassword = (passwordToValidate: string) => {
//     const isLengthValid = passwordToValidate.length >= 6;
//     // const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
//     //     passwordToValidate,
//     // );
//     /* // const hasUppercase = /[A-Z]/.test(passwordToValidate);
//     // const hasLowercase = /[a-z]/.test(passwordToValidate);
//     // const hasNumeric = /\d/.test(passwordToValidate); */

//     return isLengthValid;
//     // &&
//     // hasUppercase &&
//     // hasLowercase &&
//     // hasNumeric &&
//     // hasSpecialChar
// };

export const WelcomeBack = () => {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [isValidated, setIsValidated] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { isError: getUserIsError, currentData } = useGetLoggedInUserInfoQuery(null);

    const updateFormData = (key: 'identifier' | 'password', value: string) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    const initiateLogin = async () => {
        if (!isValidated) return;

        const isEmail = /\S+@\S+\.\S+/.test(formData.identifier);
        const loginData = isEmail
            ? { email: formData.identifier, password: formData.password }
            : { username: formData.identifier, password: formData.password };

        try {
            const res = await login(loginData).unwrap();
            dispatch(setUser(res.data.user));
            dispatch(
                setAuthCredentials({
                    credentialType: 'basic',
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                }),
            );
            dispatch(setCreateAccountDetails(res.data.user));
            window.location.href = '/feeds';
        } catch (error) {
            if ((error as any).data.message === 'Invalid credential combination') {
                setShowPasswordError(true);
            } else if ((error as any).data.msg === 'Too many attempts. Please try again later.') {
                toast.error('Too many attempts. Please try again later.');
            } else {
                console.error((error as any).data.message);
            }
        }
    };

    useEffect(() => {
        setShowPasswordError(false);
    }, [formData.password]);

    useEffect(() => {
        const { identifier, password } = formData;
        const isValidEmailOrUsername = /\S+@\S+\.\S+/.test(identifier) || identifier.length >= 3;
        const isValidPassword = password.length >= 6;
        setIsValidated(isValidEmailOrUsername && isValidPassword);
    }, [formData]);

    useEffect(() => {
        console.log('CREDENTIALS', isLoggedIn, getUserIsError, currentData?.data.user);
        if (isLoggedIn && !getUserIsError && currentData?.data.user) {
            navigate('/feeds');
        }
    }, [isLoggedIn, getUserIsError, currentData?.data.user, navigate]);

    return (
        <div className="desktop flex-column">
            <div className="container min-w-[100vw]">
                <div className="logo-container">
                    <img className="logo" alt="Union" src={Logo} />
                </div>
                <div className="content">
                    <div className="welcome">
                        <div className="header">Welcome back!</div>
                    </div>
                    <div className="form">
                        <div className="overlap">
                            <div className="overlap-group">
                                <input
                                    className="text-wrapper"
                                    placeholder="Email or Username"
                                    onChange={(e) => updateFormData('identifier', e.target.value)}
                                />
                            </div>
                            <div className="password">
                                <div
                                    className="overlap-group"
                                    style={{
                                        border: showPasswordError ? '0.5px solid #FF0000' : '',
                                    }}
                                >
                                    <PasswordInput
                                        placeholder="Password"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') initiateLogin();
                                        }}
                                        onChange={(e) => updateFormData('password', e.target.value)}
                                    />
                                </div>
                                {showPasswordError && (
                                    <div className="flex-row error_msg centralize-y">
                                        <img src={RedXIcon} alt="Error" width={15} height={15} />
                                        <p>You've entered the wrong email or password</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div id="forgot-password">
                            <Link to="/forgot-password" style={{ textAlign: 'right' }}>
                                Forgot password?
                            </Link>
                        </div>
                        <div
                            className="frame"
                            style={{
                                color: isValidated ? '#FFFFFF' : '#000000',
                                backgroundColor: isValidated ? '#f04950' : '#ccc',
                                cursor: isValidated ? 'pointer' : 'not-allowed',
                            }}
                            onClick={initiateLogin}
                        >
                            {isLoading ? <Spinner height="20px" width="20px" /> : <div className="text-wrapper-3">Sign in</div>}
                        </div>
                        <div className="group">
                            <div className="text-wrapper-5 press_enter">Press enter</div>
                            <img className="img" alt="Press Enter" src={EnterIcon} />
                        </div>
                        <p className="don-t-have-an">
                            Don’t have an account?
                            <Link to="/create-acc"> Create now</Link>
                        </p>
                    </div>
                </div>
            </div>
            <FooterTerms type="terms_with_copyright" />
        </div>
    );
};
