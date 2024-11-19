import { useEffect, useState } from 'react';
import { RootState } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OpenLink from '../../assets/open-link.svg';
import './style.scss';
import { toggleDeactivateAccountModal, toggleSettingsModal } from '../../state/slices/settingsSlice';
import { DeactivateAccount } from '../../components/DeactivateAccount';
import { useChangePasswordMutation } from '../../api/authApi';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import Back from '../../assets/back-icon.svg';

const AccountSettings = () => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [passwwordsValidated, setPasswordsValidated] = useState({
        newPasswordDifferentFromCurrent: false,
        newEqualsConfirm: false,
        passwordRegexValidated: false,
    });
    const [changePassword, { isLoading, isError }] = useChangePasswordMutation();
    isError;

    if (!loggedUser) {
        navigate('/login');
    }

    const updatePasswordField = (key: 'current' | 'new' | 'confirm', value: string) => {
        setPasswords({ ...passwords, [key]: value });
    };

    const initPasswordChange = () => {
        console.log({ passwwordsValidated });
        const passwordIsValid = passwwordsValidated.newEqualsConfirm && passwwordsValidated.passwordRegexValidated;
        if (passwordIsValid) {
            changePassword({
                oldPassword: passwords.current,
                newPassword: passwords.new,
            })
                .unwrap()
                .then((res) => {
                    toast.success(res.message);
                    setPasswords({
                        current: '',
                        new: '',
                        confirm: '',
                    });
                })
                .catch((err) => {
                    toast.error(err.data.message);
                });
        }
        if (!passwwordsValidated.newPasswordDifferentFromCurrent) {
            toast.error('New password must be different from current password');
        }
        if (!passwwordsValidated.newEqualsConfirm) {
            toast.error('New password and confirm password must be the same');
        }
    };

    useEffect(() => {
        const passwordValidation = [
            /[A-Z]/.test(passwords.new),
            /[a-z]/.test(passwords.new),
            /\d/.test(passwords.new),
            /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(passwords.new),
        ];

        setPasswordsValidated({
            newPasswordDifferentFromCurrent: passwords.new !== passwords.current,
            newEqualsConfirm: passwords.new === passwords.confirm,
            passwordRegexValidated: passwordValidation.every((item) => item === true),
        });
    }, [passwords]);

    return (
        <>
            {loggedUser && (
                <div className="form-area">
                    <div className="input-area">
                        <label htmlFor="email">Email address</label>
                        <div className="input">
                            <input type="email" name="email" id="email" value={loggedUser.email} />
                            {/* <button className="change_btn">Change</button> */}
                        </div>
                    </div>
                    <div className="input-area password">
                        <label htmlFor="password">Password</label>
                        <div className="input flex-row centralize-y">
                            <input
                                type="password"
                                name="password"
                                value={passwords.current}
                                placeholder="Current password"
                                onChange={(e) => updatePasswordField('current', e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && initPasswordChange()}
                            />
                            <input
                                type="password"
                                name="password"
                                value={passwords.new}
                                placeholder="New password"
                                onChange={(e) => updatePasswordField('new', e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && initPasswordChange()}
                            />
                            <input
                                type="password"
                                name="password"
                                value={passwords.confirm}
                                placeholder="Confirm new password"
                                onChange={(e) => updatePasswordField('confirm', e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && initPasswordChange()}
                            />
                            <button className="change_btn" onClick={() => initPasswordChange()}>
                                {isLoading ? (
                                    <div className="flex-row centralize-x centralize-y" style={{ width: '100%' }}>
                                        <Spinner width="10px" height="10px" />
                                    </div>
                                ) : (
                                    'Change'
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="submit_area">
                        <button
                            onClick={() => dispatch(toggleDeactivateAccountModal({ show: true }))}
                            style={{ cursor: 'pointer' }}
                            className="deactivate"
                        >
                            Deactivate your account
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export const SettingsPage = () => {
    const [selectPane, setSelectedPane] = useState<'account' | 'profile' | 'help'>('account');
    const navigate = useNavigate();
    const disptch = useDispatch();

    const pane = {
        account: <AccountSettings />,
        profile: <></>,
        help: <></>,
    };
    return (
        <>
            <div className="__settings_page flex-column centralize-y" style={{ position: 'relative' }}>
                <div className="___container">
                    <div className="max-width">
                        <div
                            className="close flex-row centralize-y"
                            style={{
                                cursor: 'pointer',
                                background: 'black',
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={() => {
                                disptch(toggleSettingsModal({ show: false }));
                            }}
                        >
                            <img src={Back} height={20} width={20} alt="Close" />
                        </div>
                        <div className="pane_header flex-row centralize-y">
                            <h3>Settings</h3>
                        </div>

                        <div className="tabs flex-row centralize-y">
                            <button
                                className="tab"
                                onClick={() => setSelectedPane('account')}
                                style={{
                                    backgroundColor: selectPane === 'account' ? '#e9e9e9' : 'transparent',
                                }}
                            >
                                Account settings
                            </button>
                        </div>
                    </div>

                    <div className="pane">{pane[selectPane]}</div>

                    <div className="footer_sect">
                        <div className="link flex-row centralize-y" onClick={() => navigate('/terms')}>
                            <p>Read our tems of use here</p>
                            <img src={OpenLink} alt="" />
                        </div>
                        <div className="link flex-row centralize-y">
                            <p>Read our FAQ</p>
                            <img src={OpenLink} alt="" />
                        </div>
                    </div>
                </div>

                <DeactivateAccount />
            </div>
        </>
    );
};
