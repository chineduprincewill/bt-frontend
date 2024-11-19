import './style.scss';

import { ReactNode } from 'react';

export const Circle = ({
    width,
    height,
    bg,
    img,
    pd,
    normalImage,
    children,
    noMg,
    borderColor,
    style,
    noBorder,
    className = '',
}: {
    style?: React.CSSProperties;
    noBorder?: boolean;
    borderColor?: string;
    noMg?: boolean;
    children?: ReactNode;
    normalImage?: boolean;
    img: string;
    pd?: number;
    width?: number;
    height?: number;
    bg: string;
    className?: string;
}) => {
    return (
        <div
            className={` __main-circle circle flex-row min-w-fit centralize-x centralize-y ${className}"}`}
            style={{
                padding: pd,
                width,
                margin: noMg ? '' : '0 10px',
                overflow: 'hidden',
                height,
                backgroundColor: bg,
                borderRadius: '100%',
                [noBorder ? '' : 'border']: `1px solid ${borderColor ?? '#e9e9e9'}`,
                flexShrink: 0,
                ...style,
            }}
        >
            {children ? (
                <>{children}</>
            ) : (
                <>
                    <img
                        // className="!hidden"
                        style={{
                            width: !normalImage ? 'auto' : '100%',
                            height: !normalImage ? 'auto' : '100%',
                            margin: '0px',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 'auto',
                            aspectRatio: '1/1',
                        }}
                        src={img}
                        alt=""
                    />
                </>
            )}
        </div>
    );
};
