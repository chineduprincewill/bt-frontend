import BlackAt from '../../assets/logo-svg.svg'
import './style.scss'
import BackIcon from '../../assets/back-icon.svg'
import { useNavigate } from 'react-router-dom'

export const Terms = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="terms flex-column centralize-y">
                <div className="header flex-row centralize-y centralize-x" style={{
                    marginBottom: '50px'
                }}>
                    <img src={BlackAt} alt="" />
                </div>
                <div className="max-width flex-row centralize-x terms-heading">
                    <h4>Terms and Conditions</h4>
                </div>

                <div className="main-section flex-column " style={{
                    alignItems: 'flex-start',
                }}>
                    <div>
                        <h3>Agreement between User and blkat.io</h3>
                        <p>
                            Welcome to blkat.io. The blkat.io website (the "Site") is comprised of various web pages operated by Black At ("BLK AT"). blkat.io is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the "Terms"). Your use of blkat.io constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference.
                        </p>

                        <p className='mg'>
                            blkat.io is a social networking site.
                        </p>

                        <p className="mg">
                            A community of people engaging with each other in the creative world.
                        </p>
                    </div>

                    <div>
                        <h3>Privacy</h3>
                        <p>Your use of blkat.io is subject to BLK AT's Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices. </p>

                    </div>

                    <div>
                        <h3>Electronic Communications</h3>
                        <p>
                            Visiting blkat.io or sending emails to BLK AT constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing.
                        </p>
                    </div>

                    <div>
                        <h3>Your Account</h3>
                        <p>
                            If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. You may not assign or otherwise transfer your account to any other person or entity. You acknowledge that BLK AT is not responsible for third party access to your account that results from theft or misappropriation of your account. BLK AT and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion.
                        </p>
                    </div>

                    <div>
                        <h3>Children Under Thirteen</h3>
                        <p>
                            BLK AT does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use blkat.io only with permission of a parent or guardian.
                        </p>
                    </div>

                    <div>
                        <h3>Cancellation/Refund Policy</h3>
                        <p>
                            Cancellation is within 60 days of service
                        </p>
                    </div>

                    <div>
                        <h3>
                            Links to Third Party Sites/Third Party Services
                        </h3>
                        <p>
                            blkat.io may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of BLK AT and BLK AT is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. BLK AT is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by BLK AT of the site or any association with its operators. Certain services made available via blkat.io are delivered by third party sites and organizations. By using any product, service or functionality originating from the blkat.io domain, you hereby acknowledge and consent that BLK AT may share such information and data with any third party with whom BLK AT has a contractual relationship to provide the requested product, service or functionality on behalf of blkat.io users and customers.
                        </p>
                    </div>

                    <div>
                        <h3>No Unlawful or Prohibited Use/Intellectual Property </h3>
                        <p>
                            You are granted a non-exclusive, non-transferable, revocable license to access and use blkat.io strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to BLK AT that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site.
                        </p>

                        <p className="mg">
                            All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of BLK AT or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto.
                        </p>

                        <p className="mg">
                            You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site. BLK AT content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of BLK AT and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of BLK AT or our licensors except as expressly authorized by these Terms.
                        </p>

                    </div>

                    <div>
                        <h3> Use of Communication Services</h3>
                        <p>
                            The Site may contain bulletin board services, chat areas, news groups, forums, communities, personal web pages, calendars, and/or other message or communication facilities designed to enable you to communicate with the public at large or with a group (collectively, "Communication Services"). You agree to use the Communication Services only to post, send and receive messages and material that are proper and related to the particular Communication Service. By way of example, and not as a limitation, you agree that when using a Communication Service, you will not: defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy and publicity) of others; publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory, infringing, obscene, indecent or unlawful topic, name, material or information; upload files that contain software or other material protected by intellectual property laws (or by rights of privacy of publicity) unless you own or control the rights thereto or have received all necessary consents; upload files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of another's computer; advertise or offer to sell or buy any goods or services for any business purpose, unless such Communication Service specifically allows such messages; conduct or forward surveys, contests, pyramid schemes or chain letters; download any file posted by another user of a Communication Service that you know, or reasonably should know, cannot be legally distributed in such manner; falsify or delete any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded; restrict or inhibit any other user from using and enjoying the Communication Services; violate any code of conduct or other guidelines which may be applicable for any particular Communication Service; harvest or otherwise collect information about others, including e-mail addresses, without their consent; violate any applicable laws or regulations.
                        </p>

                        <p className="mg">
                            BLK AT has no obligation to monitor the Communication Services. However, BLK AT reserves the right to review materials posted to a Communication Service and to remove any materials in its sole discretion. BLK AT reserves the right to terminate your access to any or all of the Communication Services at any time without notice for any reason whatsoever.

                            BLK AT reserves the right at all times to disclose any information as necessary to satisfy any applicable law, regulation, legal process or governmental request, or to edit, refuse to post or to remove any information or materials, in whole or in part, in BLK AT's sole discretion. Always use caution when giving out any personally identifying information about yourself or your children in any Communication Service. BLK AT does not control or endorse the content, messages or information found in any Communication Service and, therefore, BLK AT specifically disclaims any liability with regard to the Communication Services and any actions resulting from your participation in any Communication Service. Managers and hosts are not authorized BLK AT spokespersons, and their views do not necessarily reflect those of BLK AT.

                            Materials uploaded to a Communication Service may be subject to posted limitations on usage, reproduction and/or dissemination. You are responsible for adhering to such limitations if you upload the materials.
                        </p>
                    </div>


                    <div>
                        <h3>
                            Materials Provided to blkat.io or Posted on Any BLK AT Web Page
                        </h3>
                        <p>
                            BLK AT does not claim ownership of the materials you provide to blkat.io (including feedback and suggestions) or post, upload, input or submit to any BLK AT Site or our associated services (collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting your Submission you are granting BLK AT, our affiliated companies and necessary sublicensees permission to use your Submission in connection with the operation of their Internet businesses including, without limitation, the rights to: copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat your Submission; and to publish your name in connection with your Submission. No compensation will be paid with respect to the use of your Submission, as provided herein. BLK AT is under no obligation to post or use any Submission you may provide and may remove any Submission at any time in BLK AT's sole discretion.
                            hhh
                            By posting, uploading, inputting, providing or submitting your Submission you warrant and represent that you own or otherwise control all of the rights to your Submission as described in this section including, without limitation, all the rights necessary for you to provide, post, upload, input or submit the Submissions.
                        </p>
                    </div>


                    <div>
                        <h3>Third Party Acounts</h3>
                        <p>
                            You will be able to connect your BLK AT account to third party accounts. By connecting your BLK AT account to your third party account, you acknowledge and agree that you are consenting to the continuous release of information about you to others (in accordance with your privacy settings on those third party sites). If you do not want information about you to be shared in this manner, do not use this feature.
                        </p>
                    </div>

                    <div>
                        <h3>International Users</h3>
                        <p>
                            The Service is controlled, operated and administered by BLK AT from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the BLK AT Content accessed through blkat.io in any country or in any manner prohibited by any applicable laws, restrictions or regulations.
                        </p>
                    </div>

                    <div>
                        <h3> Indemnification </h3>
                        <p>
                            You agree to indemnify, defend and hold harmless BLK AT, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. BLK AT reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with BLK AT in asserting any available defenses.
                        </p>
                    </div>

                    <div>
                        <h3>Arbitration</h3>
                        <p>
                            In the event the parties are not able to resolve any dispute between them arising out of or concerning these Terms and Conditions, or any provisions hereof, whether in contract, tort, or otherwise at law or in equity for damages or any other relief, then such dispute shall be resolved only by final and binding arbitration pursuant to the Federal Arbitration Act, conducted by a single neutral arbitrator and administered by the American Arbitration Association, or a similar arbitration service selected by the parties, in a location mutually agreed upon by the parties. The arbitrator's award shall be final, and judgment may be entered upon it in any court having jurisdiction. In the event that any legal or equitable action, proceeding or arbitration arises out of or concerns these Terms and Conditions, the prevailing party shall be entitled to recover its costs and reasonable attorney's fees. The parties agree to arbitrate all disputes and claims in regards to these Terms and Conditions or any disputes arising as a result of these Terms and Conditions, whether directly or indirectly, including Tort claims that are a result of these Terms and Conditions. The parties agree that the Federal Arbitration Act governs the interpretation and enforcement of this provision. The entire dispute, including the scope and enforceability of this arbitration provision shall be determined by the Arbitrator. This arbitration provision shall survive the termination of these Terms and Conditions.
                        </p>
                    </div>

                    <div>
                        <h3>Class Action Waiver</h3>
                        <p>
                            Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitrations and class/representative/collective actions are not permitted.<span>
                                THE PARTIES AGREE THAT A PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN EACH'S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/ OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER.
                            </span>. Further, unless both you and BLK AT agree otherwise, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding.
                        </p>
                    </div>

                    <div>
                        <h3>Liability Disclaimer</h3>
                        <span>
                            THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. BLKAT AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME. BLKAT AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OR CONDITION OF ANY KIND. BLKAT AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BLKAT AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF BLKAT OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE
                        </span>
                    </div>

                    <div>
                        <h3>Termination/Access Restriction</h3>
                        <p>
                            BLKAT reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of Michigan and you hereby consent to the exclusive jurisdiction and venue of courts in Michigan in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section. You agree that no joint venture, partnership, employment, or agency relationship exists between you and BLKAT as a result of this agreement or use of the Site. BLKAT's performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of BLKAT's right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by BLKAT with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect. Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and BLKAT with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and BLKAT with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English.
                        </p>
                    </div>

                    <div>
                        <h3>Changes to Terms</h3>
                        <p>BLKAT reserves the right, in its sole discretion, to change the Terms under which blkat.io is offered. The most current version of the Terms will supersede all previous versions. BLKAT encourages you to periodically review the Terms to stay informed of our updates.</p>
                    </div>

                    <div>
                        <h3>Contact Us</h3>
                        <p className='mg'>
                            BLKAT welcomes your questions or comments regarding the Terms:
                        </p>

                        <p className="mg">
                            BlackAt Detroit, Michigan 48198
                        </p>

                        <p className="mg">Email address: help@blkat.io</p>

                        {/* <p className="mg">
                            Telephone number: ______________
                        </p> */}
                    </div>
                    <div className='nav flex-row centralize-y'>
                        <button className="back" onClick={() => {
                            // Go back to the previous page
                            navigate(-1)
                        }}>
                            <img src={BackIcon} alt="" />
                            <p>Back</p>
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}
