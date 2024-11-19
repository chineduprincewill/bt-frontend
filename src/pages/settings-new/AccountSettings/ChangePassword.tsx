import React, { useState, useEffect } from 'react';
import SettingsLayout from '../SettingsLayout';
import { useChangePasswordMutation, useForgotPasswordMutation } from '../../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetLoggedInUserInfoQuery } from '../../../api/userApi';

export default function ChangePassword() {
    const [changePassword, { isLoading, isError, isSuccess }] = useChangePasswordMutation();
    const [forgotPassword, { isSuccess: isForgotPasswordSuccess }] = useForgotPasswordMutation();
    const { data: loggedInUser } = useGetLoggedInUserInfoQuery(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    console.log(loggedInUser);
    const userEmail = loggedInUser?.data.user.email;

    useEffect(() => {
        if (isSuccess) {
            toast.success('Password changed successfully!');
            navigate('/login');
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isForgotPasswordSuccess) {
            toast.success('Reset password link has been sent to your email!');
        }
    }, [isForgotPasswordSuccess]);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirm password do not match.');
            return;
        }
        try {
            await changePassword({ oldPassword, newPassword }).unwrap();
        } catch (error) {
            toast.error('Failed to update password. Please try again later. ');
        }
    };

    const handleForgotPassword = async () => {
        try {
            if (userEmail) {
                await forgotPassword({ email: userEmail }).unwrap();
            } else {
                toast.error('user email not found. ☹️');
            }
        } catch (error) {
            toast.error('Failed to send reset link.');
        }
    };

    return (
        <>
            <SettingsLayout pageHeader="Change Password" subtitle="See all editable information about your account.">
                <form
                    className=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleChangePassword();
                    }}
                >
                    <div className="md:w-[70%] flex flex-col space-y-5">
                        <div className="space-y-2">
                            <input
                                type="password"
                                className="bg-[#F2F2F2] p-3 rounded-xl w-full placeholder:text-xs"
                                placeholder="Current password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <p className="font-medium text-[10px] text-[#5B5B5B] cursor-pointer" onClick={handleForgotPassword}>
                                Forgot password?
                            </p>
                        </div>

                        <input
                            type="password"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full placeholder:text-xs"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="bg-[#F2F2F2] p-3 rounded-xl w-full placeholder:text-xs"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <div>
                            <p className="text-[#5B5B5B] text-[10px]">
                                Changing your password will log you out of all your active browsers and mobile app except the one you’re using at this
                                time.
                            </p>
                        </div>

                        <button type="submit" className="text-black text-xs bg-[#E9E9E9] w-32 p-3 rounded-3xl" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Save'}
                        </button>
                        {isError && <p className="text-red-500">Failed to update profile.</p>}
                    </div>
                </form>
            </SettingsLayout>
        </>
    );
}
