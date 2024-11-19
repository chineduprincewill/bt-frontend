import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { toggleReferFriendsModal } from "../../state/slices/referFriends";
import CloseCircle from '../../assets/close-circle.png'
import UserCircleAdd from '../../assets/user-cirlce-add.png'
import { Circle } from '../../components/Circle';
import { useReferUserMutation } from "../../api/userApi";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { updateLoggedUser } from "../../state/slices/authSlice";
export const ReferFriends = () => {
    const { show } = useSelector((state: RootState) => state.referFriends)
    const [referFriend, { isLoading }] = useReferUserMutation()
    const [email, setEmail] = useState('')
    const [showWarning, setShowWarning] = useState(false)
    const [referalsLeft, setReferalsLeft] = useState(3)
    const { loggedUser } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [buttonSuccess, setButtonSuccess] = useState(false)


    const validateEmail = useCallback((email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }, [])

    const invite = () => {
        const validEmail = validateEmail(email)

        if (!validEmail || !loggedUser) {
            return setShowWarning(true)
        }

        referFriend({ email: 'richiemoluno@gmail.com' })
            .unwrap()
            .then((res) => {
                setEmail('')
                setReferalsLeft(Math.max(0, 3 - res.data.totalReferrals))
                dispatch(updateLoggedUser({ referrals: res.data.totalReferrals }))
                setButtonSuccess(true)
                // toast.success(res.message)
            })
            .catch((err) => {
                toast.error(err.data.message ?? err.message)
            })
    }

    useEffect(() => {
        if (loggedUser) {
            setReferalsLeft(Math.max(0, 3 - loggedUser.referrals))
        }
    }, [loggedUser])
    useEffect(() => {
        setShowWarning(false)
    }, [email])

    return (
        <>
            {
                show &&
                <div className="refer-friends max-width">
                    <div className="vh max-width">
                        <div className="modal flex-column centralize-y">
                            {/* tiny cancel svg logo at the top right */}
                            <div className="cancel-svg" onClick={() => {
                                dispatch(toggleReferFriendsModal({ show: false }))
                            }}>
                                <Circle
                                    img={CloseCircle}
                                    pd={12}
                                    height={40}
                                    width={40}
                                    normalImage
                                    key={1}
                                    noMg
                                    noBorder
                                    bg='transpparent'
                                />
                            </div>

                            <div className="modal-column">
                                <div className="top _section">
                                    <div className="modal-items">
                                        <Circle
                                            img={UserCircleAdd}
                                            pd={2}
                                            height={60}
                                            width={60}
                                            normalImage
                                            key={1}
                                            noMg
                                            noBorder
                                            bg='transparent'
                                        />
                                        <h3 >Invite your friends</h3>
                                        <p className="desc">When you invite your friends to BlackAt, you're not just extending an invitation, you're opening a door to a host of corporate career opportunities for them.</p>
                                    </div>
                                </div>

                                <div className="bottom _section">
                                    {/* modal email input */}
                                    <div className="modal-input">
                                        <p>Invite your friends by email: {showWarning && <span> Please use a valid email</span>}</p>
                                        <input type="text" value={email} placeholder="Enter an email address..." onChange={(e) => {
                                            setEmail(e.target.value)
                                            setButtonSuccess(false)
                                        }}
                                            onKeyDownCapture={(e) => {
                                                if (e.key === 'Enter') {
                                                    invite()
                                                }
                                            }}
                                        />

                                        <button className={`invite-button ${buttonSuccess ? 'success' : ''}`} onClick={() => invite()}>
                                            {
                                                isLoading
                                                    ? <div><Spinner width='10px' height='10px' /></div>
                                                    : (buttonSuccess ? 'Invited' : 'Invite')
                                            }
                                        </button>
                                        {/* <button>Invite</button> */}
                                        <div className="cta">
                                            <p className="cancel">You have <span>{referalsLeft}</span> Invites left</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    );
}