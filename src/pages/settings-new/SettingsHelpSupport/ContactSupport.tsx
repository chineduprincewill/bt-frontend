import SettingsLayout from '../SettingsLayout';

export default function ContactSupport() {
    return (
        <>
            <SettingsLayout pageHeader="Contact Support" subtitle="Send a message to our customer at Blkat and it will be replied ASAP">
                <div className="w-[80%] space-y-5">
                    <input type="email" className="bg-[#F2F2F2] p-3 rounded-xl w-full placeholder:text-xs" placeholder="Your email" />

                    <textarea className="bg-[#F2F2F2] p-3 rounded-xl w-full h-44 placeholder:text-xs" placeholder="How do you want us to help you?" />

                    <button className="w-full rounded-3xl py-3 px bg-black text-white font-medium text-sm">Send</button>
                </div>
            </SettingsLayout>
        </>
    );
}
