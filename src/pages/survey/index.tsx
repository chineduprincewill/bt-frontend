/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import RightArrow from '../../assets/arrow-right.png'
import LeftArrow from '../../assets/arrow-left.png'
import './style.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/search.png'
import { QuestionProps, SURVEY_QUESTIONS } from './constant';
import ClosIcon from '../../assets/close.svg'
import { Circle } from '../../components/Circle';
import { useSubmitExternalSurveyMutation } from '../../api/questionnaireApi';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import WhiteCheck from '../../assets/white-check.svg'

const Question = (props: QuestionProps & { updateAnswer: (answer: string, type: any) => void, setIsAnswered: () => void }) => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const { type, question } = props;
    const [selected, setSelectedState] = useState<string | null>(null);
    const [answer, setAnswer] = useState<string>('')

    useEffect(() => {
        const storedSelectedKeys = JSON.parse(localStorage.getItem(`selectedOptions_${props.id}`) || '[]');
        setSelectedKeys(storedSelectedKeys);
    }, [props.id]);

    const setSelected = ({ answer, key }: { answer: string; key: string }) => {
        // Toggle selection
        const newSelectedKeys = selectedKeys.includes(key)
            ? selectedKeys.filter((selectedKey) => selectedKey !== key)
            : [...selectedKeys, key];

        setSelectedKeys(newSelectedKeys);
        localStorage.setItem(`selectedOptions_${props.id}`, JSON.stringify(newSelectedKeys)); // Store selected options in local storage
        props.updateAnswer(answer, type); // Join selected keys into a comma-separated string and update answer
    };


    useEffect(() => {
        setAnswer(answer)
        setSelectedKeys(selectedKeys)
        setSelectedState(selected)
    }, [answer, type, selectedKeys, selected])

    const selectedKeysAnswer = localStorage.getItem(`selectedOptions_${props.id}`)
    useEffect(() => {
        if (selectedKeysAnswer) {
            setSelectedKeys(JSON.parse(selectedKeysAnswer))
        }
    }, [selectedKeysAnswer])

    return (
        <>
            <div className="question-container flex-column">
                <p className="question flex-column">{question}</p>
                {type === 'multi-choice' &&
                    (
                        <p className='option-description'> {props.description}</p>
                    )}
                <div className="non-question">
                    {type === 'radio' &&
                        props.options.map((option) => {
                            const isSelected = selected === option.key;
                            const optionStyle = {
                                backgroundColor: selectedKeys.includes(option.key) ? '#d4d4d4' : '#e5e5e5',

                            };

                            return (
                                <div
                                    className='radio-option flex-row align-left'
                                    key={option.key}
                                    onClick={() => {
                                        setSelected({ key: option.key, answer: option.text })
                                        !selectedKeys.includes(option.key) && setSelectedKeys([option.key])
                                    }}
                                    style={optionStyle}
                                >
                                    <div className="circle"
                                        style={{
                                            border: isSelected || selectedKeys.includes(option.key) ? "2px solid" : '1px solid',
                                            backgroundColor: isSelected || selectedKeys.includes(option.key) ? 'black' : 'white',
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
                        })}
                    {type === 'text' && (
                        <div className='text-option flex-row align-left'>
                            <textarea style={{ resize: 'none' }} placeholder='Enter your answer here' onChange={(e) => setSelected({ answer: e.target.value, key: props.id })} />
                        </div>
                    )}
                    {type === 'search-dropdown' && (
                        <div className='search-dropdown-option flex-row'>
                            <img src={SearchIcon} alt="search" className="icon" />
                            <input type="text" placeholder={props.placeholder} list="jobTitles" />
                            <datalist id="jobTitles">
                                {props.options.map((option) => (
                                    <option key={option.key} value={option.text} onClick={() => {
                                        setSelected({ key: option.key, answer: option.text })
                                        !selectedKeys.includes(option.key) && setSelectedKeys([...selectedKeys, option.key])
                                    }} />
                                ))}
                            </datalist>
                        </div>
                    )}
                    {type === 'pick-dropdown' && (
                        <div className='pick-dropdown-option flex-row'>
                            <input type="text" placeholder={props.placeholder} list='raceList' />
                            <datalist id="raceList">
                                {props.options.map((option) => (
                                    <option key={option.key} onClick={() => {
                                        setSelected({ key: option.key, answer: option.text })
                                        selectedKeys.includes(option.key) ? setSelectedKeys(selectedKeys.filter((key) => key !== option.key)) : setSelectedKeys([...selectedKeys, option.key])
                                    }} />
                                ))}
                            </datalist>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export const Survey = () => {
    const questions = SURVEY_QUESTIONS
    const [firstLoad, setFirstLoad] = useState(true)
    const [question, setQuestion] = useState<QuestionProps>(questions[questions.length - 1])
    const [index, setQuestionIndex] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const [surveyCompleted, setSurveyCompleted] = useState(false)
    const [isLastQuestion, setIsLastQuestion] = useState(index === questions.length - 1)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [submitExternalSurvey, { isLoading }] = useSubmitExternalSurveyMutation()
    const [email, setEmail] = useState('' as string)
    const navigator = useNavigate()
    const location = useLocation()

    // Clear localstorage 
    useEffect(() => {
        console.log({ firstLoad })
        if (firstLoad) {
            localStorage.clear()
            setFirstLoad(false)
        }
    }, [firstLoad])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const _email = searchParams.get('e');
        setEmail(_email as string)
    }, [location.search]);

    const navigate = (type: 'next' | 'prev') => {
        if (type === 'next') {
            if (!localStorage.getItem(`question_${index}`)) return
        }

        const answer = localStorage.getItem(`question_${index}`)
        if (answer) setIsAnswered(true)

        // Check if it is the last question and i clicked prev
        if (type === 'prev' && index === 0) {
            return
        }
        setQuestionIndex((prevIndex) => {
            const newIndex = type === 'next'
                ? Math.min(prevIndex + 1, questions.length - 1)
                : Math.max(prevIndex - 1, 0);
            return newIndex;
        });
        setIsAnswered(false)
    }

    const updateAnswer = ({ answer, type }: { answer: string, type?: string }) => {
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
        // else setIsAnswered(true)

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [`Q${index + 1}`]: answer
        }))
        localStorage.setItem(`question_${index}`, answer)
    }

    useEffect(() => {
        setQuestion(questions[index]), [index, questions]
        setIsLastQuestion(index === questions.length - 1)

        const questionHasBeenAnswered = localStorage.getItem(`question_${index}`)
        console.log({ questionHasBeenAnswered })
        if (questionHasBeenAnswered && questionHasBeenAnswered != '[]') {
            setIsAnswered(true)
        }
    }, [index, questions, navigator])

    console.log({ answers })
    return (
        <div className="survey flex-column">
            <div className="logo-container">
                <img className="logo" alt="Union" src={Logo} />
                <div onClick={() => navigator('/profile')}>
                    <Circle width={30} height={30} noMg bg='transparent' borderColor='black' pd={10} img={ClosIcon} />
                </div>
            </div>
            <div className="__container">
                <div className="content">
                    {
                        surveyCompleted
                            ? <>
                                <div className="completed_survey">
                                    <div className="form survey_completed">
                                        <div className="check-area">
                                            <img src={WhiteCheck} alt="" />
                                        </div>
                                        <h3>Thank you! We've recieved your answers</h3>

                                        <p className="msg">
                                            We appreciate you dedicating your time to complete the questionnaires; this will assist us in enhancing and optimizing your experience and interaction on our platform.
                                        </p>

                                        <div className="nav">
                                            <div >
                                                <div className="quest-nav-btns flex-row">
                                                    <div
                                                        className="frame" id='next'
                                                        style={{
                                                            backgroundColor: isAnswered ? "#f04950" : '#909090',
                                                            minWidth: '140px'
                                                        }}
                                                        onClick={() => {
                                                            if (isAnswered) {
                                                                submitExternalSurvey({
                                                                    userResponse: answers as any,
                                                                    surveyClass: 'survey',
                                                                    roleType: 'other',
                                                                    email
                                                                }).then(() => {
                                                                    setSurveyCompleted(true)
                                                                }).catch((err) => {
                                                                    toast.error(err.data?.message ?? err.message)
                                                                })
                                                            }
                                                        }}
                                                    >
                                                        {
                                                            isLoading
                                                                ?
                                                                <Spinner width='20px' height='20px' key={1} />
                                                                : <>
                                                                    <div className="text-wrapper-3"
                                                                        onClick={() => navigator('/profile')}
                                                                    >Go home</div>
                                                                    <img src={RightArrow} alt="" />
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            : <>
                                <div className="form flex-column">
                                    {
                                        question && (
                                            <div className="info-section flex-row">
                                                {question.type === 'radio' && (
                                                    <Question
                                                        id={question.id}
                                                        options={question.options}
                                                        question={question.question}
                                                        updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                        type={question.type}
                                                        setIsAnswered={() => setIsAnswered(true)}
                                                    />
                                                )}
                                                {question.type === 'text' && (
                                                    <Question
                                                        id={question.id}
                                                        question={question.question}
                                                        type={question.type}
                                                        updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                        setIsAnswered={() => setIsAnswered(true)}
                                                    />
                                                )}
                                                {question.type === 'multi-choice' && (
                                                    <Question
                                                        id={question.id}
                                                        options={question.options}
                                                        question={question.question}
                                                        type={question.type}
                                                        description={question.description}
                                                        updateAnswer={(answer: string, type: string) => updateAnswer({ answer, type })}
                                                        setIsAnswered={() => setIsAnswered(true)}
                                                    />
                                                )}
                                                {question.type === 'search-dropdown' && (
                                                    <Question
                                                        options={question.options}
                                                        question={question.question}
                                                        id={question.id}
                                                        type={question.type}
                                                        placeholder={question.placeholder}
                                                        updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                        setIsAnswered={() => setIsAnswered(true)}
                                                    />
                                                )}
                                                {question.type === 'pick-dropdown' && (
                                                    <Question
                                                        id={question.id}
                                                        options={question.options}
                                                        question={question.question}
                                                        type={question.type}
                                                        placeholder={question.placeholder}
                                                        updateAnswer={(answer: string) => updateAnswer({ answer })}
                                                        setIsAnswered={() => setIsAnswered(true)}
                                                    />
                                                )}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="nav">
                                    <div >
                                        <div className="quest-nav-btns flex-row">
                                            {
                                                isLastQuestion ? (
                                                    <div
                                                        className="frame" id='next'
                                                        style={{
                                                            backgroundColor: isAnswered ? "#f04950" : '#909090'
                                                        }}
                                                        onClick={() => {
                                                            console.log({ answers })
                                                            if (isAnswered) {
                                                                submitExternalSurvey({
                                                                    userResponse: answers as any,
                                                                    surveyClass: 'survey',
                                                                    roleType: 'other',
                                                                    email
                                                                }).then((res) => {
                                                                    if ((res as any).data?.status === 'success') {
                                                                        toast.success('Survey submitted successfully')
                                                                        setSurveyCompleted(true)
                                                                        localStorage.clear()
                                                                    }

                                                                    if ((res as any).error?.status !== 200) {
                                                                        toast.error((res as any).error?.data?.message ?? (res as any).error?.message)
                                                                        return
                                                                    }
                                                                }).catch((err) => {
                                                                    console.log({ err })
                                                                    toast.error(err.data?.message ?? err.message)
                                                                })
                                                            }
                                                        }}
                                                    >
                                                        {
                                                            isLoading
                                                                ?
                                                                <Spinner width='20px' height='20px' />
                                                                : <>
                                                                    <div className="text-wrapper-3">Proceed</div>
                                                                    <img src={RightArrow} alt="" />
                                                                </>
                                                        }
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="frame" id='prev'
                                                            style={{
                                                                backgroundColor: index === questions.length - 1 ? '#f04950' : "#909090",
                                                                cursor: index === 0 ? 'not-allowed' : 'pointer',
                                                            }}
                                                            onClick={() => navigate('prev')}>
                                                            <img src={LeftArrow} alt="" />
                                                            <div className="text-wrapper-3">Previous Question</div>
                                                        </div>
                                                        <div
                                                            className="frame" id='next'
                                                            style={{
                                                                backgroundColor: index === questions.length - 1 ? "#909090" : '#f04950',
                                                                cursor: (index === questions.length - 1) && !isAnswered ? 'not-allowed' : 'pointer',
                                                            }}
                                                            onClick={() => navigate('next')}
                                                        >
                                                            <div className="text-wrapper-3">Next Question</div>
                                                            <img src={RightArrow} alt="" />
                                                        </div>
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div className="progress"></div>

                            </>
                    }
                </div>
            </div>
        </div >
    );
};
