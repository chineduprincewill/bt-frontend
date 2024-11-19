import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ModalContainer = ({ children, onClose }: { children: ReactNode; onClose?: () => void }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                event.stopPropagation();
                if (onClose) {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return createPortal(
        <div className="fixed w-screen inset-0 flex items-center justify-center px-4 z-[1100] py-8 bg-black/50 overflow-y-scroll">
            <div ref={modalRef} className="flex items-center justify-center w-full h-[100vh] py-16">
                {children}
            </div>
        </div>,
        document.body,
    );
};

export default ModalContainer;

// import { ReactNode, useEffect, useState, useRef } from 'react';
// import { createPortal } from 'react-dom';

// const ModalContainer = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => {
//     const modalRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         document.body.style.overflow = 'hidden';

//         const handleClickOutside = (event: MouseEvent) => {
//             if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//                 onClose();
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.body.style.overflow = 'unset';
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [onClose]);

//     return createPortal(
//         <div className="fixed w-screen inset-0 flex items-center justify-center px-4 z-[1100] py-8 bg-black/50 overflow-y-scroll">
//             <div ref={modalRef} className="flex items-center justify-center w-full h-[100vh] py-16 bg-white rounded-md">
//                 {children}
//             </div>
//         </div>,
//         document.body,
//     );
// };

// export default ModalContainer;
