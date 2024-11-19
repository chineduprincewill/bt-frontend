import React from 'react';

interface ICalenderButton {
    date: Date;
    className?: React.CSSProperties | string;
    onClick: (e: Date) => void;
    disabled?: boolean;
}

export default function CalenderButton({ date, className, onClick, disabled }: ICalenderButton) {
    // console.log({disabled})

    return (
        <td className={`${className} day`}>
            <button onClick={() => onClick(date)} disabled={disabled}>
                {date.getDate()}
            </button>
        </td>
    );
}
