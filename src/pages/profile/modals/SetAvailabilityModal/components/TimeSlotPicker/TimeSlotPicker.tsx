import React from 'react';
import DropdownSearch from '../../../../../../components/DropdownSearch';
import { TIME_SLOTS } from '../../../../../../utils/constants';

interface ITimeSlotPicker {
    dayOfWeek: string;
    dayIndex: number;
    timeSlots: { start: string; end: string }[];
    onAddSlot: (dayIndex: number) => void;
    onRemoveSlot: (dayIndex: number, slotIndex: number) => void;
    onChangeFieldValue: (value: string, dayIndex: number, slotIndex: number, type: 'start' | 'end') => void;
}

export default function TimeSlotPicker({ dayOfWeek, timeSlots, dayIndex, onAddSlot, onRemoveSlot, onChangeFieldValue }: ITimeSlotPicker) {
    return (
        <div className="grid grid-cols-7 justify-between ">
            <p className="text-[#959595] font-medium col-span-1 py-4">{dayOfWeek.slice(0, 3)}</p>

            <div className="flex flex-col gap-3 w-full  col-span-6">
                {timeSlots.map((timeSlot, timeSlotIndex) => (
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="flex gap-3 justify-between w-full">
                                <div className="flex gap-3 justify-between w-full">
                                    <DropdownSearch
                                        value={timeSlot.start}
                                        onChange={(value) => onChangeFieldValue(value as string, dayIndex, timeSlotIndex, 'start')}
                                        options={TIME_SLOTS}
                                        placeholder="Select time"
                                    />
                                    <DropdownSearch
                                        value={timeSlot.end}
                                        onChange={(value) => onChangeFieldValue(value as string, dayIndex, timeSlotIndex, 'end')}
                                        options={TIME_SLOTS}
                                        placeholder="Select time"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <button className="text-red-500 py-4" onClick={() => onRemoveSlot(dayIndex, timeSlotIndex)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => onAddSlot(dayIndex)}
                    className="!text-[#959595] font-medium col-span-6 py-4 btn-rounded border border-solid border-lightGray-2"
                >
                    Add {dayOfWeek} slot
                </button>
            </div>
        </div>
    );
}
