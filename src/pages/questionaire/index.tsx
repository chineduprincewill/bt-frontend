/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import RightArrow from '../../assets/arrow-right.png'
import LeftArrow from '../../assets/arrow-left.png'
import './style.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { IUserType } from '../../interfaces';
import SearchIcon from '../../assets/search.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { ExecutivePreCompletion, ProfileBrief, VendorPreCompletion } from './preCompletionPages';
import { QUESTIONAIRE, QuestionProps } from './constant';
import GreenCheckIcon from '../../assets/green-check.png'
import { selectPaneInAboutUsPage } from '../../state/slices/aboutUs';

const Question = (props: QuestionProps & { updateAnswer: (answer: string, type: any) => void }) => {
    const { type, question } = props;
    const [selected, setSelectedState] = useState<string | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const setSelected = ({ answer, key }: { answer: string, key: string }) => {
        setSelectedState(key);
        props.updateAnswer(answer, type);

        if (type === 'multi-choice') {
            setSelectedState(answer)
            const previousAnswers = localStorage.getItem(`new_answered_${props.id}`) ?? '[]'
            // Add the new option if it is not in the preciousAnswers
            localStorage.setItem(`new_answered_${props.id}`, JSON.stringify(Array.from(new Set([...JSON.parse(previousAnswers), key.toString()]))));
            return
        }

        localStorage.setItem(`new_answered_${props.id}`, JSON.stringify([key.toString()]));
    }

    useEffect(() => {
        const questionId = props.id; // Assuming question ID is unique
        const questionHasBeenAnswered = localStorage.getItem(`new_answered_${questionId}`);
        if (questionHasBeenAnswered && questionHasBeenAnswered !== '[]') {
            setSelectedState(questionHasBeenAnswered);
            setSelectedKeys(JSON.parse(questionHasBeenAnswered));
        }
    }, [props.id]);

    const item = localStorage.getItem(`new_answered_${props.id}`)
    useEffect(() => {
        if (item) {
            setSelectedState(item)
            setSelectedKeys(JSON.parse(item))
        }
    }, [item])

    return (
        <>
            <div className="question-container flex-column">
                <p className="question flex-column">{question}</p>
                {type === 'multi-choice' && <p className='option-description'> {props.description}</p>}
                <div className="non-question">
                    {type === 'radio' &&
                        props.options.map((option) => {
                            const isSelected = selected === option.key;
                            const optionStyle = {
                                backgroundColor: isSelected ? '#d4d4d4' : '#e5e5e5',
                            };

                            return (
                                <div
                                    className='radio-option flex-row align-left'
                                    key={option.key}
                                    onClick={() => setSelected({ key: option.key, answer: option.text })}
                                    style={optionStyle}
                                >
                                    <div className="circle"
                                        style={{
                                            border: isSelected ? "2px solid" : '1px solid',
                                            backgroundColor: selectedKeys.includes(option.key) ? 'black' : 'white',
                                        }}></div>
                                    <p className="option">{option.text}</p>
                                </div>
                            );
                        })}
                    {type === 'multi-choice' &&
                        props.options.map((option) => {
                            const isSelected = selected === option.key;
                            const optionStyle = {
                                backgroundColor: isSelected ? '#d4d4d4' : '#e5e5e5',
                            };

                            return (
                                <div
                                    className='radio-option flex-row align-left'
                                    key={option.key}
                                    onClick={() => {
                                        setSelected({ key: option.key, answer: option.text })
                                        selectedKeys.includes(option.key) ? setSelectedKeys(selectedKeys.filter((key) => key !== option.key)) : setSelectedKeys([...selectedKeys, option.key])
                                    }}
                                    style={optionStyle}
                                >
                                    <div className="circle"
                                        style={{
                                            backgroundColor: selectedKeys.includes(option.key) ? 'black' : 'white',
                                            border: selectedKeys.includes(option.key) ? "2px solid" : '1px solid'
                                        }}></div>
                                    <p className="option">{option.text}</p>

                                </div>
                            );
                        })
                    }

                    {type === 'text' && (
                        <div className='text-option flex-row align-left'>
                            <textarea style={{ resize: 'none' }} placeholder='Enter your answer here' onChange={(e) => setSelected({ answer: e.target.value, key: props.id! })} />
                        </div>
                    )}
                    {type === 'search-dropdown' && (
                        <div className='search-dropdown-option flex-row'>
                            <img src={SearchIcon} alt="search" className="icon" />
                            <input type="text" placeholder={props.placeholder} list="jobTitles" onChange={(e) => setSelected({ answer: e.target.value, key: props.id! })} />
                            <datalist id="jobTitles">
                                {props.options.map((option) => (
                                    <option key={option.key} value={option.text} selected={true} onClick={() => setSelected({ answer: option.text, key: option.key })} />
                                ))}
                            </datalist>
                        </div>
                    )}
                    {type === 'pick-dropdown' && (
                        <div className='pick-dropdown-option flex-row'>
                            <input type="text" placeholder={props.placeholder} list='raceList' />
                            <datalist id="raceList">
                                {props.options.map((option) => (
                                    <option key={option.key} selected={true} onClick={() => setSelected({ answer: option.text, key: option.key })} />
                                ))}
                            </datalist>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export const Questionnaire = () => {
    const [firstLoad, setFirstLoad] = useState(true)
    const { userType } = useParams<{ userType: IUserType }>()
    const { passwordResetToken } = useSelector((state: RootState) => state.auth)
    const questions = QUESTIONAIRE[userType || 'vendor']
    const [question, setQuestion] = useState<QuestionProps>(questions[questions.length - 1])
    const [index, setQuestionIndex] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const [showPrecompletionPage, setShowPrecompletionPage] = useState(false)
    const [isLastQuestion, setIsLastQuestion] = useState(index === questions.length - 1)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const navigate = (type: 'next' | 'prev') => {
        if (type === 'next' && !isAnswered) return
        setQuestionIndex((prevIndex) => {
            const newIndex = type === 'next'
                ? Math.min(prevIndex + 1, questions.length - 1)
                : Math.max(prevIndex - 1, 0);
            return newIndex;
        });
    }

    useEffect(() => {
        const questionId = question.id; // Assuming question ID is unique
        const questionHasBeenAnswered = localStorage.getItem(`answered_${questionId}`);
        if (questionHasBeenAnswered) {
            setIsAnswered(true);
        } else {
            setIsAnswered(false);
        }
    }, [question]);

    const updateAnswer = ({ answer, type }: { answer: string, type?: string }) => {
        setIsAnswered(true)
        if (type === 'multi-choice') {
            const currentAnswer = answers[`Q${index + 1}`]
            if (currentAnswer) {
                const newAnswer = currentAnswer.includes(answer)
                    ? currentAnswer.replace(answer, '')
                    : `${currentAnswer},${answer}`
                answer = newAnswer
            }
        }

        if (isLastQuestion) setIsAnswered(!!answer)

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [`Q${index + 1}`]: answer
        }))
        localStorage.setItem(`answered_${question.id}`, 'sdfas');
    }

    useEffect(() => {
        if (firstLoad) {
            localStorage.clear()
            setFirstLoad(false)
            return
        }
    }, [firstLoad])

    useEffect(() => {
        setQuestion(questions[index]), [index, questions]
        setIsLastQuestion(index === questions.length - 1)
    }, [index, questions, passwordResetToken, navigator])


    return (
        <div className="questionaire flex-column">
            <div className="logo-container">
                <img className="logo" alt="Union" src={Logo} />
                <button className='help-button' onClick={() => {
                    dispatch(selectPaneInAboutUsPage({ paneToShow: 'contact' }))
                    navigator('/about')
                }}>Need help?</button>
            </div>
            <div className="__container">
                <div className="content">
                    {
                        userType === 'creative'
                            ? (
                                <div className='_creative flex-column'>
                                    <div className="hooray flex-column">
                                        <div className="check-area">
                                            <img src={GreenCheckIcon} alt="" className="green-check" />
                                        </div>
                                        <p className="header">Hooray!! You are a Creative</p>
                                        <p className="desc">Your answers predicted that you are a true Creative</p>
                                    </div>

                                    <div className="" style={{
                                        margin: '50px 0'
                                    }}>
                                        <ProfileBrief
                                            userType={userType}
                                            verificationStatus={'unverified'}
                                        />

                                    </div>

                                    <button onClick={() => navigator('/profile')}> Proceed Home</button>
                                </div>
                            )
                            : (
                                <>
                                    <div className="form flex-column">
                                        {
                                            !showPrecompletionPage && question && (
                                                <div className="info-section flex-row">
                                                    {question.type === 'radio' && (
                                                        <Question
                                                            options={question.options}
                                                            question={question.question}
                                                            updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                            type={question.type}
                                                            id={question.id}
                                                        />
                                                    )}
                                                    {question.type === 'text' && (
                                                        <Question
                                                            question={question.question}
                                                            type={question.type}
                                                            updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                            id={question.id}
                                                        />
                                                    )}
                                                    {question.type === 'multi-choice' && (
                                                        <Question
                                                            options={question.options}
                                                            question={question.question}
                                                            type={question.type}
                                                            description={question.description}
                                                            updateAnswer={(answer: string, type: string) => updateAnswer({ answer, type })}
                                                            id={question.id}
                                                        />
                                                    )}
                                                    {question.type === 'search-dropdown' && (
                                                        <Question
                                                            options={question.options}
                                                            question={question.question}
                                                            type={question.type}
                                                            placeholder={question.placeholder}
                                                            updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                            id={question.id}
                                                        />
                                                    )}
                                                    {question.type === 'pick-dropdown' && (
                                                        <Question
                                                            options={question.options}
                                                            question={question.question}
                                                            type={question.type}
                                                            placeholder={question.placeholder}
                                                            updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                            id={question.id}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="nav">
                                        {
                                            showPrecompletionPage ? (
                                                <>
                                                    {
                                                        userType === 'executive'
                                                            ? (<ExecutivePreCompletion answers={answers} />)
                                                            : (<VendorPreCompletion answers={answers} />)
                                                    }
                                                </>
                                            )
                                                : (
                                                    <>
                                                        <div >
                                                            <div className="quest-nav-btns flex-row">
                                                                {isLastQuestion ? (
                                                                    <div
                                                                        className="frame" id='next'
                                                                        style={{
                                                                            backgroundColor: isAnswered ? "#f04950" : '#909090'
                                                                        }}
                                                                        onClick={() => {
                                                                            isAnswered && setShowPrecompletionPage(true)
                                                                        }}
                                                                    >
                                                                        <div className="text-wrapper-3">Next Question</div>
                                                                        <img src={RightArrow} alt="" />
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div className="frame" id='prev'
                                                                            style={{
                                                                                backgroundColor: index === questions.length - 1 ? '#f04950' : "#909090",
                                                                                cursor: index === 0 ? 'not-allowed' : 'pointer'
                                                                            }}
                                                                            onClick={() => navigate('prev')}>
                                                                            <img src={LeftArrow} alt="" />
                                                                            <div className="text-wrapper-3">Previous Question</div>
                                                                        </div>
                                                                        <div
                                                                            className="frame" id='next'
                                                                            style={{
                                                                                backgroundColor: index === questions.length - 1 ? "#909090" : '#f04950',
                                                                                cursor: index === questions.length - 1 ? 'not-allowed' : 'pointer'
                                                                            }}
                                                                            onClick={() => navigate('next')}
                                                                        >
                                                                            <div className="text-wrapper-3">Next Question</div>
                                                                            <img src={RightArrow} alt="" />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>

                                                            <p className="continue-later" style={{
                                                                width: 'fit-content',
                                                                margin: '0 auto',
                                                                fontSize: 14,
                                                                textDecoration: 'underline',
                                                                cursor: 'pointer'
                                                            }}
                                                                onClick={() => navigator('/profile')}
                                                            >
                                                                Continue Later
                                                            </p>
                                                        </div>
                                                    </>
                                                )
                                        }
                                    </div>
                                </>
                            )
                    }
                    <div className="progress"></div>
                </div>
            </div>
        </div >
    );
};
