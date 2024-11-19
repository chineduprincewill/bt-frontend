import React, { useState } from 'react';
import { DAYS_OF_WEEK } from '../../../../utils/constants';
import { DEFAULT_AVAILABILITY_FORM_VALUE } from './SetAvailabilityModal.data';
import { ParseSetAvailabilityRequest, validateAvailabilityForm } from './SetAvailabilityModal.utils';
import { IAvailabilityFormValue } from '../../../../types/mentorship';
import { useSetAvailibilityMutation } from '../../../../api/mentorship';
import { toast } from 'react-toastify';

export default function useSetAvailabilityModal() {
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState<IAvailabilityFormValue[]>(DEFAULT_AVAILABILITY_FORM_VALUE);
    const [setAvailibilityMutation, { isLoading }] = useSetAvailibilityMutation();

    function onChangeFieldValue(value: string, dayIndex: number, slotIndex: number, type: 'start' | 'end') {
        setFormValues((prev) => {
            const newFormValues =JSON.parse(JSON.stringify([...prev]));
            newFormValues[dayIndex].timeSlots[slotIndex][type] = value;
            return newFormValues;
        });
    }

    function onAddSlot(dayIndex: number) {
        setFormValues((prev) => {
            const newFormValues = JSON.parse(JSON.stringify([...prev]));
            newFormValues[dayIndex].timeSlots.push({ start: '00:00', end: '00:00' });
            return newFormValues;
        });
    }

    function onRemoveSlot(dayIndex: number, slotIndex: number) {
        setFormValues((prev) => {
            const newFormValues = JSON.parse(JSON.stringify([...prev]));
            newFormValues[dayIndex].timeSlots.splice(slotIndex, 1);
            return newFormValues;
        });
    }

    async function onSetAvailability() {
        const isFormValid = validateAvailabilityForm(formValues);

        if (!isFormValid) return;
        
        const availabilityPayload = ParseSetAvailabilityRequest(formValues);

        try {
            await setAvailibilityMutation(availabilityPayload).unwrap();
            toast.success('Availibility set successfully');
            setShowModal(false);
        } catch (error: any) {
            toast.error(error?.message || "Unable to set availability");
        }
    }

    return { onChangeFieldValue, formValues, setShowModal, onAddSlot, onRemoveSlot, showModal, onSetAvailability, isLoading };
}
