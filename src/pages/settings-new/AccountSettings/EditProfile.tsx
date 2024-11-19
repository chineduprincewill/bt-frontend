import React, { useState, ChangeEvent } from 'react';
import { useUpdateProfileMutation } from '../../../api/profileApi';
import SettingsLayout from '../SettingsLayout';

export default function EditProfile() {
    const [bio, setBio] = useState('');
    const [about, setAbout] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState({
        value: '',
        city: '',
        state: '',
        country: '',
        countryCode: '',
    });
    const [socials, setSocials] = useState({
        x: '',
        linkedIn: '',
    });
    const [updateProfile, { isLoading, isError, isSuccess }] = useUpdateProfileMutation();
    // const [successMessage, setSuccessMessage] = useState('');

    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const handleSocialsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSocials({ ...socials, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        const updateData = {
            bio,
            about,
            phone,
            location,
            socials,
        };
        await updateProfile(updateData);
        // setSuccessMessage('Profile updated successfully?');
    };

    return (
        <>
            <SettingsLayout pageHeader="Edit Profile" subtitle="See your profile information like name, location and date of birth">
                <form
                    className=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className="w-full md:w-[70%] flex flex-col space-y-5">
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            placeholder="Bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            placeholder="About"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {/* Location fields */}
                        <div className="space-y-3 w-full">
                            <input
                                type="text"
                                className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                                name="value"
                                placeholder="Address (e.g., 124 Main St)"
                                value={location.value}
                                onChange={handleLocationChange}
                            />
                            <input
                                type="text"
                                className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                                name="city"
                                placeholder="City"
                                value={location.city}
                                onChange={handleLocationChange}
                            />
                            <div className="w-full flex gap-5">
                                <input
                                    type="text"
                                    className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                                    name="state"
                                    placeholder="State"
                                    value={location.state}
                                    onChange={handleLocationChange}
                                />
                                <input
                                    type="text"
                                    className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                                    name="country"
                                    placeholder="Country"
                                    value={location.country}
                                    onChange={handleLocationChange}
                                />
                            </div>
                            <input
                                type="text"
                                className="bg-[#F2F2F2] p-3 rounded-xl "
                                name="countryCode"
                                placeholder="Country Code"
                                value={location.countryCode}
                                onChange={handleLocationChange}
                            />
                        </div>
                        {/* Socials fields */}

                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            name="x"
                            placeholder="Social X Handle (e.g., www.x.com/userHandle)"
                            value={socials.x}
                            onChange={handleSocialsChange}
                        />
                        <input
                            type="text"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full"
                            name="linkedIn"
                            placeholder="LinkedIn ID (e.g., www.linkedIn.com/userId)"
                            value={socials.linkedIn}
                            onChange={handleSocialsChange}
                        />

                        <button type="submit" className="text-black text-xs bg-[#E9E9E9] w-32 p-3 rounded-3xl" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Save'}
                        </button>
                        {isError && <p className="text-red-500">Failed to update profile.</p>}
                        {isSuccess && <p className="text-green-500">Profile updated successfully!</p>}
                    </div>
                </form>
            </SettingsLayout>
        </>
    );
}
