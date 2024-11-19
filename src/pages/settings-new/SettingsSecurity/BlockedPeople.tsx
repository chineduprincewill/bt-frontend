import SettingsLayout from '../SettingsLayout';

interface Prop {
    name: string;
}

const BlockedPerson = ({ name }: Prop) => (
    <div className="flex justify-between items-center">
        <p className="text-[#959595] text-sm">{name}</p>
        <p className="text-[#DF5954] text-xs cursor-pointer">unblock</p>
    </div>
);

export default function BlockedPeople() {
    const blockedPeople = ['Kenny Keke', 'Dayofolajin', 'Bayo Ojo'];

    return (
        <SettingsLayout
            pageHeader="Security"
            subtitle="Manage your account’s security and keep track of your account’s usage including apps that you have connected to your account."
        >
            <div>
                <p className="font-semibold text-[#0D0D0D] text-sm py-2">People You've Blocked</p>
                <p className="text-[#959595] text-xs">Blocked people can’t see your account activity.</p>
            </div>

            {blockedPeople.map((name) => (
                <BlockedPerson key={name} name={name} />
            ))}
        </SettingsLayout>
    );
}
