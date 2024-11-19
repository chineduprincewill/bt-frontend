import { useState } from 'react';
import { RootState } from '../../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OpenLink from '../../assets/open-link.svg';
import './style.scss';
import { DeactivateAccount } from '../../components/DeactivateAccount';
import SupportImage from '../../assets/support_hero.jpg';
import { toggleTalkToSupportModal } from '../../state/slices/supportSlice';
import { useContactSupportMutation } from '../../api/authApi';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import BugReport from '../../assets/bugs-rep.svg';
// import Close from '../../assets/close-circle.png';
import Back from '../../assets/back-icon.svg';

const AccountSettings = () => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        message: '',
        companyName: '',
    });
    const [bugForm, setBugForm] = useState({
        issue: '',
        detail: '',
    });
    const { type: formType } = useSelector((state: RootState) => state.support);

    const [submitForm, { isLoading }] = useContactSupportMutation();

    const formIsValid = (form: Record<string, any>) => {
        const keys = Object.keys(form);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = form[key];

            if (value.length < 1) {
                return false;
            }
        }

        return true;
    };

    const updateFormField = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const updateBugFormField = (key: keyof typeof bugForm, value: string) => {
        setBugForm({ ...bugForm, [key]: value });
    };
    if (!loggedUser) {
        navigate('/login');
    }
    return (
        <>
            {loggedUser && (
                <div className={`form-area ${formType}`}>
                    {formType === 'contact' ? (
                        <>
                            <div className="flex-row">
                                <div className="input-area">
                                    <label htmlFor="firstname">First Name</label>
                                    <div className="input">
                                        <input type="text" name="firstname" id="email" disabled={true} value={loggedUser.firstName} />
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="firstname">Last Name</label>
                                    <div className="input">
                                        <input type="text" name="firstname" id="email" disabled={true} value={loggedUser.lastName} />
                                    </div>
                                </div>
                            </div>
                            <div className="input-area">
                                <label htmlFor="email">Email address</label>
                                <div className="input">
                                    <input type="email" name="email" id="email" disabled={true} value={loggedUser.email} />
                                    {/* <button className="change_btn">Change</button> */}
                                </div>
                            </div>
                            <div className="input-area">
                                <label htmlFor="firstname">Subject</label>
                                <div className="input">
                                    <input
                                        type="text"
                                        name="company name"
                                        id="email"
                                        value={form.companyName}
                                        onChange={(e) => updateFormField('companyName', e.target.value)}
                                        placeholder="Subject"
                                    />
                                </div>
                            </div>
                            <div className="input-area flex-column">
                                <label htmlFor="">Message</label>
                                <textarea
                                    style={{ resize: 'none' }}
                                    name=""
                                    id="message"
                                    value={form.message}
                                    onChange={(e) => updateFormField('message', e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="input-area">
                                <label htmlFor="firstname">Issue</label>
                                <div className="input">
                                    <input type="text" name="issue" id="text" onChange={(e) => updateBugFormField('issue', e.target.value)} />
                                </div>
                            </div>
                            <div className="input-area">
                                <label htmlFor="firstname">Email Address</label>
                                <div className="input">
                                    <input type="text" name="email" disabled={true} value={loggedUser.email} />
                                </div>
                            </div>

                            <div className="input-area">
                                <label htmlFor="firstname">Details of the issue</label>
                                <div className="input">
                                    <textarea
                                        style={{ resize: 'none' }}
                                        name="company name"
                                        id="detail"
                                        value={bugForm.detail}
                                        onChange={(e) => updateBugFormField('detail', e.target.value)}
                                        placeholder="Write in details, the issue you’re facing"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="submit_area">
                        <button
                            onClick={() => {
                                if (!formIsValid(formType === 'contact' ? form : bugForm)) return;

                                const formData =
                                    formType == 'contact'
                                        ? {
                                              email: loggedUser.email,
                                              name: `${loggedUser.firstName} ${loggedUser.lastName}`,
                                              message: form.message,
                                              subject: form.companyName,
                                              type: formType,
                                          }
                                        : {
                                              email: loggedUser.email,
                                              name: `${loggedUser.firstName} ${loggedUser.lastName}`,
                                              subject: bugForm.issue,
                                              type: formType,
                                              message: bugForm.detail,
                                          };
                                submitForm(formData)
                                    .unwrap()
                                    .then(() => {
                                        toast.success('Message sent successfully');
                                        setForm({
                                            message: '',
                                            companyName: '',
                                        });
                                        setBugForm({ detail: '', issue: '' });
                                    });
                            }}
                            style={{ cursor: 'pointer' }}
                            className="deactivate"
                        >
                            {isLoading ? <Spinner width="20px" height="20px" /> : 'Send Message'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export const SupportPage = () => {
    const [selectPane, setSelectedPane] = useState<'account' | 'profile' | 'help'>('account');
    const navigate = useNavigate();
    const disptch = useDispatch();
    const { type: formType } = useSelector((state: RootState) => state.support);

    const goBack = () => {
        navigate(-1);
    };

    // const pane = {
    //     account: <AccountSettings />,
    //     profile: <AccountSettings />,
    //     help: <AccountSettings />,
    // };
    return (
        <>
            <div className="__support_page flex-column centralize-y" style={{ position: 'relative' }}>
                <div className="___container ">
                    <div className="_supp_cont flex-row">
                        <div className="left">
                            <div
                                style={{
                                    cursor: 'pointer',
                                    background: 'black',
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                className="link close flex-row centralize-y"
                                onClick={goBack}
                            >
                                <img src={Back} height={20} width={20} alt="Close" />
                            </div>
                            <div className="max-width">
                                <>
                                    <div className="pane_header flex-column">
                                        <h3>
                                            Talk to our <span>support</span>,
                                        </h3>
                                        <h3> we are happy to help you!</h3>
                                        <p className="desc">
                                            Don't hesitate to reach out; we're just a message away, ready to turn your concerns into solutions. Let's
                                            chat and make your experience with us the best it can be!"
                                        </p>
                                    </div>

                                    <div className="img_section">
                                        <img src={SupportImage} alt="" />
                                    </div>

                                    <div className="tabs flex-row centralize-y">
                                        <button
                                            className="tab"
                                            onClick={() => setSelectedPane('account')}
                                            style={{
                                                backgroundColor: selectPane === 'account' ? '#e9e9e9' : 'transparent',
                                            }}
                                        >
                                            General Inquiries
                                        </button>
                                        <button
                                            className="tab"
                                            onClick={() => setSelectedPane('profile')}
                                            style={{
                                                backgroundColor: selectPane === 'profile' ? '#e9e9e9' : 'transparent',
                                            }}
                                        >
                                            Sales & Partnership
                                        </button>
                                        <button
                                            className="tab"
                                            onClick={() => setSelectedPane('help')}
                                            style={{
                                                backgroundColor: selectPane === 'help' ? '#e9e9e9' : 'transparent',
                                            }}
                                        >
                                            Technical Support
                                        </button>
                                    </div>
                                </>
                            </div>
                            <div className="footer_sect">
                                <h5>Send us an email @</h5>
                                <div className="link open flex-row centralize-y" onClick={() => navigate('/terms')}>
                                    <p onClick={() => navigate('mailto:help@blkat.io')}>help@blkat.io</p>
                                    <img src={OpenLink} alt="" />
                                </div>
                            </div>
                        </div>

                        {/* <div className="pane">{pane[selectPane]}</div> */}
                    </div>
                </div>

                <DeactivateAccount />
            </div>
        </>
    );
};
