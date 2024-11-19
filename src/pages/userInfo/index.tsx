import './style.scss'
import Logo from '../../assets/logo.png';
import RightArrow from '../../assets/arrow-right.png'
import { IUserType } from '../../interfaces'
import { Link, useParams } from 'react-router-dom'
import ClockIcon from './Clock.icon';
import Infoicon from './Info.icon';
import { FAQ } from '../../components/Faq';

const UserInfo = () => {
    const { userType } = useParams<{ userType: IUserType }>()
    return (
        <div id='user-info' className='flex-column'>
            <div className="logo-container">
                <img className="logo" alt="Union" src={Logo} />
                <div className="timeline">
                    <p><span>Questionnaire time: </span><ClockIcon /> Less than <span>&nbsp;3 mins</span></p>
                </div>
            </div>
            <div className="__container">
                <div className="content flex-column">
                    <h4>{userType === "executive" ? "Executive" : "Vendors"}</h4>
                    <div className="hstack">
                        <Infoicon />
                        <h1>Help Center</h1>
                    </div>
                    <p>
                        Everything you need to know about an executive <br />and the capability of an executive
                    </p>

                    <div className="faqs">
                        <FAQ title={userType === "executive" ? 'Who are executives?' : "Who are vendors?"}>
                            {userType === "executive" ? <>
                                An executive is a key figure in the C-suite, distinct from traditional roles like SVPs, CMOs, or CEOs. Their role is tailored towards fostering personal growth and achieving both short-term and long-term goals.
                            </> : <>
                                Vendors are innovative agencies poised to make a mark in the industry. At BlackAt, we provide a dynamic platform where these agencies can shine. By crafting a business page with us, they unlock the door to engaging with top-tier executives and prominent brands. It's not just about visibility; it's about forging meaningful connections and leveraging these relationships for mutual success.
                            </>}
                        </FAQ>
                        <FAQ title={userType === "executive" ? 'What can an executive do?' : "What can a vendor do?"}>
                            {userType === "executive" ? <>
                                They play a crucial role in educating junior staff through masterclasses, sharing their rich experiences. Additionally, they have the opportunity to offer global mentorship, broadening their impact. This initiative aims to foster their development across local, regional, and global levels, while they also support black vendors and contribute to a diverse business environment.
                            </> : <>
                                As a vendor at BlackAt, agencies are empowered to do more than just showcase their skills. They step into a realm of unique opportunities: creating a bespoke business page that becomes their professional canvas. Here, they can interact directly with industry leaders, engage creatively with well-known brands, and build relationships that aren't just about networking, but about driving mutual success.
                            </>}
                        </FAQ>
                        <FAQ title={userType === "executive" ? 'What are the perks of being an executive?' : "What do I enjoy as a vendor?"}>
                            {userType === "executive" ? <ol>
                                <li><b>Personal Growth</b>: Executives are provided with personalized development paths and personal assistants, aiding in achieving both their immediate and long-term career goals.</li>
                                <li><b>Global Influence</b>: They have the opportunity to extend their leadership and mentorship on a global scale, influencing industry practices and trends beyond their immediate professional circles.</li>
                                <li><b>Empowering Future Leaders</b>: By conducting masterclasses and mentorships, executives play a crucial role in shaping and guiding the next generation of leaders, sharing their expertise and experiences.</li>
                            </ol> : <>
                                The life of a vendor at BlackAt is filled with exclusive perks. As an agency on our platform, you're not just displaying your capabilities; you're actively attracting fresh business opportunities. By creating your own business page, you step into a world of interaction with top executives, opening doors to engaging conversations with leading brands. It's a chance to not just network, but to build and leverage relationships for shared success. This is where showcasing your unique strengths becomes the key to unlocking new, prosperous partnerships.
                            </>}
                        </FAQ>
                    </div>

                    <div className="buttons">
                        <Link to="/user-type">Back</Link>

                        <Link className='btn btn-red' to={"/questionaire/" + userType}>
                            Proceed
                            <img src={RightArrow} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo