import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSubmitSurveyMutation } from '../../api/authApi';
import RightArrow from '../../assets/arrow-right.png';
import LinkIcon from '../../assets/link-2.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import ProfileIcon from '../../assets/profile.png';
import VerifyIcon from '../../assets/verify.svg';
import ThickCheckIcon from '../../assets/thick-check-white.png';
import { Link } from 'react-router-dom';
import DocumentUploadIcon from '../../assets/document-upload.png';
import { useGetCloudinaryLinkMutation } from '../../api/userApi';
import Spinner from '../../components/Spinner';
const validateLinkeln = (link: string) => {
    const linkedInUrlRegex =
        /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9-]+$/;

    const linkedInUrlRegex2 =
        /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[a-zA-Z0-9-]+\/$/;
    // regex for linked url without thelast /

    return linkedInUrlRegex.test(link) || linkedInUrlRegex2.test(link);
};

export const ProfileBrief = ({
    userType,
    verificationStatus,
    user,
}: {
    user?: RootState['createAccount']['user'];
    userType: 'executive' | 'vendor' | 'creative';
    verificationStatus: 'verified' | 'unverified';
}) => {
    const { user: _user } = useSelector(
        (state: RootState) => state.createAccount,
    );
    user = user || _user;

    return (
        <>
            <div className="profile-header">
                <div className="profile-image">
                    <img src={ProfileIcon} alt="" />
                </div>
                <div className="profile-details">
                    <div className="name-section">
                        <p className="name">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="username">@{user.username}</p>
                    </div>
                    <div className="stats">
                        <div className="_user-type tag">{userType}</div>
                        <div className="_verification-status tag flex-row">
                            <img src={VerifyIcon} alt="" />
                            <p>{verificationStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const FinalPage = ({
    userType,
    verificationStatus,
    waitInterval,
}: {
    waitInterval: `${number} - ${number}`;
    userType: 'executive' | 'vendor';
    verificationStatus: 'verified' | 'unverified';
}) => {
    return (
        <>
            <div className="final-page">
                <div className="top">
                    <ProfileBrief
                        userType={userType}
                        verificationStatus={verificationStatus}
                    />
                    <div className="thanks">
                        <div className="check flex-row">
                            <img src={ThickCheckIcon} alt="" />
                        </div>
                        <p>Thank you! We`ve received your answers</p>
                    </div>
                </div>
                <p className="desc">
                    We’d get back to you in{' '}
                    <span
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        {waitInterval} days
                    </span>{' '}
                    for a full user type verification. For the meantime you can
                    enjoy the basic functionalities of our platform
                </p>
                <div className="nav">
                    <Link
                        to="/profile"
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        <div className="_frame">
                            <div className="_text-wrapper-3">Go home</div>
                            <img src={RightArrow} alt="" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export const ExecutivePreCompletion = ({
    answers,
}: {
    answers: Record<string, string>;
}) => {
    const [filled, setFilled] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [linkedln, setLinkedln] = useState('');
    const [submitSurvey] = useSubmitSurveyMutation();

    const submit = async () => {
        if (filled) {
            await submitSurvey({
                userResponse: answers,
                roleType: 'executive',
            })
                .unwrap()
                .then(() => {
                    toast.success('Successfully submitted');
                    setTimeout(() => {
                        setCompleted(true);
                    }, 2000);
                })
                .catch((err) => {
                    if (
                        err.data.message ==
                        'A survey response already exists for this user'
                    ) {
                        setTimeout(() => {
                            setCompleted(true);
                        }, 1000);
                    }
                    toast.error(err.data.message);
                });
        }
    };

    useEffect(() => {
        if (linkedln.length != 0) {
            setFilled(validateLinkeln(linkedln));
        }

        setTimeout(() => {
            setCompleted(validateLinkeln(linkedln));
        }, 1000);
    }, [linkedln]);

    return (
        <>
            {completed ? (
                <FinalPage
                    userType="executive"
                    verificationStatus="unverified"
                    waitInterval="5 - 7"
                />
            ) : (
                <>
                    <div className="precompletion-req flex-column">
                        <p className="header">
                            {' '}
                            Submit your LinkedIn profile for user verification
                        </p>
                        <div className="example flex-row">
                            <p className="intro">Example</p>
                            <div className="example-link">
                                <p className="linkedln-ex">
                                    https://www.linkedin.com/in/temidayofolajin/
                                </p>
                            </div>
                        </div>

                        <div className="paste-link flex-row">
                            <img src={LinkIcon} alt="Link" />
                            <input
                                type="text"
                                placeholder="Paste your link here"
                                onChange={(e) => {
                                    setFilled(e.target.value.length != 0);
                                    setLinkedln(e.target.value);
                                }}
                            />
                            <p className="paste-text"></p>
                        </div>

                        <div className="nav">
                            <div
                                className="frame"
                                id="next"
                                style={{
                                    backgroundColor: !completed
                                        ? '#ccc'
                                        : '#f04950',
                                }}
                                onClick={submit}
                            >
                                <div className="text-wrapper-3">Submit</div>
                                <img src={RightArrow} alt="" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export const VendorPreCompletion = ({
    answers,
}: {
    answers: Record<string, string>;
}) => {
    const [answersState, setAnswersState] = useState<typeof answers>(answers);
    const [filled, setFilled] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [submitSurvey, { isLoading }] = useSubmitSurveyMutation();
    const [selectedFileName, setSelectedFileName] = useState<string | null>(
        null,
    );
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [getCloudUploadLink, { isLoading: getCloudUploadLinkIsLoading }] =
        useGetCloudinaryLinkMutation();

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const maxLength = 10; // You can adjust this value based on your preference
            const fileNameToShow =
                selectedFile.name.length > maxLength
                    ? selectedFile.name.substring(0, maxLength) +
                      '...' +
                      selectedFile.name.slice(-5)
                    : selectedFile.name;

            setSelectedFileName(fileNameToShow);
            setFile(selectedFile);
        } else {
            setSelectedFileName(null);
            setFilled(false);
        }
    };

    const submit = async () => {
        if (filled) {
            await submitSurvey({
                userResponse: answersState,
                roleType: 'vendor',
            })
                .unwrap()
                .then(() => {
                    toast.success('Successfully submitted');
                    setTimeout(() => {
                        setCompleted(true);
                    }, 2000);
                })
                .catch((err) => {
                    if (
                        err.data.message ==
                        'A survey response already exists for this user'
                    ) {
                        setTimeout(() => {
                            setCompleted(true);
                        }, 1000);
                    }
                    console.log(err);
                    toast.error(err.data.message);
                });
        }
    };

    const initiateFileUpload = async () => {
        if (!file) return;

        const fileUploadResponse = await getCloudUploadLink({
            file: file,
            type: 'survey',
        }).unwrap();

        // Update answers to include the cloudinary link
        const lastQuestionIndex = parseInt(
            (Object.keys(answers).pop() as `Q${number}`)[1],
        );
        setAnswersState({
            ...answers,
            [`Q${lastQuestionIndex + 1}`]: fileUploadResponse.data.info.url,
        });

        toast.success('Successfully uploaded');
        setFilled(true);
    };

    return (
        <>
            {completed ? (
                <FinalPage
                    userType="vendor"
                    verificationStatus="unverified"
                    waitInterval="3 - 5"
                />
            ) : (
                <>
                    <div className="precompletion-req flex-column">
                        <p className="header">
                            {' '}
                            Submit any of verification required{' '}
                        </p>
                        <div className="pitch-deck-upload flex-row">
                            <div className="icon">
                                <img src={DocumentUploadIcon} alt="" />
                            </div>
                            <div className="details">
                                <p className="_header">
                                    {selectedFileName
                                        ? `Upload: ${selectedFileName}`
                                        : 'Upload your Pitch Deck or Portfolio file'}
                                </p>
                                <p className="_desc">Max upload size 20MB</p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            {/* Button to trigger file input click */}
                            <button
                                className="button"
                                onClick={handleButtonClick}
                            >
                                Browse
                            </button>
                            {file && (
                                <button
                                    className="button"
                                    style={{
                                        backgroundColor: 'red',
                                        minWidth: '100px',
                                    }}
                                    onClick={initiateFileUpload}
                                >
                                    {getCloudUploadLinkIsLoading ? (
                                        <Spinner
                                            width="10px"
                                            height="10px"
                                            style={{ margin: '0 auto' }}
                                        />
                                    ) : (
                                        'Upload'
                                    )}
                                </button>
                            )}
                        </div>
                        <div className="or">
                            <div className="text">
                                <p>OR</p>
                            </div>
                        </div>
                        <p className="desc">
                            Add your LinkedIn business profile, pitch deck
                            slides link or your portfolio link
                        </p>
                        <div className="paste-link flex-row">
                            <img src={LinkIcon} alt="Link" />
                            <input
                                type="text"
                                placeholder="Paste your portfolio here"
                                onChange={(e) =>
                                    setFilled(e.target.value.length != 0)
                                }
                            />
                            <p className="paste-text"></p>
                        </div>

                        <div className="nav">
                            <button
                                className="frame"
                                id="next"
                                style={{
                                    backgroundColor: !filled
                                        ? '#909090'
                                        : '#f04950',
                                    border: '0px',
                                }}
                                onClick={submit}
                            >
                                {isLoading ? (
                                    <Spinner
                                        width="10px"
                                        height="10px"
                                        style={{ margin: '0 auto' }}
                                    />
                                ) : (
                                    <>
                                        <div className="text-wrapper-3">
                                            Submit
                                        </div>
                                        <img src={RightArrow} alt="" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
