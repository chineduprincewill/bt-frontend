import { useEffect, useState } from 'react';

import { CalendarProps } from './CalenderPicker';
import CalenderButton from './components/CalenderButton';
import { validate } from 'uuid';

const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function useCalenderPicker({ onDateSelect, selectedDate, validDates, validateFn }: CalendarProps) {
    const currentDate = new Date();

    const [_selectedDate, _setSelectedDate] = useState<Date>(selectedDate ? selectedDate : currentDate);
    const year = _selectedDate.getFullYear();
    const month = _selectedDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const hasValidDates = !!validDates || validateFn;

    useEffect(() => {
        if (selectedDate) {
            _setSelectedDate(selectedDate);
        }
    }, [selectedDate]);

    const handlePrevMonth = () => {
        const __selectedDate = new Date(_selectedDate);
        __selectedDate.setMonth(__selectedDate.getMonth() - 1);

        _setSelectedDate(__selectedDate);
    };

    const handleNextMonth = () => {
        const __selectedDate = new Date(_selectedDate);
        __selectedDate.setMonth(__selectedDate.getMonth() + 1);

        _setSelectedDate(__selectedDate);
    };

    const handleDateClick = (date: Date) => {
        if ((validateFn && validateFn(date)) || (validDates && validDates.includes(date))) {
            _setSelectedDate(date);
            onDateSelect(date);
        }
    };

    const handleTodayClick = () => {
        const today = new Date();

        if ((validateFn && validateFn(today)) || (validDates && validDates.includes(today))) {
            _setSelectedDate(today);
            onDateSelect(today);
        }
    };

    let dayCounter = 0;

    const generateCalendar = () => {
        const firstDay: number = new Date(year, month, 1).getDay();

        const calendar: JSX.Element[] = [];

        // Fill in the leading empty cells for the previous month
        for (let i = 0; i < firstDay; i++) {
            const _date = new Date(year, month - 1, daysInPrevMonth - firstDay + i + 1);

            const isButtonActive = (hasValidDates && validDates?.includes(_date)) || (validateFn && validateFn(_date));

            dayCounter++;

            calendar.push(
                <CalenderButton
                    key={_date.toISOString()}
                    date={_date}
                    className={`other-month ${isButtonActive ? 'pin' : ''}`}
                    onClick={handleDateClick}
                    disabled={!isButtonActive}
                />,
            );
        }

        // Fill in the days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const _date = new Date(_selectedDate);
            _date.setDate(day);

            const isToday: boolean = areDatesOnSameDay(_date, currentDate);
            const isSelected = areDatesOnSameDay(_date, _selectedDate!);

            // console.log({isSelected})

            const cellClass: string = isSelected ? 'selected-date' : isToday ? 'today' : '';

            const isButtonActive = (hasValidDates && validDates?.includes(_date)) || (validateFn && validateFn(_date));

            dayCounter++;

            calendar.push(
                <CalenderButton
                    key={_date.toISOString()}
                    date={_date}
                    className={`${cellClass} ${isButtonActive ? 'pin' : ''}`}
                    onClick={handleDateClick}
                    disabled={!isButtonActive}
                />,
            );
        }

        //Need 42 days to show on calender to prevent height changes
        const daysInNextMonth = 42 - dayCounter;

        for (let i = 0; i < daysInNextMonth; i++) {
            const _date = new Date(year, month + 1, i + 1);

            const isButtonActive = (hasValidDates && validDates?.includes(_date)) || (validateFn && validateFn(_date));

            calendar.push(
                <CalenderButton
                    key={_date.toISOString()}
                    date={_date}
                    className={`other-month ${isButtonActive ? 'pin' : ''}`}
                    onClick={handleDateClick}
                    disabled={!isButtonActive}
                />,
            );
        }

        return calendar;
    };

    return {
        currentDate,
        selectedDate: _selectedDate,
        handleDateClick,
        generateCalendar,
        handleTodayClick,
        monthNames,
        handleNextMonth,
        handlePrevMonth,
        month,
        year,
    };
}

function areDatesOnSameDay(_date1: Date, _date2: Date) {
    const date1 = new Date(_date1);
    const date2 = new Date(_date2);

    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
