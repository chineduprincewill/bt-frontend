import React, { useEffect, useRef } from 'react';

interface ClickOutsideWrapperProps {
    children: React.ReactNode;
    onClickOutside?: () => void;
    className?: string;
}

/**
 * @description Handles runs the {@link onClickOutside} function when the user clicks outside of the wrapper
 */
const ClickOutsideWrapper = ({ children, onClickOutside = () => {}, className = '' }: ClickOutsideWrapperProps) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            event.stopPropagation();
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef} className={className}>
            {children}
        </div>
    );
};

export default ClickOutsideWrapper;
