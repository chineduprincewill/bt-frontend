import React, { forwardRef, memo } from 'react';
import { twMerge } from 'tailwind-merge';

import ArrowDownIcon from '../../assets/arrow-down.svg';
import CloseIcon from '../../assets/close-icon.svg';
import ClickOutsideWrapper from '../ClickOutWrapper';
import useDropdownSearch from './useDropdownSearch';

export interface IDropdownSearchOption {
    /**
     * The label of the option
     */
    label: string;
    /**
     * The value of the option, the value is sent back on IDropdownSearch onChange
     */
    value: any;
}

export interface IDropdownSearch {
    /**
     * The options to display in the dropdown
     */
    options: IDropdownSearchOption[];

    /**
     * Initial value of the dropdown
     */
    value?: string | string[];

    /**
     * Callback function to be called when the dropdown value is changed
     * it is changed when the user closes the modal
     *
     * For single select, the modal closes on select
     *
     * For multiple select, the modal closes on outside click
     */
    onChange?: (value: string | string[]) => void;

    /**
     * Placeholder for the default dropdown button
     */
    placeholder?: string;

    /**
     * If true, multiple options can be selected
     */
    multiple?: boolean;

    /**
     * The custom button to be displayed to trigger the dropdown
     */
    children?: React.ReactNode | ((selectedValue: string | null) => React.ReactNode);

    /**
     * If the search bar should be displayed,
     *
     * Useful for performing actions when an item is selected, as a typical dropdown button
     *
     * Default is true
     */
    showSearch?: boolean;

    /**
     * The className of the dropdown
     */
    dropdownClassName?: string;

    className?: string;
}

export interface IDropdownSearchRef {
    clear: () => void;
}

const DropdownSearch = forwardRef<IDropdownSearchRef, IDropdownSearch>(({ showSearch = true, ...props }, ref) => {
    const {
        filteredOptions,
        selectedItems,
        setIsOpen,
        multiSelected,
        isOpen,
        searchTerm,
        getButtonLabel,
        handleInputChange,
        handleOptionClick,
        handleRemoveOption,
        onClickOutSide,
        selectedValue,
    } = useDropdownSearch(props, ref);

    return (
        <div className={twMerge('relative w-full', props.className)}>
            <ClickOutsideWrapper onClickOutside={onClickOutSide}>
                <div role="button" onClick={() => setIsOpen((prev) => !prev)} className="relative z-50 bg-white">
                    {React.isValidElement(props.children) ? (
                        props.children
                    ) : typeof props.children === 'function' ? (
                        props.children(selectedValue)
                    ) : (
                        <button
                            type="button"
                            className="w-full p-4 text-sm font-medium text-left border border-solid rounded-md focus:outline-none hover:bg-gray-100 border-lightGray-6"
                        >
                            <span>{getButtonLabel()}</span>
                            <img
                                src={ArrowDownIcon}
                                alt="arrow down"
                                className={`transform transition duration-200 ${isOpen ? 'rotate-180' : ''} absolute right-4 top-3.5 h-6 w-6`}
                            />
                        </button>
                    )}
                </div>
                {isOpen && (
                    <div
                        className={twMerge(
                            'absolute z-[999999999] top-full left-0 w-full overflow-hidden shadow-lg bg-white rounded-[15px] py-6',
                            props.dropdownClassName,
                        )}
                    >
                        {showSearch && (
                            <div className="w-full px-3 py-1 border-b border-gray-200">
                                <input
                                    type="text"
                                    className="rounded-[32px] border border-lightGray-5 text-sm placeholder:text-accent-3 text-black font-medium p-2 w-full"
                                    placeholder={props.placeholder || 'Search for topics'}
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        {multiSelected.length > 0 && (
                            <div className="flex flex-wrap gap-2 px-4 py-2">
                                {(selectedItems as IDropdownSearchOption[]).map((option) => (
                                    <button
                                        key={option?.value}
                                        className="flex items-center gap-4 px-2 py-1 text-sm bg-gray-100 rounded-md cursor-pointer w-max whitespace-nowrap"
                                        onClick={() => handleRemoveOption(option)}
                                    >
                                        <span>{option.label}</span>
                                        <img className="w-4 h-4" src={CloseIcon} alt="close" />
                                    </button>
                                ))}
                            </div>
                        )}
                        <ul className="px-4 pt-4 overflow-y-auto max-h-60">
                            {filteredOptions.map((option) => (
                                <li
                                    key={option.value}
                                    className={`py-3 px-4 text-sm text-accent-4 hover:bg-gray-100 cursor-pointer ${
                                        props.multiple &&
                                        (selectedItems as IDropdownSearchOption[]).some((selected) => selected.value === option.value)
                                            ? 'bg-gray-100'
                                            : ''
                                    }`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.label}
                                    {props.multiple &&
                                        (selectedItems as IDropdownSearchOption[]).some((selected) => selected.value === option.value) && (
                                            // Check mark indicating selected item
                                            <span className="ml-2">&#10003;</span>
                                        )}
                                </li>
                            ))}
                            {filteredOptions.length === 0 && <li className="z-[9999999999] p-4 text-gray-400 bg-white">No results found</li>}
                        </ul>
                    </div>
                )}
            </ClickOutsideWrapper>
        </div>
    );
});

export default memo(DropdownSearch) as typeof DropdownSearch