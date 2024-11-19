import React, { useState } from 'react';

export default function useCreateSessionModal() {
    const [showModal, setShowModal] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        category: '',
        expertise: '',
        duration: '',
        startDate: '',
        endDate: '',
        status: '',
    });

    function onChangeFieldValue(name: string, value: string) {
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return {
        formValues,
        onChangeFieldValue,
        showModal,
        setShowModal,
    };
}
