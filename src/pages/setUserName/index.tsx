import EnterIcon from '../../assets/enter.png';
import ArrowRight from '../../assets/arrow-right.png';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../../assets/hero3.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useEffect, useState } from 'react';
import { setCreateAccountDetails } from '../../state/slices/createAccount';
import { toast } from 'react-toastify';
import { useGetUsernameSuggestionMutation, useSignupMutation } from '../../api/authApi';
import Spinner from '../../components/Spinner';
import AtSign from '../../assets/at.svg'
import { Circle } from '../../components/Circle';
import { OnboardingSplitView } from '../../components/OnboardingLeftPane';

export const SetUserName = () => {
    const { user } = useSelector((state: RootState) => state.createAccount);
    const [signup, { isLoading }] = useSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [suggestedUserNames, setSuggestions] = useState<string[]>([]);

    const [getSuggestedUsernames] = useGetUsernameSuggestionMutation();
    const [userNameIsValidated, setUserNameIsValidated] = useState(false);
    const [userName, setUserName] = useState('');

    const initiateSetuUsername = async () => {
        if (userNameIsValidated) {
            dispatch(
                setCreateAccountDetails(
                    {
                        ...user,
                        username:
                            userName,
                    },
                ),
            );
            await signup({
                email: user.email,
                username: userName,
                firstName:
                    user.firstName,
                lastName:
                    user.lastName,
            })
                .unwrap()
                .then((res) => {
                    toast.success(
                        res.message,
                    );
                    setTimeout(
                        () => {
                            navigate(
                                '/verify',
                            );
                        },
                        2000,
                    );
                })
                .catch((err) => {
                    toast.error(
                        err.data?.message || 'An error occured',
                    );
                });
        }
    }
    useEffect(() => {
        const userNameIsValid = /\S{3,}/.test(userName);
        if (userNameIsValid) {
            setUserNameIsValidated(true);
        } else {
            setUserNameIsValidated(false);
        }
    }, [userName])
    useEffect(() => {
        getSuggestedUsernames({ email: user.email, firstName: user.firstName, lastName: user.lastName })
            .unwrap()
            .then((res) => {
                setSuggestions(res.data.suggestions);
            });
    }, [getSuggestedUsernames, user.email, user.firstName, user.lastName]);

    const currentPage = 3;

    return (
        <div className="set-username">
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
                        <div className="header">
                            Set your username
                        </div>
                        <p className="p">
                            Pick your unique username
                        </p>
                    </div>
                    <div className="form">
                        <div className="overlap">
                            <div className="overlap-group">
                                <div className="flex-row centralize-y" style={{ width: 'max-content', marginRight: '10px' }}>
                                    <Circle width={13} height={13} bg='transparent' img={AtSign} pd={0} noMg noBorder />
                                </div>
                                <input
                                    className="text-wrapper input-black"
                                    placeholder=""
                                    value={userName}
                                    onChange={(e) => {
                                        setUserName(
                                            e.target.value,
                                        );
                                        const userNameIsValid =
                                            /\S{3,}/.test(
                                                e.target.value,
                                            );
                                        if (userNameIsValid) {
                                            setUserNameIsValidated(
                                                true,
                                            );
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            initiateSetuUsername()
                                        }
                                    }}
                                />
                            </div>
                            {
                                suggestedUserNames.length > 0 && <div className="suggested-usernames">
                                    <p  id='suggestedUsernameHead'>Suggested usernames:</p>
                                    <div className="usernames">
                                        {
                                            suggestedUserNames.map(
                                                (username, index) => {
                                                    return (
                                                        <div
                                                            className="username"
                                                            key={index}
                                                            style={{
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => setUserName(username)}
                                                        >
                                                            <p>
                                                                {
                                                                    username
                                                                }
                                                            </p>
                                                        </div>
                                                    );
                                                },
                                            )
                                        }
                                    </div>
                                </div>
                            }

                        </div>
                        <div className="submit-area">
                            {
                                isLoading
                                    ? (
                                        <div className="frame">
                                            <div className="text-wrapper-3">
                                                <Spinner width='20px' height='20px' />
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div
                                            className="frame"
                                            style={{
                                                backgroundColor:
                                                    !userNameIsValidated
                                                        ? '#ccc'
                                                        : '#f04950',
                                                cursor: !userNameIsValidated
                                                    ? 'not-allowed'
                                                    : 'pointer',
                                            }}
                                            onClick={() => initiateSetuUsername()}
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
                                    )
                            }
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
        </div >
    );
};
