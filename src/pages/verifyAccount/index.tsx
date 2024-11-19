/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from '../../assets/logo.png';
import EnterIcon from '../../assets/enter.png';
import './style.scss';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    useReVerifyEmailMutation,
    useVerifyEmailMutation,
} from '../../api/authApi';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setAuthToken } from '../../state/slices/authSlice';
import Spinner from '../../components/Spinner';
import { FooterTerms } from '../../components/FooterTerms';

const CodeInput = ({
    index,
    handleInputChange,
    handleKeyDown,
    inputRef,
    value,
    wrong,
}: {
    index: number;
    value: string;
    wrong: boolean;
    handleInputChange: (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => void;
    handleKeyDown: (
        event: KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => void;
    inputRef: any;
}) => {
    return (
        <div
            className="overlap-group"
            style={{
                margin: '0 5px',
                borderColor: `${wrong ? '#ff6e6e' : ''}`,
            }}
        >
            <input
                className="text-wrapper"
                maxLength={1}
                value={value}
                inputMode="numeric"
                pattern="[0-9]"
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={inputRef}
            />
        </div>
    );
};

export const VerifyAccount = () => {
    const currentPage = 4;
    const inputs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const [wrongResult, setWrongResult] = useState(false);
    const { user } = useSelector((state: RootState) => state.createAccount);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [, setOtpIsValidated] = useState(false);
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
    const [retryVerifyEmail] = useReVerifyEmailMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateOtpState = (index: number, value: string) => {
        const otpCopy = [...otp];
        otpCopy[index] = value;
        setOtp(otpCopy);
    };

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const { value } = event.target;

        event.target.value = event.target.value.replace(/\D/g, '');

        if (/^[0-9]$/.test(value) && index < inputs.length) {
            // Move the focus to the next input
            if (index < inputs.length - 1) {
                inputs[index + 1].current?.focus();
            }
        }

        updateOtpState(index, value);
    };

    const initiateVerifyAccount = async () => {
        // Check if otp array is valid
        const otpIsValid = otp.every((value) => value !== '');
        if (otpIsValid) {
            setOtpIsValidated(true);

            await verifyEmail({
                email: user.email,
                otpCode: otp.join(''),
            })
                .unwrap()
                .then((res) => {
                    toast.success(res.message);
                    dispatch(
                        setAuthToken({
                            credentialType: 'passwordReset',
                            passwordResetToken: res.data.passwordToken,
                        }),
                    );

                    setTimeout(() => {
                        navigate('/password');
                    }, 2000);
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: FetchBaseQueryError) => {
                    toast.error(
                        (error.data as any)?.message ||
                            (error.data as any).message,
                    );

                    setWrongResult(true);
                });
        }
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (
            event.key === 'Backspace' &&
            index > 0 &&
            event.currentTarget.value === ''
        ) {
            inputs[index - 1].current?.focus();
        } else if (event.key === 'Enter') {
            initiateVerifyAccount();
            return
        } else if (
            index === inputs.length - 1 &&
            event.currentTarget.value !== ''
        ) {
            updateOtpState(index, event.key);
        }
        // Check if it the last box and if there is a value, replace the value with the key pressed

        updateOtpState(index, '');
        setWrongResult(false);
    };

    return (
        <div className="verify">
            <div className="container">
                <div className="logo-container">
                    <img className="logo" alt="Union" src={Logo} />
                </div>
                <div className="content flex-column centralize-y">
                    <div className="label">
                        <p className="step">
                            <span className="text-wrapper">
                                Step {currentPage}
                            </span>
                            <span className="span"> / 5</span>
                        </p>
                    </div>
                    <div className="welcome">
                        <div className="header">Verify One-Time-Password</div>
                        <p className="p">
                            We sent an OTP to{' '}
                            <span
                                style={{
                                    color: '#0075ff',
                                    textDecoration: 'underline',
                                }}
                            >
                                {user.email}
                            </span>
                        </p>
                    </div>
                    <div className="form">
                        <div
                            className="overlap flex-row"
                            style={{
                                margin: '30px 0',
                            }}
                        >
                            {[0, 1, 2, 3, 4, 5].map((index) => {
                                return (
                                    <CodeInput
                                        index={index}
                                        wrong={wrongResult}
                                        handleInputChange={handleInputChange}
                                        handleKeyDown={handleKeyDown}
                                        inputRef={inputs[index]}
                                        key={index}
                                        value={otp[index]}
                                    />
                                );
                            })}
                        </div>
                        <div
                            className="frame"
                            id="resend-otp"
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                retryVerifyEmail({
                                    email: user.email,
                                })
                                    .unwrap()
                                    .then((res) => {
                                        toast.success(res.message);
                                        setOtp(['', '', '', '', '', '']);
                                        setWrongResult(false);
                                    })
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    .catch((error: FetchBaseQueryError) => {
                                        toast.error(
                                            (error.data as any)?.message ||
                                                (error.data as any).message,
                                        );
                                    });
                            }}
                        >
                            <div
                                className="text-wrapper-3"
                                style={{ color: 'black' }}
                            >
                                Resend OTP
                            </div>
                        </div>
                        <div
                            className="frame"
                            style={{
                                backgroundColor: !otp.every(
                                    (value) => value !== '',
                                )
                                    ? '#ccc'
                                    : '#f04950',
                                cursor: 'pointer',
                            }}
                            onClick={() => initiateVerifyAccount()}
                        >
                            {isLoading ? (
                                <div className="text-wrapper-3">
                                    <Spinner width="20px" height="20px" />
                                </div>
                            ) : (
                                <div className="text-wrapper-3">Verify OTP</div>
                            )}
                        </div>
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
                <div
                    className="flex-row centralize-y"
                    style={{
                        marginTop: 'auto',
                        height: '100',
                    }}
                >
                    <FooterTerms type="terms_with_copyright" />
                </div>
            </div>
        </div>
    );
};
