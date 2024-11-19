import './style.scss'
import { FC, ReactNode } from 'react'
import CloseIcon from './Close.icon'
import OpenIcon from './Open.icon'

interface Props {
    title: string
    children?: ReactNode
}

const FAQ: FC<Props> = ({ title, children }) => {

    return (
        <details id='faq'>
            <summary>
                <span>{title}</span>
                <CloseIcon />
                <OpenIcon />
            </summary>
            <div>
                {children}
            </div>
        </details>
    )
}

export default FAQ