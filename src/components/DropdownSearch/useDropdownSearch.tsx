import React, { ForwardedRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { IDropdownSearch, IDropdownSearchOption, IDropdownSearchRef } from './DropdownSearch';

export default function useDropdownSearch({ value, options, onChange = () => {}, placeholder = 'Select', multiple }: IDropdownSearch, ref: ForwardedRef<IDropdownSearchRef>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selected, setSelected] = useState<any | null>(!Array.isArray(value) ? value : null);
    const [multiSelected, setMultiSelected] = useState<string[]>(Array.isArray(value) ? value : []);

    useImperativeHandle(ref, () => ({
        clear: () => {
            console.log("Cleared")
            setSearchTerm('');
            setSelected(null);
            setMultiSelected([]);
        },
    }))

    useEffect(() => {
        Array.isArray(value) ? setMultiSelected(value) : setSelected(value);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const toggleOption = (option: IDropdownSearchOption) => {
        const isSelected = multiSelected.some((selected) => selected === option.value);
        if (isSelected) {
            setMultiSelected(multiSelected.filter((selected) => selected !== option.value));
        } else {
            setSearchTerm('');
            setMultiSelected([...multiSelected, option.value]);
        }
    };

    const handleOptionClick = (option: IDropdownSearchOption) => {
        if (multiple) {
            toggleOption(option);
        } else {
            setSearchTerm('');
            onChange(option.value);
            setSelected(option.value);
            setIsOpen(false);
        }
    };

    const handleRemoveOption = (option: IDropdownSearchOption) => {
        setMultiSelected(multiSelected.filter((selected) => selected !== option.value));
    };

    const getButtonLabel = () => {
        // If single select
        if (!multiple) {
            const selectedOption = options.find((option) => option.value === selected);
            return selectedOption ? selectedOption.label : <p className="text-accent-5">{placeholder}</p>;
        }

        return multiSelected.length === 0 ? <p className="text-accent-5">{placeholder}</p> : `${multiSelected.length} selected`;
    };

    function getSelectedValue() {
        const selectedOption = options.find((option) => option.value === selected);
        return selectedOption ? selectedOption.label : null;
    }

    const onClickOutSide = () => {
        if (multiple) {
            onChange(multiSelected);
        }
        setIsOpen(false);
    };

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const selectedItems = multiSelected.map((selected) => options.find((option) => option.value === selected)).filter((item) => item !== undefined);
    const selectedValue = getSelectedValue()


    return {
        filteredOptions,
        multiSelected,
        selectedItems,
        isOpen,
        searchTerm,
        setIsOpen,
        onClickOutSide,
        getButtonLabel,
        handleInputChange,
        handleOptionClick,
        handleRemoveOption,
        selectedValue,
    };
}
