import React from 'react'
import { TButton } from '../types/types'
const Button: React.FC<Partial<TButton>> = (props) => {
    const { children, className, icon, onClick, type } = props
    return (
        <>
            <button
                className={`${className} ${
                    icon ? 'flex items-center gap-2' : ''
                } rounded-full  py-[0.6rem] px-[1.329rem] text-[1rem] `}
                onClick={onClick}
                type={type as 'submit' | 'reset' | 'button' | undefined}
            >
                {children}
            </button>
        </>
    )
}

export default Button
