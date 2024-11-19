import { useState } from 'react';
import DeactivateIcon from '../../assets/deactivate-icon.svg';
import GoodByeIcon from '../../assets/goodbye.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Circle } from '../Circle';
import './style.scss';
import CloseButton from '../../assets/main-close.svg';
import { toggleDeactivateAccountModal } from '../../state/slices/settingsSlice';

const ConfirmPassword = ({ next }: { next: () => void }) => {
    return (
        <>
            <div className="deact_sub_modal">
                <div className="top flex-column centralize-x deact_section">
                    <Circle
                        bg="transparent"
                        img={DeactivateIcon}
                        pd={10}
                        width={90}
                        height={90}
                        noBorder
                    />
                    <h2>Delete your account</h2>
                    <p className="text">
                        We are sad you’re leaving, going forward with this
                        deleted all your user data from our platform such as
                        email and cached files
                    </p>
                </div>

                <div className="bottom deact_section">
                    <div className="min_form">
                        <label htmlFor="password" className="confirm_pwd">
                            Confirm your password to delete
                        </label>
                        <div className="input_sect flex-row centralize-y">
                            <input
                                type="password"
                                placeholder="Enter your password"
                            />
                            <button
                                className="deactivate"
                                onClick={() => {
                                    next();
                                }}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const GoodBye = ({ resetState }: { resetState: () => void }) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="deact_sub_modal">
                <div
                    className="top flex-column centralize-y centralize-x"
                    style={{
                        height: '100%',
                    }}
                >
                    <Circle
                        bg="transparent"
                        img={GoodByeIcon}
                        pd={10}
                        width={90}
                        height={90}
                        noBorder
                        noMg
                    />

                    <h3 id="goodbye-header">
                        Good bye! We're going to miss you
                    </h3>

                    <button
                        onClick={() => {
                            dispatch(
                                toggleDeactivateAccountModal({ show: false }),
                            );
                            resetState();
                        }}
                        className="cancel"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export const DeactivateAccount = () => {
    const [pane, setPane] = useState<'confirm' | 'goodbye'>('confirm');
    const { show } = useSelector((state: RootState) => state.deactivateAccount);
    const dispatch = useDispatch();

    return (
        <>
            {show && (
                <div className="deactivate_acc flex-row centralize-x">
                    <div className="deact_modal flex-row centralize-x">
                        {pane === 'confirm' ? (
                            <ConfirmPassword next={() => setPane('goodbye')} />
                        ) : (
                            <GoodBye resetState={() => setPane('confirm')} />
                        )}
                        {pane === 'confirm' && (
                            <div
                                onClick={() =>
                                    dispatch(
                                        toggleDeactivateAccountModal({
                                            show: false,
                                        }),
                                    )
                                }
                            >
                                <Circle
                                    bg="black"
                                    img={CloseButton}
                                    pd={3}
                                    width={12}
                                    height={12}
                                    noBorder
                                    noMg
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
