import BugReport from '../../assets/bugs-rep.svg';
import ArrowBackBlack from '../../assets/back-icon.svg';
import { useNavigate } from 'react-router-dom';

export default function Bugs() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className="px-5 md:px-24 bg-[#F0F0F0] h-full md:h-screen leading-0 mt-[-18px]">
            <div className="bg-black border-solid border rounded-full w-10 m-0 hidden md:block md:ml-4 my-5 ">
                <img onClick={goBack} src={ArrowBackBlack} alt="arrow back" className="w-10 h-10" />
            </div>
            <div className="block md:flex justify-center gap-32 px-5 py-12">
                <div className="w-full md:w-1/2 overflow-hidden space-y-7">
                    <div className="">
                        <h3 className="text-3xl font-semibold">
                            Help us squash <span className="text-red-500">bugs</span>!
                        </h3>
                        <h3 className="text-3xl font-semibold">We want to serve you better!</h3>
                        <p className="text-sm w-full pt-5">
                            Spot a bug? Help us squash it! We're dedicated to delivering a seamless experience, and your feedback is crucial. Report
                            any bugs or glitches you encounter, and together, let's make our platform even better.
                        </p>
                    </div>

                    <div className="">
                        <img src={BugReport} alt="" />
                    </div>

                    <div className="hidden md:block">
                        <h3 className="text-xl font-medium">Send us an email</h3>
                        <p className="underline text-blue-600">
                            <a href="mailto:help@blkat.io">help@blkat.io</a>
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 my-5 md:my-0">
                    <form className="bg-white rounded-md shadow-md w-full h-[480px] p-7 space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="">Issue</label>
                            <div className="">
                                <input
                                    type="text"
                                    name="issue"
                                    id="text"
                                    className="w-full border-solid border border-black rounded p-2"
                                    //  onChange={(e) => updateBugFormField('issue', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="">Email Address</label>
                            <div className="">
                                <input
                                    type="text"
                                    name="email"
                                    disabled={true}
                                    className="w-full border-solid border border-black rounded p-2"
                                    //  value={loggedUser.email}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="">Details of the issue</label>
                            <div className="">
                                <textarea
                                    name="company name"
                                    id="detail"
                                    className="w-full h-44 border border-solid border-black rounded p-2"
                                    // value={bugForm.detail}
                                    // onChange={(e) => updateBugFormField('detail', e.target.value)}
                                    placeholder="Write in details, the issue you’re facing"
                                />
                            </div>
                        </div>

                        <div className="bg-red-500 text-white rounded-2xl w-full text-center p-2">
                            <button>Send Message</button>
                        </div>
                    </form>
                </div>
                <div className="block md:hidden">
                    <h3 className="text-md font-medium">Send us an email</h3>
                    <p className="underline text-blue-600">
                        <a href="mailto:help@blkat.io">help@blkat.io</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
