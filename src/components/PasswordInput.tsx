import { useState } from 'react';

import EyeSlashIcon from '@assets/eye-slash.svg';
import EyeIcon from '@assets/eye.svg';

interface IPasswordInput extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default function PasswordInput({ ...props }: IPasswordInput) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <span role="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-[14px] top-[1px]">
                <img src={showPassword ? EyeSlashIcon : EyeIcon} />
            </span>
            <input className="text-wrapper" type={showPassword ? 'text' : 'password'} {...props} />
        </div>
    );
}
