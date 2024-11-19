import EnterIcon from '../../assets/enter.png'
import ArrowRight from '../../assets/arrow-right.png'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import HeroImage from '../../assets/hero1.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setCreateAccountDetails } from '../../state/slices/createAccount';
import { useEffect, useState } from 'react';
import { OnboardingSplitView } from '../../components/OnboardingLeftPane';

const validate = ({ firstName, lastName }: { firstName: string, lastName: string }) => {
    // Regex for at least 3 characters
    const regex = /\S{3,}/
    return regex.test(firstName) && regex.test(lastName)
}
export const EnterName = () => {
    const { user } = useSelector((state: RootState) => state.createAccount)
    const [names, setNames] = useState({ firstName: '', lastName: '' })
    const [isFormValidated, setIsFormValidated] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentPage = 2;
    const proceedToSelectUserName = () => {
        const { firstName, lastName } = names

        if (validate({ firstName, lastName })) {
            dispatch(setCreateAccountDetails({ email: user.email, firstName, lastName }))
            navigate('/username')
        }
    }

    useEffect(() => {
        const { firstName, lastName } = names
        validate({ firstName, lastName }) ? setIsFormValidated(true) : setIsFormValidated(false)
    }, [names])

    return (
        <div className="enter-name">
            <OnboardingSplitView heroImage={HeroImage} key={1}>
                <div className="content">
                    <div className="label">
                        <p className="step">
                            <span className="text-wrapper">Step {currentPage}</span>
                            <span className="span"> / 5</span>
                        </p>
                    </div>
                    <div className="welcome">
                        <div className="header">Enter name your</div>
                        <p className="p">Fill your full name</p>
                    </div>
                    <div className="form">
                        <div className="overlap">
                            <div className="overlap-group">
                                <input className="text-wrapper" placeholder='First name' onChange={(e) => {
                                    setNames({ ...names, firstName: e.target.value })
                                }} />
                            </div>
                            <div className="overlap-group">
                                <input className="text-wrapper" placeholder='Last name' onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        proceedToSelectUserName()
                                    }
                                }} onChange={(e) => {
                                    setNames({ ...names, lastName: e.target.value })
                                }} />
                            </div>
                        </div>
                        <div className="submit-area">
                            <div className="frame"
                                onClick={proceedToSelectUserName}
                                style={{
                                    backgroundColor: !isFormValidated ? '#ccc' : '#f04950',
                                    cursor: !isFormValidated ? 'not-allowed' : 'pointer'
                                }}>
                                <div className="text-wrapper-3"
                                >Proceed</div>
                                <img className="img" alt="Press Enter" src={ArrowRight} />
                            </div>
                            <div className="group">
                                <div className="text-wrapper-5">Press enter</div>
                                <img className="img" alt="Press Enter" src={EnterIcon} />
                            </div>
                        </div>

                    </div>

                </div>
            </OnboardingSplitView>
        </div>
    );
};
